// ==UserScript==
// @name         Dark Theme
// @author       ryouzue
// @description  A dark theme for a certain site
// @version      0.1.0
// @match        https://*.unknowncheats.me/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=unknowncheats.me
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

console.clear();

var theme = `
html {
  --accent: #3e5294;
  /* */
  --background: #111;
  --font-color: #999;
}

table {
  background: var(--background);
  color: var(--font-color);
}

ul, li, a {
  list-style: none;
  text-decoration: none;
}

a {
  color: var(--accent);
}

/* Hide */
#headerImage {
  display: none;
}
`

// eslint-disable-next-line
GM_addStyle(theme);