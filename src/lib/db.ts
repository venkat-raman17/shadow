import type { SQLiteDatabase } from 'expo-sqlite';

import { encrypt, decrypt } from './crypto';
import type {
  ExportEntry,
  ExportPart,
  ExportSession,
  ExportExperiment,
  ExportGrounding,
} from './export';
import type { FlowInputs } from '@/types/flow';

function generateId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export interface EntryListItem {
  id: string;
  created_at: number;
  /** The practice (flow) that produced this entry — used to label it in history. */
  flow_id: string | null;
  quality: string | null;
  charge: number | null;
  /** Decrypted first line of the entry's subject — used as a readable teaser. */
  subject: string | null;
  /** Decrypted sketch JSON ({ w, h, paths }), or null — a thumbnail in lists. */
  sketch: string | null;
}

interface EntryListRow {
  id: string;
  created_at: number;
  flow_id: string | null;
  quality: string | null;
  charge: number | null;
  subject_enc: string | null;
  sketch_enc: string | null;
}

/** First non-empty line of a block of text, for use as a one-line teaser. */
function firstLine(text: string | null): string | null {
  if (!text) return null;
  const line = text.split('\n').map((l) => l.trim()).find(Boolean);
  return line ?? null;
}

function toListItem(row: EntryListRow, key: Uint8Array): EntryListItem {
  return {
    id: row.id,
    created_at: row.created_at,
    flow_id: row.flow_id,
    quality: row.quality,
    charge: row.charge,
    subject: row.subject_enc ? firstLine(decrypt(row.subject_enc, key)) : null,
    sketch: row.sketch_enc ? decrypt(row.sketch_enc, key) : null,
  };
}

// A small, conservative table that folds clear morphological variants of the
// same felt quality together (angry/anger, ashamed/shame). Deliberately NOT a
// semantic thesaurus — we never lump distinct nuances the user chose on purpose
// (e.g. "irritated" stays itself, not "anger"). Shipped in code: no AI, no network.
const QUALITY_SYNONYMS: Record<string, string> = {
  angry: 'anger',
  anxious: 'anxiety',
  worried: 'anxiety',
  afraid: 'fear',
  scared: 'fear',
  fearful: 'fear',
  sad: 'sadness',
  grieving: 'grief',
  ashamed: 'shame',
  shameful: 'shame',
  guilty: 'guilt',
  lonely: 'loneliness',
  jealous: 'jealousy',
  envious: 'envy',
  resentful: 'resentment',
  numb: 'numbness',
  tight: 'tightness',
  heavy: 'heaviness',
  restless: 'restlessness',
  longing: 'longing',
};

/** Normalize a quality word to its family so casing/word-form variants group. */
export function qualityFamily(quality: string): string {
  const k = quality.trim().toLowerCase();
  return QUALITY_SYNONYMS[k] ?? k;
}

export async function getRecentEntries(
  db: SQLiteDatabase,
  key: Uint8Array,
  limit = 20,
): Promise<EntryListItem[]> {
  const rows = await db.getAllAsync<EntryListRow>(
    `SELECT id, created_at, flow_id, quality, charge, subject_enc, sketch_enc
     FROM entries
     ORDER BY created_at DESC
     LIMIT ?`,
    [limit],
  );
  return rows.map((row) => toListItem(row, key));
}

export async function getEntriesByQuality(
  db: SQLiteDatabase,
  quality: string,
  key: Uint8Array,
  limit = 200,
): Promise<EntryListItem[]> {
  // Match by quality FAMILY so tapping a merged pattern (e.g. "anger") also
  // surfaces its variants ("angry"). Filter before decrypting so we only ever
  // decrypt the rows we actually return.
  const target = qualityFamily(quality);
  const rows = await db.getAllAsync<EntryListRow>(
    `SELECT id, created_at, flow_id, quality, charge, subject_enc, sketch_enc
     FROM entries
     WHERE quality IS NOT NULL AND TRIM(quality) != ''
     ORDER BY created_at DESC`,
  );
  return rows
    .filter((row) => row.quality && qualityFamily(row.quality) === target)
    .slice(0, limit)
    .map((row) => toListItem(row, key));
}

