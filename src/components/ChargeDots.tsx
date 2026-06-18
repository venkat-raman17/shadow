import React from 'react';
import { View, StyleSheet } from 'react-native';

import type { Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';

/**
 * The 0–10 "charge" indicator. Larger and clearer than the old 6px dots so the
 * emotional intensity of an entry reads at a glance.
 */
export function ChargeDots({ charge }: { charge: number }) {
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.dots}>
      {Array.from({ length: 10 }, (_, i) => (
        <View key={i} style={[styles.dot, i < charge ? styles.dotFilled : styles.dotEmpty]} />
      ))}
    </View>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
  dots: { flexDirection: 'row', gap: 5 },
  dot: { width: 9, height: 9, borderRadius: 4.5 },
  dotFilled: { backgroundColor: colors.accentWarm },
  dotEmpty: { backgroundColor: colors.border },
});
