import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

import { colors, typography, Spacing } from '@/constants/theme';
import { Button } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { ScaleStep as ScaleStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function ScaleStep({ step, inputs, onNext }: StepProps<ScaleStepType>) {
  const mid = Math.round((step.min + step.max) / 2);
  const [value, setValue] = useState(mid);

  const title = resolveTokens(step.title, inputs);
  const body = resolveTokens(step.body, inputs);

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}

      <View style={styles.sliderWrapper}>
        <Text style={styles.valueLabel}>{value}</Text>
        <Slider
          style={styles.slider}
          minimumValue={step.min}
          maximumValue={step.max}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor={colors.accent}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.accent}
        />
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeLabel}>{step.minLabel}</Text>
          <Text style={styles.rangeLabel}>{step.maxLabel}</Text>
        </View>
      </View>

      <Button label="Continue" onPress={() => onNext(value)} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: Spacing.three },
  title: { ...typography.serifPrompt },
  body: { ...typography.body, color: colors.textSecondary },
  sliderWrapper: { gap: Spacing.two, marginTop: Spacing.one },
  valueLabel: {
    ...typography.displaySmall,
    fontSize: 36,
    lineHeight: 44,
    textAlign: 'center',
    color: colors.accent,
  },
  slider: { width: '100%', height: 40 },
  rangeLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  rangeLabel: { ...typography.caption },
});