/**
 * One dated moment in the Notebook's unified practice history. A discriminated
 * union so the journal can render and route each kind differently:
 *  - `entry`      — a noticing (→ /entry/[id])
 *  - `session`    — a meeting with a part (→ /part/[id])
 *  - `grounding`  — a regulation practice that was run (no detail screen)
 *  - `experiment` — a carried commitment (→ /reflect/[id]); merged in by the hook
 *                   from the mutable experiments table, not by getNotebookTimeline.
 * `at` is the created_at timestamp; items are newest-first.
 */
export type TimelineItem =
  | {
      kind: 'entry';
      id: string;
      at: number;
      flowId: string | null;
      quality: string | null;
      charge: number | null;
      subject: string | null;
      sketch: string | null;
    }
  | {
      kind: 'session';
      id: string;
      at: number;
      flowId: string | null;
      partId: string | null;
      partName: string | null;
      chargeBefore: number | null;
      chargeAfter: number | null;
    }
  | {
      kind: 'grounding';
      id: string;
      at: number;
      flowId: string | null;
      note: string | null;
    }
  | {
      kind: 'experiment';
      id: string;
      at: number;
      description: string;
      status: 'open' | 'done' | 'let-go';
    };

/**
 * The unified, reverse-chronological record of practices for the Notebook:
 * noticings + part meetings + grounding runs. Experiments are deliberately NOT
 * queried here — they're mutable, so the hook merges them in from useExperiments
 * to keep its optimistic open→done/let-go updates working. Each source is capped
 * before the merge (the merged top-`cap` can never need more than `cap` from any
 * one source), bounding how much we decrypt.
 */
export async function getNotebookTimeline(
  db: SQLiteDatabase,
  key: Uint8Array,
  cap = 200,
): Promise<TimelineItem[]> {
  const entryRows = await db.getAllAsync<EntryListRow>(
    `SELECT id, created_at, flow_id, quality, charge, subject_enc, sketch_enc
     FROM entries ORDER BY created_at DESC LIMIT ?`,
    [cap],
  );
  const sessionRows = await db.getAllAsync<{
    id: string;
    created_at: number;
    flow_id: string | null;
    part_id: string | null;
    part_name: string | null;
    charge_before: number | null;
    charge_after: number | null;
  }>(
    `SELECT s.id, s.created_at, s.flow_id, s.part_id, p.name AS part_name,
            s.charge_before, s.charge_after
     FROM sessions s LEFT JOIN parts p ON s.part_id = p.id
     ORDER BY s.created_at DESC LIMIT ?`,
    [cap],
  );
  const groundingRows = await db.getAllAsync<{
    id: string;
    created_at: number;
    flow_id: string | null;
    note_enc: string | null;
  }>(
    `SELECT id, created_at, flow_id, note_enc
     FROM grounding_logs ORDER BY created_at DESC LIMIT ?`,
    [cap],
  );

  const items: TimelineItem[] = [];
  for (const r of entryRows) {
    items.push({
      kind: 'entry',
      id: r.id,
      at: r.created_at,
      flowId: r.flow_id,
      quality: r.quality,
      charge: r.charge,
      subject: r.subject_enc ? firstLine(decrypt(r.subject_enc, key)) : null,
      sketch: r.sketch_enc ? decrypt(r.sketch_enc, key) : null,
    });
  }
  for (const r of sessionRows) {
    items.push({
      kind: 'session',
      id: r.id,
      at: r.created_at,
      flowId: r.flow_id,
      partId: r.part_id,
      partName: r.part_name,
      chargeBefore: r.charge_before,
      chargeAfter: r.charge_after,
    });
  }
  for (const r of groundingRows) {
    items.push({
      kind: 'grounding',
      id: r.id,
      at: r.created_at,
      flowId: r.flow_id,
      note: r.note_enc ? decrypt(r.note_enc, key) : null,
    });
  }
  return items.sort((a, b) => b.at - a.at).slice(0, cap);
}

export interface EntryDetail {
  id: string;
  created_at: number;
  flow_id: string | null;
  quality: string | null;
  charge: number | null;
  subject: string | null;
  echo: string | null;
  reclaim: string | null;
  /** Decrypted sketch JSON ({ w, h, paths } vector drawing), or null. */
  sketch: string | null;
}

/**
 * Load a single entry by primary key, decrypting the rich reflective fields
 * (subject / echo / reclaim) that the list views never show. Returns null if
 * no entry with that id exists.
 */
