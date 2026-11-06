#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('./miruro.user.js', import.meta.url), 'utf8');
const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));

const boot = (hostname, gm, { store = new Map(), fetch, visibility = 'visible', listing } = {}) => {
  const timers = [];
  const requests = [];
  const shown = [];
  const made = [];
  const listeners = [];
  let focused = 0;
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
    GM_xmlhttpRequest: (request) => {
      requests.push(request);
      listing?.(request);
    },
    localStorage: {
      getItem: (k) => store.get(k) ?? null,
      setItem: (k, v) => store.set(k, v),
    },
    location: { hostname, origin: `https://${hostname}` },
    document: doc,
    addEventListener() {},
    dispatchEvent: () => {
      focused++;
    },
    Event: class {},
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
    requests,
    tick: () => timers[0](),
    focused: () => focused,
    fire: () => Promise.all(listeners.filter(([type]) => type === 'visibilitychange').map(([, f]) => f())),
    texts: () => made.map((el) => el.textContent),
    get: (k) => JSON.parse(store.get(k) ?? 'null'),
  };
};

const settle = () => new Promise((resolve) => setImmediate(resolve));
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

const miruro = boot('www.miruro.cx', gm);
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

const otherDomain = boot('www.miruro.cx', gm);
assert.equal(otherDomain.get('priver:watching').history[16498][0].progress_seconds, 300, 'each Miruro domain seeds its own storage');

const animeId = (id) => `anime${id}`.padEnd(32, '_');
const historyId = (id) => `h1_${animeId(id)}`;
const miruroApi = (log = []) => async (path, init) => {
  log.push(path);
  if (path.startsWith('/api/search/browse')) {
    const wanted = new URL(path, 'https://x').searchParams.get('anilist_id_in').split(',');
    return Response.json({
      data: wanted.filter((id) => id !== '9253').map((id) => ({ id: animeId(id), external_ids: { anilist: [id] } })),
      has_more: false,
    });
  }
  const { ids } = JSON.parse(init.body);
  return Response.json({
    identity_version: 'v',
    data: Object.fromEntries(ids.map((id) => [id, { anime_id: id, history_id: `h1_${id}` }])),
  });
};

const bareGm = { snapshot: gm.snapshot };
const bareLog = [];
const bare = boot('miruro.cx', bareGm, { fetch: miruroApi(bareLog) });
await settle();
const bareHistory = bare.get('hermes:watching').history;
const aot = bareHistory[historyId(16498)];
assert.equal(aot.mediaId, animeId(16498), 'miruro.cx needs its own anime ID');
assert.equal(aot.historyId, historyId(16498));
assert.equal(aot.title, 'Attack on Titan');
assert.equal(aot.episodeNumber, 12, 'miruro.cx keeps the newest episode of each series');
assert.equal(aot.positionSeconds, 300);
assert.equal(aot.durationSeconds, 1440);
assert.deepEqual(aot.externalIds.anilist, ['16498']);
assert.equal(bare.get('hermes:playback')[`${historyId(16498)}:12`].currentTime, 300, 'miruro.cx stores seconds');
assert.equal(bareHistory[historyId(21)].episodeNumber, 40, 'library-only titles use their episode count');
assert.equal(bareHistory[historyId(5114)], undefined, 'finished titles stay out of Continue Watching');
assert.equal(bareHistory[historyId(9253)], undefined, 'titles Miruro does not have are skipped');
assert.equal(bare.get('priver:watching'), null, "miruro.cx does not get the www app's history");
assert.equal(bare.focused(), 1, 'the app is told to read its history again');
assert.equal(bareGm.miruro, 'https://miruro.cx', 'the site panel links to the domain last used');
assert.equal(bareLog.length, 2, 'a lookup takes one browse and one identities call');

const removedHere = bare.get('hermes:watching');
delete removedHere.history[historyId(21)];
bare.store.set('hermes:watching', JSON.stringify(removedHere));
const bareAgain = boot('miruro.cx', bareGm, { store: bare.store, fetch: miruroApi(bareLog) });
await settle();
assert.equal(bareAgain.get('hermes:watching').history[historyId(21)], undefined, 'a removed title stays removed');
assert.equal(bareLog.length, 2, 'looked-up IDs are remembered');
assert.equal(bareAgain.focused(), 0, 'nothing new means no refresh');

