#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('./miruro.user.js', import.meta.url), 'utf8');
const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));

const boot = (hostname, gm, { store = new Map(), fetch, visibility = 'visible' } = {}) => {
  const timers = [];
  const shown = [];
  const made = [];
  const listeners = [];
  const element = () => {
    const el = {
      append() {},
      setAttribute() {},
      replaceChildren() {},
      attachShadow: element,
    };
    made.push(el);
    return el;
  };
  const doc = {
    readyState: 'loading',
    visibilityState: visibility,
    addEventListener: (type, f) => listeners.push([type, f]),
    createElement: element,
    body: { append: (el) => shown.push(el) },
  };
  vm.runInNewContext(source, {
    GM_getValue: (k, d) => clone(gm[k] ?? d),
    GM_setValue: (k, v) => void (gm[k] = clone(v)),
    localStorage: {
      getItem: (k) => store.get(k) ?? null,
      setItem: (k, v) => store.set(k, v),
    },
    location: { hostname, origin: `https://${hostname}` },
    document: doc,
    addEventListener() {},
    setTimeout: (f) => timers.push(f),
    setInterval: (f) => timers.push(f),
    fetch,
    console,
    URL,
  });
  return {
    store,
    shown,
    doc,
    tick: () => timers[0](),
    fire: () => Promise.all(listeners.filter(([type]) => type === 'visibilitychange').map(([, f]) => f())),
    texts: () => made.map((el) => el.textContent),
    get: (k) => JSON.parse(store.get(k) ?? 'null'),
  };
};

const now = Date.now();
const media = (id, name) => ({
  id,
  title: name,
  titles: { english: name, romaji: `${name} (romaji)`, native: null },
  cover: { l: `/art/media/anime/cover/large/bx${id}.jpg` },
  banner: `/art/media/anime/banner/${id}.jpg`,
  episodes: 25,
});
const history = [
  { anilistId: 16498, episode: 12, position: 300, duration: 1440, completed: false, updatedAt: now - 60_000, media: media(16498, 'Attack on Titan') },
  { anilistId: 5114, episode: 64, position: 1400, duration: 1440, completed: true, updatedAt: now - 90_000, media: media(5114, 'FMA') },
  { anilistId: 9253, episode: 2, position: 100, duration: 1440, completed: false, updatedAt: now + 3_600_000, media: media(9253, 'Fast Clock') },
];
const library = [
  { anilistId: 16498, status: 'watching', watched: 11, updatedAt: now - 60_000, media: media(16498, 'Attack on Titan') },
  { anilistId: 5114, status: 'completed', watched: 64, updatedAt: now - 90_000, media: media(5114, 'FMA') },
  { anilistId: 21, status: 'paused', watched: 40, updatedAt: now - 5000, media: media(21, 'One Piece') },
  { anilistId: 1, status: 'planning', watched: 0, updatedAt: now - 5000, media: media(1, 'Bebop') },
];

const site = (log = []) => async (path, init) => {
  log.push({ path, init });
  if (init) return new Response('{}');
  if (path.startsWith('/api/library')) return Response.json({ items: library, counts: {} });
  return Response.json({ items: history, next: null });
};

const gm = {};