export async function getEntryById(
  db: SQLiteDatabase,
  id: string,
  key: Uint8Array,
): Promise<EntryDetail | null> {
  const row = await db.getFirstAsync<{
    id: string;
    created_at: number;
    flow_id: string | null;
    quality: string | null;
    charge: number | null;
    subject_enc: string | null;
    echo_enc: string | null;
    reclaim_enc: string | null;
    sketch_enc: string | null;
  }>(
    `SELECT id, created_at, flow_id, quality, charge, subject_enc, echo_enc, reclaim_enc, sketch_enc
     FROM entries WHERE id = ?`,
    [id],
  );
  if (!row) return null;
  const dec = (val: string | null) => (val ? decrypt(val, key) : null);
  return {
    id: row.id,
    created_at: row.created_at,
    flow_id: row.flow_id,
    quality: row.quality,
    charge: row.charge,
    subject: dec(row.subject_enc),
    echo: dec(row.echo_enc),
    reclaim: dec(row.reclaim_enc),
    sketch: dec(row.sketch_enc),
  };
}

export interface SearchResult extends EntryListItem {
  /** A short window of the matched text, for context in the results list. */
  snippet: string | null;
}

/** A trimmed window of `text` around the first occurrence of `q`. */
function snippetAround(text: string, q: string, pad = 40): string {
  const idx = text.toLowerCase().indexOf(q);
  const flat = (s: string) => s.replace(/\s+/g, ' ').trim();
  if (idx < 0) return flat(text).slice(0, pad * 2);
  const start = Math.max(0, idx - pad);
  const end = Math.min(text.length, idx + q.length + pad);
  return (start > 0 ? '…' : '') + flat(text.slice(start, end)) + (end < text.length ? '…' : '');
}

/**
 * Find entries whose decrypted text (or quality) contains the query. The
 * reflective fields are encrypted at rest, so this decrypts in memory on each
 * search — we never persist a plaintext index. This is "find an entry I wrote",
 * not pattern-mining: no counts, no scoring, plain newest-first. Case-insensitive
 * substring match across subject / echo / reclaim / quality.
 */
export async function searchEntries(
  db: SQLiteDatabase,
  query: string,
  key: Uint8Array,
  limit = 50,
): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const rows = await db.getAllAsync<{
    id: string;
    created_at: number;
    flow_id: string | null;
    quality: string | null;
    charge: number | null;
    subject_enc: string | null;
    echo_enc: string | null;
    reclaim_enc: string | null;
    sketch_enc: string | null;
  }>(
    `SELECT id, created_at, flow_id, quality, charge, subject_enc, echo_enc, reclaim_enc, sketch_enc
     FROM entries
     ORDER BY created_at DESC`,
  );
  const dec = (val: string | null) => (val ? decrypt(val, key) : null);
  const results: SearchResult[] = [];
  for (const row of rows) {
    const subject = dec(row.subject_enc);
    const echo = dec(row.echo_enc);
    const reclaim = dec(row.reclaim_enc);
    const hit = [subject, echo, reclaim, row.quality].find((f) => f && f.toLowerCase().includes(q));
    if (!hit) continue;
    results.push({
      id: row.id,
      created_at: row.created_at,
      flow_id: row.flow_id,
      quality: row.quality,
      charge: row.charge,
      subject: firstLine(subject),
      sketch: dec(row.sketch_enc),
      snippet: snippetAround(hit, q),
    });
    if (results.length >= limit) break;
  }
  return results;
}

export async function getEntryCount(db: SQLiteDatabase): Promise<number> {
  const row = await db.getFirstAsync<{ n: number }>(`SELECT COUNT(*) as n FROM entries`);
  return row?.n ?? 0;
}

/**
 * Distinct flow ids the user has actually run (entries + sessions). Plaintext,
 * no decryption — used to curate the Read bookshelf to recent work, offline.
 */
export async function getUsedFlowIds(db: SQLiteDatabase): Promise<string[]> {
  const rows = await db.getAllAsync<{ flow_id: string | null }>(
    `SELECT DISTINCT flow_id FROM entries WHERE flow_id IS NOT NULL
     UNION SELECT DISTINCT flow_id FROM sessions WHERE flow_id IS NOT NULL`,
  );
  return rows.map((r) => r.flow_id).filter((x): x is string => !!x);
}

/**
 * Candidate older entries for the gentle "something you sat with before" card —
 * only those with reflective content, older than the cutoff, newest first.
 * Selection (and dismissal) happens in the hook; this just supplies the pool.
 */
