import fs from 'node:fs';

const path = new URL('../src/oneclick/OneClickApp.tsx', import.meta.url);
if (!fs.existsSync(path)) throw new Error('src/oneclick/OneClickApp.tsx is missing');

const text = fs.readFileSync(path, 'utf8');

if (!text.includes('Screen unavailable in this preview')) {
  throw new Error('OneClickApp must render a visible fallback instead of a blank page when a registered screen has no renderer');
}

console.log('OneClick missing-renderer fallback validated');
