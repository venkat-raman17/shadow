import type { SQLiteDatabase } from 'expo-sqlite';

import { deleteAllData } from '@/lib/db';
import { removeItem } from '@/lib/kv';
import { cancelNotification } from '@/lib/notifications';

// Every SecureStore key the app writes, EXCEPT the encryption master key
// (`shadow.db_key`) — kept so the now-empty DB can still encrypt fresh data.
const RESET_KEYS = [
  'shadow.onboarding_complete',
  'shadow.user_name',
  'shadow.user_gender',
  'shadow.favorite_flow_ids',
  'shadow.depths_seen',
  'shadow.theme',
  'shadow.app_lock_enabled',
];

/**
 * Erase all journal data and user preferences, returning the app to a fresh
 * "new user" state (the navigation gate then drops to onboarding via
 * SessionContext.refresh). The device encryption key is intentionally preserved.
 */
export async function resetAllData(db: SQLiteDatabase): Promise<void> {
  await deleteAllData(db);
  await cancelNotification();
  await Promise.all(RESET_KEYS.map((k) => removeItem(k)));
}