export async function getResurfacingPool(
  db: SQLiteDatabase,
  key: Uint8Array,
  cutoffMs: number,
  limit = 12,
): Promise<EntryDetail[]> {
  const rows = await db.getAllAsync<{
    id: string;
    created_at: number;
    flow_id: string | null;
    quality: string | null;
    charge: number | null;
    subject_enc: string | null;
    echo_enc: string | null;
    reclaim_enc: string | null;
    sketch_enc: string | null;
  }>(
    `SELECT id, created_at, flow_id, quality, charge, subject_enc, echo_enc, reclaim_enc, sketch_enc
     FROM entries
     WHERE created_at < ? AND (reclaim_enc IS NOT NULL OR subject_enc IS NOT NULL)
     ORDER BY created_at DESC
     LIMIT ?`,
    [cutoffMs, limit],
  );
  const dec = (val: string | null) => (val ? decrypt(val, key) : null);
  return rows.map((row) => ({
    id: row.id,
    created_at: row.created_at,
    flow_id: row.flow_id,
    quality: row.quality,
    charge: row.charge,
    subject: dec(row.subject_enc),
    echo: dec(row.echo_enc),
    reclaim: dec(row.reclaim_enc),
    sketch: dec(row.sketch_enc),
  }));
}

export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const version = row?.user_version ?? 0;

  // WAL speeds up the native build but isn't supported by the web (WASM) VFS —
  // run it on its own and tolerate failure so table creation still proceeds.
  try {
    await db.execAsync("PRAGMA journal_mode = 'wal';");
  } catch {
    // ignore (e.g. on web)
  }

  if (version < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS entries (
        id TEXT PRIMARY KEY NOT NULL,
        created_at INTEGER NOT NULL,
        flow_id TEXT,
        subject_enc TEXT,
        quality TEXT,
        charge INTEGER,
        echo_enc TEXT,
        reclaim_enc TEXT
      );

      CREATE TABLE IF NOT EXISTS parts (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        form_enc TEXT,
        body_location TEXT,
        first_appeared_enc TEXT,
        golden INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL,
        last_met_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY NOT NULL,
        part_id TEXT,
        flow_id TEXT,
        created_at INTEGER NOT NULL,
        charge_before INTEGER,
        charge_after INTEGER,
        dialogue_enc TEXT,
        need_enc TEXT
      );

      CREATE TABLE IF NOT EXISTS experiments (
        id TEXT PRIMARY KEY NOT NULL,
        source_session_id TEXT,
        description_enc TEXT,
        created_at INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'open',
        reflection_enc TEXT
      );
    `);
    await db.execAsync('PRAGMA user_version = 1');
  }

  if (version < 2) {
    // An optional imaginative sketch (Jung's Red Book), stored as encrypted
    // vector-path JSON on the part it belongs to.
    await db.execAsync(`ALTER TABLE parts ADD COLUMN sketch_enc TEXT`);
    await db.execAsync('PRAGMA user_version = 2');
  }

  if (version < 3) {
    // The Red Book reframe: drawing becomes a first-class medium, so a noticing
    // entry can carry its own sketch too — not only a part. Encrypted at rest.
    await db.execAsync(`ALTER TABLE entries ADD COLUMN sketch_enc TEXT`);
    await db.execAsync('PRAGMA user_version = 3');
  }

  if (version < 4) {
    // Grounding practices used to leave no trace. Record each run (practice +
    // time + an optional encrypted anchor note) so it joins the Notebook's
    // unified practice history. Additive — no backfill of past grounding.
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS grounding_logs (
        id TEXT PRIMARY KEY NOT NULL,
        flow_id TEXT,
        created_at INTEGER NOT NULL,
        note_enc TEXT
      );
    `);
    await db.execAsync('PRAGMA user_version = 4');
  }
}