const moved = bareAgain.get('hermes:watching');
Object.assign(moved.history[historyId(16498)], {
  episodeNumber: 13,
  positionSeconds: 600,
  durationSeconds: 1440,
  lastViewed: Date.now() + 1000,
  externalIds: { anilist: ['16498'], mal: ['16498'] },
});
bareAgain.store.set('hermes:watching', JSON.stringify(moved));
await bareAgain.tick();
assert.deepEqual(Object.keys(bareGm.queue), [`${historyId(16498)}:13`], 'progress on miruro.cx is queued for the account');
assert.equal(bareGm.queue[`${historyId(16498)}:13`].p, 600);
assert.equal(bareGm.ids[historyId(16498)], 16498, 'its AniList ID comes from the history entry');

const newerGm = { snapshot: gm.snapshot };
const newerStore = new Map([
  ['hermes:watching', JSON.stringify({ history: { [historyId(16498)]: { mediaId: animeId(16498), historyId: historyId(16498), title: 'Local', episodeNumber: 20, positionSeconds: 5, durationSeconds: 10, lastViewed: Date.now() + 60_000, watchedEpisodes: [20] } } })],
]);
const newer = boot('miruro.cx', newerGm, { store: newerStore, fetch: miruroApi() });
await settle();
assert.equal(newer.get('hermes:watching').history[historyId(16498)].episodeNumber, 20, 'newer local progress is kept');

const downGm = { snapshot: gm.snapshot };
const apiDown = boot('miruro.cx', downGm, { fetch: async () => new Response('', { status: 403 }) });
await settle();
assert.equal(apiDown.get('hermes:watching'), null);
assert.equal(apiDown.get('ws-sync'), null, 'a failed lookup leaves everything to try again');
const backUp = boot('miruro.cx', downGm, { store: apiDown.store, fetch: miruroApi() });
await settle();
assert.ok(backUp.get('hermes:watching').history[historyId(16498)], 'the next page load catches up');

const wwwApp = boot('www.miruro.cx', { snapshot: gm.snapshot });
assert.equal(wwwApp.get('hermes:watching'), null, 'www.miruro.cx stays on its own storage');
assert.ok(wwwApp.get('priver:watching').history[16498]);


const removed = miruro.get('priver:watching');
delete removed.history[21];
miruro.store.set('priver:watching', JSON.stringify(removed));
boot('www.miruro.cx', gm, { store: miruro.store });
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
gm.miruro = 'https://www.miruro.cx';
const status = boot('ws.ryuo.to', gm, { fetch: site() });
await status.tick();
assert.ok(status.texts().includes('Miruro (miruro.cx): last active 3 hours ago'), 'a sleeping site shows when it last ran');

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

for (const host of ['miruro.xyz', 'www.miruro.com', 'www.miruro.to', 'miruro.tv']) {
  const outsider = { snapshot: gm.snapshot };
  const page = boot(host, outsider);
  assert.equal(page.get('priver:watching'), null, `${host} gets no watch history`);
  assert.equal(outsider.miruro, undefined, `${host} is not remembered as Miruro`);
  assert.equal(outsider.seenMiruro, undefined, `${host} does not count as Miruro being open`);
}

const listingPage = `
  <a href="https://www.miruro.cx">primary</a>
  <a href="https://miruro.si">new</a>
  <a href="https://status.miruro.com/">status</a>
  <a href="https://www.miruro.com/">home</a>
  <a href="https://x.com/someone">miruro.evil</a>
  <p>https://miruro.fake/</p>`;
const listed = { snapshot: gm.snapshot };
boot('miruro.si', listed, { listing: (request) => request.onload({ status: 200, responseText: listingPage }) });
assert.deepEqual([...listed.domains].sort(), ['miruro.cx', 'miruro.si']);
const newDomain = boot('www.miruro.si', listed);
assert.ok(newDomain.get('priver:watching').history[16498], 'a newly listed domain works on its next load');
assert.equal(newDomain.requests.length, 0, 'the listing is read at most once a day');

const listingDown = { snapshot: gm.snapshot };
const known = boot('www.miruro.cx', listingDown, { listing: (request) => request.onload({ status: 503, responseText: '' }) });
assert.equal(listingDown.domains, undefined, 'a failed read changes nothing');
assert.ok(known.get('priver:watching').history[16498], 'known domains work without the listing');

console.log('miruro sync: all checks passed');
