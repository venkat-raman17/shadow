import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing, radii, makeElevation, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Illustration } from '@/components/illustrations/Illustration';
import { NotebookLockScreen } from '@/components/notebook/NotebookLockScreen';

/**
 * The locked Notebook as a closed book: a bound cover with a lamplit-book emblem
 * and, beneath it, the existing PIN pad (embedded, so all its compassion-first
 * logic — no fail counter, shake-and-clear, biometric-on-mount — carries over
 * unchanged). The cover only frames the pad; on unlock the parent swaps in the
 * page (a quiet cross-fade, never a celebration).
 */
export function NotebookCover({
  onSubmitPin,
  onUseBiometric,
  biometricAvailable,
}: {
  onSubmitPin: (pin: string) => Promise<boolean>;
  onUseBiometric?: () => Promise<boolean>;
  biometricAvailable: boolean;
}) {
  const styles = useThemedStyles(makeStyles);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <View style={styles.cover}>
          <View style={styles.clip}>
            <View style={styles.binding} />
            <View style={styles.inner}>
              <Illustration name="open-book-lamp" tone="duo" size={88} />
              <Text style={styles.title}>Your notebook</Text>
              <Text style={styles.subtitle}>This page stays closed until it&apos;s you.</Text>
              <NotebookLockScreen
                embedded
                onSubmitPin={onSubmitPin}
                onUseBiometric={onUseBiometric}
                biometricAvailable={biometricAvailable}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = ({ colors, typography }: Theme) => {
  const e = makeElevation(colors);
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.four },
    // Outer carries the lift (no overflow:hidden so the warm shadow shows).
    cover: {
      width: '100%',
      maxWidth: 360,
      borderRadius: radii.lg,
      backgroundColor: colors.paper,
      ...e.raised,
    },
    clip: {
      flexDirection: 'row',
      borderRadius: radii.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.rule,
    },
    binding: { width: 4, backgroundColor: colors.accentMuted },
    inner: {
      flex: 1,
      alignItems: 'center',
      gap: Spacing.three,
      paddingVertical: Spacing.five,
      paddingHorizontal: Spacing.four,
    },
    title: { ...typography.display, textAlign: 'center' },
    subtitle: {
      ...typography.serifBody,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: Spacing.two,
    },
  });
};
