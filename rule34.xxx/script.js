/*
--> JS
*/

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    if(window.location.pathname === '/') {
      // Index
      const static__index = document.querySelector('#static-index');
    
      // Replace p with div for index-header
      const index__header = document.querySelector('.index-header');
      const new__index__header = document.createElement('div');
      new__index__header.className = 'index-header';
    
      index__header.parentNode.replaceChild(new__index__header, index__header);
    
      // Add image with redirect to index-header
      const redirect = document.createElement('a');
      redirect.href = '/index.php?page=post&s=list&tags=all';
    
      const image = document.createElement('img');
      image.src = 'https://nya.onish.dev/scr/rule34.xxx/_icons/gate-duo.png'; // https://nya.onish.dev/~/ooqkx.png
      image.alt = 'A bountiful waifu scrapped by- theme author';
    
      new__index__header.appendChild(redirect);
      redirect.appendChild(image);
    
      // Create a new search-header to replace old
      const search__index__form = document.querySelector('.space form');
      const new__search__index = document.createElement('div');
      new__search__index.id = 'search-index';
    
      static__index.appendChild(new__search__index);
      new__search__index.appendChild(search__index__form);
    
      const old__search__index = document.querySelector('.space');
      old__search__index.remove();
    
      // Assign a class to search-index to recognize it is home
      new__search__index.className = 'home';
    
      // Change order
      new__search__index.style.order = 1;
      new__index__header.style.order = 2;
    } else {
      // After Index
    
      // Define search-index class as on homepage
      const search__index = document.querySelector('.tag-search');
      search__index.id = 'search-index';
    
      // Move search index to navigation bar
      const navbar = document.querySelector('#site-title');
      navbar.appendChild(search__index);
    }
  }
};

/*
--> CSS
*/

const theme = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  /* Unified palette — sub.ryuo.to "OLED Black" (change --accent to re-brand) */
  --accent: #3b82f6;
  /* */
  --tag-general: #9ab9ba;
  --tag-metadata: #c059c1;
  --tag-character: #87cddd;
  --tag-artist: #c387dd;
  --tag-copyright: #dd9887;
  /* */
  --background: #000000;
  --background-search: #17171b;
  --background-button: var(--background);
  /* */
  --font-color: #f2f2f3;
  --dim: #8a8a92;
  --link-color: var(--accent);
  --link-visited: #ddaf87;
  /* */
  --search-mark: var(--accent);

  /* Refer change to ALL */
  font-family: 'Roboto', sans-serif !important;
  font-weight: 400 !important;
}

/* hide ads */
.horizontalFlexWithMargins,
div[data-nosnippet=""],
span[data-nosnippet=""] {
  display: none !important;
}

/* rest to hide */
div#header ul#subnavbar,
.tag-search h5:nth-child(1),
#navbar li:nth-child(3),
#navbar li:nth-child(4),
#navbar li:nth-child(5),
#navbar li:nth-child(6),
#navbar li:nth-child(7),
#navbar li:nth-child(8),
#navbar li:nth-child(9),
#navbar li:nth-child(10),
#navbar li:nth-child(11),
#navbar li:nth-child(12),
#navbar li:nth-child(13),
#navbar li:nth-child(14),
#tag-sidebar li[class*='tag-'] a:nth-child(1),
.sidebar div:nth-child(4) h5:nth-child(1),
.sidebar div:nth-child(4) img:nth-child(3),
.sidebar div:nth-child(3) h5:nth-child(1),
.sidebar div:nth-child(3) h5:nth-child(2),
.sidebar div:nth-child(3) ul:not(#tag-sidebar),
div.horizontalFlexWithMargins:nth-child(8),
#tag-sidebar li .tag-count,
#rlsubmenu, img[src*='r34chibi.png'] {
  display: none !important;
}

/* Navbar */
#site-title {
  background-image: unset !important;
  /* */
  display: flex !important;
  flex-direction: row !important;
  column-gap: 40px !important;
  align-items: center !important;
}

#site-title a {
  color: var(--accent) !important;
  /* */
  font-size: 28px !important;
  letter-spacing: 2px !important;
  font-weight: 800 !important;
  /* */
}

#header, #subnavbar {
  background: var(--background) !important;
}

#header li {
  background: unset !important;
}

.current-page {
  background-image: unset !important;
  border-bottom: 2px solid var(--accent) !important;
}

#header {
  background: var(--background) !important;
}

#rlmainmenu.tlabel {
  background-image: url('https://nya.onish.dev/scr/rule34.xxx/_icons/arrow-down.png') !important;
  background-size: 40px !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  filter: invert(1) !important;
}

/* General */
body {
  background: var(--background) !important;
  color: var(--font-color) !important; /* site defaults body text to #000 -> black-on-black without this */
}

a, b, i, p, h1, h2, h3, h4, h5 {
  color: var(--font-color) !important;
}

a:link {
  color: var(--link-color) !important;
}

a:visited {
  color: var(--link-color) !important;
  filter: brightness(1.2) !important;
}

label {
  color: var(--accent) !important;
}

ul {
  color: grey !important;
}

