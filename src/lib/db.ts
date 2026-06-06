import type { SQLiteDatabase } from 'expo-sqlite';

import { encrypt, decrypt } from './crypto';

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
import type { FlowInputs } from '@/types/flow';

export interface EntryListItem {
  id: string;
  created_at: number;
  quality: string | null;
  charge: number | null;
}

export async function getRecentEntries(
  db: SQLiteDatabase,
  limit = 20,
): Promise<EntryListItem[]> {
  return db.getAllAsync<EntryListItem>(
    `SELECT id, created_at, quality, charge
     FROM entries
     ORDER BY created_at DESC
     LIMIT ?`,
    [limit],
  );
}

export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const version = row?.user_version ?? 0;

  if (version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

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

  await db.runAsync(
    `INSERT INTO parts (id, name, form_enc, body_location, golden, created_at, last_met_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, name, encrypt(formPayload, key), bodyLocation, isGolden ? 1 : 0, now, now],
  );
  return id;
}

export async function saveSession(
  db: SQLiteDatabase,
  inputs: FlowInputs,
  flowId: string,
  partId: string,
  key: Uint8Array,
): Promise<void> {
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
      null,
      chargeAfter,
      encrypt(dialoguePayload, key),
      needPayload ? encrypt(needPayload, key) : null,
    ],
  );
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

export interface SurfacingPattern {
  quality: string;
  count: number;
}

export async function getSurfacingPatterns(
  db: SQLiteDatabase,
  limit = 5,
): Promise<SurfacingPattern[]> {
  return db.getAllAsync<SurfacingPattern>(
    `SELECT quality, COUNT(*) as count
     FROM entries
     WHERE quality IS NOT NULL AND quality != ''
     GROUP BY quality
     ORDER BY count DESC
     LIMIT ?`,
    [limit],
  );
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
): Promise<void> {
  const id = generateId();
  const now = Date.now();
  await db.runAsync(
    `INSERT INTO experiments (id, description_enc, created_at, status)
     VALUES (?, ?, ?, 'open')`,
    [id, encrypt(description, key), now],
  );
}
