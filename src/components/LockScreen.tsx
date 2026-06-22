import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Button } from '@/components/ui';
import { Illustration } from '@/components/illustrations';

/**
 * Shown when the optional app lock is engaged. Compassion-first, not security
 * theatre: no failed-attempt counter, no timer. Prompts once on mount and keeps
 * a manual retry so a cancelled prompt never traps the user.
 */
export function LockScreen({ onUnlock }: { onUnlock: () => Promise<boolean> }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  useEffect(() => {
    void onUnlock();
  }, [onUnlock]);

  return (
    <View style={styles.container}>
      <Illustration name="ui-lock" size={28} color={colors.accentMuted} decorative />
      <Text style={styles.title}>Welcome back.</Text>
      <Text style={styles.body}>Take a breath. This space stays closed until it&apos;s you.</Text>
      <View style={styles.action}>
        <Button label="Unlock" onPress={() => void onUnlock()} fullWidth={false} />
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
  title: { ...typography.display, textAlign: 'center' },
  body: { ...typography.serifBody, color: colors.textSecondary, textAlign: 'center', lineHeight: 28 },
  action: { marginTop: Spacing.two },
});