textarea {
  background: var(--background-search) !important;
  /* */
  outline: unset !important;
  border: unset !important;
  /* */
  color: var(--font-color) !important;
}

form[action='index.php?page=account&s=options'] .awesomplete ul {
  margin-top: unset !important;
}

tr td input {
  background: var(--background-search) !important;
  /* */
  outline: unset !important;
  border: unset !important;
  border-bottom: 1px solid transparent !important;
  /* */
  color: var(--font-color) !important;
  transition: 0.1s ease-in-out !important;
}

tr td input[type='text']:hover,
tr td input[type='text']:focus {
  background: unset !important;
  /* */
  border-bottom: 1px solid var(--accent) !important;
}

/* Tagged */
.sidebar {
  max-width: unset !important;
}

.sidebar div {
  margin-top: 12px !important;
  width: 160px !important;
}

#tag-sidebar li[class*='tag-'] a {
  color: inherit !important;
}

.tag-type-general,
.tag-type-general.tag {
  color: var(--tag-general) !important;
}

.tag-type-metadata,
.tag-type-metadata.tag {
  color: var(--tag-metadata) !important;
}

.tag-type-character,
.tag-type-character.tag {
  color: var(--tag-character) !important;
}

.tag-type-artist,
.tag-type-artist.tag {
  color: var(--tag-artist) !important;
}

.tag-type-copyright,
.tag-type-copyright.tag {
  color: var(--tag-copyright) !important;
}

#tag-sidebar li a {
  font-size: 14px !important;
  font-weight: 300 !important;
}

#tag-sidebar li h6 {
  margin-top: 8px !important;
  margin-bottom: 2px !important;
  /* */
  font-size: 16px !important;
  font-weight: 700 !important;
}

#tag-sidebar li h6,
#tag-sidebar li a[rel='nofollow'] {
  color: var(--accent) !important;
}

/* Search */
.thumb.blacklisted-image {
  display: none !important;
}

#search-index,
#search-index .awesomplete,
.awesomplete {
  width: unset !important;
  padding: unset !important;
}

#search-index.home form {
  display: flex !important;
  flex-direction: row !important;
  column-gap: 16px !important;
  margin-left: 32px !important;
}

#search-index.home form ul {
  text-align: left !important;
}

#search-index .awesomplete input {
  background: var(--background-search) !important;
  font-size: 14px !important;
  /* */
  border: unset !important;
  border-bottom: 1px solid var(--accent) !important;
  border-radius: 3px !important;
  outline: unset !important;
  padding: 4px 6px !important;
  width: 240px !important;
  /* */
  color: var(--font-color) !important;
  filter: brightness(0.9) !important;
}

#search-index .awesomplete ul,
.awesomplete ul {
  background: var(--background-search) !important;
  /* */
  margin-top: 32px !important;
  border-radius: 4px !important;
  max-width: 160px !important;
  /* */
  font-size: 14px !important;
}

#search-index .awesomplete ul:before,
.awesomplete ul:before {
  display: none !important;
}

#search-index .awesomplete li,
.awesomplete li {
  border-bottom: 2px solid transparent !important;
  width: 224px !important;
}

#search-index .awesomplete li:hover,
#search-index .awesomplete li:active,
.awesomplete li:hover, .awesomplete li:active {
  border-bottom: 2px solid var(--accent) !important;
  background: unset !important;
}

#search-index .awesomplete mark,
.awesomplete mark {
  background: var(--search-mark) !important;
}

#search-index input[type='submit'] {
  background: var(--background-button) !important;
  /* */
  border-bottom: 1px solid transparent !important;
  border-top: 1px solid transparent !important;
  border-radius: 3px !important;
  padding: 4px 16px !important;
  /* */
  width: unset !important !important;
  border: unset !important;
  margin: unset !important;
  /* */
  transition: 0.1s ease-in-out !important;
  color: var(--font-color) !important;
  cursor: pointer !important;
}

#search-index form div {
  display: flex !important;
  flex-direction: row !important;
  column-gap: 16px !important;
}

#search-index input[type='submit']:hover,
#search-index input[type='submit']:active {
  background: transparent !important;
  border-bottom: 1px solid var(--accent) !important;
  border-top: 1px solid var(--accent) !important;
}

.manual-page-chooser input {
  background: var(--background-search) !important;
  /* */
  border: unset !important;
  border-bottom: 1px solid var(--accent) !important;
  border-radius: 3px !important;
  outline: unset !important;
  padding: 4px 6px !important;
  /* */
  color: var(--font-color) !important;
  filter: brightness(0.9) !important;
  transition: 0.1s ease-in-out !important;
}

.manual-page-chooser input:hover {
  border-bottom: 1px solid var(--accent) !important;
  filter: brightness(0.9) !important;
}

.manual-page-chooser input:nth-child(2) {
  border-top: 1px solid transparent !important;
  border-bottom: 1px solid transparent !important;
  /* */
  width: 40px !important;
  cursor: pointer !important;
}

.manual-page-chooser input:nth-child(2):hover {
  border-top: 1px solid var(--accent) !important;
  border-bottom: 1px solid var(--accent) !important;
}

