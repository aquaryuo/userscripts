# userscripts

Personal [Tampermonkey](https://www.tampermonkey.net/) userscripts — mostly OLED dark
themes plus small quality-of-life tweaks — for a handful of sites. Each site lives in its
own folder and shares one **unified palette** (sub.ryuo.to's "OLED Black": true-black
background, `#3b82f6` accent).

## Install

Click a **DOWNLOAD** button below. Because each file's URL ends in `.user.js`, Tampermonkey
intercepts it and opens its install page — confirm to install. (There's no `tmp://` scheme;
the `.user.js` path suffix is what triggers it.)

If a click doesn't prompt an install, use the fallback: Tampermonkey **Dashboard → Utilities
→ Install from URL**, and paste the same link. You need a userscript manager
(Tampermonkey / Violentmonkey) installed first.

| Folder | Script | Site | Version | Install |
| ------ | ------ | ---- | ------- | ------- |
| [`kemono.su/`](kemono.su/) | Kemono Tools | kemono.su / kemono.cr | 0.4.1 | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/kemono.su/kemono.user.js) |
| [`bilibili.com/`](bilibili.com/) | Bilibili Fixes | bilibili.com | 0.1.1 | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/bilibili.com/bilibili.user.js) |
| [`rule34.xxx/`](rule34.xxx/) | Dark Theme | rule34.xxx | 0.1.7 | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/rule34.xxx/rule34.user.js) |
| [`unknowncheats.me/`](unknowncheats.me/) | UnknownCheats OLED | unknowncheats.me | 0.2.0 | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/unknowncheats.me/unknowncheats.user.js) |
| [`youtube.com/`](youtube.com/) | YouTube Dark | youtube.com | 0.1.5 | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/youtube.com/youtube.user.js) |
| [`v3rmillion.rip/`](v3rmillion.rip/) | Dark Theme | ~~v3rmillion.rip~~ | 0.1.5 | ![Deprecated](https://img.shields.io/badge/DEPRECATED-6b7280?style=for-the-badge) |

`kemono.su/` is the most fully-featured (theme + collapsible sidebar + per-creator
blacklist + URL linkifier) and has its own [README](kemono.su/README.md); the rest are
primarily CSS themes. `v3rmillion.rip/` is retained for archival only — the site is offline.

Assets for each script live in that folder's `_icons/`. Most loaders (`*.user.js`) pull their
behavior/theme from this repo via `@require` (unknowncheats is self-contained inline). All active
scripts self-update through GitHub raw, so pushing here publishes the update.
