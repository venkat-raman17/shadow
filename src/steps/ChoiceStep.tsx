import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, Card } from '@/components/ui';
import type { ChoiceStep as ChoiceStepType } from '@/types/flow';

interface Props {
  step: ChoiceStepType;
  onNext: (value: string, goTo?: string) => void;
  onExit: () => void;
}

export default function ChoiceStep({ step, onNext }: Props) {
  return (
    <Screen>
      <Text style={styles.title}>{step.title}</Text>
      {step.body ? <Text style={styles.body}>{step.body}</Text> : null}

      <View style={styles.options}>
        {step.options.map((opt) => (
          <Card key={opt.value} onPress={() => onNext(opt.value, opt.goTo)} style={styles.option}>
            <Text style={styles.optionText}>{opt.label}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.serifPrompt },
  body: { ...typography.body, color: colors.textSecondary },
  options: { gap: Spacing.two },
  option: { paddingVertical: Spacing.three + Spacing.half },
  optionText: { ...typography.body },
});
