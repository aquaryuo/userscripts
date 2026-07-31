/*
--> CSS
*/

var theme = `
/* == LIBRARIES == (must precede all rules) == */

@import url('https://nya.onish.dev/lib/@google-fonts/Roboto/all.css');
@import url('https://nya.onish.dev/lib/@fontawesome/css/all.min.css');

/* == GENERAL == */

* {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  letter-spacing: 0.4px;
  /* Unified palette — sub.ryuo.to "OLED Black" (RGB triplets; change --kt-accent to re-brand) */
  --kt-background: 0, 0, 0;
  --kt-background-sec: 12, 12, 14;
  --kt-color: 242, 242, 243;
  /* */
  --kt-accent: 59, 130, 246;
  --kt-inact-1: 200, 200, 205;
  --kt-inact-2: 138, 138, 146;
  /* */
  --kt-fav: 59, 130, 246, 0.16;
  --kt-fav-border: 59, 130, 246;
  box-shadow: unset !important;
}

*[class*='--fav'] {
  background-color: rgba(var(--kt-fav)) !important;
  border: 2px solid rgb(var(--kt-fav-border)) !important;
  border-radius: 2px;
}

body {
  background: rgb(var(--kt-background)) !important;
}

button, input {
  color: rgb(var(--kt-color));
  background: unset !important;
  border: unset !important;
  outline: unset !important;
}

a:hover, a:active, a:focus {
  background-color: rgba(var(--kt-accent), 0.2) !important;
  color: rgb(var(--kt-color)) !important;
}

small {
  font-size: 20px !important;
  font-weight: 600 !important;
}

pre {
  font-family: monospace, monospace !important;
  font-size: 1em !important;
}

select {
  background: rgb(var(--kt-background-sec)) !important;
  padding: 2px !important;
}

/* Generic Recolor */

.user-card__service, .pagination-button-current {
  background: rgba(var(--kt-accent), 0.6) !important;
}

.global-sidebar-entry-item.header,
.global-sidebar-entry-item.clickable-header,
.user-header__upload, .fancy-link {
  color: rgb(var(--kt-accent)) !important;
}

#tag-container article span:nth-child(2) {
  color: rgb(var(--kt-inact-2)) !important;
}

.global-sidebar a, .paginator a,
#tag-container article a {
  color: rgb(var(--kt-inact-1)) !important;
}

/* Generic Hidden */

.global-sidebar-entry.stuck-bottom, .global-footer, .content-wrapper .header, .close-sidebar, .post__flag,
.jumbo-welcome-mascot > div > img, #display-status, .site-section__header, #paginator-top menu,
#paginator-bottom small, .content-wrapper a:nth-child(3), .post__footer:has(.post__comments--no-comments),
.jumbo-welcome-background, .jumbo-welcome-credits, #search-form .subtitle, #loading span, .user-header__upload,
.content-wrapper > aside, .backdrop.backdrop-hidden {
  display: none !important;
}

.global-sidebar, .search-form, .post__info, .comment, #tag-container article, #tag-container article a,
.jumbo-welcome, .post-card a {
  background: transparent !important;
}

a, .post__header, .post__body, .post__user, .post__footer, .comment, .comment__header, .comment__footer,
.dm-card, .paginator menu *, select {
  border: unset !important;
  outline: unset !important;
}

/* Search form */

.search-form {
  margin: 0 auto !important;
  /* */
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  column-gap: 30px;
}

.search-form div {
  display: flex !important;
  /* */
  margin-bottom: unset !important;
  line-height: unset !important;
}

.search-form div:nth-child(3) {
  column-gap: 16px !important;
}

.search-form label {
  display: none !important;
  /*
  padding: unset !important;
  text-align: left !important;
  */
}

.search-form input, .search-input,
.search-form select, .form__input {
  background: rgb(var(--kt-background-sec)) !important;
  padding: 6px 8px !important;
}

.search-form input {
  min-width: 240px;
}

.search-form select * {
  background: rgb(var(--kt-background-sec)) !important;
  border: unset !important;
}

.search-input, .search-form,
.search-form select {
  font-size: 16px !important;
}

/* Home */

.content-wrapper {
  margin: 0 5vh !important;
  /* */
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* */
  transition: margin-left 0.2s ease-in-out !important;
  z-index: 1;
}

body:has(.site-section--home) .content-wrapper .main {
  position: relative;
  /* */
  display: flex;
  justify-content: center;
  align-items: center;
}

.jumbo-welcome {
  overflow: unset !important;
}

.jumbo-welcome-mascot {
  display: flex;
  justify-content: center;
  align-items: center;
  /* */
  max-height: unset !important;
}

.jumbo-welcome-mascot div {
  height: 800px;
  width: 500px;
  /* */
  background: url('https://nya.onish.dev/scr/kemono.su/_icons/home-waifu.png') !important;
  background-size: cover !important;
  background-position: center !important;
}

/* Top/Bottom panel */

#paginator-top {
  margin: 15px 0 20px !important;
  min-height: 30px !important;
}

#paginator-top form {
  padding: 15px 0 0 !important;
}

#paginator-top input {
  min-width: 260px;
  height: 30px;
}

#paginator-bottom {
  padding: 20px 0 30px 0;
}

/* Author/Artist page */

.site-section--user .user-header__profile {
  flex-flow: unset !important;
}

.site-section--artists .user-card__info {
  min-height: 90px !important;
}

.user-card {
  background: unset;
}

.user-card--fav {
  border: 2px solid rgb(var(--kt-accent)) !important;
}

.user-header__upload.show {
  display: inherit;
}

.user-header__actions button {
  font-size: 1.5rem !important;
}

.paginator .tabs, .paginator .tab {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.paginator .tabs {
  flex-direction: row !important;
  gap: 10px;
}

.paginator .tab {
  line-height: unset !important;
  padding: unset !important;
  height: unset !important;
}

.paginator .tab a {
  height: unset !important;
  /* */
  padding: 6px 10px !important;
  border-radius: 5px;
}

/* Post Page */

.post-card {
  text-shadow: unset !important;
}

.post-card .post-card__header,
.post-card .post-card__footer {
  transition: 0.2s ease-in-out !important;
  opacity: 0 !important;
}

.post-card .post-card__header:hover,
.post-card .post-card__footer:hover {
  opacity: 1 !important;
}

.image-link {
  pointer-events: auto !important;
  user-drag: none !important;
  user-select: none !important;
}

.post-card .image-link:not(:has(.post-card__image-container)) {
  background: url('https://nya.onish.dev/scr/kemono.su/_icons/no-image-post.png') !important;
  background-repeat: no-repeat !important;
  background-size: 120px !important;
  background-position: center !important;
  filter: invert(1) !important;
}

.post-card .image-link:not(:has(.post-card__image-container)) .post-card__header,
.post-card .image-link:not(:has(.post-card__image-container)) .post-card__footer {
  filter: invert(1) !important;
}

.post-card__image {
  /* filter: blur(14px) !important; */
  transition: 0.1s ease-in-out;
}

/*
.post-card__image:hover {
  filter: unset !important;
}
*/

.post__title {
  font-size: 2em !important;
}

.post__actions button {
  font-size: 1.5rem !important;
}

.paginator menu a,
.paginator menu li {
  color: rgb(var(--kt-accent)) !important;
  border-radius: 2px !important;
}

/* Tags page */

#tag-container article {
  transition: 0.1s ease-in-out;
  border-radius: 5px !important;
}

#tag-container article a {
  border: unset !important;
}

#tag-container article:hover,
#tag-container article:active {
  background: rgba(var(--kt-accent), 0.3) !important;
}

/*
=== KEMONO TOOLS CUSTOM ===
*/

/* general */

.kt-maximize {
  cursor: pointer;
  height: 28px;
  margin-left: 10px;
  font-size: 24px;
  font-weight: 700;
  /* rotate */
  transition: 0.3s ease-in-out;
  rotate: 180deg;
}

html:has(.maximized) .kt-maximize {
  rotate: 0deg;
}

.global-sidebar-entry-item {
  opacity: 0 !important;
  /* */
  transition: 0.2s ease-in-out !important;
  pointer-events: none !important;
}

html:has(.maximized) .global-sidebar-entry-item {
  opacity: 1 !important;
  pointer-events: inherit !important;
}

html:has(.maximized) .content-wrapper {
  margin-left: 11rem !important;
}

.global-sidebar {
  margin-left: -130px !important;
  /* */
  transition: 0.2s ease-in-out !important;
  overflow: hidden !important;
  /* */
  z-index: 10;
}

html:has(.maximized) .global-sidebar {
  margin-left: 0 !important;
}

.kt-wlc-description {
  display: flex;
  flex-direction: row;
  gap: 10px;
  /* */
  padding: 10px 0;
}

.kt-wlc-description h2,
.kt-wlc-description a {
  font-size: 1.6rem;
  font-weight: 700;
}

.kt-wlc-description a {
  color: rgb(var(--kt-accent));
}

/* context menu */

#kt-context-menu {
  position: absolute;
  background: #242424;
  /* */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* */
  text-align: start;
  /* */
  width: 120px;
  min-height: 32px;
  /* */
  padding: 1px 2px;
  border-radius: 3px;
  /* */
  display: none;
  z-index: 50;
}

#kt-context-menu button {
  position: relative;
  /* */
  letter-spacing: 1.5px;
  font-weight: 500;
  /* */
  width: 100%;
  height: 32px;
  /* */
  border-radius: 3px;
  /* */
  transition: 0.2s ease-in;
}

#kt-context-menu button:hover {
  background-color: rgba(var(--kt-accent), 0.2) !important;
}

/* credits - top right */

#kt-credits {
  position: absolute;
  width: 40px;
  height: 40px;
  /* */
  top: 15px;
  right: 20px;
  /* */
  z-index: 12;
}

#kt-credits img {
  filter: invert(0.3);
}

#kt-credits:hover, #kt-credits:active,
#kt-credits:focus {
  background: unset !important;
}

/* blacklist */

.kt-blacklist {
  color: rgb(var(--kt-inact-2));
}

/* blacklist manager panel */

.kt-manage {
  cursor: pointer;
  margin-left: 8px;
  font-size: 18px;
  color: rgb(var(--kt-inact-1));
}

#kt-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* */
  width: 420px;
  max-width: 90vw;
  max-height: 70vh;
  /* */
  display: none;
  flex-direction: column;
  /* */
  background: rgb(var(--kt-background-sec)) !important;
  border: 1px solid rgba(var(--kt-accent), 0.4) !important;
  border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6) !important;
  color: rgb(var(--kt-color));
  z-index: 100;
}

#kt-panel.open { display: flex; }

.kt-panel__head, .kt-panel__foot {
  display: flex;
  align-items: center;
  padding: 10px 14px;
}

.kt-panel__head {
  justify-content: space-between;
  border-bottom: 1px solid rgba(var(--kt-accent), 0.25) !important;
}

.kt-panel__head h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.kt-panel__close { cursor: pointer; font-size: 1.1rem; }

.kt-panel__list {
  flex: 1;
  overflow-y: auto;
  padding: 6px 0;
}

.kt-panel__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
}

.kt-panel__row:hover { background: rgba(var(--kt-accent), 0.12); }

.kt-panel__row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* the theme's global small rule is 20px/600 — keep the id subordinate */
.kt-panel__row small {
  color: rgb(var(--kt-inact-2));
  font-size: 0.8em !important;
  font-weight: 400 !important;
}

.kt-panel__row button, .kt-panel__foot button {
  cursor: pointer;
  padding: 3px 10px;
  border-radius: 3px;
  border: 1px solid rgba(var(--kt-accent), 0.5) !important;
  color: rgb(var(--kt-color));
  transition: 0.15s ease-in-out;
}

.kt-panel__row button:hover, .kt-panel__foot button:hover {
  background: rgba(var(--kt-accent), 0.3) !important;
}

.kt-panel__foot {
  gap: 8px;
  border-top: 1px solid rgba(var(--kt-accent), 0.25) !important;
}

.kt-panel__empty {
  padding: 18px 14px;
  text-align: center;
  color: rgb(var(--kt-inact-2));
}

/* loading */

#loading-line {
  background: red;
  /* */
  width: 100%;
  height: 2px;
}

`

