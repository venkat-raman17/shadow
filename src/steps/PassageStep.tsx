import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { typography, Spacing } from '@/constants/theme';
import { Button } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { PassageStep as PassageStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function PassageStep({ step, inputs, onNext }: StepProps<PassageStepType>) {
  return (
    <View style={styles.block}>
      <Text style={styles.body}>{resolveTokens(step.body, inputs)}</Text>
      <Button label="Continue" variant="secondary" onPress={() => onNext()} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: Spacing.four },
  // Serif running text, read slowly — the guide's voice.
  body: { ...typography.serifBody },
});
