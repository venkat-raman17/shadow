import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { router } from 'expo-router';

import { Spacing, type Theme } from '@/constants/theme';
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
import { isLockEnabled, setLockEnabled, canAuthenticate, authenticate } from '@/lib/appLock';
import {
  isNotebookLockEnabled,
  setPin as saveNotebookPin,
  verifyPin as verifyNotebookPin,
  disableNotebookLock,
  isBiometricShortcutEnabled,
  setBiometricShortcut,
} from '@/lib/notebookLock';
import { resetAllData } from '@/lib/reset';
import { useSession } from '@/context/SessionContext';

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
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  // ── Export state ──────────────────────────────────────────────────────────
  const [showExportForm, setShowExportForm] = useState(false);
  const [exportPassphrase, setExportPassphrase] = useState('');
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // ── Notification state ────────────────────────────────────────────────────
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifHour, setNotifHour] = useState<number | null>(null);
  const [notifPermDenied, setNotifPermDenied] = useState(false);

  // ── App lock state ────────────────────────────────────────────────────────
  const [lockOn, setLockOn] = useState(false);
  const [lockUnavailable, setLockUnavailable] = useState(false);

  // ── Notebook PIN state ────────────────────────────────────────────────────
  const [pinLockOn, setPinLockOn] = useState(false);
  const [pinForm, setPinForm] = useState<'none' | 'set' | 'change' | 'disable'>('none');
  const [pinValue, setPinValue] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [pinCurrent, setPinCurrent] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [allowBiometric, setAllowBiometric] = useState(false);
  const [pinBiometricUnavailable, setPinBiometricUnavailable] = useState(false);
  const [pinSaving, setPinSaving] = useState(false);

  // ── Back-up-&-delete state ────────────────────────────────────────────────
  // A two-step destructive flow: always back up FIRST, then confirm the wipe —
  // so the device is never erased before a backup file actually exists.
  const { refresh } = useSession();
  const [deleteStage, setDeleteStage] = useState<'idle' | 'backup' | 'confirm'>('idle');
  const [deletePassphrase, setDeletePassphrase] = useState('');
  const [deleteBackingUp, setDeleteBackingUp] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);

  // Load current notification + lock settings on mount
  useEffect(() => {
    getScheduledHour().then((h) => {
      if (h !== null) {
        setNotifEnabled(true);
        setNotifHour(h);
      }
    });
    isLockEnabled().then(setLockOn);
    isNotebookLockEnabled().then(setPinLockOn);
    isBiometricShortcutEnabled().then(setAllowBiometric);
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

  // ── Notebook PIN handlers ─────────────────────────────────────────────────

  function cancelPinForm() {
    setPinForm('none');
    setPinValue('');
    setPinConfirm('');
    setPinCurrent('');
    setPinError(null);
  }

  function handlePinToggle(value: boolean) {
    setPinError(null);
    if (value) {
      setPinForm('set'); // enabled only once a valid PIN is saved
    } else {
      setPinForm('disable'); // require the current PIN before turning it off
    }
  }

  async function handleSavePin() {
    if (!/^\d{4,6}$/.test(pinValue)) {
      setPinError("Choose a PIN of 4 to 6 digits.");
      return;
    }
    if (pinValue !== pinConfirm) {
      setPinError("Those PINs don't match.");
      return;
    }
    setPinSaving(true);
    setPinError(null);
    // Yield to the macrotask queue so the loading state renders before
    // the PBKDF2 stretch (200k iterations) occupies the JS thread.
    await new Promise<void>((resolve) => setTimeout(resolve, 32));
    try {
      await saveNotebookPin(pinValue);
      setPinLockOn(true);
      cancelPinForm();
    } catch {
      setPinError('Could not save PIN. Please try again.');
    } finally {
      setPinSaving(false);
    }
  }

  async function handleConfirmDisable() {
    setPinSaving(true);
    setPinError(null);
    await new Promise<void>((resolve) => setTimeout(resolve, 32));
    try {
      if (!(await verifyNotebookPin(pinCurrent))) {
        setPinError("That PIN didn't match.");
        return;
      }
      await disableNotebookLock();
      setPinLockOn(false);
      setAllowBiometric(false);
      cancelPinForm();
    } catch {
      setPinError('Could not verify PIN. Please try again.');
    } finally {
      setPinSaving(false);
    }
  }

  async function handlePinBiometricToggle(value: boolean) {
    setPinBiometricUnavailable(false);
    if (value) {
      if (!(await canAuthenticate())) {
        setPinBiometricUnavailable(true);
        return;
      }
      await setBiometricShortcut(true);
      setAllowBiometric(true);
    } else {
      await setBiometricShortcut(false);
      setAllowBiometric(false);
    }
  }

  // ── Back-up-&-delete handlers ─────────────────────────────────────────────

  function startBackupDelete() {
    setDeleteStage('backup');
    setDeletePassphrase('');
    setDeleteError(null);
  }

  function cancelBackupDelete() {
    setDeleteStage('idle');
    setDeletePassphrase('');
    setDeleteError(null);
    setDeleteCountdown(null);
  }

  // Step 1: back up. Only on a successful export do we advance to the wipe
  // confirmation — the device is never erased before a file exists.
  async function handleBackupThenConfirm() {
    if (deletePassphrase.length < 8) {
      setDeleteError('Passphrase must be at least 8 characters.');
      return;
    }
    if (!key) return;
    setDeleteBackingUp(true);
    setDeleteError(null);
    try {
      await exportData(db, key, deletePassphrase);
      setDeletePassphrase('');
      setDeleteStage('confirm');
      setDeleteCountdown(3);
    } catch {
      setDeleteError('Backup failed. Please try again.');
    } finally {
      setDeleteBackingUp(false);
    }
  }

  // The countdown is seeded to 3 when the backup succeeds (an event), so this
  // effect never sets state synchronously — it only ticks down in the timeout.
  useEffect(() => {
    if (deleteStage !== 'confirm' || deleteCountdown === null || deleteCountdown <= 0) return;
    const id = setTimeout(() => {
      setDeleteCountdown((n) => (n === null ? null : n - 1));
    }, 1000);
    return () => clearTimeout(id);
  }, [deleteStage, deleteCountdown]);

  // Step 2: wipe.
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

      {/* ── Daily reminder ─────────────────────────────────────────────────── */}
      {Platform.OS === 'web' ? (
        <View style={styles.section}>
          <SectionHeader>Daily reminder</SectionHeader>
          <Text style={styles.sectionBody}>Daily reminders are available on iOS and Android.</Text>
        </View>
      ) : (
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

      {/* ── Notebook PIN ───────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>Notebook PIN</SectionHeader>
        <Text style={styles.sectionBody}>
          A separate code to open your Notebook — apart from your device passcode, so your
          reflections stay closed even to someone who can unlock the phone. Off by default.
        </Text>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Lock my Notebook with a PIN</Text>
          <Switch
            value={pinForm === 'disable' ? false : pinLockOn || pinForm === 'set'}
            onValueChange={handlePinToggle}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.background}
          />
        </View>

        {(pinForm === 'set' || pinForm === 'change') && (
          <Card style={styles.form}>
            <Text style={styles.formLabel}>Choose a PIN of 4 to 6 digits.</Text>
            <TextField
              value={pinValue}
              onChangeText={setPinValue}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={6}
              placeholder="New PIN"
              autoFocus
            />
            <TextField
              value={pinConfirm}
              onChangeText={setPinConfirm}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={6}
              placeholder="Confirm PIN"
            />
            {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}
            <Button
              label={pinSaving ? 'Saving…' : 'Save PIN'}
              onPress={handleSavePin}
              disabled={pinSaving}
            />
            <Button label="Cancel" variant="ghost" onPress={cancelPinForm} disabled={pinSaving} />
          </Card>
        )}

        {pinForm === 'disable' && (
          <Card style={styles.form}>
            <Text style={styles.formLabel}>Enter your current PIN to turn the lock off.</Text>
            <TextField
              value={pinCurrent}
              onChangeText={setPinCurrent}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={6}
              placeholder="Current PIN"
              autoFocus
            />
            {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}
            <Button
              label={pinSaving ? 'Verifying…' : 'Turn off lock'}
              onPress={handleConfirmDisable}
              disabled={pinSaving}
            />
            <Button label="Cancel" variant="ghost" onPress={cancelPinForm} disabled={pinSaving} />
          </Card>
        )}

        {pinLockOn && pinForm === 'none' && (
          <>
            <Button
              label="Change PIN"
              variant="secondary"
              fullWidth={false}
              onPress={() => {
                setPinError(null);
                setPinForm('change');
              }}
              style={styles.selfStart}
            />
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Allow Face ID / Touch ID</Text>
              <Switch
                value={allowBiometric}
                onValueChange={handlePinBiometricToggle}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor={colors.background}
              />
            </View>
            {pinBiometricUnavailable && (
              <Text style={styles.errorText}>
                Set up Face ID, Touch ID, or a device passcode first, then try again.
              </Text>
            )}
          </>
        )}
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

      {/* ── Need support? ──────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>Need support?</SectionHeader>
        <Text style={styles.sectionBody}>
          If you&apos;re in crisis or need to talk to someone, reach out to a person — not an app.
        </Text>
        <Card onPress={() => router.push('/resources')}>
          <Text style={styles.sectionBody}>Crisis lines &amp; therapy directories →</Text>
        </Card>
      </View>

      {/* ── Your data ──────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader>Your data</SectionHeader>
        <Text style={styles.sectionBody}>
          Everything you write stays on this device. A backup is a single encrypted{' '}
          <Text style={styles.mono}>.shadow</Text> file — store it anywhere you trust (Files,
          iCloud Drive, a USB drive) and restore it into any copy of Partwise from the welcome
          screen. Only your passphrase can open it.
        </Text>

        {!showExportForm && deleteStage === 'idle' && (
          <View style={styles.form}>
            <Button
              label="Back up everything"
              variant="secondary"
              onPress={() => setShowExportForm(true)}
            />
            <Button
              label="Back up & delete"
              variant="secondary"
              onPress={startBackupDelete}
              style={styles.dangerBtnOutline}
            />
          </View>
        )}

        {showExportForm && (
          <Card style={styles.form}>
            <Text style={styles.formLabel}>
              Choose a passphrase for this backup. You&apos;ll need it to restore — keep it somewhere
              safe.
            </Text>
            <TextField
              value={exportPassphrase}
              onChangeText={setExportPassphrase}
              secureTextEntry
              placeholder="Passphrase (8+ characters)…"
              returnKeyType="done"
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
                <Button label="Back up" onPress={handleExport} />
                <Button label="Cancel" variant="ghost" onPress={handleExportCancel} />
              </>
            )}
          </Card>
        )}

        {deleteStage === 'backup' && (
          <Card style={styles.form}>
            <Text style={styles.formLabel}>
              First, choose a passphrase for your backup. You&apos;ll need it to restore — keep it
              somewhere safe.
            </Text>
            <TextField
              value={deletePassphrase}
              onChangeText={setDeletePassphrase}
              secureTextEntry
              placeholder="Passphrase (8+ characters)…"
              returnKeyType="done"
              autoFocus
              editable={!deleteBackingUp}
            />
            {deleteError ? <Text style={styles.errorText}>{deleteError}</Text> : null}
            {deleteBackingUp ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={colors.accent} size="small" />
                <Text style={styles.loadingText}>Encrypting backup…</Text>
              </View>
            ) : (
              <>
                <Button label="Back up & continue" onPress={handleBackupThenConfirm} />
                <Button label="Cancel" variant="ghost" onPress={cancelBackupDelete} />
              </>
            )}
          </Card>
        )}

        {deleteStage === 'confirm' && (
          <Card style={styles.form}>
            <Text style={styles.formLabel}>
              Your backup is saved. Make sure you&apos;ve kept the file somewhere safe — then erase
              everything on this device.
            </Text>
            {deleting ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={colors.danger} size="small" />
                <Text style={styles.loadingText}>Deleting…</Text>
              </View>
            ) : (
              <>
                <Button
                  label={deleteCountdown !== null && deleteCountdown > 0 ? `Wait ${deleteCountdown}…` : 'Yes, delete everything'}
                  disabled={deleteCountdown !== null && deleteCountdown > 0}
                  onPress={handleDeleteAll}
                  style={styles.deleteBtn}
                />
                <Button label="Cancel" variant="ghost" onPress={cancelBackupDelete} />
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
  mono: { fontFamily: 'monospace', color: colors.textPrimary },
  deleteBtn: { backgroundColor: colors.danger },
  dangerBtnOutline: { borderColor: colors.danger },
});