/*
--> JS
*/

const isURL = /https?:\/\/[^\s]+/g,
  // Non-global twin of isURL for .test() — the walker's filter MUST agree exactly
  // with the rewriter, or an accepted-but-unmatchable node gets replaced by an
  // identical copy every frame (childList mutation -> observer -> rAF -> repeat).
  hasURL = /https?:\/\/[^\s]+/,
  sel = (el, all) => all ? document.querySelectorAll(el) : document.querySelector(el),
  log = obj => console.log(`%cKemono Tools ::`, 'color:orange;', obj),
  mke = obj => document.createElement(obj),
  path = () => window.location.pathname; // read fresh on every call (SPA nav changes it)

// Theme is global and safe to inject before the DOM exists (@run-at document-start),
// which also kills the flash of the unthemed page.
GM_addStyle(theme);

/*
-> Persistent settings

kemono has hopped domains (party -> su -> cr); localStorage is per-origin, so the
old kt-* keys were stranded on each move. GM storage is per-script and survives the
hop. Read migrates any legacy localStorage value once, then GM storage is source of truth.
*/
const store = {
  get(key, def) {
    let v = GM_getValue(key, undefined);
    if (v === undefined) {
      try {
        const ls = localStorage.getItem(key);
        if (ls !== null) {
          try { v = JSON.parse(ls); } catch (e) { v = ls; }
          GM_setValue(key, v);
        }
      } catch (e) { /* localStorage can be blocked in some contexts */ }
    }
    return v === undefined ? def : v;
  },
  set: (key, val) => GM_setValue(key, val),
  // Always an array — a corrupt/non-array legacy value must not break the blacklist.
  list(key) { const v = this.get(key, []); return Array.isArray(v) ? v : []; }
};

