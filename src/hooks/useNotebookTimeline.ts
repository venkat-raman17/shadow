import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { useCrypto } from '@/context/CryptoContext';
import { getNotebookTimeline, updateExperimentStatus, type TimelineItem } from '@/lib/db';
import { useExperiments } from '@/hooks/useIntegration';

/**
 * The Notebook's unified practice history. Loads the immutable record (entries +
 * meetings + grounding) via getNotebookTimeline and merges in the mutable
 * experiments from useExperiments so their open→done/let-go updates stay
 * optimistic. Returns the merged, reverse-chron, capped list plus a setter that
 * mirrors the optimistic status-change pattern used by the timeline.
 */
export function useNotebookTimeline(cap = 200): {
  items: TimelineItem[];
  setExperimentStatus: (id: string, status: 'done' | 'let-go') => Promise<void>;
} {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  // entries + sessions + grounding (immutable record)
  const [base, setBase] = useState<TimelineItem[]>([]);
  const { experiments, setExperiments } = useExperiments();

  useFocusEffect(
    useCallback(() => {
      if (!key) return;
      let active = true;
      getNotebookTimeline(db, key, cap)
        .then((rows) => {
          if (active) setBase(rows);
        })
        .catch((e) => console.warn('[useNotebookTimeline]', e));
      return () => {
        active = false;
      };
    }, [db, key, cap]),
  );

  const items = useMemo(() => {
    const expItems: TimelineItem[] = experiments.map((e) => ({
      kind: 'experiment',
      id: e.id,
      at: e.created_at,
      description: e.description,
      status: e.status,
    }));
    return [...base, ...expItems].sort((a, b) => b.at - a.at).slice(0, cap);
  }, [base, experiments, cap]);

  const setExperimentStatus = useCallback(
    async (id: string, status: 'done' | 'let-go') => {
      await updateExperimentStatus(db, id, status);
      setExperiments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    },
    [db, setExperiments],
  );

  return { items, setExperimentStatus };
}
