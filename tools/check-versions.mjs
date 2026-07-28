#!/usr/bin/env node
// Fails if a script's @version, its @require ?v= cache-bust, and the README
// table version ever disagree. Zero dependencies; run in CI and before release.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const readme = readFileSync(join(root, 'README.md'), 'utf8').split('\n');
let bad = 0;

const cell = (row, i) => (row.split('|').map(c => c.trim())[i] ?? '');

for (const d of readdirSync(root, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name.startsWith('.') || d.name.startsWith('_') ||
      d.name === 'tools' || d.name === 'node_modules') continue;

  for (const f of readdirSync(join(root, d.name)).filter(n => n.endsWith('.user.js'))) {
    const src = readFileSync(join(root, d.name, f), 'utf8');
    const ver = (src.match(/@version\s+(\S+)/) || [])[1];
    const req = (src.match(/@require\s+\S*?\?v=([0-9.]+)/) || [])[1]; // optional
    const row = readme.find(l => l.includes(`[\`${d.name}/\`]`));
    const rmVer = row ? (row.match(/\b(\d+\.\d+\.\d+)\b/g) || []).find(v => v === ver) ??
                        (row.match(/\b(\d+\.\d+\.\d+)\b/) || [])[1] : undefined;

    const issues = [];
    if (!ver) issues.push('no @version');
    if (req && req !== ver) issues.push(`@require ?v=${req} != @version ${ver}`);
    // A missing row (or a row with no version) used to skip the comparison and pass.
    if (!row) issues.push('no README table row');
    else if (!rmVer) issues.push('README row has no version');
    else if (rmVer !== ver) issues.push(`README ${rmVer} != @version ${ver}`);

    if (issues.length) { console.error(`✗ ${d.name}/${f}: ${issues.join('; ')}`); bad++; }
    else console.log(`✓ ${d.name}/${f} @ ${ver}`);
  }
}

if (bad) { console.error(`\n${bad} version mismatch(es)`); process.exit(1); }
console.log('\nversions in sync');
