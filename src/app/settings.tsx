import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';

import { colors, typography, Spacing } from '@/constants/theme';
import { useCrypto } from '@/context/CryptoContext';
import { exportData } from '@/lib/export';
import {
  requestPermission,
  scheduleDaily,
  cancelNotification,
  getScheduledHour,
} from '@/lib/notifications';
import { pickAndRestoreBackup, type RestoreResult } from '@/lib/restore';

// ─── Time slots for notification scheduling ───────────────────────────────────

const TIME_SLOTS = [
  { label: 'Morning', hour: 8, minute: 0 },
  { label: 'Afternoon', hour: 14, minute: 0 },
  { label: 'Evening', hour: 19, minute: 0 },
  { label: 'Night', hour: 21, minute: 0 },
] as const;

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { key } = useCrypto();

  // ── Export state ──────────────────────────────────────────────────────────
  const [showExportForm, setShowExportForm] = useState(false);
  const [exportPassphrase, setExportPassphrase] = useState('');
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // ── Restore state ─────────────────────────────────────────────────────────
  const [showRestoreForm, setShowRestoreForm] = useState(false);
  const [restorePassphrase, setRestorePassphrase] = useState('');
  const [restoring, setRestoring] = useState(false);
  const [restoreResult, setRestoreResult] = useState<RestoreResult | null>(null);
  const [restoreError, setRestoreError] = useState<string | null>(null);

  // ── Notification state ────────────────────────────────────────────────────
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifHour, setNotifHour] = useState<number | null>(null);
  const [notifPermDenied, setNotifPermDenied] = useState(false);

  // Load current notification setting on mount
  useEffect(() => {
    getScheduledHour().then((h) => {
      if (h !== null) {
        setNotifEnabled(true);
        setNotifHour(h);
      }
    });
  }, []);

  // ── Export handlers ───────────────────────────────────────────────────────

  async function handleExport() {
    if (exportPassphrase.length < 8) {
      setExportError('Passphrase must be at least 8 characters.');
      return;
    }
    if (!key) return;
    setExporting(true);
    setExportError(null);
    try {
      await exportData(db, key, exportPassphrase);
      setShowExportForm(false);
      setExportPassphrase('');
    } catch {
      setExportError('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  function handleExportCancel() {
    setShowExportForm(false);
    setExportPassphrase('');
    setExportError(null);
  }

  // ── Restore handlers ──────────────────────────────────────────────────────

  async function handleRestore() {
    if (restorePassphrase.length < 8) {
      setRestoreError('Passphrase must be at least 8 characters.');
      return;
    }
    if (!key) return;
    setRestoring(true);
    setRestoreError(null);
    setRestoreResult(null);

    const outcome = await pickAndRestoreBackup(db, key, restorePassphrase);

    setRestoring(false);

    if (outcome === 'canceled') {
      // File picker dismissed — silently reset
      setShowRestoreForm(false);
      setRestorePassphrase('');
      return;
    }
    if (outcome === 'wrong_passphrase') {
      setRestoreError('Incorrect passphrase.');
      return;
    }
    if (outcome === 'invalid_file') {
      setRestoreError("File doesn't look like a Shadow backup.");
      return;
    }

    // Success
    setRestoreResult(outcome);
    setRestorePassphrase('');
  }

  function handleRestoreCancel() {
    setShowRestoreForm(false);
    setRestorePassphrase('');
    setRestoreError(null);
    setRestoreResult(null);
  }

  // ── Notification handlers ─────────────────────────────────────────────────

  async function handleNotifToggle(value: boolean) {
    setNotifPermDenied(false);
    if (value) {
      const granted = await requestPermission();
      if (!granted) {
        setNotifPermDenied(true);
        return;
      }
      await scheduleDaily(19, 0); // default to Evening
      setNotifEnabled(true);
      setNotifHour(19);
    } else {
      await cancelNotification();
      setNotifEnabled(false);
      setNotifHour(null);
    }
  }

  async function handleTimeSlot(hour: number, minute: number) {
    await scheduleDaily(hour, minute);
    setNotifHour(hour);
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Settings</Text>
        <View style={styles.divider} />

        {/* ── Your data: export ──────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Your data</Text>
          <Text style={styles.sectionBody}>
            Export a complete backup of your journal. The file is encrypted — only someone with your
            passphrase can read it. Save it to Files, iCloud Drive, or anywhere you trust.
          </Text>

          {!showExportForm ? (
            <TouchableOpacity style={styles.outlineBtn} onPress={() => setShowExportForm(true)}>
              <Text style={styles.outlineBtnText}>Export my journal</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.form}>
              <Text style={styles.formLabel}>
                Choose a passphrase for this backup. You'll need it to restore on a new device.
              </Text>
              <TextInput
                style={styles.passphraseInput}
                value={exportPassphrase}
                onChangeText={setExportPassphrase}
                secureTextEntry
                placeholder="Passphrase (8+ characters)…"
                placeholderTextColor={colors.textSecondary}
                autoFocus
                editable={!exporting}
              />
              {exportError ? <Text style={styles.errorText}>{exportError}</Text> : null}
              {exporting ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color={colors.accent} size="small" />
                  <Text style={styles.loadingText}>Encrypting…</Text>
                </View>
              ) : (
                <>
                  <TouchableOpacity style={styles.primaryBtn} onPress={handleExport}>
                    <Text style={styles.primaryBtnText}>Export</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelLink} onPress={handleExportCancel}>
                    <Text style={styles.cancelLinkText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>

        {/* ── Your data: restore ─────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Restore from backup</Text>
          <Text style={styles.sectionBody}>
            Restore entries from a .shadowexport file. Existing data is kept — the backup is merged,
            not replaced.
          </Text>

          {restoreResult ? (
            <Text style={styles.successText}>
              Added {restoreResult.entries} {restoreResult.entries === 1 ? 'entry' : 'entries'}
              {restoreResult.parts > 0 ? `, ${restoreResult.parts} parts` : ''}
              {restoreResult.experiments > 0 ? `, ${restoreResult.experiments} experiments` : ''}.
            </Text>
          ) : !showRestoreForm ? (
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={() => setShowRestoreForm(true)}>
              <Text style={styles.outlineBtnText}>Choose backup file</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.form}>
              <Text style={styles.formLabel}>
                Enter the passphrase you used when exporting, then choose the file.
              </Text>
              <TextInput
                style={styles.passphraseInput}
                value={restorePassphrase}
                onChangeText={setRestorePassphrase}
                secureTextEntry
                placeholder="Passphrase…"
                placeholderTextColor={colors.textSecondary}
                autoFocus
                editable={!restoring}
              />
              {restoreError ? <Text style={styles.errorText}>{restoreError}</Text> : null}
              {restoring ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color={colors.accent} size="small" />
                  <Text style={styles.loadingText}>Restoring…</Text>
                </View>
              ) : (
                <>
                  <TouchableOpacity style={styles.primaryBtn} onPress={handleRestore}>
                    <Text style={styles.primaryBtnText}>Choose file & restore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelLink} onPress={handleRestoreCancel}>
                    <Text style={styles.cancelLinkText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* ── Daily reminder ─────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Daily reminder</Text>
          <Text style={styles.sectionBody}>
            An optional nudge. Off by default — no pressure, ever.
          </Text>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Remind me</Text>
            <Switch
              value={notifEnabled}
              onValueChange={handleNotifToggle}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={colors.background}
            />
          </View>

          {notifPermDenied && (
            <Text style={styles.errorText}>
              Notification permission denied. Enable it in device Settings to use this feature.
            </Text>
          )}

          {notifEnabled && (
            <View style={styles.timeSlots}>
              {TIME_SLOTS.map((slot) => (
                <TouchableOpacity
                  key={slot.hour}
                  style={[
                    styles.timeSlot,
                    notifHour === slot.hour && styles.timeSlotActive,
                  ]}
                  onPress={() => handleTimeSlot(slot.hour, slot.minute)}>
                  <Text
                    style={[
                      styles.timeSlotText,
                      notifHour === slot.hour && styles.timeSlotTextActive,
                    ]}>
                    {slot.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* ── Privacy ────────────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Privacy</Text>
          <Text style={styles.sectionBody}>
            Nothing in this app communicates with any server. Your encryption key lives in this
            device's secure hardware chip and never leaves it.
          </Text>
          <Text style={styles.sectionBody}>
            In airplane mode, the app works exactly the same. That's by design.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.four,
    flexGrow: 1,
  },
  heading: { ...typography.heading, fontSize: 26, lineHeight: 34 },
  divider: { height: 1, backgroundColor: colors.border },

  section: { gap: Spacing.three },
  sectionLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
  },
  sectionBody: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 26,
  },

  outlineBtn: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.four,
  },
  outlineBtnText: { ...typography.body, fontWeight: '500' },

  form: { gap: Spacing.two },
  formLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  passphraseInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: Spacing.three,
    ...typography.body,
  },
  errorText: {
    ...typography.caption,
    color: colors.accentWarm,
    lineHeight: 20,
  },
  successText: {
    ...typography.bodySmall,
    color: colors.accent,
    lineHeight: 22,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  loadingText: { ...typography.bodySmall, color: colors.textSecondary },
  primaryBtn: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: Spacing.three,
    alignItems: 'center',
  },
  primaryBtnText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.background,
  },
  cancelLink: {
    alignItems: 'center',
    paddingVertical: Spacing.one,
  },
  cancelLinkText: {
    ...typography.caption,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },

  // Notification toggle
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: { ...typography.body },
  timeSlots: {
    flexDirection: 'row',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  timeSlot: {
    paddingVertical: Spacing.one + 2,
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  timeSlotActive: {
    borderColor: colors.accent,
    backgroundColor: colors.surface,
  },
  timeSlotText: { ...typography.bodySmall, color: colors.textSecondary },
  timeSlotTextActive: { color: colors.accent, fontWeight: '500' },
});
