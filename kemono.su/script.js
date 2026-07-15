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
      const ls = localStorage.getItem(key);
      if (ls !== null) {
        try { v = JSON.parse(ls); } catch (e) { v = ls; }
        GM_setValue(key, v);
      }
    }
    return v === undefined ? def : v;
  },
  set: (key, val) => GM_setValue(key, val)
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

// On a post page the creator is identified by name; elsewhere by id. Read fresh so
// it reflects the current page after client-side navigation.
const currentId = () => /\/post\//.test(path())
  ? (sel('meta[name="user"]')?.content || null)
  : (sel('meta[name="id"]')?.content || null);

const blacklist = (id) => {
  if (id == null) return log('Invalid ID');
  const bl = store.get('kt-blacklist', []);
  if (!bl.includes(id)) {
    store.set('kt-blacklist', [...bl, id]);
    log('Added ' + id + ' to blacklist');
    kt_bl.textContent = '✔ Unblacklist';
    ensureBlacklistFilter();
    history.back();
  } else {
    store.set('kt-blacklist', bl.filter(x => x !== id));
    log('Removed ' + id + ' from blacklist');
    kt_bl.textContent = '✘ Blacklist';
    ensureBlacklistFilter();
  }
};

kt_sb.addEventListener('click', () => document.body && maximizeSidebar(document.body));
kt_bl.addEventListener('click', () => blacklist(currentId()));

// Wrap bare URLs in <a> by rewriting text nodes only, so the post's existing
// markup and event listeners survive and post text can never become live HTML.
const linkify = (root) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: node =>
      node.parentElement && !node.parentElement.closest('a') && /https?:\/\//.test(node.nodeValue)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT
  });
  const targets = [];
  while (walker.nextNode()) targets.push(walker.currentNode);
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
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });
};

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
  const host = sidebar && sidebar.childNodes[1];
  if (host && host.nodeType === 1 && !host.contains(kt_sb)) host.appendChild(kt_sb);
  if (document.body) document.body.classList.toggle('maximized', !!store.get('kt-maximize', false));
};

const ensureBlacklistButton = () => {
  const actions = sel('.post__actions') || sel('.user-header__actions');
  const id = currentId();
  if (actions && id && !actions.contains(kt_bl)) {
    kt_bl.textContent = store.get('kt-blacklist', []).includes(id) ? '✔ Unblacklist' : '✘ Blacklist';
    actions.appendChild(kt_bl);
  }
};

const ensureBlacklistFilter = () => {
  const bl = new Set(store.get('kt-blacklist', []));
  sel('.post-card[data-user]', true).forEach(card => {
    if (bl.has(card.getAttribute('data-user'))) {
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
  sel('.dm-card__content, .post__content', true).forEach(obj => {
    if (obj.dataset.ktLinkified) return;
    obj.dataset.ktLinkified = '1';
    linkify(obj);
  });
};

/*
-> Scheduler: coalesce observer bursts into one pass per frame
*/
let scheduled = false;
const applyAll = () => {
  scheduled = false; // set first so mutations during the pass schedule the next one
  try {
    ensureSidebar();
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