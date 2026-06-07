import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import { Card } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { ChoiceStep as ChoiceStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function ChoiceStep({ step, inputs, onNext }: StepProps<ChoiceStepType>) {
  const title = resolveTokens(step.title, inputs);
  const body = resolveTokens(step.body, inputs);

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}

      <View style={styles.options}>
        {step.options.map((opt) => (
          <Card key={opt.value} onPress={() => onNext(opt.value, opt.goTo)} style={styles.option}>
            <Text style={styles.optionText}>{resolveTokens(opt.label, inputs)}</Text>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: Spacing.three },
  title: { ...typography.serifPrompt },
  body: { ...typography.body, color: colors.textSecondary },
  options: { gap: Spacing.two },
  option: { paddingVertical: Spacing.three + Spacing.half },
  optionText: { ...typography.body },
});
