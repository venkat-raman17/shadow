import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { useCrypto } from '@/context/CryptoContext';
import {
  getRecentEntries,
  getEntriesByQuality,
  getEntryById,
  getEntryCount,
  getResurfacingPool,
  EntryListItem,
  EntryDetail,
} from '@/lib/db';

const DAY_MS = 24 * 60 * 60 * 1000;

// Entries the user has waved away this session. Resets on app restart — we
// never persist or nag, so resurfacing stays a gentle, in-the-moment offer.
const dismissedResurfacing = new Set<string>();

export function useRecentEntries(limit = 20): EntryListItem[] {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const [entries, setEntries] = useState<EntryListItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!key) return;
      let active = true;
      getRecentEntries(db, key, limit).then((rows) => {
        if (active) setEntries(rows);
      }).catch(e => console.warn('[useEntries]', e));
      return () => {
        active = false;
      };
    }, [db, key, limit]),
  );

  return entries;
}

/** Entries whose quality belongs to the given family. Empty when no quality. */
export function useEntriesByQuality(quality: string | undefined, limit = 200): EntryListItem[] {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const [entries, setEntries] = useState<EntryListItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!key || !quality) return;
      let active = true;
      getEntriesByQuality(db, quality, key, limit).then((rows) => {
        if (active) setEntries(rows);
      }).catch(e => console.warn('[useEntries]', e));
      return () => {
        active = false;
      };
    }, [db, key, quality, limit]),
  );

  return entries;
}

/**
 * One older reflection to gently resurface, or null. Pull-only (loads on focus,
 * never pushed), gated on a minimum amount of history, prefers entries carrying
 * an integrative "reclaim" note, and respects this session's dismissals.
 */
export function useResurfacing(
  minEntries = 5,
  olderThanDays = 7,
): { entry: EntryDetail | null; dismiss: () => void } {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const [entry, setEntry] = useState<EntryDetail | null>(null);
  const activeRef = useRef(false);

  const load = useCallback(() => {
    if (!key) return;
    getEntryCount(db).then((count) => {
      if (!activeRef.current) return;
      if (count < minEntries) {
        setEntry(null);
        return;
      }
      getResurfacingPool(db, key, Date.now() - olderThanDays * DAY_MS).then((pool) => {
        if (!activeRef.current) return;
        const fresh = pool.filter((e) => !dismissedResurfacing.has(e.id));
        const withReclaim = fresh.filter((e) => e.reclaim && e.reclaim.trim());
        setEntry(withReclaim[0] ?? fresh[0] ?? null);
      }).catch(e => console.warn('[useEntries]', e));
    }).catch(e => console.warn('[useEntries]', e));
  }, [db, key, minEntries, olderThanDays]);

  useFocusEffect(
    useCallback(() => {
      activeRef.current = true;
      load();
      return () => {
        activeRef.current = false;
      };
    }, [load]),
  );

  const dismiss = useCallback(() => {
    if (entry) dismissedResurfacing.add(entry.id);
    load();
  }, [entry, load]);

  return { entry, dismiss };
}

/** Load one full entry (with decrypted subject/echo/reclaim). */
export function useEntry(id: string | undefined): {
  entry: EntryDetail | null;
  loading: boolean;
} {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const [entry, setEntry] = useState<EntryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!id || !key) return;
      let active = true;
      setLoading(true);
      getEntryById(db, id, key).then((e) => {
        if (!active) return;
        setEntry(e);
        setLoading(false);
      }).catch(e => console.warn('[useEntries]', e));
      return () => {
        active = false;
      };
    }, [db, id, key]),
  );

  return { entry, loading };
}
