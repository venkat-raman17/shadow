import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import type { PassageStep as PassageStepType } from '@/types/flow';

interface Props {
  step: PassageStepType;
  onNext: () => void;
  onExit: () => void;
}

export default function PassageStep({ step, onNext }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.body}>{step.body}</Text>
      </ScrollView>

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
  },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  body: { ...typography.body, lineHeight: 30, color: colors.textSecondary },
  nextBtn: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextBtnText: {
    ...typography.body,
    fontWeight: '500',
  },
});
