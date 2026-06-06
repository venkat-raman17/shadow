import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

import { colors, typography, Spacing } from '@/constants/theme';
import type { ScaleStep as ScaleStepType } from '@/types/flow';

interface Props {
  step: ScaleStepType;
  onNext: (value: number) => void;
  onExit: () => void;
}

export default function ScaleStep({ step, onNext, onExit }: Props) {
  const mid = Math.round((step.min + step.max) / 2);
  const [value, setValue] = useState(mid);

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.nextBtn} onPress={() => onNext(value)}>
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
  title: { ...typography.heading },
  body: { ...typography.body, color: colors.textSecondary },
  sliderWrapper: {
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  valueLabel: {
    ...typography.heading,
    fontSize: 40,
    textAlign: 'center',
    color: colors.accent,
  },
  slider: { width: '100%', height: 40 },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeLabel: { ...typography.caption },
  nextBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
  },
  nextBtnText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.background,
  },
});
