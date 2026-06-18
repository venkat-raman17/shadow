import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { authenticate, isLockEnabled } from '@/lib/appLock';

// A short, invisible grace window so a quick app-switch (glancing at a
// notification, copying a crisis number) doesn't force a re-auth. Never shown
// to the user — no countdown, no setting.
const GRACE_MS = 30 * 1000;

function now(): number {
  return Date.now();
}

/**
 * Drives the optional app lock. `enabled` is null while the flag loads. When
 * enabled, the app starts locked and re-locks after returning from a long-enough
 * background. Fails open: a failed/cancelled prompt simply leaves the lock
 * screen up with a retry — it never erases data or strands the user.
 */
export function useAppLock() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [locked, setLocked] = useState(false);
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    isLockEnabled().then((on) => {
      if (!mounted) return;
      setEnabled(on);
      setLocked(on);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onChange = (next: AppStateStatus) => {
      if (next === 'background' || next === 'inactive') {
        if (backgroundedAt.current === null) backgroundedAt.current = now();
      } else if (next === 'active') {
        const since = backgroundedAt.current;
        backgroundedAt.current = null;
        if (since !== null && now() - since > GRACE_MS) {
          // Read the flag fresh so toggling lock on in Settings takes effect on
          // the next return, without an app restart.
          isLockEnabled().then((on) => {
            if (on) setLocked(true);
          });
        }
      }
    };
    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);

  const unlock = useCallback(async () => {
    const ok = await authenticate();
    if (ok) setLocked(false);
    return ok;
  }, []);

  return { enabled, locked, unlock };
}
