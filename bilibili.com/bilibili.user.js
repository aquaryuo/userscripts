// ==UserScript==
// @name         Bilibili Fixes
// @version      0.1.2
// @description  Read the goddam name
// @author       ryouzue
// @match        https://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @updateURL    https://raw.githubusercontent.com/aquaryuo/userscripts/main/bilibili.com/bilibili.user.js
// @downloadURL  https://raw.githubusercontent.com/aquaryuo/userscripts/main/bilibili.com/bilibili.user.js
// @require      https://raw.githubusercontent.com/aquaryuo/userscripts/main/bilibili.com/dictionary.js?v=0.1.2
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

/*
  txch  -> translation cache (origin -> english, or null = failed/negative)
  ogrq  -> origins with an in-flight request
  fails -> origin -> failure count (stop retrying after MAX_FAILS)
  mtxl  -> max chunk length
  txcd  -> cache entry lifetime (ms)
  pint  -> safety poll interval (ms) — the observer does the real work
*/
const dict = (typeof dictionary !== 'undefined') ? dictionary : {};

const txch = new Map();
const ogrq = new Set();
const fails = new Map();
const MAX_FAILS = 2;
const mtxl = 800;
const txcd = 600000;
const pint = 2000;
const CONCURRENCY = 4;
const mutate = { childList: true, subtree: true, characterData: true };

// Only translate text that actually contains CJK — this is a CN/JP page, and it
// also keeps inline JSON/scripts, usernames, numbers and code out of the request.
const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿ｦ-ﾟ]/;
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE', 'SVG', 'CANVAS', 'IFRAME']);

const textFilter = {
  acceptNode(node) {
    const p = node.parentElement;
    if (!p || SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
    if (p.isContentEditable) return NodeFilter.FILTER_REJECT;
    const v = node.nodeValue;
    if (!v || !v.trim() || !CJK.test(v)) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  }
};

/* -> bounded translation queue */
let active = 0;
const queue = [];
function pump() {
  while (active < CONCURRENCY && queue.length) {
    const { fn, resolve } = queue.shift();
    active++;
    Promise.resolve().then(fn).then(resolve, () => resolve(null)).finally(() => { active--; pump(); });
  }
}
const schedule = fn => new Promise(resolve => { queue.push({ fn, resolve }); pump(); });

async function translateChunk(chunk) {
  const res = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(chunk)}`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  // data[0] is an array of segments [translated, original, ...]; join them all
  return (data && data[0]) ? data[0].map(seg => seg[0]).join('') : '';
}

async function translate(text) {
  const out = [];
  for (const chunk of splitTextIntoChunks(text, mtxl)) {
    const t = await schedule(() => translateChunk(chunk));
    if (t == null) return null; // a chunk failed -> whole string failed
    out.push(t);
  }
  return out.join(' ');
}

// CJK has no spaces, so split on character count (prefer a punctuation boundary).
function splitTextIntoChunks(text, maxLength) {
  if (text.length <= maxLength) return [text];
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + maxLength, text.length);
    if (end < text.length) {
      const slice = text.slice(i, end);
      const brk = Math.max(slice.lastIndexOf('。'), slice.lastIndexOf('，'), slice.lastIndexOf(' '), slice.lastIndexOf('\n'));
      if (brk > maxLength * 0.5) end = i + brk + 1;
    }
    chunks.push(text.slice(i, end));
    i = end;
  }
  return chunks;
}

// tx callback: fetch + write back, with negative caching on failure.
const applyTx = async (node, text) => {
  const tstx = await translate(text);
  ogrq.delete(text);
  if (tstx) {
    txch.set(text, tstx);
    if ((node.nodeValue || '').trim() === text) { node.nodeValue = tstx; node.__btr = tstx; }
    setTimeout(() => txch.delete(text), txcd);
  } else {
    fails.set(text, (fails.get(text) || 0) + 1);
    txch.set(text, null); // negative cache -> stop the 500ms retry storm
    setTimeout(() => txch.delete(text), txcd);
  }
};

function processNode(node) {
  if (node.__btr === node.nodeValue) return; // already translated this exact value
  const origin = (node.nodeValue || '').trim();
  if (!origin) return;
  if (node.parentElement && node.parentElement.id === 'h-name') return;

  const cached = txch.get(origin);
  if (cached === null) return; // negatively cached
  if (cached) { node.nodeValue = cached; node.__btr = cached; return; }

  const dxtx = dict[origin.toLowerCase()];
  if (dxtx) { node.nodeValue = dxtx; node.__btr = dxtx; txch.set(origin, dxtx); return; }

  if ((fails.get(origin) || 0) >= MAX_FAILS) return;
  if (ogrq.has(origin)) return;
  ogrq.add(origin);
  applyTx(node, origin);
}

function processPlaceholderElement(el) {
  if (el.dataset.btrPh) return;
  const orph = (el.placeholder || '').trim();
  if (!orph || !CJK.test(orph)) return;

  const cached = txch.get(orph);
  if (cached === null) return;
  if (cached) { el.placeholder = cached; el.dataset.btrPh = '1'; return; }

  const dxtx = dict[orph.toLowerCase()];
  if (dxtx) { el.placeholder = dxtx; el.dataset.btrPh = '1'; txch.set(orph, dxtx); return; }

  if ((fails.get(orph) || 0) >= MAX_FAILS || ogrq.has(orph)) return;
  ogrq.add(orph);
  translate(orph).then(tstx => {
    ogrq.delete(orph);
    if (tstx) { el.placeholder = tstx; el.dataset.btrPh = '1'; txch.set(orph, tstx); setTimeout(() => txch.delete(orph), txcd); }
    else { fails.set(orph, (fails.get(orph) || 0) + 1); txch.set(orph, null); setTimeout(() => txch.delete(orph), txcd); }
  });
}

function collectTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, textFilter);
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

function processElement(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
  collectTextNodes(element).forEach(processNode);
  element.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(processPlaceholderElement);
}

function rctext() {
  if (!document.body) return;
  collectTextNodes(document.body).forEach(processNode);
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(processPlaceholderElement);
}

function observe() {
  new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === 'characterData') {
        if (m.target.nodeType === Node.TEXT_NODE && textFilter.acceptNode(m.target) === NodeFilter.FILTER_ACCEPT) processNode(m.target);
      } else {
        m.addedNodes.forEach(n => {
          if (n.nodeType === Node.ELEMENT_NODE) processElement(n);
          else if (n.nodeType === Node.TEXT_NODE && textFilter.acceptNode(n) === NodeFilter.FILTER_ACCEPT) processNode(n);
        });
      }
    }
  }).observe(document.body, mutate);
}

function start() {
  rctext();
  observe();
  setInterval(rctext, pint); // safety net for content the observer can't see (e.g. placeholder attr changes)
}

if (document.body) start();
else document.addEventListener('DOMContentLoaded', start, { once: true });
