import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import { getItem, setItem } from '@/lib/kv';

const NOTIF_ID_KEY = 'shadow.notif.id';
const NOTIF_HOUR_KEY = 'shadow.notif.hour';

// Fixed copy — non-pressuring, fully invitational, no reference to absence or streaks
const NOTIF_TITLE = "When you're ready.";
const NOTIF_BODY = 'Your practice is here.';

/**
 * Request notification permission.
 * Returns true if granted. On iOS, uses ios.status per SDK 56 guidance.
 */
export async function requestPermission(): Promise<boolean> {
  // Scheduled local notifications aren't supported on web — treat as unavailable.
  if (Platform.OS === 'web') return false;
  const result = await Notifications.requestPermissionsAsync();
  return result.granted;
}

/**
 * Schedule a repeating daily notification at the given hour:minute.
 * Cancels any previously scheduled notification first.
 */
export async function scheduleDaily(hour: number, minute: number): Promise<void> {
  if (Platform.OS === 'web') return;
  const existingId = await getItem(NOTIF_ID_KEY);
  if (existingId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(existingId);
    } catch {
      // May already be gone — ignore
    }
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: NOTIF_TITLE,
      body: NOTIF_BODY,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });

  await setItem(NOTIF_ID_KEY, id);
  await setItem(NOTIF_HOUR_KEY, String(hour));
}

/**
 * Cancel the active scheduled notification and clear stored state.
 */
export async function cancelNotification(): Promise<void> {
  if (Platform.OS === 'web') return;
  const existingId = await getItem(NOTIF_ID_KEY);
  if (existingId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(existingId);
    } catch {
      // Ignore — may already be gone
    }
  }
  await setItem(NOTIF_ID_KEY, '');
  await setItem(NOTIF_HOUR_KEY, '');
}

/**
 * Returns the currently scheduled hour (0–23), or null if no notification is active.
 */
export async function getScheduledHour(): Promise<number | null> {
  const h = await getItem(NOTIF_HOUR_KEY);
  if (!h) return null;
  const parsed = parseInt(h, 10);
  return isNaN(parsed) ? null : parsed;
}
