import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, Button } from '@/components/ui';
import type { ScaleStep as ScaleStepType } from '@/types/flow';

interface Props {
  step: ScaleStepType;
  onNext: (value: number) => void;
  onExit: () => void;
}

export default function ScaleStep({ step, onNext }: Props) {
  const mid = Math.round((step.min + step.max) / 2);
  const [value, setValue] = useState(mid);

  return (
    <Screen scroll={false}>
      <Text style={styles.title}>{step.title}</Text>
      {step.body ? <Text style={styles.body}>{step.body}</Text> : null}

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

      <View style={styles.spacer} />
      <Button label="Continue" onPress={() => onNext(value)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.serifPrompt },
  body: { ...typography.body, color: colors.textSecondary },
  sliderWrapper: { gap: Spacing.two, marginTop: Spacing.three },
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
  spacer: { flex: 1 },
});
