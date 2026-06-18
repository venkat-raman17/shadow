import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Card } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { ChoiceStep as ChoiceStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function ChoiceStep({ step, inputs, onNext }: StepProps<ChoiceStepType>) {
  const styles = useThemedStyles(makeStyles);
  const title = resolveTokens(step.title, inputs);
  const body = resolveTokens(step.body, inputs);

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}

      <View style={styles.options}>
        {step.options.map((opt) => {
          const optLabel = resolveTokens(opt.label, inputs);
          return (
            <Card
              key={opt.value}
              onPress={() => onNext(opt.value, opt.goTo)}
              accessibilityLabel={optLabel}
              style={styles.option}>
              <Text style={styles.optionText}>{optLabel}</Text>
            </Card>
          );
        })}
      </View>
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  block: { gap: Spacing.three },
  title: { ...typography.serifPrompt },
  body: { ...typography.body, color: colors.textSecondary },
  options: { gap: Spacing.two },
  option: { paddingVertical: Spacing.three + Spacing.half },
  optionText: { ...typography.body },
});