export async function savePart(
  db: SQLiteDatabase,
  inputs: FlowInputs,
  key: Uint8Array,
): Promise<string> {
  const id = generateId();
  const now = Date.now();
  const isGolden = inputs.path === 'golden';

  const name = isGolden
    ? (typeof inputs.goldenQuality === 'string' ? inputs.goldenQuality : null)
    : (typeof inputs.partName === 'string' ? inputs.partName : null);

  const formPayload = isGolden
    ? JSON.stringify({ subject: inputs.goldenSubject })
    : JSON.stringify({ image: inputs.partImage, age: inputs.partAge });

  const bodyLocation = typeof inputs.partBodyLocation === 'string'
    ? inputs.partBodyLocation
    : null;

  const firstAppearedEnc =
    typeof inputs.firstAppeared === 'string' && inputs.firstAppeared.trim()
      ? encrypt(inputs.firstAppeared, key)
      : null;

  // A figure drawn live during the meeting (a `draw` step writing inputKey
  // 'partSketch'); the part screen's sketch editor can still revise it later.
  const sketchEnc =
    typeof inputs.partSketch === 'string' && inputs.partSketch.trim()
      ? encrypt(inputs.partSketch, key)
      : null;

  await db.runAsync(
    `INSERT INTO parts (id, name, form_enc, body_location, first_appeared_enc, sketch_enc, golden, created_at, last_met_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, encrypt(formPayload, key), bodyLocation, firstAppearedEnc, sketchEnc, isGolden ? 1 : 0, now, now],
  );
  return id;
}

export async function saveSession(
  db: SQLiteDatabase,
  inputs: FlowInputs,
  flowId: string,
  partId: string,
  key: Uint8Array,
): Promise<string> {
  const id = generateId();
  const now = Date.now();
  const isGolden = inputs.path === 'golden';

  const dialoguePayload = isGolden
    ? JSON.stringify({ origin: inputs.goldenOrigin })
    : JSON.stringify({
        d1: inputs.dialogue_1,
        d2: inputs.dialogue_2,
        d3: inputs.dialogue_3,
        d4: inputs.dialogue_4,
        d5: inputs.dialogue_5,
      });

  const needPayload = isGolden
    ? (typeof inputs.goldenExperiment === 'string' ? inputs.goldenExperiment : null)
    : (typeof inputs.need === 'string' ? inputs.need : null);

  const chargeAfter = typeof inputs.chargeAfter === 'number' ? inputs.chargeAfter : null;

  await db.runAsync(
    `INSERT INTO sessions
       (id, part_id, flow_id, created_at, charge_before, charge_after, dialogue_enc, need_enc)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      partId,
      flowId,
      now,
      typeof inputs.chargeBefore === 'number' ? inputs.chargeBefore : null,
      chargeAfter,
      encrypt(dialoguePayload, key),
      needPayload ? encrypt(needPayload, key) : null,
    ],
  );
  return id;
}

