import { useEffect, useState } from 'react';

import { useRecentEntries } from '@/hooks/useEntries';
import { useParts, useExperiments } from '@/hooks/useIntegration';
import { getPreviousOpenAt } from '@/lib/usage';

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Whether the user has any prior work at all — the single gate behind
 * progressive disclosure (sit/carry unlocking, first-run UI). Defined once so
 * the Home screen and the Practices browser can't drift apart on what "a
 * newcomer" means.
 */
export function useHasPriorWork(): boolean {
  const entries = useRecentEntries(1);
  const parts = useParts();
  const { experiments } = useExperiments();
  return entries.length > 0 || parts.length > 0 || experiments.length > 0;
}

/**
 * Whole days since the previous visit, or null if unknown / first launch.
 * Read-once on mount — used only to soften re-entry, never to score or shame.
 */
export function useDaysSinceLastVisit(): number | null {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    getPreviousOpenAt().then((prev) => {
      if (!active || prev === null) return;
      setDays(Math.floor((Date.now() - prev) / DAY_MS));
    });
    return () => {
      active = false;
    };
  }, []);

  return days;
}
