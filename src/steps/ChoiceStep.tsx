import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import type { ChoiceStep as ChoiceStepType } from '@/types/flow';

interface Props {
  step: ChoiceStepType;
  onNext: (value: string, goTo?: string) => void;
  onExit: () => void;
}

export default function ChoiceStep({ step, onNext }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{step.title}</Text>
      {step.body ? <Text style={styles.body}>{step.body}</Text> : null}

      <View style={styles.options}>
        {step.options.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={styles.option}
            onPress={() => onNext(opt.value, opt.goTo)}>
            <Text style={styles.optionText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
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
  },
  title: { ...typography.heading },
  body: { ...typography.body, color: colors.textSecondary },
  options: { gap: Spacing.two },
  option: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: Spacing.three,
  },
  optionText: { ...typography.body },
});
