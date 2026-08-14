import fs from 'node:fs';

const path = new URL('../src/oneclick/flow.ts', import.meta.url);
if (!fs.existsSync(path)) {
  console.error('src/oneclick/flow.ts is missing');
  process.exit(1);
}

const text = fs.readFileSync(path, 'utf8');
const ids = [...text.matchAll(/id:\s*"(s\d{2})"/g)].map((m) => m[1]);
const unique = new Set(ids);
const journeys = [...text.matchAll(/journey:\s*"([^"]+)"/g)].map((m) => m[1]);
const journeySet = new Set(journeys);

if (ids.length !== 47) throw new Error(`Expected 47 screens, found ${ids.length}`);
if (unique.size !== 47) throw new Error(`Expected 47 unique screen ids, found ${unique.size}`);
for (let i = 1; i <= 47; i += 1) {
  const id = `s${String(i).padStart(2, '0')}`;
  if (!unique.has(id)) throw new Error(`Missing ${id}`);
}
if (journeySet.size !== 5) throw new Error(`Expected 5 journeys, found ${journeySet.size}`);

console.log('47 screens validated across 5 journeys');