/*
-> Injected elements (single long-lived instances, re-attached idempotently)
*/
const kt_sb = mke('button');
kt_sb.className = 'kt-maximize';
kt_sb.type = 'button';
kt_sb.textContent = '<';

const kt_cr = mke('a');
kt_cr.href = 'https://onish.dev/';
kt_cr.id = 'kt-credits';
kt_cr.target = '_blank';
kt_cr.rel = 'noopener';
const kt_cr__img = mke('img');
kt_cr__img.src = 'https://nya.onish.dev/scr/kemono.su/_icons/sparkling-diamond.png';
kt_cr.appendChild(kt_cr__img);

const kt_cd = mke('div');
kt_cd.className = 'kt-wlc-description';
const kt_cd__t1 = mke('h2');
kt_cd__t1.textContent = 'Site mod created by';
const kt_cd__t2 = mke('a');
kt_cd__t2.href = 'https://onish.dev/';
kt_cd__t2.textContent = 'ryouzue';
kt_cd__t2.target = '_blank';
kt_cd__t2.rel = 'noopener';
kt_cd.appendChild(kt_cd__t1);
kt_cd.appendChild(kt_cd__t2);

const kt_bl = mke('button');
kt_bl.className = 'kt-blacklist';
kt_bl.type = 'button';

