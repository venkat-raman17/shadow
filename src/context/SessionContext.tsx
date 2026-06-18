import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { getItem } from '@/lib/kv';

interface SessionValue {
  /** null while loading; true once name + gender + completion are all stored. */
  onboardingDone: boolean | null;
  /** Re-read the onboarding keys — call after completing or resetting onboarding. */
  refresh: () => Promise<void>;
}

const SessionContext = createContext<SessionValue>({
  onboardingDone: null,
  refresh: async () => {},
});

/**
 * Holds whether the user has finished onboarding, derived from SecureStore.
 * Making it a reactive context (rather than a one-shot read in _layout) lets
 * onboarding completion AND a "delete everything" reset flip the navigation gate
 * live, with no app reload.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);

  const refresh = useCallback(async () => {
    const [complete, name, gender] = await Promise.all([
      getItem('shadow.onboarding_complete'),
      getItem('shadow.user_name'),
      getItem('shadow.user_gender'),
    ]);
    setOnboardingDone(complete === 'true' && !!name && !!gender);
  }, []);

  useEffect(() => {
    // Loads from SecureStore; the setState happens after I/O, not synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return (
    <SessionContext.Provider value={{ onboardingDone, refresh }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionValue {
  return useContext(SessionContext);
}
