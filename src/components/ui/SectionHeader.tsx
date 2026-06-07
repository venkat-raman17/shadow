import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { colors, typography } from '@/constants/theme';

/**
 * The uppercase, letter-spaced section label repeated across Home, Reflections
 * and Support.
 */
export function SectionHeader({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
  },
});
