import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import { Spacing, type Theme, type ThemePreference } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, Card, SectionHeader, TextField, Button, Chip } from '@/components/ui';
import { useCrypto } from '@/context/CryptoContext';
import { exportData } from '@/lib/export';
import {
  requestPermission,
  scheduleDaily,
  cancelNotification,
  getScheduledHour,
} from '@/lib/notifications';
import { pickAndRestoreBackup, type RestoreResult } from '@/lib/restore';
import { isLockEnabled, setLockEnabled, canAuthenticate, authenticate } from '@/lib/appLock';
import { resetAllData } from '@/lib/reset';
import { useSession } from '@/context/SessionContext';

// ─── Time slots for notification scheduling ───────────────────────────────────

const TIME_SLOTS = [
  { label: 'Morning', hour: 8, minute: 0 },
  { label: 'Afternoon', hour: 14, minute: 0 },
  { label: 'Evening', hour: 19, minute: 0 },
  { label: 'Night', hour: 21, minute: 0 },
] as const;

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'sepia', label: 'Sepia' },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const { colors, preference, setPreference } = useTheme();
  const styles = useThemedStyles(makeStyles);

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

  // ── App lock state ────────────────────────────────────────────────────────
  const [lockOn, setLockOn] = useState(false);
  const [lockUnavailable, setLockUnavailable] = useState(false);

  // ── Delete-everything state ───────────────────────────────────────────────
  const { refresh } = useSession();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load current notification + lock settings on mount
  useEffect(() => {
    getScheduledHour().then((h) => {
      if (h !== null) {
        setNotifEnabled(true);
        setNotifHour(h);
      }
    });
    isLockEnabled().then(setLockOn);
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
      setRestoreError("File doesn't look like a Partwise backup.");
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

  // ── App lock handler ──────────────────────────────────────────────────────

  async function handleLockToggle(value: boolean) {
    setLockUnavailable(false);
    if (value) {
      // Confirm the device can authenticate AND that the user can pass it now,
      // so enabling never strands them behind a lock they can't open.
      if (!(await canAuthenticate())) {
        setLockUnavailable(true);
        return;
      }
      if (!(await authenticate())) return; // cancelled — leave it off
      await setLockEnabled(true);
      setLockOn(true);
    } else {
      await setLockEnabled(false);
      setLockOn(false);
    }
  }

  // ── Delete-everything handler ─────────────────────────────────────────────

  async function handleDeleteAll() {
    setDeleting(true);
    try {
      await resetAllData(db);
    } finally {
      // Always flip the nav gate, even if cleanup partially failed.
      await refresh();
      setDeleting(false);
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <Screen keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Settings</Text>

      {/* ── Your data: export ──────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>Your data</SectionHeader>
        <Text style={styles.sectionBody}>
          Export a complete backup of your journal. The file is encrypted — only someone with your
          passphrase can read it. Save it to Files, iCloud Drive, or anywhere you trust.
        </Text>

        {!showExportForm ? (
          <Button
            label="Export my journal"
            variant="secondary"
            fullWidth={false}
            onPress={() => setShowExportForm(true)}
            style={styles.selfStart}
          />
        ) : (
          <Card style={styles.form}>
            <Text style={styles.formLabel}>
              Choose a passphrase for this backup. You&apos;ll need it to restore on a new device.
            </Text>
            <TextField
              value={exportPassphrase}
              onChangeText={setExportPassphrase}
              secureTextEntry
              placeholder="Passphrase (8+ characters)…"
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
                <Button label="Export" onPress={handleExport} />
                <Button label="Cancel" variant="ghost" onPress={handleExportCancel} />
              </>
            )}
          </Card>
        )}
      </View>

      {/* ── Your data: restore ─────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>Restore from backup</SectionHeader>
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
          <Button
            label="Choose backup file"
            variant="secondary"
            fullWidth={false}
            onPress={() => setShowRestoreForm(true)}
            style={styles.selfStart}
          />
        ) : (
          <Card style={styles.form}>
            <Text style={styles.formLabel}>
              Enter the passphrase you used when exporting, then choose the file.
            </Text>
            <TextField
              value={restorePassphrase}
              onChangeText={setRestorePassphrase}
              secureTextEntry
              placeholder="Passphrase…"
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
                <Button label="Choose file & restore" onPress={handleRestore} />
                <Button label="Cancel" variant="ghost" onPress={handleRestoreCancel} />
              </>
            )}
          </Card>
        )}
      </View>

      {/* ── Daily reminder ─────────────────────────────────────────────────── */}
      {Platform.OS !== 'web' && (
      <View style={styles.section}>
        <SectionHeader>Daily reminder</SectionHeader>
        <Text style={styles.sectionBody}>An optional nudge. Off by default — no pressure, ever.</Text>

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
              <Chip
                key={slot.hour}
                label={slot.label}
                selected={notifHour === slot.hour}
                onPress={() => handleTimeSlot(slot.hour, slot.minute)}
              />
            ))}
          </View>
        )}
      </View>
      )}

      {/* ── App lock ───────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>App lock</SectionHeader>
        <Text style={styles.sectionBody}>
          Require Face ID, Touch ID, or your device passcode to open Partwise. Off by default. It
          never interrupts a practice you&apos;re in the middle of.
        </Text>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Lock when I leave the app</Text>
          <Switch
            value={lockOn}
            onValueChange={handleLockToggle}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.background}
          />
        </View>

        {lockUnavailable && (
          <Text style={styles.errorText}>
            Set up Face ID, Touch ID, or a device passcode first, then try again.
          </Text>
        )}
      </View>

      {/* ── Appearance ─────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>Appearance</SectionHeader>
        <Text style={styles.sectionBody}>
          Choose how Partwise looks — it changes instantly. &ldquo;System&rdquo; follows your
          device&apos;s light or dark setting.
        </Text>
        <View style={styles.timeSlots}>
          {THEME_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              selected={preference === opt.value}
              onPress={() => setPreference(opt.value)}
            />
          ))}
        </View>
      </View>

      {/* ── Privacy ────────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>Privacy</SectionHeader>
        <Text style={styles.sectionBody}>
          Nothing in this app communicates with any server. Your encryption key lives in this
          device&apos;s secure hardware chip and never leaves it.
        </Text>
        <Text style={styles.sectionBody}>
          In airplane mode, the app works exactly the same. That&apos;s by design.
        </Text>
      </View>

      {/* ── Delete everything ──────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>Delete everything</SectionHeader>
        <Text style={styles.sectionBody}>
          Permanently erase all your reflections, parts, drawings, and settings, and start over as a
          new user. This can&apos;t be undone.
        </Text>

        {!showDeleteConfirm ? (
          <Button
            label="Delete everything"
            variant="secondary"
            fullWidth={false}
            onPress={() => setShowDeleteConfirm(true)}
            style={styles.selfStart}
          />
        ) : (
          <Card style={styles.form}>
            <Text style={styles.formLabel}>
              This erases everything on this device and returns you to the welcome screen. If you
              might want it back, export a backup first.
            </Text>
            <Button
              label="Export a backup first"
              variant="secondary"
              onPress={() => {
                setShowDeleteConfirm(false);
                setShowExportForm(true);
              }}
            />
            {deleting ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={colors.danger} size="small" />
                <Text style={styles.loadingText}>Deleting…</Text>
              </View>
            ) : (
              <>
                <Button
                  label="Yes, delete everything"
                  onPress={handleDeleteAll}
                  style={styles.deleteBtn}
                />
                <Button label="Cancel" variant="ghost" onPress={() => setShowDeleteConfirm(false)} />
              </>
            )}
          </Card>
        )}
      </View>
    </Screen>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  heading: { ...typography.display },
  section: { gap: Spacing.three },
  sectionBody: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
  selfStart: { alignSelf: 'flex-start' },
  form: { gap: Spacing.two },
  formLabel: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 22 },
  errorText: { ...typography.caption, color: colors.accentWarm, lineHeight: 20 },
  successText: { ...typography.bodySmall, color: colors.accent, lineHeight: 22 },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  loadingText: { ...typography.bodySmall, color: colors.textSecondary },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggleLabel: { ...typography.body },
  timeSlots: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' },
  deleteBtn: { backgroundColor: colors.danger },
});
