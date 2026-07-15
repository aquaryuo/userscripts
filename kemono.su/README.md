# Kemono Tools

A personal Tampermonkey userscript for the kemono archive site (`kemono.su` / `kemono.cr`):
a dark theme plus small utilities — a collapsible sidebar, a per-creator blacklist, and a
post-content URL linkifier.

## Files

| File        | Role                                                                          |
| ----------- | ----------------------------------------------------------------------------- |
| `module.js` | Userscript metadata + loader. **This is what you install** in Tampermonkey.   |
| `script.js` | All behavior + the CSS theme, pulled in via `@require`.                        |
| `_icons/`   | Image assets, mirrored at `https://nya.onish.dev/scr/kemono.su/_icons/`.       |

Both files are served from `https://nya.onish.dev/scr/kemono.su/`.

## Releasing

`@require` is cached by Tampermonkey keyed on the URL, so a changed `script.js` only
reaches installed clients when the loader itself updates. On every release, bump **both**:

- `@version` in `module.js`
- the `?v=` query on the `@require` line in `module.js` (keep it equal to `@version`)

Then deploy both files. Tampermonkey's update check sees the new `@version`, re-fetches
`module.js`, and the changed `?v=` forces a fresh `script.js`.

## Settings / storage

The blacklist (`kt-blacklist`) and sidebar state (`kt-maximize`) live in **GM storage**
(`GM_getValue` / `GM_setValue`), which is per-script and survives site domain moves — the
site has hopped `.party` → `.su` → `.cr`. Legacy values left in the site's `localStorage`
are migrated automatically on first read.

## History

Earlier standalone / rework variants (v0.3.7–v0.4.0 drafts) previously lived in `_alter/`
and `_reg/`. They were folded into git history and removed from the working tree; recover
any of them with `git show <commit>:<path>` (e.g. `git show HEAD~1:_alter/singlescript.js`).