export async function saveEntry(
  db: SQLiteDatabase,
  inputs: FlowInputs,
  flowId: string,
  key: Uint8Array,
): Promise<void> {
  const id = generateId();
  const now = Date.now();

  const enc = (val: unknown) =>
    typeof val === 'string' && val.trim() ? encrypt(val, key) : null;

  await db.runAsync(
    `INSERT INTO entries
       (id, created_at, flow_id, subject_enc, quality, charge, echo_enc, reclaim_enc, sketch_enc)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      now,
      flowId,
      enc(inputs.subject),
      typeof inputs.quality === 'string' ? inputs.quality : null,
      typeof inputs.charge === 'number' ? inputs.charge : null,
      enc(inputs.echo),
      enc(inputs.reclaim),
      enc(inputs.sketch),
    ],
  );
}

/**
 * Record that a grounding practice was run. Grounding flows capture at most one
 * optional free-text anchor ("name three things you can see"); store it as a
 * private, encrypted note so the history can show a teaser. The mid-flow grounding
 * *offer* inside a noticing/meeting is not a grounding flow, so it never logs here.
 */
export async function saveGrounding(
  db: SQLiteDatabase,
  inputs: FlowInputs,
  flowId: string,
  key: Uint8Array,
): Promise<void> {
  const id = generateId();
  const now = Date.now();
  const note =
    typeof inputs.anchor === 'string' && inputs.anchor.trim() ? inputs.anchor.trim() : null;
  await db.runAsync(
    `INSERT INTO grounding_logs (id, created_at, flow_id, note_enc)
     VALUES (?, ?, ?, ?)`,
    [id, now, flowId, note ? encrypt(note, key) : null],
  );
}

// ─── Integration read-side ────────────────────────────────────────────────────

export interface PartListItem {
  id: string;
  name: string | null;
  body_location: string | null;
  golden: number;
  created_at: number;
  last_met_at: number | null;
  /** Decrypted sketch JSON ({ w, h, paths }), or null — the figure's face. */
  sketch: string | null;
}

export async function getParts(db: SQLiteDatabase, key: Uint8Array): Promise<PartListItem[]> {
  const rows = await db.getAllAsync<{
    id: string;
    name: string | null;
    body_location: string | null;
    golden: number;
    created_at: number;
    last_met_at: number | null;
    sketch_enc: string | null;
  }>(
    `SELECT id, name, body_location, golden, created_at, last_met_at, sketch_enc
     FROM parts
     ORDER BY last_met_at DESC, created_at DESC`,
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    body_location: r.body_location,
    golden: r.golden,
    created_at: r.created_at,
    last_met_at: r.last_met_at,
    sketch: r.sketch_enc ? decrypt(r.sketch_enc, key) : null,
  }));
}

export interface PartSessionItem {
  id: string;
  created_at: number;
  /** The meeting flow that produced this session — used to show its motif. */
  flow_id: string | null;
  charge_before: number | null;
  charge_after: number | null;
  /** Decrypted dialogue JSON ({d1..d5} for difficult, {origin} for golden). */
  dialogue: string | null;
  /** Decrypted need / golden-experiment text. */
  need: string | null;
}

export interface PartDetail {
  id: string;
  name: string | null;
  golden: number;
  body_location: string | null;
  created_at: number;
  last_met_at: number | null;
  /** Decrypted form JSON ({image, age} for difficult, {subject} for golden). */
  form: string | null;
  first_appeared: string | null;
  /** Decrypted sketch JSON ({ w, h, paths } vector drawing), or null. */
  sketch: string | null;
  sessions: PartSessionItem[];
}

/** Load a part with its full (decrypted) meeting history, newest first. */
export async function getPartById(
  db: SQLiteDatabase,
  id: string,
  key: Uint8Array,
): Promise<PartDetail | null> {
  const row = await db.getFirstAsync<{
    id: string;
    name: string | null;
    form_enc: string | null;
    body_location: string | null;
    first_appeared_enc: string | null;
    sketch_enc: string | null;
    golden: number;
    created_at: number;
    last_met_at: number | null;
  }>(
    `SELECT id, name, form_enc, body_location, first_appeared_enc, sketch_enc, golden, created_at, last_met_at
     FROM parts WHERE id = ?`,
    [id],
  );
  if (!row) return null;

  const sessionRows = await db.getAllAsync<{
    id: string;
    created_at: number;
    flow_id: string | null;
    charge_before: number | null;
    charge_after: number | null;
    dialogue_enc: string | null;
    need_enc: string | null;
  }>(
    `SELECT id, created_at, flow_id, charge_before, charge_after, dialogue_enc, need_enc
     FROM sessions WHERE part_id = ? ORDER BY created_at DESC`,
    [id],
  );

  const dec = (val: string | null) => (val ? decrypt(val, key) : null);
  return {
    id: row.id,
    name: row.name,
    golden: row.golden,
    body_location: row.body_location,
    created_at: row.created_at,
    last_met_at: row.last_met_at,
    form: dec(row.form_enc),
    first_appeared: dec(row.first_appeared_enc),
    sketch: dec(row.sketch_enc),
    sessions: sessionRows.map((s) => ({
      id: s.id,
      created_at: s.created_at,
      flow_id: s.flow_id,
      charge_before: s.charge_before,
      charge_after: s.charge_after,
      dialogue: dec(s.dialogue_enc),
      need: dec(s.need_enc),
    })),
  };
}

/** Bump a part's last-met timestamp (used when re-meeting an existing part). */
export async function touchPart(db: SQLiteDatabase, id: string): Promise<void> {
  await db.runAsync(`UPDATE parts SET last_met_at = ? WHERE id = ?`, [Date.now(), id]);
}

/**
 * The id of the most recent meeting session (one tied to a part), or null if
 * none exists. Used to attribute a standalone integration experiment to the
 * part the user most recently sat with — the same meeting its "what came up
 * last time?" prompt refers to — so the integration loop can later invite a
 * return. Without this, experiments carried via the standalone integration
 * flow have no provenance and never surface a return invitation.
 */
export async function getMostRecentSessionId(db: SQLiteDatabase): Promise<string | null> {
  const row = await db.getFirstAsync<{ id: string }>(
    `SELECT id FROM sessions WHERE part_id IS NOT NULL ORDER BY created_at DESC LIMIT 1`,
  );
  return row?.id ?? null;
}

/** Save (or clear, with null) a part's imaginative sketch. `sketchJson` is the
 *  serialized { w, h, paths } drawing; encrypted at rest like every other field. */
export async function savePartSketch(
  db: SQLiteDatabase,
  partId: string,
  sketchJson: string | null,
  key: Uint8Array,
): Promise<void> {
  await db.runAsync(`UPDATE parts SET sketch_enc = ? WHERE id = ?`, [
    sketchJson ? encrypt(sketchJson, key) : null,
    partId,
  ]);
}

/** Wipe every row from every journal table. Schema and migrations are left
 *  intact — only data is removed (used by the "delete everything" reset). */
export async function deleteAllData(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    DELETE FROM entries;
    DELETE FROM parts;
    DELETE FROM sessions;
    DELETE FROM experiments;
    DELETE FROM grounding_logs;
  `);
}

