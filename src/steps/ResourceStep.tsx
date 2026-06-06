import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import type { ResourceStep as ResourceStepType } from '@/types/flow';

interface Props {
  step: ResourceStepType;
  onNext: () => void;
  onExit: () => void;
}

export default function ResourceStep({ step, onNext }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.body}>{step.body}</Text>
        <TouchableOpacity onPress={() => Linking.openURL('tel:988')}>
          <Text style={styles.link}>988 — call or text anytime</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={() => onNext()}>
        <Text style={styles.nextBtnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.four,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Spacing.four,
    gap: Spacing.three,
    borderWidth: 1,
    borderColor: colors.border,
  },
  body: { ...typography.body, color: colors.textSecondary },
  link: {
    ...typography.body,
    color: colors.accent,
    textDecorationLine: 'underline',
  },
  nextBtn: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextBtnText: { ...typography.body, fontWeight: '500' },
});