const signedIn = boot('ws.ryuo.to', gm, { fetch: site() });
await signedIn.tick();
assert.equal(signedIn.shown.length, 1, 'the panel appears after a sync that worked');
assert.ok(signedIn.texts().includes('ws.ryuo.to: open now'), 'this site shows as open');
assert.ok(signedIn.texts().includes('Miruro: not opened yet'), 'Miruro has not run yet');
assert.equal(gm.snapshot.series[21].cover, 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21.jpg');
assert.ok(gm.syncedAt);

const miruro = boot('www.miruro.to', gm);
const { history: seeded, recentVisits } = miruro.get('priver:watching');
assert.equal(seeded[16498][0].progress_seconds, 300);
assert.equal(miruro.get('priver:playback')['16498:12'].currentTime, '05:00');
assert.equal(seeded[21][0].episode_number, 40, 'library-only titles use their episode count');
assert.equal(seeded[5114], undefined, 'finished titles stay out of Watch History');
assert.equal(seeded[1], undefined, 'planned titles have nothing to resume');
assert.match(recentVisits[16498].bannerImage, /^https:\/\/s4\.anilist\.co\//);
assert.ok(Date.parse(seeded[9253][0].updated_at) <= Date.now(), 'a fast server clock is clamped');

const include = new RegExp(source.match(/@include\s+\/(.+)\/$/m)[1]);
for (const host of ['miruro.to', 'www.miruro.to', 'miruro.tv', 'www.miruro.tv', 'miruro.cx', 'www.miruro.cx'])
  assert.ok(include.test(`https://${host}/watch`), `${host} should match`);
for (const host of ['miruro.to.example.com', 'notmiruro.to', 'ws.ryuo.to'])
  assert.ok(!include.test(`https://${host}/`), `${host} should not match`);

const otherDomain = boot('miruro.cx', gm);
assert.equal(otherDomain.get('priver:watching').history[16498][0].progress_seconds, 300, 'each Miruro domain seeds its own storage');
assert.equal(gm.miruro, 'https://miruro.cx', 'the site panel links to the domain last used');

const removed = miruro.get('priver:watching');
delete removed.history[21];
miruro.store.set('priver:watching', JSON.stringify(removed));
boot('www.miruro.to', gm, { store: miruro.store });
assert.equal(miruro.get('priver:watching').history[16498].length, 1);
assert.equal(miruro.get('priver:watching').history[21], undefined);

const later = new Date(Date.now() + 1000).toISOString();
const watching = miruro.get('priver:watching');
watching.history = {
  h1_aot: [
    ...watching.history[16498],
    { episode_number: 13, progress_seconds: 600, duration_seconds: 1440, updated_at: later },
    { episode_number: 12, progress_seconds: 300, duration_seconds: 1440, updated_at: later },
    { episode_number: 6.5, progress_seconds: 10, duration_seconds: 90, updated_at: later },
  ],
  h1_new: [{ episode_number: 1, progress_seconds: 700, duration_seconds: 1440, updated_at: later }],
};
miruro.store.set('priver:watching', JSON.stringify(watching));
miruro.store.set('miruro:cache:query-v2', JSON.stringify({ clientState: { queries: [
  { queryKey: ['catalog', 'anime', 'detail', 'x'], state: { data: { history_id: 'h1_aot', external_ids: { anilist: ['16498'] } } } },
] } }));
await miruro.tick();
assert.deepEqual(Object.keys(gm.queue).sort(), ['h1_aot:13', 'h1_aot:6.5', 'h1_new:1'], 'just opening episode 12 queues nothing');
assert.equal(gm.ids.h1_aot, 16498);

const down = async () => { throw new TypeError('network'); };
await boot('ws.ryuo.to', gm, { fetch: down }).tick();
assert.equal(Object.keys(gm.queue).length, 3);

gm.queue['h1_aot:12'] = { h: 'h1_aot', e: 12, p: 200, d: 1440, t: 1 };
const log = [];
const fake = site(log);
await boot('ws.ryuo.to', gm, {
  fetch: (path, init) =>
    init && JSON.parse(init.body).episode === 6.5
      ? Promise.resolve(new Response('{}', { status: 422 }))
      : fake(path, init),
}).tick();
const puts = log.filter((l) => l.init);
assert.equal(puts.length, 1, 'only episode 13 carries new progress');
assert.deepEqual(JSON.parse(puts[0].init.body), { anilistId: 16498, episode: 13, position: 600, duration: 1440 });
assert.equal(puts[0].init.headers['x-requested-with'], 'ws');
assert.deepEqual(Object.keys(gm.queue), ['h1_new:1'], 'waits until Miruro exposes its AniList ID');

gm.ids.h1_new = 7;
const signedOut = boot('ws.ryuo.to', gm, { fetch: async () => new Response('{}', { status: 401 }) });
await signedOut.tick();
assert.deepEqual(Object.keys(gm.queue), ['h1_new:1']);
assert.equal(signedOut.shown.length, 0, 'signed-out visitors never see the panel');

gm.seenMiruro = now - 3 * 3_600_000;
gm.miruro = 'https://www.miruro.tv';
const status = boot('ws.ryuo.to', gm, { fetch: site() });
await status.tick();
assert.ok(status.texts().includes('Miruro (miruro.tv): last active 3 hours ago'), 'a sleeping site shows when it last ran');

const returning = [];
const back = boot('ws.ryuo.to', gm, { visibility: 'hidden', fetch: site(returning) });
await back.tick();
assert.equal(returning.length, 0, 'a hidden tab makes no requests');
back.doc.visibilityState = 'visible';
await back.fire();
assert.ok(returning.length > 0, 'coming back to the tab syncs straight away');
const afterReturn = returning.length;
await back.fire();
assert.equal(returning.length, afterReturn, 'switching back and forth does not sync again right away');

console.log('miruro sync: all checks passed');
