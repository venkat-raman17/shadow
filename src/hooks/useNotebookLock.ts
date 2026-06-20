import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { useFocusEffect } from 'expo-router';

import {
  isNotebookLockEnabled,
  verifyPin,
  canUseBiometric,
  authenticateBiometric,
} from '@/lib/notebookLock';

// Same invisible grace as the app lock: a quick glance away (a notification, a
// copied crisis number) shouldn't force a re-entry. Never shown to the user.
const GRACE_MS = 30 * 1000;

/**
 * Drives the optional Notebook PIN lock — scoped to the Notebook tab, not the
 * whole app. `enabled` is null while the flag loads. Re-locks on cold start, on
 * resume from a long-enough background, and the moment a PIN is newly enabled in
 * Settings. It deliberately does NOT re-lock on ordinary in-app navigation (the
 * tab stays mounted), so opening one of your own entries and coming back never
 * re-prompts. Fails toward "ask again" — a failed/cancelled unlock just leaves
 * the pad up, never erases anything.
 */
export function useNotebookLock() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [locked, setLocked] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const backgroundedAt = useRef<number | null>(null);
  const enabledRef = useRef<boolean | null>(null);

  // Read the flag on focus so enabling/disabling in Settings takes effect on
  // return, and lock when it has just become enabled (prev !== true).
  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const on = await isNotebookLockEnabled();
        if (!active) return;
        const prev = enabledRef.current;
        enabledRef.current = on;
        setEnabled(on);
        if (on && prev !== true) setLocked(true);
        if (!on) setLocked(false);
        setBiometricAvailable(on ? await canUseBiometric() : false);
      })();
      return () => {
        active = false;
      };
    }, []),
  );

  useEffect(() => {
    const onChange = (next: AppStateStatus) => {
      if (next === 'background' || next === 'inactive') {
        if (backgroundedAt.current === null) backgroundedAt.current = Date.now();
      } else if (next === 'active') {
        const since = backgroundedAt.current;
        backgroundedAt.current = null;
        if (since !== null && Date.now() - since > GRACE_MS) {
          isNotebookLockEnabled().then((on) => {
            if (on) setLocked(true);
          });
          canUseBiometric().then(setBiometricAvailable);
        }
      }
    };
    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);

  const unlockWithPin = useCallback(async (pin: string) => {
    const ok = await verifyPin(pin);
    if (ok) setLocked(false);
    return ok;
  }, []);

  const unlockWithBiometric = useCallback(async () => {
    const ok = await authenticateBiometric();
    if (ok) setLocked(false);
    return ok;
  }, []);

  return { enabled, locked, biometricAvailable, unlockWithPin, unlockWithBiometric };
}
