import type { SQLiteDatabase } from 'expo-sqlite';

import { encrypt, decrypt } from './crypto';
import type { ExportEntry, ExportPart, ExportSession, ExportExperiment } from './export';
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
  quality: string | null;
  charge: number | null;
  /** Decrypted first line of the entry's subject — used as a readable teaser. */
  subject: string | null;
}

interface EntryListRow {
  id: string;
  created_at: number;
  quality: string | null;
  charge: number | null;
  subject_enc: string | null;
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
    quality: row.quality,
    charge: row.charge,
    subject: row.subject_enc ? firstLine(decrypt(row.subject_enc, key)) : null,
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
    `SELECT id, created_at, quality, charge, subject_enc
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
    `SELECT id, created_at, quality, charge, subject_enc
     FROM entries
     WHERE quality IS NOT NULL AND TRIM(quality) != ''
     ORDER BY created_at DESC`,
  );
  return rows
    .filter((row) => row.quality && qualityFamily(row.quality) === target)
    .slice(0, limit)
    .map((row) => toListItem(row, key));
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
  }>(
    `SELECT id, created_at, flow_id, quality, charge, subject_enc, echo_enc, reclaim_enc
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
    quality: string | null;
    charge: number | null;
    subject_enc: string | null;
    echo_enc: string | null;
    reclaim_enc: string | null;
  }>(
    `SELECT id, created_at, quality, charge, subject_enc, echo_enc, reclaim_enc
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
      quality: row.quality,
      charge: row.charge,
      subject: firstLine(subject),
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
  }>(
    `SELECT id, created_at, flow_id, quality, charge, subject_enc, echo_enc, reclaim_enc
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

  await db.runAsync(
    `INSERT INTO parts (id, name, form_enc, body_location, first_appeared_enc, golden, created_at, last_met_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, encrypt(formPayload, key), bodyLocation, firstAppearedEnc, isGolden ? 1 : 0, now, now],
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
       (id, created_at, flow_id, subject_enc, quality, charge, echo_enc, reclaim_enc)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      now,
      flowId,
      enc(inputs.subject),
      typeof inputs.quality === 'string' ? inputs.quality : null,
      typeof inputs.charge === 'number' ? inputs.charge : null,
      enc(inputs.echo),
      enc(inputs.reclaim),
    ],
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
}

export async function getParts(db: SQLiteDatabase): Promise<PartListItem[]> {
  return db.getAllAsync<PartListItem>(
    `SELECT id, name, body_location, golden, created_at, last_met_at
     FROM parts
     ORDER BY last_met_at DESC, created_at DESC`,
  );
}

export interface PartSessionItem {
  id: string;
  created_at: number;
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
    charge_before: number | null;
    charge_after: number | null;
    dialogue_enc: string | null;
    need_enc: string | null;
  }>(
    `SELECT id, created_at, charge_before, charge_after, dialogue_enc, need_enc
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
  `);
}

export interface ReturnablePart {
  id: string;
  name: string | null;
  last_met_at: number | null;
}

/**
 * Parts that have a CLOSED experiment linked to one of their sessions — the
 * integration loop is open to a return ("sit with this again — what's shifted?").
 * Provenance comes from experiments.source_session_id, populated whether the
 * experiment was seeded inline at the end of a meeting or carried later via the
 * standalone integration flow (attributed to the most recent meeting).
 * Longest-since-met first.
 */
export async function getReturnableParts(db: SQLiteDatabase): Promise<ReturnablePart[]> {
  return db.getAllAsync<ReturnablePart>(
    `SELECT p.id as id, p.name as name, p.last_met_at as last_met_at
     FROM experiments e
     JOIN sessions s ON e.source_session_id = s.id
     JOIN parts p ON s.part_id = p.id
     WHERE e.source_session_id IS NOT NULL AND e.status != 'open'
     GROUP BY p.id
     ORDER BY p.last_met_at ASC`,
  );
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
         (id, created_at, flow_id, subject_enc, quality, charge, echo_enc, reclaim_enc)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        e.id,
        e.created_at,
        e.flow_id,
        e.subject ? encrypt(e.subject, key) : null,
        e.quality,
        e.charge,
        e.echo ? encrypt(e.echo, key) : null,
        e.reclaim ? encrypt(e.reclaim, key) : null,
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
