import type { SQLiteDatabase } from 'expo-sqlite';

import { deleteAllData } from '@/lib/db';
import { setItem } from '@/lib/kv';
import { cancelNotification } from '@/lib/notifications';
import { BACKUP_KEYS } from '@/lib/backupKeys';

// What a wipe clears is exactly what a backup captures — every SecureStore key
// except the encryption master key (`shadow.enc.key`), which is preserved so the
// now-empty DB can still encrypt fresh data.
const RESET_KEYS = BACKUP_KEYS;

/**
 * Erase all journal data and user preferences, returning the app to a fresh
 * "new user" state (the navigation gate then drops to onboarding via
 * SessionContext.refresh). The device encryption key is intentionally preserved.
 */
export async function resetAllData(db: SQLiteDatabase): Promise<void> {
  await deleteAllData(db);
  await cancelNotification();
  // Use setItem('') rather than removeItem — sets keys to empty so getItem
  // returns '' which all gate checks treat as unset, and avoids any module
  // caching issue with the removeItem export.
  await Promise.all(RESET_KEYS.map((k) => setItem(k, '')));
}
