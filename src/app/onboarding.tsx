import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useSQLiteContext } from 'expo-sqlite';

import { Button, FadeSlide, Screen, TextField } from '@/components/ui';
import { radii, Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { setItem } from '@/lib/kv';
import { useSession } from '@/context/SessionContext';
import { useCrypto } from '@/context/CryptoContext';
import { pickAndRestoreBackup } from '@/lib/restore';
import type { Gender } from '@/hooks/useUserProfile';

// Paced one-thing-per-screen panels — the same contemplative rhythm as the
// practices, from the very first moment. The safety panel is unskippable: you
// pass through it on the way to the acknowledge, which only lives on the last.
const PANEL_COUNT = 6;

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'man', label: 'Man' },
  { value: 'woman', label: 'Woman' },
  { value: 'nonbinary', label: 'Not these categories' },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const styles = useThemedStyles(makeStyles);
  const { refresh } = useSession();
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const isLast = index === PANEL_COUNT - 1;

  // Restore-from-backup (landing screen) state.
  const [showRestore, setShowRestore] = useState(false);
  const [restorePassphrase, setRestorePassphrase] = useState('');
  const [restoring, setRestoring] = useState(false);
  const [restoreError, setRestoreError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  // Disable Continue when the current panel requires input that hasn't been given.
  const canContinue = !(index === 4 && name.trim() === '') && !(index === 5 && gender === null);

  async function handleAcknowledge() {
    await Promise.all([
      setItem('shadow.onboarding_complete', 'true'),
      setItem('shadow.user_name', name.trim()),
      setItem('shadow.user_gender', gender!),
    ]);
    await refresh();
    router.replace('/');
  }

  async function handleRestore() {
    if (!key) return;
    setRestoring(true);
    setRestoreError(null);
    const outcome = await pickAndRestoreBackup(db, key, restorePassphrase);
    setRestoring(false);
    if (outcome === 'canceled') return;
    if (outcome === 'wrong_passphrase') {
      setRestoreError('Incorrect passphrase.');
      return;
    }
    if (outcome === 'invalid_file') {
      setRestoreError("That file doesn't look like a Partwise backup.");
      return;
    }
    if (outcome.signedIn) {
      // The backup carried a profile — sign in and go straight to the app.
      await refresh();
      router.replace('/');
    } else {
      // Older backup with no profile: data is back; finish onboarding normally.
      setShowRestore(false);
      setRestored(true);
    }
  }

  function next() {
    if (isLast) handleAcknowledge();
    else setIndex((i) => i + 1);
  }

  return (
    <Screen>
      <FadeSlide key={index} style={styles.panel}>
        {index === 0 && (
          <>
            <Image
              source={require('@/assets/images/logo-mark.png')}
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={styles.title}>Welcome to Partwise.</Text>
            <Text style={styles.body}>
              Partwise is a space for slow inner work — noticing your reactions, meeting the parts of
              yourself you&apos;ve pushed away, and sitting with what you find.
            </Text>
            <Text style={styles.body}>Take it gently. There&apos;s nothing to finish here.</Text>

            {restored ? (
              <Text style={styles.restoredNote}>
                Your reflections are back. Finish setting up below.
              </Text>
            ) : !showRestore ? (
              <Pressable onPress={() => setShowRestore(true)}>
                <Text style={styles.restoreLink}>Already have a backup? Restore it →</Text>
              </Pressable>
            ) : (
              <View style={styles.restoreForm}>
                <TextField
                  value={restorePassphrase}
                  onChangeText={setRestorePassphrase}
                  secureTextEntry
                  placeholder="Backup passphrase…"
                  editable={!restoring}
                />
                {restoreError ? <Text style={styles.restoreError}>{restoreError}</Text> : null}
                <Button
                  label={restoring ? 'Restoring…' : 'Choose backup & restore'}
                  onPress={handleRestore}
                  disabled={restoring}
                />
                <Button
                  label="Cancel"
                  variant="ghost"
                  onPress={() => {
                    setShowRestore(false);
                    setRestoreError(null);
                  }}
                />
              </View>
            )}
          </>
        )}

        {index === 1 && (
          <>
            <Text style={styles.title}>First, a moment of care.</Text>
            <Text style={styles.label}>This app is not for you right now if:</Text>
            <Text style={styles.listItem}>
              — You&apos;re in active crisis, or having thoughts of suicide or self-harm.
            </Text>
            <Text style={styles.listItem}>— You&apos;re processing fresh or acute trauma.</Text>
            <Text style={styles.listItem}>
              — You need immediate emotional support from another person.
            </Text>
            <Text style={styles.body}>
              If any of those fit right now, please reach out to a person who can actually help. The
              Support tab has crisis lines you can call or text immediately.
            </Text>
          </>
        )}

        {index === 2 && (
          <>
            <Text style={styles.title}>This is not therapy.</Text>
            <Text style={styles.body}>
              It won&apos;t replace a therapist, and it won&apos;t monitor your safety. It&apos;s a
              private container for reflection — nothing more, and nothing less.
            </Text>
          </>
        )}

        {index === 3 && (
          <>
            <Text style={styles.title}>What you write stays yours.</Text>
            <Text style={styles.body}>
              Nothing you write here leaves this device. No account, no cloud, no AI — your reflections
              are encrypted and kept only by you.
            </Text>
          </>
        )}

        {index === 4 && (
          <>
            <Text style={styles.title}>What should we call you?</Text>
            <TextField
              value={name}
              onChangeText={setName}
              placeholder="Your name…"
              autoFocus
              returnKeyType="done"
              onSubmitEditing={() => { if (name.trim()) next(); }}
            />
            <Text style={styles.body}>
              Just for the greeting on your home screen. Nothing is sent anywhere.
            </Text>
          </>
        )}

        {index === 5 && (
          <>
            <Text style={styles.title}>One thing about your inner landscape.</Text>
            <Text style={styles.body}>
              In Jungian work, the anima (in men) and the animus (in women) are inner figures worth
              meeting. Partwise uses this to offer the right reflections for you.
            </Text>
            <View style={styles.genderRow}>
              {GENDER_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => setGender(opt.value)}
                  style={[styles.genderChip, gender === opt.value && styles.genderChipSelected]}>
                  <Text
                    style={[
                      styles.genderChipLabel,
                      gender === opt.value && styles.genderChipLabelSelected,
                    ]}>
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </FadeSlide>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {Array.from({ length: PANEL_COUNT }, (_, i) => (
            <View key={i} style={[styles.dot, i <= index && styles.dotFilled]} />
          ))}
        </View>
        <Button
          label={isLast ? 'I understand — take me in' : 'Continue'}
          onPress={next}
          disabled={!canContinue}
        />
        {index > 0 && !isLast ? (
          <Button label="Back" variant="ghost" onPress={() => setIndex((i) => i - 1)} />
        ) : null}
      </View>
    </Screen>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  panel: { gap: Spacing.three },
  logo: { width: 96, height: 96, alignSelf: 'center' },
  title: { ...typography.display, marginBottom: Spacing.two },
  label: {
    ...typography.bodySmall,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.textSecondary,
  },
  body: { ...typography.serifBody, color: colors.textSecondary, lineHeight: 30 },
  restoreLink: { ...typography.body, color: colors.accentWarm, marginTop: Spacing.two },
  restoreForm: { gap: Spacing.two, marginTop: Spacing.two },
  restoreError: { ...typography.caption, color: colors.accentWarm },
  restoredNote: { ...typography.bodySmall, color: colors.accent, marginTop: Spacing.two },
  listItem: { ...typography.body, color: colors.textPrimary, lineHeight: 28 },
  genderRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  genderChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  genderChipSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentMuted,
  },
  genderChipLabel: { ...typography.body, color: colors.textSecondary },
  genderChipLabelSelected: { color: colors.accent },
  footer: { gap: Spacing.two, paddingTop: Spacing.five },
  dots: {
    flexDirection: 'row',
    gap: Spacing.one + Spacing.half,
    justifyContent: 'center',
    paddingBottom: Spacing.two,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotFilled: { backgroundColor: colors.accentMuted },
});
