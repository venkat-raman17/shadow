import * as LocalAuthentication from 'expo-local-authentication';

import { getItem, setItem } from '@/lib/kv';

const ENABLED_KEY = 'shadow.app_lock_enabled';

/**
 * Optional app lock. OFF by default; the whole app behaves exactly as before
 * unless the user turns it on in Settings. Everything here fails OPEN — if the
 * platform can't authenticate, we never strand the user out of their own
 * journal. Uses the OS biometric prompt with device-passcode fallback; we store
 * no PIN of our own.
 */

export async function isLockEnabled(): Promise<boolean> {
  return (await getItem(ENABLED_KEY)) === 'true';
}

export async function setLockEnabled(enabled: boolean): Promise<void> {
  await setItem(ENABLED_KEY, enabled ? 'true' : 'false');
}

/** Whether this device has any authentication the user could unlock with. */
export async function canAuthenticate(): Promise<boolean> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return false;
    // Enrolled biometrics, or a device passcode we can fall back to.
    const level = await LocalAuthentication.getEnrolledLevelAsync();
    return level !== LocalAuthentication.SecurityLevel.NONE;
  } catch {
    return false;
  }
}

/**
 * Run the OS auth prompt (biometric → device passcode fallback). Returns true
 * on success. On any error returns false so callers can decide; the lock screen
 * keeps a manual retry, and enabling is gated on a successful prompt.
 */
export async function authenticate(): Promise<boolean> {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock Partwise',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });
    return result.success;
  } catch {
    return false;
  }
}
