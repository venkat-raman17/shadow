import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { useCrypto } from '@/context/CryptoContext';
import {
  getParts,
  getPartById,
  getSurfacingPatterns,
  getExperiments,
  getReturnableParts,
  PartListItem,
  PartDetail,
  SurfacingPattern,
  ExperimentItem,
  ReturnablePart,
} from '@/lib/db';

const DAY_MS = 24 * 60 * 60 * 1000;

export function useParts(): PartListItem[] {
  const db = useSQLiteContext();
  const [parts, setParts] = useState<PartListItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getParts(db).then((rows) => {
        if (active) setParts(rows);
      }).catch(e => console.warn('[useIntegration]', e));
      return () => {
        active = false;
      };
    }, [db]),
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

/**
 * A part that's ripe to return to: it has a closed experiment behind it and
 * hasn't been met in a while. A gentle, dismissible nudge — never a notification.
 */
export function useReturnInvitation(minDaysSinceMet = 5): ReturnablePart | null {
  const db = useSQLiteContext();
  const [part, setPart] = useState<ReturnablePart | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getReturnableParts(db).then((rows) => {
        if (!active) return;
        const cutoff = Date.now() - minDaysSinceMet * DAY_MS;
        setPart(rows.find((r) => !r.last_met_at || r.last_met_at < cutoff) ?? null);
      }).catch(e => console.warn('[useIntegration]', e));
      return () => {
        active = false;
      };
    }, [db, minDaysSinceMet]),
  );

  return part;
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
