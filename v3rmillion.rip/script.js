/*
--> JS
*/

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    var icons = document.querySelectorAll('.posticons_label img, td[class*=\'forumdisplay_\'] img[src*=\'images/icons\']');
    icons.forEach((icon, i) => {
      icon.src = 'https://nya.onish.dev/scr/v3rmillion.rip/_icons/' + icon.alt.toLowerCase().replace(/[ \t]/g, '_') + '.png';
    })
  }
};

/* 
--> CSS
*/

const theme = `
* {
  --dst-primary-background: #111111;
  --dst-secondary-background: #161616;
  /* */
  --dst-accent-color: #404040;
  --dst-accent-link: #979797;
  --dst-accent-button: #424242;
  /* */
  --dst-thread-unseen: #9a9a9a;
  --dst-thread-visited: #727272;
  --dst-thread-author: #606060;
  /* */
  --dst-font-color: #c6c6c6;
}

body {
  background: var(--dst-primary-background);
  min-height: 100vh;
}

input[type='radio'],
input[type='checkbox'] {
  position: relative;
  color: var(--dst-thread-visited);
  /* */
  appearance: none;
  background: transparent;
  /* */
  height: 1.15em;
  width: 1.15em;
  /* */
  border-radius: 3px;
  margin: 0 5px;
  /* */
  border: 0.15em solid var(--dst-accent-link);
  transform: translateY(0.075em);
  /* */
  overflow: hidden;
}

input[type='radio']:after,
input[type='checkbox']:after {
  content: '';
  display: block;
  /* */
  transition: 0.1s ease-in-out;
}

input[type='radio']:checked:after,
input[type='checkbox']:checked:after {
  content: '';
  /* */
  width: 100%;
  height: 100%;
  /* */
  background: var(--dst-thread-unseen);
}

input[type='radio']:checked {
  background: red !important;
  transform: scale(1);
}

input:hover, button:hover, a:hover, #quick_reply_submit {
  filter: brightness(1.2);
}

blockquote, textarea {
  background: var(--dst-secondary-background) !important;
}

input.textbox:focus, textarea:focus {
  box-shadow: unset !important; /* 0 0 10px var(--dst-font-color); */
}

html, body, p, code::before, table, textarea {
  color: var(--dst-font-color) !important;
}

blockquote cite {
  border-bottom: 1px solid var(--dst-accent-color) !important;
  width: fit-content !important;
}

.error {
  background: var(--dst-secondary-background) !important;
  color: var(--dst-font-color) !important;
}

.postbit_buttons a, input.button, .sceditor-button,
a.button:link, a.button:visited, a.button:active {
  background: var(--dst-accent-button) !important;
  transition: 0.2s ease-in-out !important;
}

.cRem:has(a) a:link, .cRem:has(a) a:visited {
  color: var(--dst-accent-link) !important;
  transition: 0.2s ease-in-out !important;
}

#header:has(#logo) {
  display: none;
}

#bridge, #wrapper, #content, .navigation, #footer, .tborder, .trow1, .trow2, .profile_header, .post_author, .author_statistics, .tfoot, ul.bottommenu, a.postlink,
.post_content div[style="display:inline-block;"] div, .trow_sep, ul.menu li ul li a:link, ul.menu li ul li a:visited, .post_controls, .thread_head, .sceditor-toolbar, .sceditor-group,
.sceditor-container, .sceditor-container textarea, .buttons:hover {
  background: none !important;
}

#content, .navigation, a.button:link, .profile_header, .post_author, .postlink, .postbit_buttons a:link, .buttons, input.button, .pagination a, .sceditor-container, .sceditor-toolbar,
.sceditor-group, .sceditor-button, blockquote, .trow1, .trow2 {
  border: unset !important;
}

.tborder .thead {
  background: var(--dst-secondary-background) !important;
}

#bridge, .thread_head {
  border-bottom: 3px solid var(--dst-accent-color) !important;
}

#footer, ul.menu li ul, .panel_buttons, #rating_result_wrapper span {
  border-top: 3px solid var(--dst-accent-color) !important;
}

.inline_row a {
  color: var(--dst-thread-unseen) !important;
}

.inline_row a:visited {
  color: var(--dst-thread-visited) !important;
}

.inline_row .author a {
  color: var(--dst-thread-author) !important;
}

img[alt='Vip'], img[alt='Elite'] {
  display: none !important;
}

.post_head {
  border-top: 15px solid transparent !important;
}

.red_alert {
  background: var(--dst-accent-button) !important;
  transition: 0.2s ease-in-out !important;
}

.red_alert:hover {
  background: var(--dst-accent-color) !important;
}

.forum_on {
  color: var(--dst-accent-color) !important;
}

.pagination a {
  background: var(--dst-accent-button) !important;
}

.inline_row td, .tborder tr:has(.trow1), .tborder tr:has(.trow2) {
  min-height: 20px;
}

div.float_left {
  padding-bottom: 10px;
}

ul.menu li ul, .panel_buttons {
  background: var(--dst-accent-color);
  filter: brightness(0.6);
}

#rating_result_wrapper #positive {
  background-color: #acacac !important;
}

#rating_result_wrapper #negative {
  background-color: transparent !important;
}

.sceditor-toolbar {
  padding: 6px 0 !important;
  border-radius: unset !important;
  /* */
  display: flex;
  flex-direction: row;
  /* */
  align-items: center;
  padding-left: 12px !important;
  /* */
  column-gap: 8px;
}

.sceditor-group {
  padding: unset !important;
  margin: unset !important;
  /* */
  display: flex !important;
  column-gap: 2px;
}

.sceditor-button {
  padding: 5px 8px !important;
}

.usercp_nav_item::before {
  color: var(--dst-accent-link) !important;
}

.thread_status {
  background-size: cover;
}

.posticons_label img {
  margin-bottom: -3px !important;
}

/* Official icons */

.posticons_label img,
td[class*='forumdisplay_'] img {
  height: 22px;
}

/* Replace thread status icons */

.folder, .hotfolder, .newfolder, .dot_newfolder, .newhotfolder, .dot_hotfolder  {
  background-position: unset !important;
}

.thread_status.dot_folder, .thread_status.dot_newfolder {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/dot_folder.png') !important;
}

.thread_status.folder {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/folder.png') !important;
}

.thread_status.dot_hotfolder {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/dot_hotfolder.png') !important;
}

.thread_status.hotfolder {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/hotfolder.png') !important;
}

.thread_status.newfolder {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/newfolder.png') !important;
}

.thread_status.newhotfolder {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/newhotfolder.png') !important;
}

.thread_status.hotclosefolder {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/hotclosefolder.png') !important;
}

.thread_status.closefolder {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/closefolder.png') !important;
}

tr:has(em) td[class*='forumdisplay_'] .thread_status {
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/bin.png') !important;
}

td[class*='forumdisplay_'] span a img {
  display: none;
}

td[class*='forumdisplay_'] span:has(img) {
  display: flex;
  column-gap: 5px;
}

td[class*='forumdisplay_'] a:has(img) {
  display: block;
  width: 18px;
  /* */
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/arrow_right.png');
  background-repeat: no-repeat;
  background-size: cover;
}

td[class*='forumdisplay_'] span:has(img) .smalltext {
  margin-top: 2px;
}

form[action*='newthread.php'] div:has(input[name='previewpost']) {
  padding-bottom: 16px;
}

.quick_jump {
  padding-left: 20px;
  margin: unset !important;
  /* */
  background-image: url('https://nya.onish.dev/scr/v3rmillion.rip/_icons/arrow_right.png') !important;
  background-size: cover;
}

.author_information a[title='Online'],
.author_information img[title='Offline'] {
  display: none;
}

/*
.author_avatar img {
  border-left: 3px solid grey !important;
}

/* Classic view */

.post.classic .post_author {
  width: 12em !important;
}

.post.classic .post_content {
  float: none !important;
  min-width: 320px !important;
  width: unset !important;
  margin-left: 15em !important;
}

*/

/*
=== BAN PAGE ===

body {
  min-height: 96vh;

  display: flex;
  justify-content: center;
  align-content: center;
}

body div.bg[align=center] {
  background: var(--dst-accent-color);
  color: var(--dst-font-color);
}

.bgtd {
  color: #fd7a7a;
}
*/
`