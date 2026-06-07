import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, typography, Spacing, radii } from '@/constants/theme';

interface Props {
  label: string;
  onPress: () => void;
  selected?: boolean;
}

/**
 * The pill used for assist chips (and, later, lightweight choices).
 */
export function Chip({ label, onPress, selected }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.chip,
    borderRadius: radii.pill,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + Spacing.half,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentMuted,
  },
  pressed: { opacity: 0.7 },
  label: { ...typography.caption, color: colors.textSecondary },
  labelSelected: { color: colors.accent },
});
