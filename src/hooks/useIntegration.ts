import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { useCrypto } from '@/context/CryptoContext';
import {
  getParts,
  getPartById,
  getSurfacingPatterns,
  getExperiments,
  getUsedFlowIds,
  PartListItem,
  PartDetail,
  SurfacingPattern,
  ExperimentItem,
} from '@/lib/db';

const DAY_MS = 24 * 60 * 60 * 1000;

export function useParts(): PartListItem[] {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const [parts, setParts] = useState<PartListItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!key) return;
      let active = true;
      getParts(db, key).then((rows) => {
        if (active) setParts(rows);
      }).catch(e => console.warn('[useIntegration]', e));
      return () => {
        active = false;
      };
    }, [db, key]),
  );

  return parts;
}

export function usePart(id: string | undefined): { part: PartDetail | null; loading: boolean } {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const [part, setPart] = useState<PartDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!id || !key) return;
      let active = true;
      setLoading(true);
      getPartById(db, id, key).then((p) => {
        if (!active) return;
        setPart(p);
        setLoading(false);
      }).catch(e => console.warn('[useIntegration]', e));
      return () => {
        active = false;
      };
    }, [db, id, key]),
  );

  return { part, loading };
}

/** Flow ids the user has run — curates the Read bookshelf to recent work. */
export function useUsedFlowIds(): string[] {
  const db = useSQLiteContext();
  const [ids, setIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getUsedFlowIds(db)
        .then((rows) => {
          if (active) setIds(rows);
        })
        .catch((e) => console.warn('[useIntegration]', e));
      return () => {
        active = false;
      };
    }, [db]),
  );

  return ids;
}

export function useSurfacingPatterns(limit = 5): SurfacingPattern[] {
  const db = useSQLiteContext();
  const [patterns, setPatterns] = useState<SurfacingPattern[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getSurfacingPatterns(db, limit).then((rows) => {
        if (active) setPatterns(rows);
      }).catch(e => console.warn('[useIntegration]', e));
      return () => {
        active = false;
      };
    }, [db, limit]),
  );

  return patterns;
}

export function useExperiments(): {
  experiments: ExperimentItem[];
  setExperiments: React.Dispatch<React.SetStateAction<ExperimentItem[]>>;
} {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const [experiments, setExperiments] = useState<ExperimentItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!key) return;
      let active = true;
      getExperiments(db, key).then((rows) => {
        if (active) setExperiments(rows);
      }).catch(e => console.warn('[useIntegration]', e));
      return () => {
        active = false;
      };
    }, [db, key]),
  );

  return { experiments, setExperiments };
}
