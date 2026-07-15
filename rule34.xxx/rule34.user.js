// ==UserScript==
// @name         Dark Theme
// @author       ryouzue
// @description  A dark theme for a certain site
// @version      0.1.7
// @match        https://rule34.xxx/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rule34.xxx
// @updateURL    https://raw.githubusercontent.com/aquaryuo/userscripts/main/rule34.xxx/rule34.user.js
// @downloadURL  https://raw.githubusercontent.com/aquaryuo/userscripts/main/rule34.xxx/rule34.user.js
// @require      https://raw.githubusercontent.com/aquaryuo/userscripts/main/rule34.xxx/script.js?v=0.1.7
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

console.clear();

// eslint-disable-next-line
GM_addStyle(theme);