/* Gallery */
.image-list .thumb {
  display: inline-block !important;
  text-align: center !important;
  vertical-align: top !important;
  /* */
  margin: 0 10px 10px 0 !important;
  /* */
  width: 300px !important;
  height: auto !important;
}

.image-list .thumb img {
  max-width: 100% !important;
  max-height: 100% !important;
}

.image-list img[alt*='video'] {
  border: unset !important;
  border-left: 2px solid var(--accent) !important;
  border-top: 2px solid var(--accent) !important;
}

/* Main Index "/" */
#static-index {
  height: 100vh !important;
  row-gap: 46px !important; /* 16px */
  justify-content: space-between !important;
}

body:has(#static-index) {
  height: 100vh !important;
  /* */
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

#static-index .index-header {
  margin: unset !important;
}

#static-index .index-header img {
  max-height: 400px !important;
}

#static-index p:nth-child(2),
#static-index #links,
#static-index div[style='font-size: 80%; margin-bottom: 2em;'],
#static-index div:nth-child(5) p:nth-child(1),
#static-index small {
  display: none !important;
}

/* Paginator */

#paginator b {
  font-size: 16px !important;
  /* */
  padding: 4px 9px !important;
  border: unset !important;
  border-right: 1px solid var(--accent) !important;
  border-left: 1px solid var(--accent) !important;
  /* */
  cursor: default !important;
}

#paginator a {
  font-size: 15px !important;
  /* */
  padding: 4px 9px !important;
  border: unset !important;
  border-bottom: 1px solid var(--accent) !important;
  /* */
  transition: 0.1s ease-in-out !important;
}

#paginator a:hover {
  background: unset !important;
}

/* Comment List */
#comment-list {
  color: var(--font-color) !important;
}

#comment-list .col1 b {
  color: grey !important;
}

#comment-list .col2 {
  color: lightgrey !important;
}

/* == Coverage fixes: elements rule34's own CSS colors that the base theme left unstyled == */

/* muted / count text the site paints pure black */
.tag-count, .obsolete-tag-change {
  color: var(--dim) !important;
}

/* generic buttons + submit/reset inputs (site paints them light green / white) */
button, input[type='submit'], input[type='button'], input[type='reset'], .gdprbutton button {
  background: var(--background-search) !important;
  color: var(--font-color) !important;
  border: 1px solid var(--accent) !important;
  border-radius: 3px !important;
  cursor: pointer !important;
  transition: 0.15s ease-in-out !important;
}

button:hover, input[type='submit']:hover, input[type='button']:hover,
input[type='reset']:hover, .gdprbutton button:hover {
  background: var(--accent) !important;
  color: #fff !important;
}

/* any remaining text inputs / selects (white bg on secondary forms + :focus) */
input:not([type]), input[type='text'], input[type='password'],
input[type='search'], input[type='number'], select {
  background: var(--background-search) !important;
  color: var(--font-color) !important;
  border: 1px solid transparent !important;
  border-bottom: 1px solid var(--accent) !important;
}

input:focus, textarea:focus, select:focus {
  background: var(--background-search) !important;
  color: var(--font-color) !important;
}

/* light info / alert / cookie-consent boxes -> dark surfaces */
.gdprcontainer, .gdprinner, .gdprtext,
div.has-mail, div.status-notice, div.notice, div.blocked,
div.auto_complete, div.auto_complete ul,
div#note-container > div.note-body, div#note-container > div.note-box,
div#note-container > div.unsaved, #edit-box {
  background: var(--background-search) !important;
  color: var(--font-color) !important;
  border-color: var(--accent) !important;
}

/* autocomplete suggestions (site paints list text dark blue) */
.awesomplete > ul > li, .awesomplete > ul > li a {
  color: var(--font-color) !important;
}

/* generic tables on secondary pages (history, records, edit) */
table th, table td {
  color: var(--font-color) !important;
}

table.highlightable td {
  border-color: var(--background-search) !important;
}

table.highlightable > tbody > tr:hover,
table tr.good, table tr.selected, table tr.highlight, table tr.pending-tag {
  background: var(--background-search) !important;
}

table tr:nth-child(odd) {
  background: rgba(255, 255, 255, 0.03) !important;
}

/* status/video thumb borders -> accent instead of raw blue/green */
.webm-thumb, img.video, img.has-children, img.has-parent, img.flagged, img.pending {
  border-color: var(--accent) !important;
}

/* edge pages (quotes, autocomplete mark, help code, tips banner, user records) */
div.quote {
  background: var(--background-search) !important;
  border-color: var(--accent) !important;
}

.awesomplete mark {
  color: #fff !important;
}

div.help div.code, div.help a.code {
  background: var(--background-search) !important;
  border-color: var(--accent) !important;
  color: var(--font-color) !important;
}

div.tips {
  background: var(--background-search) !important;
  border-bottom-color: var(--accent) !important;
  color: var(--font-color) !important;
}

div#user-record tr.positive-record, div#user-record tr.negative-record {
  background: var(--background-search) !important;
}
`