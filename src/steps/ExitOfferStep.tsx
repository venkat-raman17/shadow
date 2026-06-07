import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import { Card, Button } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { ExitOfferStep as ExitOfferStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function ExitOfferStep({ step, inputs, onNext, onExit }: StepProps<ExitOfferStepType>) {
  const body = resolveTokens(step.body, inputs) || 'You can stop here. That’s enough.';

  return (
    <View style={styles.block}>
      <Card>
        <Text style={styles.body}>{body}</Text>
      </Card>

      <View style={styles.actions}>
        <Button label="Stop here" variant="secondary" onPress={onExit} />
        <Button label="Keep going" onPress={() => onNext()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: Spacing.three },
  body: { ...typography.serifBody, color: colors.textPrimary },
  actions: { gap: Spacing.two },
});
