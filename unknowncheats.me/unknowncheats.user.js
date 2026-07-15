// ==UserScript==
// @name         UnknownCheats OLED
// @author       ryouzue
// @description  OLED dark theme for unknowncheats.me, styled after sub.ryuo.to
// @version      0.2.0
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

/* == Base ================================================== */
html, body {
  background: var(--bg) !important;
  color: var(--fg) !important;
  font-family: var(--font) !important;
}

body, td, th, p, li, div, span, .shade, .smallfont, .time {
  color: var(--fg) !important;
  font-family: var(--font) !important;
}

h1, h2, h3, h4, .blockhead, .title {
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

/* == Kill skin gradients / images ========================== */
body, .body_wrapper, #header, .header, .navbar, .navtabs, .navtab,
.blockhead, .blockbody, .blockfoot, .block_row, .forumbit_post, .forumrow,
.threadbit, .postbit, .postbitlegacy, .postbit_legacy, .postcontainer, .postrow,
.tborder, .tcat, .thead, .tfoot, .alt1, .alt2, .panel, .footer, #footer,
.pagination, .below_body, .above_body, .toplinks, .cms_widget {
  background-image: none !important;
  text-shadow: none !important;
  box-shadow: none !important;
}

/* == Structure ============================================= */
.body_wrapper, .above_body, .below_body, #content, .page {
  background: var(--bg) !important;
}

#header, .header, .above_body, .toplinks, #breadcrumb, .breadcrumb, .navbit {
  background: var(--bg) !important;
  border: none !important;
}

/* header banner image — hidden as in the original */
#headerImage, .logo-image, #header img[src*="header"] {
  display: none !important;
}

/* == Navigation ============================================ */
.navbar, .navtabs, #navbar {
  background: var(--bg2) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
}

.navtab, .navtabs li a, .navbar a.navtab {
  background: transparent !important;
  color: var(--dim) !important;
  border: none !important;
}

.navtab:hover, .navtabs li a:hover, .navtab.selected, .navtabs li.selected a {
  background: var(--accent-soft) !important;
  color: var(--fg) !important;
  border-radius: var(--radius) !important;
}

/* == Blocks / forum + thread lists ========================= */
.blockhead, .tcat, .thead, .block_row.blockhead {
  background: var(--bg2) !important;
  color: var(--fg) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) var(--radius) 0 0 !important;
  font-family: var(--font-display) !important;
}

.blockbody, .blockrow, .block_row, .forumbit_post, .forumrow, .threadbit,
.tborder, .alt1, .alt2, .panel {
  background: var(--bg2) !important;
  color: var(--fg) !important;
  border-color: var(--line) !important;
}

.alt2, tr.alt2 td { background: var(--bg3) !important; }

.forumbit_post:hover, .threadbit:hover, tr.threadbit:hover td {
  background: var(--accent-soft) !important;
}

.forumhead, .foruminfo .forumtitle a, .threadinfo .title, .threadtitle a {
  color: var(--fg) !important;
  font-weight: 600 !important;
}

/* == Posts ================================================= */
.postbit, .postbitlegacy, .postbit_legacy, .postcontainer, .postrow, .eventbit {
  background: var(--bg2) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
}

.userinfo, .postdetails, .posthead {
  background: transparent !important;
  border-color: var(--line) !important;
}

.username, .username_container a, a.username {
  color: var(--accent) !important;
  font-weight: 600 !important;
}

.postbody, .postcontent, .content, .post_message, blockquote, .bbcode_container {
  color: var(--fg) !important;
}

blockquote, .quote_container, .bbcode_quote, code, .bbcode_code {
  background: var(--bg3) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
}

/* == Links ================================================= */
a, a:link { color: var(--accent) !important; }
a:visited { color: var(--accent) !important; filter: brightness(.85); }
a:hover, a:active, a:focus { color: var(--fg) !important; filter: brightness(1.15); }

/* == Forms ================================================= */
input, textarea, select, .textbox, .bginput, .primary_content_area input {
  background: var(--bg3) !important;
  color: var(--fg) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
  outline: none !important;
  padding: 6px 8px !important;
}

input:focus, textarea:focus, select:focus, .textbox:focus {
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 3px var(--accent-glow) !important;
}

/* error / alert messaging */
.error, .errorblock, .blockrow.error, .std_error, .alert {
  color: var(--danger) !important;
  border-color: var(--danger) !important;
}

button, input[type='button'], input[type='submit'], input[type='reset'],
.button, a.button, .newcontent_textcontrol {
  background: var(--accent-soft) !important;
  color: var(--fg) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
  cursor: pointer !important;
}

button:hover, input[type='submit']:hover, .button:hover, a.button:hover {
  background: var(--accent) !important;
  color: var(--accent-ink) !important;
  border-color: var(--accent) !important;
}

/* == Pagination ============================================ */
.pagination a, .pagination span.selected a, .threadpagenav a {
  background: var(--bg3) !important;
  color: var(--fg) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
}

.pagination span.selected a, .pagination a:hover {
  background: var(--accent) !important;
  color: var(--accent-ink) !important;
  border-color: var(--accent) !important;
}

/* == Tables (legacy vB) ==================================== */
table, tbody, tr, td { background-color: transparent !important; border-color: var(--line) !important; }

/* == Footer ================================================ */
#footer, .footer, .footer_block {
  background: var(--bg) !important;
  color: var(--dim) !important;
  border-top: 1px solid var(--line) !important;
}

/* == Misc ================================================== */
.popupmenu .popupbody, .vbmenu_popup, .memberaction_body {
  background: var(--bg2) !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius) !important;
}

hr { border-color: var(--line) !important; }
.smallfont, .time, .shade { color: var(--dim) !important; }
`);