/* Blacklist manager — the only way to un-blacklist without revisiting the creator */
const kt_mg = mke('button');
kt_mg.className = 'kt-manage';
kt_mg.type = 'button';
kt_mg.title = 'Manage blacklist';
kt_mg.textContent = '☰';

const kt_panel = mke('div');
kt_panel.id = 'kt-panel';

const kt_panel__head = mke('div');
kt_panel__head.className = 'kt-panel__head';
const kt_panel__title = mke('h3');
const kt_panel__close = mke('button');
kt_panel__close.className = 'kt-panel__close';
kt_panel__close.type = 'button';
kt_panel__close.textContent = '✕';
kt_panel__head.appendChild(kt_panel__title);
kt_panel__head.appendChild(kt_panel__close);

const kt_panel__list = mke('div');
kt_panel__list.className = 'kt-panel__list';

const kt_panel__foot = mke('div');
kt_panel__foot.className = 'kt-panel__foot';
const kt_panel__copy = mke('button');
kt_panel__copy.type = 'button';
kt_panel__copy.textContent = 'Copy JSON';
const kt_panel__clear = mke('button');
kt_panel__clear.type = 'button';
kt_panel__clear.textContent = 'Clear all';
kt_panel__foot.appendChild(kt_panel__copy);
kt_panel__foot.appendChild(kt_panel__clear);

