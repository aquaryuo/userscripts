// ==UserScript==
// @name         UnknownCheats OLED
// @author       ryouzue
// @description  OLED dark theme for unknowncheats.me, styled after sub.ryuo.to
// @version      0.3.0
// @match        https://*.unknowncheats.me/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=unknowncheats.me
// @updateURL    https://raw.githubusercontent.com/aquaryuo/userscripts/main/unknowncheats.me/unknowncheats.user.js
// @downloadURL  https://raw.githubusercontent.com/aquaryuo/userscripts/main/unknowncheats.me/unknowncheats.user.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

console.clear();

// eslint-disable-next-line
GM_addStyle(`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');

/* ============================================================
   Unified palette — sub.ryuo.to "OLED Black"
   Shared across all userscripts; change --accent to re-brand.
   ============================================================ */
:root {
  --bg:   #000000;
  --bg2:  #0c0c0e;
  --bg3:  #17171b;
  --fg:   #f2f2f3;
  --dim:  #8a8a92;
  --line: #1c1c22;

  --accent:      #3b82f6;
  --accent-ink:  #ffffff;
  --accent-soft: rgba(59, 130, 246, 0.16);
  --accent-glow: rgba(59, 130, 246, 0.35);

  --danger: #f4607a;

  --radius: 6px;
  --font:         'Poppins', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Space Grotesk', 'Poppins', ui-sans-serif, system-ui, sans-serif;
}

/* == Base ==================================================
   unknowncheats runs vBulletin 3, so the structural hooks are
   .tborder/.tcat/.thead/.tfoot and the .alt1/.alt2 row classes —
   not the vB4 .blockhead/.postbit family.
   ========================================================== */
html, body {
  background: var(--bg) !important;
  color: var(--fg) !important;
  font-family: var(--font) !important;
}

body, td, th, p, li, div {
  font-family: var(--font) !important;
}

h1, h2, h3, h4, .navbar strong {
  font-family: var(--font-display) !important;
  letter-spacing: -0.01em;
}

a, button, input, select, textarea {
  transition: background-color .16s ease, color .16s ease, border-color .16s ease, box-shadow .16s ease;
}

::selection { background: var(--accent); color: var(--accent-ink); }

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--bg3); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

/* == Kill skin gradients and background images ============= */
body, .page, .tborder, .tcat, .thead, .tfoot, .alt1, .alt1Active, .alt2, .alt,
.navbar, .vbmenu_popup, .vbmenu_control, .panel, .panelsurround, .spacer, .border {
  background-image: none !important;
  text-shadow: none !important;
  box-shadow: none !important;
}

/* == Page shell ============================================ */
.page, .spacer, .border {
  background: var(--bg) !important;
  color: var(--fg) !important;
}

/* banners and ad slots */
#bannerImage, #bannerRepeat, #headerImage, #forumbanner, #forumbannerx,
.ad_row, .fuse-slot, [class*='content-showcase'] {
  display: none !important;
}

/* == Tables: the vB3 skeleton ============================== */
.tborder {
  background: var(--line) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
}

.tcat {
  background: var(--bg2) !important;
  color: var(--fg) !important;
  font-family: var(--font-display) !important;
  font-weight: 600 !important;
  border: none !important;
}

.tcat a, .tcat a:link, .tcat a:visited { color: var(--fg) !important; }

.thead {
  background: var(--bg2) !important;
  color: var(--fg) !important;
  font-weight: 600 !important;
  border: none !important;
}

.thead a, .thead a:link, .thead a:visited { color: var(--accent) !important; }

.tfoot {
  background: var(--bg2) !important;
  color: var(--dim) !important;
  border: none !important;
}

.tfoot a, .tfoot a:link, .tfoot a:visited { color: var(--dim) !important; }

/* alternating rows — .alt1Active is the "unread / active" variant */
.alt1, .alt {
  background: var(--bg2) !important;
  color: var(--fg) !important;
}

.alt2 {
  background: var(--bg3) !important;
  color: var(--fg) !important;
}

.alt1Active {
  background: var(--accent-soft) !important;
  color: var(--fg) !important;
}

/* == Navigation ============================================ */
#navbar, .navbar {
  background: var(--bg2) !important;
  color: var(--fg) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
}

#navbar a, .navbar a { color: var(--accent) !important; }

#breadcrumb, #breadcrumb .alt1, #breadcrumb .alt2 {
  background: transparent !important;
  border: none !important;
}

.vbmenu_control {
  background: var(--bg3) !important;
  color: var(--fg) !important;
  border-radius: var(--radius) !important;
}

.vbmenu_control a, .vbmenu_control a:link { color: var(--fg) !important; }

.vbmenu_popup {
  background: var(--bg2) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
}

.vbmenu_option, .vbmenu_option a {
  background: transparent !important;
  color: var(--fg) !important;
}

.vbmenu_option:hover, .vbmenu_hilite {
  background: var(--accent-soft) !important;
  color: var(--fg) !important;
}

/* forum-jump depth rows */
.fjdpth0, .fjdpth1, .fjdpth2, .fjdpth3 {
  background: var(--bg2) !important;
  color: var(--fg) !important;
}

.fjsel {
  background: var(--accent-soft) !important;
  color: var(--fg) !important;
}

/* == Posts ================================================= */
.bigusername {
  color: var(--accent) !important;
  font-weight: 600 !important;
  font-size: 1.05em !important;
}

.info { color: var(--dim) !important; }

.fixedsig {
  color: var(--dim) !important;
  border-top: 1px solid var(--line) !important;
  padding-top: 6px !important;
}

/* quotes and code blocks live in nested tables on vB3 */
.alt2 .alt1, .alt1 .alt2, div.smallfont + table .alt2 {
  border-radius: var(--radius) !important;
}

/* == Links ================================================= */
a, a:link { color: var(--accent) !important; }
a:visited { color: var(--accent) !important; filter: brightness(.85); }
a:hover, a:active, a:focus { color: var(--fg) !important; }

/* == Muted text ============================================ */
.smallfont, .time, .shade {
  color: var(--dim) !important;
}

.smallfont a, .time a { color: var(--accent) !important; }

/* == Forms ================================================= */
/* positive allow-list, not a :not() chain — six chained :not()s scored (0,6,1)
   and beat input[type='submit'] (0,1,1) and input:focus, so submit buttons
   rendered as text fields and focus rings never showed */
input:not([type]), input[type='text'], input[type='password'], input[type='search'],
input[type='email'], input[type='url'], input[type='tel'], input[type='number'],
input[type='date'], input[type='datetime-local'],
textarea, select, .bginput {
  background: var(--bg3) !important;
  color: var(--fg) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
  outline: none !important;
  padding: 6px 8px !important;
}

input:focus, textarea:focus, select:focus, .bginput:focus {
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 3px var(--accent-glow) !important;
}

/* checkbox / radio -> themed accent controls */
input[type='checkbox'], input[type='radio'] {
  appearance: none !important;
  -webkit-appearance: none !important;
  width: 15px !important;
  height: 15px !important;
  margin: 0 6px 0 0 !important;
  vertical-align: -2px !important;
  background: var(--bg3) !important;
  border: 1px solid var(--accent) !important;
  cursor: pointer !important;
  position: relative !important;
}
input[type='checkbox'] { border-radius: 3px !important; }
input[type='radio'] { border-radius: 50% !important; }
input[type='checkbox']:checked, input[type='radio']:checked { background: var(--accent) !important; }
input[type='checkbox']:checked::after {
  content: '' !important; position: absolute !important;
  left: 4px !important; top: 1px !important; width: 4px !important; height: 8px !important;
  border: solid #fff !important; border-width: 0 2px 2px 0 !important; transform: rotate(45deg) !important;
}
input[type='radio']:checked::after {
  content: '' !important; position: absolute !important;
  left: 50% !important; top: 50% !important; width: 6px !important; height: 6px !important;
  border-radius: 50% !important; background: #fff !important; transform: translate(-50%, -50%) !important;
}

button, input[type='button'], input[type='submit'], input[type='reset'], .button {
  background: var(--accent-soft) !important;
  color: var(--fg) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
  padding: 5px 12px !important;
  cursor: pointer !important;
}

button:hover, input[type='submit']:hover, input[type='button']:hover, .button:hover {
  background: var(--accent) !important;
  color: var(--accent-ink) !important;
  border-color: var(--accent) !important;
}

/* == Pagination ============================================ */
.pagenav, .pagenav a, .pagenav td {
  background: var(--bg2) !important;
  color: var(--fg) !important;
  border-color: var(--line) !important;
}

.pagenav a:hover, .pagenav .alt1Active {
  background: var(--accent) !important;
  color: var(--accent-ink) !important;
}

/* == Consent / third-party overlays ======================== */
.qc-cmp2-container, .qc-cmp2-main, .qc-cmp2-summary-section, .qc-cmp2-footer {
  background: var(--bg2) !important;
  color: var(--fg) !important;
}

/* == Legacy inline colours =================================
   vB3 posts carry inline style="color: black" (~91 on a thread) and a few
   <font color> tags. Only the near-black / navy ones are unreadable on OLED —
   gold, orange, cyan and the like are left alone so semantic colour survives.
   ========================================================== */
[style*="color: black" i], [style*="color:black" i],
[style*="color: #000000" i], [style*="color:#000000" i],
[style*="color: navy" i], [style*="color:navy" i],
[style*="color: #000080" i], [style*="color:#000080" i],
[style*="color: #26353F" i], [style*="color:#26353F" i],
[style*="color: #2F4F4F" i], [style*="color:#2F4F4F" i],
[style*="color: #181B16" i], [style*="color:#181B16" i],
font[color="navy" i], font[color="black" i], font[color="#000000" i] {
  color: var(--fg) !important;
}

/* dark red marker -> the palette's danger red, so it stays red and readable */
[style*="color: #AD0000" i], [style*="color:#AD0000" i] {
  color: var(--danger) !important;
}

/* the site's "bold green" marker is #2d7009 — too dark on OLED, so lift it to a
   readable green rather than flatten it to plain foreground */
[style*="color: #2d7009" i], [style*="color:#2d7009" i] {
  color: #4ade80 !important;
}

/* == Light surfaces the site CSS still paints ============== */
table { background-color: transparent !important; }

div.info, #presence-container, .presence-contents {
  background: var(--bg2) !important;
  color: var(--fg) !important;
  border-color: var(--line) !important;
}

/* == Misc ================================================== */
hr { border-color: var(--line) !important; }

fieldset, .panel, .panelsurround {
  background: var(--bg2) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
  color: var(--fg) !important;
}

legend {
  background: transparent !important;
  color: var(--dim) !important;
}
`);
