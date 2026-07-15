// ==UserScript==
// @name         Dark Theme
// @author       ahykono
// @description  A dark theme for a certain site
// @version      0.1.6
// @match        https://rule34.xxx/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rule34.xxx
// @updateURL    https://nya.onish.dev/scr/rule34.xxx/module.js
// @downloadURL  https://nya.onish.dev/scr/rule34.xxx/module.js
// @require      https://nya.onish.dev/scr/rule34.xxx/script.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

console.clear();

// eslint-disable-next-line
GM_addStyle(theme);