kt_panel.appendChild(kt_panel__head);
kt_panel.appendChild(kt_panel__list);
kt_panel.appendChild(kt_panel__foot);

document.addEventListener('dragstart', (e) => e.preventDefault());

/*
-> Actions
*/
const maximizeSidebar = (obj) => {
  const max = !!store.get('kt-maximize', false);
  store.set('kt-maximize', !max);
  obj.classList.toggle('maximized', !max);
  log(`Changed 'maximized' to ${!max}`);
};

// On /post/ pages meta[name="id"] is the POST id, so the creator id lives in
// meta[name="user"]; elsewhere meta[name="id"] is already the creator id. Read
// fresh each call so it reflects the current page after client-side navigation.
const currentId = () => /\/post\//.test(path())
  ? (sel('meta[name="user"]')?.content || null)
  : (sel('meta[name="id"]')?.content || null);

// Creator ids are only unique WITHIN a service, so the stored key is service/id.
// Bare-id entries from older versions still match (legacy wildcard) and are dropped
// on un-blacklist, so existing blacklists keep working without a migration step.
const currentService = () => sel('meta[name="service"]')?.content || null;
const keyOf = (service, id) => (service ? service + '/' + id : id);
const currentKey = () => {
  const id = currentId();
  return id ? keyOf(currentService(), id) : null;
};
const listedIn = (bl, service, id) => bl.has(keyOf(service, id)) || bl.has(id);

// Best-effort display name so the manager shows something friendlier than a raw
// id. Falls back to the id when the selectors don't match.
const currentName = () => {
  // meta[name="artist_name"] is present on creator pages (verified on kemono.cr) and
  // beats scraping the DOM; the class selectors cover post pages.
  const meta = sel('meta[name="artist_name"]')?.content;
  if (meta && meta.trim()) return meta.trim().slice(0, 80);
  const el = sel('.user-header__name') || sel('.post__user-name') || sel('.post__user');
  const t = el && el.textContent ? el.textContent.trim() : '';
  return t && t.length < 80 ? t : null;
};

const names = () => {
  const v = store.get('kt-blacklist-names', {});
  return (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
};

// Drop a name whenever its id leaves the blacklist, so the map can't accumulate
// orphans (which also leaked into the Copy JSON export).
const forgetName = (id) => {
  const nm = { ...names() };
  if (id in nm) { delete nm[id]; store.set('kt-blacklist-names', nm); }
};

const blacklist = () => {
  const id = currentId();
  if (id == null) return log('Invalid ID');
  const service = currentService();
  const key = keyOf(service, id);
  const bl = store.list('kt-blacklist');
  if (!listedIn(new Set(bl), service, id)) {
    store.set('kt-blacklist', [...bl, key]);
    const nm = currentName();
    if (nm) store.set('kt-blacklist-names', { ...names(), [key]: nm });
    log('Added ' + key + ' to blacklist');
    kt_bl.textContent = '✔ Unblacklist';
    ensureBlacklistFilter();
    history.back();
  } else {
    store.set('kt-blacklist', bl.filter(x => x !== key && x !== id));
    forgetName(key);
    forgetName(id);
    log('Removed ' + key + ' from blacklist');
    kt_bl.textContent = '✘ Blacklist';
    ensureBlacklistFilter();
  }
};

kt_sb.addEventListener('click', () => document.body && maximizeSidebar(document.body));
kt_bl.addEventListener('click', () => blacklist());

// Wrap bare URLs in <a> by rewriting text nodes only, so the post's existing
// markup and event listeners survive and post text can never become live HTML.
const linkify = (root) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: node =>
      node.parentElement && !node.parentElement.closest('a') && hasURL.test(node.nodeValue)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT
  });
  const targets = [];
  while (walker.nextNode()) targets.push(walker.currentNode);
  if (!targets.length) return; // nothing to wrap — don't touch the DOM
  targets.forEach(node => {
    const text = node.nodeValue,
      frag = document.createDocumentFragment();
    let last = 0;
    text.replace(isURL, (url, offset) => {
      if (offset > last) frag.appendChild(document.createTextNode(text.slice(last, offset)));
      const a = mke('a');
      a.href = url;
      a.className = 'text-link';
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = url;
      frag.appendChild(a);
      last = offset + url.length;
      return url;
    });
    if (!last) return; // nothing matched — replacing would just swap in an identical node
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });
};

