import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import type { ExitOfferStep as ExitOfferStepType } from '@/types/flow';

interface Props {
  step: ExitOfferStepType;
  onNext: () => void;
  onExit: () => void;
}

export default function ExitOfferStep({ step, onNext, onExit }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.body}>
          {step.body ?? "You can stop here. That’s enough."}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.stopBtn} onPress={onExit}>
          <Text style={styles.stopBtnText}>Stop here</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.keepGoingBtn} onPress={() => onNext()}>
          <Text style={styles.keepGoingBtnText}>Keep going</Text>
        </TouchableOpacity>
      </View>
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  body: { ...typography.body, color: colors.textSecondary, lineHeight: 28 },
  actions: { gap: Spacing.two },
  stopBtn: {
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  stopBtnText: { ...typography.body, fontWeight: '500' },
  keepGoingBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
  },
  keepGoingBtnText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.background,
  },
});
