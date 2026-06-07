import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { typography } from '@/constants/theme';
import { Screen, Button } from '@/components/ui';
import type { PassageStep as PassageStepType } from '@/types/flow';

interface Props {
  step: PassageStepType;
  onNext: () => void;
  onExit: () => void;
}

export default function PassageStep({ step, onNext }: Props) {
  return (
    <Screen center>
      <Text style={styles.body}>{step.body}</Text>
      <Button label="Continue" variant="secondary" onPress={() => onNext()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Serif running text, read slowly.
  body: { ...typography.serifBody, textAlign: 'center' },
});