/*
-> Blacklist manager panel

renderPanel only rewrites the list when the stored blacklist actually changes
(childList writes are what the observer watches, so an unconditional rebuild each
pass would feed a write -> mutation -> rAF -> write loop). Open/close uses a class,
which is an attribute mutation the observer ignores.
*/
let panelSig = null;

const renderPanel = (force) => {
  const bl = store.list('kt-blacklist');
  const sig = JSON.stringify(bl);
  if (!force && sig === panelSig) return;
  panelSig = sig;

  const title = `Blacklist (${bl.length})`;
  if (kt_panel__title.textContent !== title) kt_panel__title.textContent = title;

  kt_panel__list.textContent = '';
  if (!bl.length) {
    const empty = mke('div');
    empty.className = 'kt-panel__empty';
    empty.textContent = 'Nothing blacklisted.';
    kt_panel__list.appendChild(empty);
    return;
  }

  const nm = names();
  bl.forEach(id => {
    const row = mke('div');
    row.className = 'kt-panel__row';

    const label = mke('span');
    label.textContent = nm[id] || id;
    if (nm[id]) {
      const s = mke('small');
      s.textContent = ' · ' + id;
      label.appendChild(s);
    }

    const rm = mke('button');
    rm.type = 'button';
    rm.textContent = 'Remove';
    rm.addEventListener('click', () => {
      store.set('kt-blacklist', store.list('kt-blacklist').filter(x => x !== id));
      forgetName(id);
      renderPanel(true);
      ensureBlacklistFilter();
      log('Removed ' + id + ' from blacklist');
    });

    row.appendChild(label);
    row.appendChild(rm);
    kt_panel__list.appendChild(row);
  });
};

kt_mg.addEventListener('click', () => {
  kt_panel.classList.toggle('open');
  if (kt_panel.classList.contains('open')) renderPanel(true);
});
kt_panel__close.addEventListener('click', () => kt_panel.classList.remove('open'));

kt_panel__copy.addEventListener('click', () => {
  const data = JSON.stringify({ blacklist: store.list('kt-blacklist'), names: names() }, null, 2);
  const done = (msg) => {
    kt_panel__copy.textContent = msg;
    setTimeout(() => { kt_panel__copy.textContent = 'Copy JSON'; }, 1500);
  };
  if (navigator.clipboard) navigator.clipboard.writeText(data).then(() => done('Copied'), () => done('Blocked'));
  else done('Blocked');
});

// Two-click confirm rather than a modal dialog.
let clearArmed = false;
kt_panel__clear.addEventListener('click', () => {
  if (!clearArmed) {
    clearArmed = true;
    kt_panel__clear.textContent = 'Sure?';
    setTimeout(() => { if (clearArmed) { clearArmed = false; kt_panel__clear.textContent = 'Clear all'; } }, 3000);
    return;
  }
  clearArmed = false;
  kt_panel__clear.textContent = 'Clear all';
  store.set('kt-blacklist', []);
  store.set('kt-blacklist-names', {});
  renderPanel(true);
  ensureBlacklistFilter();
  log('Blacklist cleared');
});

