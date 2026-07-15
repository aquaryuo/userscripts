// ==UserScript==
// @name         Bilibili Fixes
// @version      0.1.0
// @description  Read the goddam name
// @author       ryouzue
// @match        https://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @require      https://nya.onish.dev/scr/bilibili.com/dictionary.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

const log = msg => console.log('%c', `${msg} :: `, 'color:red;');

// var theme = ``;
// GM_addStyle(theme);

/* modification */

/*
  txch       -> translation cache
  ogrq       -> ongoing requests
  mtxl       -> max translation length
  txcd       -> translation cache duratiion
  pint       -> process interval
  mutate     -> mutation observer config
*/

const txch = new Map();
const ogrq = new Set();
const mtxl = 800;
const txcd = 600000;
const pint = 500;
const mutate = {
  childList: true,
  subtree: true
};

async function translate(text) {
  try {
    const chunks = splitTextIntoChunks(text, mtxl);
    const txchunk = [];
    for (const chunk of chunks) {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(chunk)}`);
      const data = await res.json();
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        txchunk.push(data[0][0][0]);
      }
    }

    return txchunk.join(' ');
  } catch (error) {
    console.error("Translation error:", error);
    return null;
  }
}

function processNode(node, tx) {
  const origin = node.nodeValue ? node.nodeValue.trim() :
    node.textContent ? node.textContent.trim() : '';

  if (!origin) return;
  if (node.processed ||
    (node.parentElement && node.parentElement.id === 'h-name')) {
    return;
  }

  const chtx = txch.get(origin);
  const dxtx = dictionary[origin.toLowerCase()];

  if (chtx) {
    node.nodeValue ? node.nodeValue = chtx : node.textContent = chtx;
    node.processed = true;
    return;
  }

  if (dxtx) {
    node.nodeValue ? node.nodeValue = dxtx : node.textContent = dxtx;
    txch.set(origin, dxtx);
    node.processed = true;
    return;
  }

  if (ogrq.has(origin)) return;
  ogrq.add(origin);
  tx(node, origin);
}

function dnobserve() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            processAddedElement(addedNode);
          }
        });
      }
    });
  });

  observer.observe(document.body, mutate);
}

function processAddedElement(element) {
  if (element.nodeType !== Node.ELEMENT_NODE) return;

  const nodes = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while (node = walker.nextNode()) {
    nodes.push(node);
  }

  nodes.forEach(textNode => {
    processNode(textNode, async (txnode, text) => {
      const tstx = await translate(text);
      if (tstx) {
        txnode.nodeValue = tstx;
        txch.set(text, tstx);
        txnode.processed = true;

        setTimeout(() => {
          txch.delete(text);
        }, txcd);
      }
      ogrq.delete(text);
    });
  });

  const placeholderElements = element.querySelectorAll('input[placeholder], textarea[placeholder]');
  placeholderElements.forEach(processPlaceholderElement);
}

function processPlaceholderElement(element) {
  if (element.dataset.processed) return;
  const orph = element.placeholder.trim();
  if (!orph) return;

  const chtx = txch.get(orph);
  const dxtx = dictionary[orph.toLowerCase()];

  if (chtx) {
    element.placeholder = chtx;
    element.dataset.processed = true;
    return;
  }

  if (dxtx) {
    element.placeholder = dxtx;
    txch.set(orph, dxtx);
    element.dataset.processed = true;
    return;
  }

  if (ogrq.has(orph)) return;
  ogrq.add(orph);
  translate(orph).then(tstx => {
    if (tstx) {
      element.placeholder = tstx;
      txch.set(orph, tstx);
      element.dataset.processed = true;

      setTimeout(() => {
        txch.delete(orph);
      }, txcd);
    }
    ogrq.delete(orph);
  });
}

function prtxnode() {
  const nodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while (node = nodes.nextNode()) {
    processNode(node, async (txnode, text) => {
      const tstx = await translate(text);
      if (tstx) {
        txnode.nodeValue = tstx;
        txch.set(text, tstx);
        txnode.processed = true;

        setTimeout(() => {
          txch.delete(text);
        }, txcd);
      }
      ogrq.delete(text);
    });
  }
}

function prph() {
  const input = document.querySelectorAll('input[placeholder], textarea[placeholder]');
  input.forEach(processPlaceholderElement);
}

function splitTextIntoChunks(text, maxLength) {
  const chunks = [];
  let crchunk = '';

  text.split(' ').forEach(word => {
    if ((crchunk + ' ' + word).length > maxLength) {
      chunks.push(crchunk.trim());
      crchunk = word;
    } else {
      crchunk += ' ' + word;
    }
  });

  if (crchunk) chunks.push(crchunk.trim());
  return chunks;
}

function rctext() {
  prtxnode();
  prph();
}

function initialize() {
  rctext();
  dnobserve();
}

setInterval(rctext, pint);
initialize();