export interface SurfacingPattern {
  quality: string;
  count: number;
  /** Most recent time this quality (family) surfaced, ms since epoch. */
  lastAt: number;
}

export async function getSurfacingPatterns(
  db: SQLiteDatabase,
  limit = 5,
): Promise<SurfacingPattern[]> {
  // Group by normalized quality in SQL, then merge synonym families in JS,
  // carrying the most-recent occurrence so the UI can speak to recency.
  const rows = await db.getAllAsync<{ quality: string; count: number; last_at: number }>(
    `SELECT LOWER(TRIM(quality)) as quality, COUNT(*) as count, MAX(created_at) as last_at
     FROM entries
     WHERE quality IS NOT NULL AND TRIM(quality) != ''
     GROUP BY LOWER(TRIM(quality))`,
  );

  const merged = new Map<string, SurfacingPattern>();
  for (const row of rows) {
    const fam = qualityFamily(row.quality);
    const existing = merged.get(fam);
    if (existing) {
      existing.count += row.count;
      existing.lastAt = Math.max(existing.lastAt, row.last_at);
    } else {
      merged.set(fam, { quality: fam, count: row.count, lastAt: row.last_at });
    }
  }

  return Array.from(merged.values())
    .sort((a, b) => b.count - a.count || b.lastAt - a.lastAt)
    .slice(0, limit);
}

export interface ExperimentItem {
  id: string;
  description: string;
  created_at: number;
  status: 'open' | 'done' | 'let-go';
}

export async function getExperiments(
  db: SQLiteDatabase,
  key: Uint8Array,
): Promise<ExperimentItem[]> {
  const rows = await db.getAllAsync<{
    id: string;
    description_enc: string | null;
    created_at: number;
    status: string;
  }>(
    `SELECT id, description_enc, created_at, status
     FROM experiments
     ORDER BY created_at DESC`,
  );
  return rows.map((row) => ({
    id: row.id,
    description: row.description_enc ? decrypt(row.description_enc, key) : '',
    created_at: row.created_at,
    status: row.status as ExperimentItem['status'],
  }));
}

export async function updateExperimentStatus(
  db: SQLiteDatabase,
  id: string,
  status: 'open' | 'done' | 'let-go',
): Promise<void> {
  await db.runAsync(`UPDATE experiments SET status = ? WHERE id = ?`, [status, id]);
}

export async function addExperiment(
  db: SQLiteDatabase,
  description: string,
  key: Uint8Array,
  sourceSessionId?: string,
): Promise<void> {
  const id = generateId();
  const now = Date.now();
  await db.runAsync(
    `INSERT INTO experiments (id, source_session_id, description_enc, created_at, status)
     VALUES (?, ?, ?, ?, 'open')`,
    [id, sourceSessionId ?? null, encrypt(description, key), now],
  );
}

// ─── Restore from backup ──────────────────────────────────────────────────────
// Each function re-encrypts plaintext fields with the device key before
// inserting. INSERT OR IGNORE means re-importing the same backup is idempotent.