/*
-> Idempotent "ensure" passes

Each pass finds its target in the current DOM and applies its effect at most once
per element (guarded by containment or a data-kt* marker). Because they are safe to
re-run, a single persistent observer can call them on every mutation, so features
keep working across incremental rendering, pagination and SPA route changes — which
the old one-shot is*Loaded flags did not.
*/
const ensureSidebar = () => {
  const sidebar = sel('.global-sidebar');
  // The header row (child 0) is where the site's own .close-sidebar button lives and
  // is the only part still on-screen while the sidebar is collapsed; childNodes[1] is
  // the first nav group, which pushes our glyphs off-screen. Verified on kemono.cr.
  const host = sidebar && (sidebar.querySelector('.clickable-header-entry') || sidebar.childNodes[0]);
  if (host && host.nodeType === 1) {
    if (!host.contains(kt_sb)) host.appendChild(kt_sb);
    if (!host.contains(kt_mg)) host.appendChild(kt_mg);
  }
  if (document.body) document.body.classList.toggle('maximized', !!store.get('kt-maximize', false));
};

const ensurePanel = () => {
  if (document.body && !document.body.contains(kt_panel)) document.body.appendChild(kt_panel);
  if (kt_panel.classList.contains('open')) renderPanel(false); // sig-guarded: no-op when unchanged
};

const ensureBlacklistButton = () => {
  const actions = sel('.post__actions') || sel('.user-header__actions');
  const id = currentId();
  if (!actions || !id) return;
  const service = currentService();
  // Recompute the label after SPA nav, but only WRITE when it changes: assigning
  // textContent is a childList mutation the observer watches, so an unconditional
  // write would feed a permanent mutation -> rAF -> write loop.
  const label = listedIn(new Set(store.list('kt-blacklist')), service, id) ? '✔ Unblacklist' : '✘ Blacklist';
  if (kt_bl.textContent !== label) kt_bl.textContent = label;
  if (!actions.contains(kt_bl)) actions.appendChild(kt_bl);
};

const ensureBlacklistFilter = () => {
  const bl = new Set(store.list('kt-blacklist'));
  sel('.post-card[data-user]', true).forEach(card => {
    if (listedIn(bl, card.getAttribute('data-service'), card.getAttribute('data-user'))) {
      card.style.setProperty('display', 'none', 'important');
      card.dataset.ktHidden = '1';
    } else if (card.dataset.ktHidden) { // only un-hide cards we hid
      card.style.removeProperty('display');
      delete card.dataset.ktHidden;
    }
  });
};

const ensureHome = () => {
  const mascot = sel('.jumbo-welcome-mascot');
  if (mascot && !mascot.contains(kt_cr)) mascot.appendChild(kt_cr);
  const desc = sel('.jumbo-welcome-description');
  if (desc && !desc.contains(kt_cd)) desc.appendChild(kt_cd);
};

const ensureLinkify = () => {
  // .post__body is the live container (verified on kemono.cr); .post__content and
  // .dm-card__content are kept as fallbacks for other/older page types.
  // No marker: React can re-render the body with fresh un-linkified text under the
  // same element, so re-run every pass. linkify() is idempotent — it skips text
  // already inside an <a> and touches the DOM only for still-unwrapped URLs.
  sel('.post__body, .post__content, .dm-card__content', true).forEach(linkify);
};

/*
-> Scheduler: coalesce observer bursts into one pass per frame
*/
let scheduled = false;
const applyAll = () => {
  scheduled = false; // set first so mutations during the pass schedule the next one
  try {
    ensureSidebar();
    ensurePanel();
    ensureBlacklistButton();
    ensureBlacklistFilter();
    ensureHome();
    ensureLinkify();
  } catch (err) {
    log(err.message);
  }
};
const schedule = () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(applyAll);
};

const res = new MutationObserver(schedule);
res.observe(document.documentElement, { childList: true, subtree: true });
schedule(); // in case the target elements already exist

log('Injection Success');