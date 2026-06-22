// check-motifs.mjs — verify motif uniqueness and reference integrity
// Usage: node scripts/check-motifs.mjs
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
let errors = 0;

function fail(msg) { console.error('FAIL:', msg); errors++; }
function ok(msg) { console.log('OK  :', msg); }

// ── 1. Motif key extraction ─────────────────────────────────────────────────

function getMotifKeys() {
  const dir = join(root, 'src/components/illustrations/motifs');
  const files = readdirSync(dir).filter(f => f.endsWith('.tsx'));
  const keys = [];
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8');
    // Match quoted keys ('kebab-key') AND unquoted keys (validIdentifier)
    // before a ': (c' function signature
    for (const m of src.matchAll(
      /^\s+(?:['"]([a-z][a-z0-9-]+)['"]|([a-z][a-z0-9]+))\s*:\s*\(c/gm
    )) {
      const key = m[1] ?? m[2];
      keys.push({ key, file: f });
    }
  }
  return keys;
}

const motifEntries = getMotifKeys();
const allMotifKeys = motifEntries.map(e => e.key);
const motifSet = new Set(allMotifKeys);


// Check 1: no duplicate motif keys across all category files
const dupeKeys = allMotifKeys.filter((k, i) => allMotifKeys.indexOf(k) !== i);
if (dupeKeys.length) {
  const unique = [...new Set(dupeKeys)];
  for (const k of unique) {
    const inFiles = motifEntries.filter(e => e.key === k).map(e => e.file);
    fail(`duplicate motif key '${k}' in: ${inFiles.join(', ')}`);
  }
} else {
  ok(`${motifSet.size} unique motif keys defined`);
}

// ── 2. Referenced key extraction ────────────────────────────────────────────

function getBooksDir() { return join(root, 'src/lib/readings/books'); }

function extractBookRefs() {
  const dir = getBooksDir();
  const files = readdirSync(dir).filter(f => f.endsWith('.ts'));
  const bookCovers = [], chapterCovers = [], chapterIcons = [], inline = [];
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8');
    // Split on the readings array boundary so we can distinguish book vs chapter covers
    const bookPart = src.split(/export const readings/)[0] ?? src;
    const readingsPart = src.split(/export const readings/)[1] ?? '';
    for (const m of bookPart.matchAll(/\bcover:\s*'([^']+)'/g)) bookCovers.push(m[1]);
    for (const m of readingsPart.matchAll(/\bcover:\s*'([^']+)'/g)) chapterCovers.push(m[1]);
    for (const m of readingsPart.matchAll(/\bicon:\s*'([^']+)'/g)) chapterIcons.push(m[1]);
    for (const m of src.matchAll(/~\s+([a-z][a-z0-9-]+)\s*\|/g)) inline.push(m[1]);
  }
  return { bookCovers, chapterCovers, chapterIcons, inline };
}

function extractIconRefs(filePath) {
  const src = readFileSync(filePath, 'utf8');
  const icons = [];
  for (const m of src.matchAll(/\bicon:\s*'([^']+)'/g)) icons.push(m[1]);
  return icons;
}

const bookRefs = extractBookRefs();
const practiceIcons = extractIconRefs(join(root, 'src/lib/practices.ts'));
const pathIcons = extractIconRefs(join(root, 'src/lib/paths.ts'));

// Check 2: all referenced keys exist in MOTIFS
const allRefs = [
  ...bookRefs.bookCovers,
  ...bookRefs.chapterCovers,
  ...bookRefs.chapterIcons,
  ...bookRefs.inline,
  ...practiceIcons,
  ...pathIcons,
];
const missingKeys = [...new Set(allRefs.filter(k => !motifSet.has(k)))];
if (missingKeys.length) {
  for (const k of missingKeys) fail(`referenced key '${k}' not found in MOTIFS`);
} else {
  ok(`all ${allRefs.length} key references resolve to known motifs`);
}

// ── 3. Term-identity uniqueness ─────────────────────────────────────────────
// Invariant: PRACTICES.icon ∪ PATHS.icon ∪ READINGS.cover has no duplicate.
// Book-level covers are conceptually linked to their defining practice/chapter
// and are excluded — they appear only in the Library grid tile, not inline.

// Reading covers == icons by convention; count each chapter once via cover only
const termIdentity = [
  ...practiceIcons,
  ...pathIcons,
  ...bookRefs.chapterCovers,
];

const seen = new Map();
for (const k of termIdentity) seen.set(k, (seen.get(k) ?? 0) + 1);
const collisions = [...seen.entries()].filter(([, n]) => n > 1);
if (collisions.length) {
  for (const [k, n] of collisions) fail(`term-identity collision: '${k}' used ${n} times`);
} else {
  ok(`${termIdentity.length} term keys — no identity collisions`);
}

// ── 4. Chapter cover == icon consistency ────────────────────────────────────
// Each chapter should have cover === icon (same key)
function checkCoverIconParity() {
  const dir = getBooksDir();
  const files = readdirSync(dir).filter(f => f.endsWith('.ts'));
  let mismatches = 0;
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8');
    const readingsPart = src.split(/export const readings/)[1] ?? '';
    // Match each reading block and compare its cover+icon
    for (const block of readingsPart.split(/\{\s*\n\s*id:/)) {
      const cm = block.match(/\bcover:\s*'([^']+)'/);
      const im = block.match(/\bicon:\s*'([^']+)'/);
      if (cm && im && cm[1] !== im[1]) {
        const idm = block.match(/^\s*'([^']+)'/);
        fail(`cover/icon mismatch in ${f} chapter '${idm?.[1] ?? '?'}': cover='${cm[1]}' icon='${im[1]}'`);
        mismatches++;
      }
    }
  }
  if (!mismatches) ok('all chapters have matching cover and icon keys');
}
checkCoverIconParity();

// ── Summary ─────────────────────────────────────────────────────────────────
console.log('');
if (errors) {
  console.error(`\n${errors} error(s) found. Fix before shipping.`);
  process.exit(1);
} else {
  console.log('All checks passed.');
}
