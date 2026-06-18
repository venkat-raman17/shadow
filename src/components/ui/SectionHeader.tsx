import React from 'react';
import { Text, StyleSheet } from 'react-native';

import type { Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';

/**
 * The uppercase, letter-spaced section label repeated across Home, Reflections
 * and Support.
 */
export function SectionHeader({ children }: { children: string }) {
  const styles = useThemedStyles(makeStyles);
  return <Text style={styles.label}>{children}</Text>;
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    label: {
      ...typography.caption,
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: colors.textSecondary,
    },
  });
