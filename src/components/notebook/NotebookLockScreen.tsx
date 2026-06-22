import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Illustration } from '@/components/illustrations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getPinLength, MAX_PIN_LENGTH } from '@/lib/notebookLock';

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * The Notebook's PIN pad. Compassion-first, like the app LockScreen: no
 * failed-attempt counter, no lockout timer. A wrong full entry just gives a soft
 * shake (stilled under reduce-motion) and clears. Auto-submits once the entry
 * reaches the stored PIN length, and offers a Face/Touch ID shortcut when set.
 */
export function NotebookLockScreen({
  onSubmitPin,
  onUseBiometric,
  biometricAvailable,
  embedded = false,
}: {
  onSubmitPin: (pin: string) => Promise<boolean>;
  onUseBiometric?: () => Promise<boolean>;
  biometricAvailable: boolean;
  /** When true, drop the icon/title/body and the full-screen ground — the host
   *  (NotebookCover) supplies the cover chrome; this renders just the dots + pad. */
  embedded?: boolean;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const reduced = useReducedMotion();
  const [pin, setPin] = useState('');
  const [pinLength, setPinLength] = useState(MAX_PIN_LENGTH);
  // Mirrored in a ref so `press` always submits at the right length even if the
  // stored length resolves a beat after the first taps.
  const pinLengthRef = useRef(MAX_PIN_LENGTH);
  const submitting = useRef(false);
  const shake = useSharedValue(0);

  useEffect(() => {
    let mounted = true;
    getPinLength().then((n) => {
      if (!mounted) return;
      pinLengthRef.current = n;
      setPinLength(n);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Offer the biometric shortcut once on mount, mirroring the app LockScreen.
  useEffect(() => {
    if (biometricAvailable && onUseBiometric) void onUseBiometric();
    // Intentionally run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Plain handlers (not memoized) so mutating the shake value follows the same
  // pattern as usePressScale and submission stays in the event, not an effect.
  function fail() {
    setPin('');
    if (!reduced) {
      shake.value = withSequence(
        withTiming(-8, { duration: 40 }),
        withTiming(8, { duration: 80 }),
        withTiming(-6, { duration: 80 }),
        withTiming(0, { duration: 50 }),
      );
    }
  }

  async function attempt(value: string) {
    if (submitting.current) return;
    submitting.current = true;
    const ok = await onSubmitPin(value);
    submitting.current = false;
    if (!ok) fail();
    // On success the parent flips `locked` and unmounts this screen.
  }

  function press(d: string) {
    if (submitting.current || pin.length >= pinLengthRef.current) return;
    const next = pin + d;
    setPin(next);
    if (next.length === pinLengthRef.current) void attempt(next);
  }

  function backspace() {
    if (submitting.current) return;
    setPin((prev) => prev.slice(0, -1));
  }

  const dotsStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shake.value }] }));

  return (
    <View style={embedded ? styles.embedded : styles.container}>
      {!embedded && (
        <>
          <Illustration name="ui-lock" size={26} color={colors.accentMuted} decorative />
          <Text style={styles.title}>Your notebook</Text>
          <Text style={styles.body}>This page stays closed until it&apos;s you.</Text>
        </>
      )}

      <Animated.View style={[styles.dots, dotsStyle]} accessibilityLabel={`${pin.length} of ${pinLength} digits entered`}>
        {Array.from({ length: pinLength }, (_, i) => (
          <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />
        ))}
      </Animated.View>

      <View style={styles.pad}>
        {DIGITS.map((d) => (
          <Pressable
            key={d}
            onPress={() => press(d)}
            style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            accessibilityRole="button"
            accessibilityLabel={d}>
            <Text style={styles.keyText}>{d}</Text>
          </Pressable>
        ))}

        {/* Bottom row: biometric shortcut · 0 · backspace */}
        <Pressable
          onPress={() => {
            if (biometricAvailable && onUseBiometric) void onUseBiometric();
          }}
          disabled={!biometricAvailable}
          style={({ pressed }) => [styles.key, pressed && biometricAvailable && styles.keyPressed]}
          accessibilityRole="button"
          accessibilityLabel="Use Face ID or Touch ID">
          {biometricAvailable ? (
            <Illustration name="ui-faceid" size={26} color={colors.accent} decorative />
          ) : null}
        </Pressable>

        <Pressable
          onPress={() => press('0')}
          style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
          accessibilityRole="button"
          accessibilityLabel="0">
          <Text style={styles.keyText}>0</Text>
        </Pressable>

        <Pressable
          onPress={backspace}
          style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
          accessibilityRole="button"
          accessibilityLabel="Delete">
          <Illustration name="ui-backspace" size={24} color={colors.textSecondary} decorative />
        </Pressable>
      </View>
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.three,
      padding: Spacing.five,
    },
    embedded: { alignItems: 'center', gap: Spacing.three },
    title: { ...typography.display, textAlign: 'center' },
    body: { ...typography.serifBody, color: colors.textSecondary, textAlign: 'center' },

    dots: { flexDirection: 'row', gap: Spacing.three, height: 16, alignItems: 'center', marginVertical: Spacing.three },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.accentMuted,
    },
    dotFilled: { backgroundColor: colors.accent, borderColor: colors.accent },

    pad: { width: 264, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    key: {
      width: 72,
      height: 72,
      margin: Spacing.two,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    keyPressed: { backgroundColor: colors.surface },
    keyText: { ...typography.display, fontSize: 28, lineHeight: 34 },
  });
