// ==UserScript==
// @name         Miruro x ws.ryuo.to Sync
// @author       ryouzue
// @description  Syncs watch progress between ws.ryuo.to and Miruro without logging in to AniList or MAL on Miruro
// @version      0.1.0
// @match        https://ws.ryuo.to/*
// @match        https://www.miruro.to/*
// @match        https://miruro.to/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=miruro.to
// @updateURL    https://raw.githubusercontent.com/aquaryuo/userscripts/main/miruro.to/miruro.user.js
// @downloadURL  https://raw.githubusercontent.com/aquaryuo/userscripts/main/miruro.to/miruro.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @noframes
// ==/UserScript==

(() => {
  'use strict';

  const SITE = 'https://ws.ryuo.to';
  const ON_SITE = location.hostname === new URL(SITE).hostname;
  const CDN = 'https://s4.anilist.co/file/anilistcdn/';
  const WATCHING = 'priver:watching';
  const PLAYBACK = 'priver:playback';
  const QUERIES = 'miruro:cache:query-v2';
  const MARKS = 'ws-sync';
  const SCHEMA = 7;
  const MAX_PAGES = 20;
  const SITE_EVERY = 5 * 60_000;
  const MIRURO_EVERY = 30_000;
  const ASSUMED_LENGTH = 1440;
  const STATUSES = ['watching', 'rewatching', 'planning', 'paused', 'completed', 'dropped'];
  const FINISHED = ['completed', 'dropped'];
  const REJECTED = [400, 404, 422];

  const api = async (path, body) => {
    const res = await fetch(
      path,
      body && {
        method: 'PUT',
        headers: { 'content-type': 'application/json', 'x-requested-with': 'ws' },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) throw Object.assign(new Error(`${path}: ${res.status}`), { status: res.status });
    return res.json();
  };

  const flush = async () => {
    const ids = GM_getValue('ids', {});
    const { rows = {} } = GM_getValue('snapshot', {});
    for (const [key, q] of Object.entries(GM_getValue('queue', {}))) {
      const anilistId = ids[q.h];
      if (anilistId === undefined) continue;
      if (anilistId && !(rows[`${anilistId}:${q.e}`]?.p >= q.p)) {
        try {
          await api('/api/progress', { anilistId, episode: q.e, position: q.p, duration: q.d });
        } catch (err) {
          if (!REJECTED.includes(err.status)) throw err;
        }
      }
      const queue = GM_getValue('queue', {});
      if (queue[key]?.t === q.t) delete queue[key];
      GM_setValue('queue', queue);
    }
  };

  const art = (url) => {
    if (url?.startsWith('/art/media/')) return CDN + url.slice('/art/'.length);
    return url?.startsWith('https:') ? url : undefined;
  };

  const pull = async () => {
    const snap = { rows: {}, series: {}, top: 0, ...GM_getValue('snapshot') };
    const card = (id, media, extra) => {
      snap.series[id] = {
        ...snap.series[id],
        ...(media && {
          name: media.titles?.english || media.title,
          titles: media.titles,
          cover: art(media.cover?.l),
          banner: art(media.banner),
          episodes: media.episodes,
        }),
        ...extra,
      };
    };

    let top = snap.top;
    let cursor = '';
    for (let page = 0; page < MAX_PAGES; page++) {
      const { items, next } = await api(`/api/progress/history${cursor}`);
      for (const r of items) {
        snap.rows[`${r.anilistId}:${r.episode}`] = {
          a: r.anilistId,
          e: r.episode,
          p: r.completed ? r.duration : r.position,
          d: r.duration,
          t: r.updatedAt,
        };
        card(r.anilistId, r.media);
        top = Math.max(top, r.updatedAt);
      }
      if (!next || items.at(-1).updatedAt < snap.top) break;
      cursor = `?cursor=${next}`;
    }
    snap.top = top;

    const { items } = await api('/api/library');
    for (const s of Object.values(snap.series)) s.status = null;
    for (const i of items)
      card(i.anilistId, i.media, { status: i.status, watched: i.watched, at: i.updatedAt });

    GM_setValue('snapshot', snap);
    GM_setValue('syncedAt', Date.now());
  };

  let mounted = false;
  const sync = () =>
    document.visibilityState === 'visible'
      ? flush()
          .then(pull)
          .then(() => {
            if (!mounted) mount(true);
            mounted = true;
          })
          .catch((err) => console.debug('ws sync:', err.message))
      : undefined;

  const read = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? {};
    } catch {
      return {};
    }
  };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const clock = (seconds) => {
    const t = Math.round(seconds);
    const hours = Math.floor(t / 3600);
    const rest = `${String(Math.floor(t / 60) % 60).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
    return hours ? `${hours}:${rest}` : rest;
  };

  const apply = () => {
    const watching = read(WATCHING);
    if (watching.schemaVersion > SCHEMA) return false;
    if (document.readyState !== 'loading') return true;

    const { rows = {}, series = {} } = GM_getValue('snapshot', {});
    const marks = read(MARKS);
    const since = marks.applied ?? 0;
    const now = Date.now();
    const playback = read(PLAYBACK);
    const history = (watching.history ??= {});
    const visits = (watching.recentVisits ??= {});
    let applied = since;

    const add = (id, episode, position, duration, time) => {
      const at = Math.min(time, now);
      (history[id] ??= []).push({
        episode_number: episode,
        progress_seconds: position,
        duration_seconds: duration,
        updated_at: new Date(at).toISOString(),
      });
      if (position > 0 && position < duration)
        playback[`${id}:${episode}`] = {
          currentTime: clock(position),
          duration: clock(duration),
          playbackPercentage: (position / duration) * 100,
          lastUpdated: at,
        };
      const s = series[id];
      if (s?.name && !(visits[id]?.timestamp >= at))
        visits[id] = {
          timestamp: at,
          titleEnglish: s.titles?.english ?? s.name,
          titleRomaji: s.titles?.romaji ?? s.name,
          titleNative: s.titles?.native ?? s.name,
          coverImage: s.cover,
          bannerImage: s.banner,
        };
      applied = Math.max(applied, time);
    };

    for (const r of Object.values(rows))
      if (r.t > since && !FINISHED.includes(series[r.a]?.status)) add(r.a, r.e, r.p, r.d, r.t);

    const played = new Set(Object.values(rows).map((r) => String(r.a)));
    for (const [id, s] of Object.entries(series))
      if (s.at > since && s.watched > 0 && !played.has(id))
        if (['watching', 'rewatching', 'paused'].includes(s.status))
          add(id, s.watched, ASSUMED_LENGTH, ASSUMED_LENGTH, s.at);

    if (applied > since) {
      write(WATCHING, watching);
      write(PLAYBACK, playback);
    }
    write(MARKS, { applied, exported: Math.max(marks.exported ?? 0, now) });
    return true;
  };

  const scan = () => {
    const ids = GM_getValue('ids', {});
    for (const { queryKey, state } of read(QUERIES).clientState?.queries ?? []) {
      const d = state?.data;
      if (queryKey?.[2] !== 'detail' || !d?.history_id) continue;
      const anilist = d.external_ids?.anilist ?? [];
      ids[d.history_id] = anilist.length === 1 ? Number(anilist[0]) : 0;
    }
    GM_setValue('ids', ids);

    const marks = read(MARKS);
    const since = marks.exported ?? Infinity;
    const queue = GM_getValue('queue', {});
    const { rows = {} } = GM_getValue('snapshot', {});
    let top = since;
    for (const [h, episodes] of Object.entries(read(WATCHING).history ?? {})) {
      if (!Array.isArray(episodes)) continue;
      for (const x of episodes) {
        const t = Date.parse(x.updated_at);
        if (!(t > since)) continue;
        top = Math.max(top, t);
        if (!(x.duration_seconds > 0)) continue;
        if (rows[`${ids[h]}:${x.episode_number}`]?.p >= x.progress_seconds) continue;
        queue[`${h}:${x.episode_number}`] = {
          h,
          e: x.episode_number,
          p: x.progress_seconds,
          d: x.duration_seconds,
          t,
        };
      }
    }
    if (top === since) return;
    GM_setValue('queue', queue);
    write(MARKS, { ...marks, exported: top });
  };

  const LAYOUT = `
    :host{all:initial;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit}
    *{box-sizing:border-box;margin:0;padding:0}
    [hidden]{display:none!important}
    .dock{position:fixed;right:16px;bottom:16px;display:flex;flex-direction:column;align-items:flex-end;gap:8px}
    .toggle{display:inline-flex;align-items:center;gap:8px;cursor:pointer}
    .panel{display:flex;flex-direction:column;width:min(360px,calc(100vw - 32px))}
    .head{display:flex;align-items:center;justify-content:space-between;gap:12px}
    .label{display:inline-flex;align-items:center;gap:8px}
    .pip{flex:none;width:6px;height:6px}
    .chip{cursor:pointer;white-space:nowrap}
    .tabs{display:flex;flex-wrap:wrap}
    .list{max-height:min(280px,40vh);overflow:auto;scrollbar-width:thin}
    .row{display:flex;justify-content:space-between;gap:12px;text-decoration:none}
    .name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .eps{flex:none}
    .foot{display:flex}
    .open{text-decoration:none}
  `;

  const WS_THEME = `
    .dock{z-index:19999;color:var(--text-primary);font:400 var(--text-md)/1.5 var(--font)}
    .frame{position:relative;padding:1px;background:var(--line);clip-path:polygon(var(--c) 0,100% 0,100% calc(100% - var(--c)),calc(100% - var(--c)) 100%,0 100%,0 var(--c))}
    .frame::before{content:'';position:absolute;inset:1px;background:var(--bg-card);clip-path:inherit}
    .frame>*{position:relative}
    .toggle{--c:var(--cut-sm);height:32px;padding:0 12px;border:0;color:inherit}
    .toggle:hover{background:var(--accent)}
    .panel{--c:var(--cut-lg)}
    .panel::after{content:'';position:absolute;left:var(--cut-lg);top:0;width:48px;height:2px;background:var(--accent)}
    .head{min-height:48px;padding:0 14px 0 18px;border-bottom:1px solid var(--line-faint)}
    .label{font:600 var(--text-sm)/1 var(--font-display);letter-spacing:var(--tracking-title);text-transform:uppercase}
    .pip{background:var(--accent-hover);transform:rotate(45deg)}
    .chip{display:inline-grid;place-items:center;min-width:20px;height:22px;padding:0 6px;border:1px solid var(--line);background:none;color:var(--text-secondary);font:600 var(--text-2xs)/1 var(--font-display);letter-spacing:.08em;text-transform:uppercase}
    .chip:hover,.chip[aria-pressed=true]{border-color:color-mix(in srgb,var(--accent) 50%,transparent);color:var(--accent-hover)}
    .note{padding:10px 18px 0;color:var(--t2);font-size:var(--text-note)}
    .tabs{gap:6px;padding:12px 18px;border-bottom:1px solid var(--line-faint)}
    .list{scrollbar-color:var(--line) transparent}
    .row{padding:8px 18px;color:var(--t2);font-size:var(--text-note)}
    .row:hover,.row:focus-visible{background:var(--sel-bg);box-shadow:inset 2px 0 0 var(--accent);color:var(--text-primary)}
    .eps{color:var(--text-secondary);font:600 var(--text-2xs)/20px var(--font-display);letter-spacing:.08em}
    .foot{padding:10px 18px;border-top:1px solid var(--line-faint)}
    .open{color:var(--accent-hover);font-size:var(--text-note)}
    .open:hover{color:var(--text-primary)}
    :focus-visible{outline:1px solid var(--accent);outline-offset:-1px}
  `;

  const MIRURO_THEME = `
    .dock{z-index:700;color:var(--text-primary,#e8e8e8);font:400 14px/1.45 var(--font-body,system-ui,sans-serif)}
    .toggle{height:40px;padding:0 14px;border:1px solid var(--border-color,#f5f5f51a);border-radius:var(--radius,.5rem);background:var(--surface-panel,#141414);color:inherit}
    .toggle:hover{background:var(--accent-overlay);color:var(--accent)}
    .toggle .label{font-size:13px;font-weight:600}
    .pip{border-radius:50%;background:var(--accent,#b5a8ff)}
    .panel{overflow:hidden;border:1px solid var(--border-color,#f5f5f51a);border-radius:var(--radius,.5rem);background:var(--surface-panel-alt,#0e0e0e);box-shadow:0 8px 32px var(--shadow-color,#0009)}
    .head{padding:16px 16px 4px}
    .head .label{font-size:17px;font-weight:800}
    .head .pip{display:none}
    .head .chip{width:28px;height:28px;border:1px solid var(--border-color,#f5f5f51a);border-radius:var(--radius,.5rem);background:var(--surface-panel,#141414);color:inherit;font:inherit}
    .head .chip:hover{background:var(--accent-overlay);color:var(--accent)}
    .note{padding:4px 16px 0;color:var(--text-muted-strong,#a8a8a8);font-size:13.6px}
    .tabs{gap:4px;padding:12px 16px}
    .tabs .chip{padding:6px 10px;border:1px solid var(--border-color,#f5f5f51a);border-radius:var(--radius,.5rem);background:var(--surface-panel,#141414);color:inherit;font-family:inherit;font-size:12px;font-weight:500;line-height:1.2;text-transform:uppercase}
    .tabs .chip:hover{color:var(--accent)}
    .tabs .chip[aria-pressed=true]{background:var(--accent-overlay);color:var(--accent)}
    .list{scrollbar-color:var(--border-color,#f5f5f51a) transparent}
    .row{padding:8px 16px;color:inherit;font-size:13.6px}
    .row:hover,.row:focus-visible{background:var(--accent-overlay-soft);color:var(--accent)}
    .eps{color:var(--text-muted-strong,#a8a8a8);font-size:12px;line-height:20px;font-variant-numeric:tabular-nums}
    .foot{padding:12px 16px 16px}
    .open{flex:1;padding:10px;border:1px solid var(--border-color,#f5f5f51a);border-radius:var(--radius,.5rem);background:var(--surface-panel,#141414);color:inherit;font-size:14.4px;font-weight:600;text-align:center}
    .open:hover{background:var(--accent-overlay);color:var(--accent)}
    :focus-visible{outline:2px solid var(--accent,#b5a8ff);outline-offset:-2px}
  `;

  const WS_PLACE = {
    theme: WS_THEME,
    mark: 'Sync',
    title: 'Miruro sync',
    close: 'Esc',
    other: ['https://www.miruro.to', 'Open Miruro'],
    link: (id) => `/anime/${id}`,
    copied: (when) => `Copied for Miruro ${when}.`,
    never: 'Nothing copied yet.',
    waiting: (n) => `${n} ${n === 1 ? 'update' : 'updates'} from Miruro waiting to be sent to your account.`,
    clear: 'Nothing from Miruro is waiting to be sent.',
  };

  const MIRURO_PLACE = {
    theme: MIRURO_THEME,
    mark: 'WS',
    title: 'ws.ryuo.to sync',
    close: '\u2715',
    other: [SITE, 'Open ws.ryuo.to'],
    link: (id, s) => `/search?query=${encodeURIComponent(s.name)}`,
    copied: (when) => `Copied from your account ${when}.`,
    never: 'Nothing copied yet. Open ws.ryuo.to while signed in.',
    waiting: (n) => `${n} ${n === 1 ? 'update' : 'updates'} will be sent to your account next time you open ws.ryuo.to.`,
    clear: 'Nothing is waiting to be sent to your account.',
  };

  const h = (tag, props, ...kids) => {
    const el = Object.assign(document.createElement(tag), props);
    el.append(...kids);
    return el;
  };

  const ago = (time) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const minutes = Math.round((time - Date.now()) / 60_000);
    if (minutes > -60) return rtf.format(minutes, 'minute');
    if (minutes > -1440) return rtf.format(Math.round(minutes / 60), 'hour');
    return rtf.format(Math.round(minutes / 1440), 'day');
  };

  const mount = (current) => {
    const place = ON_SITE ? WS_PLACE : MIRURO_PLACE;
    const host = h('div');
    const toggle = h('button', { className: 'frame toggle', type: 'button', title: place.title });
    const panel = h('section', { className: 'frame panel', hidden: true });
    host.attachShadow({ mode: 'open' }).append(
      h('style', { textContent: LAYOUT + place.theme }),
      h('div', { className: 'dock' }, panel, toggle)
    );

    let tab = null;

    const badge = () => {
      if (!host.isConnected) document.body.append(host);
      const waiting = Object.keys(GM_getValue('queue', {})).length;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
      toggle.setAttribute('aria-label', `${place.title}, ${waiting} waiting`);
      toggle.replaceChildren(
        h(
          'span',
          { className: 'label' },
          h('i', { className: 'pip' }),
          waiting ? `${place.mark} ${waiting}` : place.mark
        )
      );
    };

    const fill = () => {
      const { series = {} } = GM_getValue('snapshot', {});
      const syncedAt = GM_getValue('syncedAt');
      const waiting = Object.keys(GM_getValue('queue', {})).length;
      const groups = Object.groupBy(
        Object.entries(series).filter(([, s]) => s.status && s.name),
        ([, s]) => s.status
      );
      if (!groups[tab]) tab = STATUSES.find((s) => groups[s]) ?? null;

      const close = h('button', {
        className: 'chip',
        type: 'button',
        textContent: place.close,
        title: 'Close',
        onclick: () => show(false),
      });
      close.setAttribute('aria-label', 'Close');
      const tabs = STATUSES.filter((s) => groups[s]).map((s) => {
        const button = h('button', {
          className: 'chip',
          type: 'button',
          textContent: `${s} ${groups[s].length}`,
          onclick: () => {
            tab = s;
            fill();
          },
        });
        button.setAttribute('aria-pressed', String(s === tab));
        return button;
      });
      const rows = (groups[tab] ?? [])
        .sort(([, a], [, b]) => (b.at ?? 0) - (a.at ?? 0))
        .map(([id, s]) =>
          h(
            'a',
            { className: 'row', href: place.link(id, s), title: s.name },
            h('span', { className: 'name', textContent: s.name }),
            h('span', { className: 'eps', textContent: `${s.watched ?? 0} / ${s.episodes ?? '?'}` })
          )
        );

      panel.replaceChildren(
        h(
          'div',
          { className: 'head' },
          h('span', { className: 'label' }, h('i', { className: 'pip' }), place.title),
          close
        ),
        h('p', {
          className: 'note',
          textContent: syncedAt ? place.copied(ago(syncedAt)) : place.never,
        }),
        h('p', { className: 'note', textContent: waiting ? place.waiting(waiting) : place.clear }),
        ...(current
          ? []
          : [
              h('p', {
                className: 'note',
                textContent: "Miruro changed how it stores history, so this script can't add to it until it's updated.",
              }),
            ]),
        h('div', { className: 'tabs' }, ...tabs),
        h('div', { className: 'list', tabIndex: rows.length ? 0 : -1 }, ...rows),
        h(
          'div',
          { className: 'foot' },
          h('a', {
            className: 'open',
            href: place.other[0],
            target: '_blank',
            rel: 'noopener',
            textContent: place.other[1],
          })
        )
      );
    };

    const show = (open) => {
      panel.hidden = !open;
      if (open) fill();
      badge();
      if (!open) toggle.focus();
    };

    toggle.onclick = () => show(panel.hidden);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) show(false);
    });
    setInterval(badge, MIRURO_EVERY);
    badge();
  };

  if (ON_SITE) {
    setTimeout(sync, 5000);
    setInterval(sync, SITE_EVERY);
  } else {
    scan();
    const current = apply();
    setInterval(scan, MIRURO_EVERY);
    addEventListener('pagehide', scan);
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', () => mount(current));
    else mount(current);
  }
})();