export async function restoreEntries(
  db: SQLiteDatabase,
  entries: ExportEntry[],
  key: Uint8Array,
): Promise<number> {
  let inserted = 0;
  for (const e of entries) {
    const result = await db.runAsync(
      `INSERT OR IGNORE INTO entries
         (id, created_at, flow_id, subject_enc, quality, charge, echo_enc, reclaim_enc, sketch_enc)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        e.id,
        e.created_at,
        e.flow_id,
        e.subject ? encrypt(e.subject, key) : null,
        e.quality,
        e.charge,
        e.echo ? encrypt(e.echo, key) : null,
        e.reclaim ? encrypt(e.reclaim, key) : null,
        e.sketch ? encrypt(e.sketch, key) : null,
      ],
    );
    if (result.changes > 0) inserted++;
  }
  return inserted;
}

export async function restoreParts(
  db: SQLiteDatabase,
  parts: ExportPart[],
  key: Uint8Array,
): Promise<number> {
  let inserted = 0;
  for (const p of parts) {
    const result = await db.runAsync(
      `INSERT OR IGNORE INTO parts
         (id, name, form_enc, body_location, first_appeared_enc, sketch_enc, golden, created_at, last_met_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id,
        p.name,
        p.form ? encrypt(p.form, key) : null,
        p.body_location,
        p.first_appeared ? encrypt(p.first_appeared, key) : null,
        p.sketch ? encrypt(p.sketch, key) : null,
        p.golden,
        p.created_at,
        p.last_met_at,
      ],
    );
    if (result.changes > 0) inserted++;
  }
  return inserted;
}

export async function restoreSessions(
  db: SQLiteDatabase,
  sessions: ExportSession[],
  key: Uint8Array,
): Promise<number> {
  let inserted = 0;
  for (const s of sessions) {
    const result = await db.runAsync(
      `INSERT OR IGNORE INTO sessions
         (id, part_id, flow_id, created_at, charge_before, charge_after, dialogue_enc, need_enc)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        s.id,
        s.part_id,
        s.flow_id,
        s.created_at,
        s.charge_before,
        s.charge_after,
        s.dialogue ? encrypt(s.dialogue, key) : null,
        s.need ? encrypt(s.need, key) : null,
      ],
    );
    if (result.changes > 0) inserted++;
  }
  return inserted;
}

export async function restoreExperiments(
  db: SQLiteDatabase,
  experiments: ExportExperiment[],
  key: Uint8Array,
): Promise<number> {
  let inserted = 0;
  for (const e of experiments) {
    const result = await db.runAsync(
      `INSERT OR IGNORE INTO experiments
         (id, source_session_id, description_enc, created_at, status, reflection_enc)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        e.id,
        e.source_session_id,
        e.description ? encrypt(e.description, key) : null,
        e.created_at,
        e.status,
        e.reflection ? encrypt(e.reflection, key) : null,
      ],
    );
    if (result.changes > 0) inserted++;
  }
  return inserted;
}

export async function restoreGrounding(
  db: SQLiteDatabase,
  logs: ExportGrounding[],
  key: Uint8Array,
): Promise<number> {
  let inserted = 0;
  for (const g of logs) {
    const result = await db.runAsync(
      `INSERT OR IGNORE INTO grounding_logs (id, created_at, flow_id, note_enc)
       VALUES (?, ?, ?, ?)`,
      [g.id, g.created_at, g.flow_id, g.note ? encrypt(g.note, key) : null],
    );
    if (result.changes > 0) inserted++;
  }
  return inserted;
}

// ─── Experiment helpers ───────────────────────────────────────────────────────

/**
 * Load a single experiment by primary key, decrypting its description.
 * Returns null if no experiment with that id exists.
 */
export async function getExperimentById(
  db: SQLiteDatabase,
  id: string,
  key: Uint8Array,
): Promise<ExperimentItem | null> {
  const row = await db.getFirstAsync<{
    id: string;
    description_enc: string | null;
    created_at: number;
    status: string;
  }>(
    `SELECT id, description_enc, created_at, status FROM experiments WHERE id = ?`,
    [id],
  );
  if (!row) return null;
  return {
    id: row.id,
    description: row.description_enc ? decrypt(row.description_enc, key) : '',
    created_at: row.created_at,
    status: row.status as ExperimentItem['status'],
  };
}

/**
 * Save a reflection on an experiment and update its status.
 * Encrypts the reflection text before writing.
 */
export async function saveExperimentReflection(
  db: SQLiteDatabase,
  id: string,
  reflection: string,
  status: 'open' | 'done' | 'let-go',
  key: Uint8Array,
): Promise<void> {
  await db.runAsync(
    `UPDATE experiments SET reflection_enc = ?, status = ? WHERE id = ?`,
    [encrypt(reflection, key), status, id],
  );
}
