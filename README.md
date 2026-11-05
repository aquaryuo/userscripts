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

| Folder | Script | Site | Version | Status | Install |
| ------ | ------ | ---- | ------- | ------ | ------- |
| [`kemono.su/`](kemono.su/) | Kemono Tools | kemono.su / kemono.cr | 0.4.6 | Stable | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/kemono.su/kemono.user.js) |
| [`bilibili.com/`](bilibili.com/) | Bilibili Fixes | bilibili.com | 0.1.2 | Stable | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/bilibili.com/bilibili.user.js) |
| [`rule34.xxx/`](rule34.xxx/) | Dark Theme | rule34.xxx | 0.1.11 | Stable | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/rule34.xxx/rule34.user.js) |
| [`unknowncheats.me/`](unknowncheats.me/) | UnknownCheats OLED | unknowncheats.me | 0.3.1 | Stable | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/unknowncheats.me/unknowncheats.user.js) |
| [`miruro.to/`](miruro.to/) | ws.ryuo.to Sync | miruro.* + ws.ryuo.to | 0.1.1 | Unverified | [![Install](https://img.shields.io/badge/DOWNLOAD-3b82f6?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/aquaryuo/userscripts/main/miruro.to/miruro.user.js) |
| [`youtube.com/`](youtube.com/) | Palette seed | youtube.com | 0.1.5 | Seed | ![Seed](https://img.shields.io/badge/SEED-6b7280?style=for-the-badge) |
| [`v3rmillion.rip/`](v3rmillion.rip/) | Dark Theme | ~~v3rmillion.rip~~ | 0.1.5 | Deprecated | ![Deprecated](https://img.shields.io/badge/DEPRECATED-6b7280?style=for-the-badge) |

**Status** — *Stable*: in use and validated against the live site. *Unverified*: functional but
not yet checked against the real markup. *Seed*: only declares the shared palette, applies no
visible styling yet (`youtube.com` — no install button). *Deprecated*: site offline, kept for
archival.

`kemono.su/` is the most fully-featured (theme + collapsible sidebar + per-creator
blacklist + URL linkifier) and has its own [README](kemono.su/README.md); the rest are
primarily CSS themes.

`miruro.to/` syncs watch progress between ws.ryuo.to and Miruro, for members who'd rather not log
in to AniList or MAL on Miruro. It needs a ws.ryuo.to account. Data only moves while each site is
open: ws.ryuo.to progress appears in Miruro's Watch History on Miruro's next page load, and Miruro
progress reaches your account the next time you open ws.ryuo.to, so an outage or a sleeping tab
only delays it. A small button on each site, styled to match that site, opens your full list and
shows what's still waiting and when each site last ran.

Miruro's own code looks up synced series by AniList ID, so its API sees which series you've synced.
The script treats one browser profile as one member. The first sync reads the newest 20 pages of
your ws.ryuo.to history, so older episodes only appear if you rewatch them, and anything watched on
Miruro before you installed the script stays on Miruro. Run `node miruro.to/check.mjs` after
changing it.

Assets for each script live in that folder's `_icons/`. Most loaders (`*.user.js`) pull their
behavior/theme from this repo via `@require` (unknowncheats and miruro are self-contained). All active
scripts self-update through GitHub raw, so pushing here publishes the update.
