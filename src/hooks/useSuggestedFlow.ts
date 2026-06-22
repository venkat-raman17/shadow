import { suggestFlow } from '@/lib/threshold';
import { useParts, useSurfacingPatterns, useExperiments } from '@/hooks/useIntegration';
import { useHasPriorWork } from '@/hooks/useProgress';
import { useUserProfile } from '@/hooks/useUserProfile';

/**
 * The flow to gently offer as "a place to start" — the single home for the
 * adaptive suggestion, shared by Home ("Begin where I am" fallback) and the
 * Workshop ("If you'd like a place to start"), so the two never drift. All the
 * deterministic logic lives in suggestFlow; this hook just gathers the on-device
 * signals (no tracking, no new state).
 */
export function useSuggestedFlow(): string {
  const hasPriorWork = useHasPriorWork();
  const patterns = useSurfacingPatterns(1);
  const parts = useParts();
  const { experiments } = useExperiments();
  const profile = useUserProfile();

  return suggestFlow({
    firstRun: !hasPriorWork,
    topPatternCount: patterns[0]?.count ?? 0,
    hasParts: parts.length > 0,
    hasOpenExperiment: experiments.some((e) => e.status === 'open'),
    gender: profile?.gender,
    hour: new Date().getHours(),
  });
}
