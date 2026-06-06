import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { useCrypto } from '@/context/CryptoContext';
import {
  getParts,
  getSurfacingPatterns,
  getExperiments,
  PartListItem,
  SurfacingPattern,
  ExperimentItem,
} from '@/lib/db';

export function useParts(): PartListItem[] {
  const db = useSQLiteContext();
  const [parts, setParts] = useState<PartListItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      getParts(db).then(setParts);
    }, [db]),
  );

  return parts;
}

export function useSurfacingPatterns(limit = 5): SurfacingPattern[] {
  const db = useSQLiteContext();
  const [patterns, setPatterns] = useState<SurfacingPattern[]>([]);

  useFocusEffect(
    useCallback(() => {
      getSurfacingPatterns(db, limit).then(setPatterns);
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
      getExperiments(db, key).then(setExperiments);
    }, [db, key]),
  );

  return { experiments, setExperiments };
}
