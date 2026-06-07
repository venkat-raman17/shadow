import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, Card, Button } from '@/components/ui';
import type { ExitOfferStep as ExitOfferStepType } from '@/types/flow';

interface Props {
  step: ExitOfferStepType;
  onNext: () => void;
  onExit: () => void;
}

export default function ExitOfferStep({ step, onNext, onExit }: Props) {
  return (
    <Screen center>
      <Card>
        <Text style={styles.body}>
          {step.body ?? 'You can stop here. That’s enough.'}
        </Text>
      </Card>

      <View style={styles.actions}>
        <Button label="Stop here" variant="secondary" onPress={onExit} />
        <Button label="Keep going" onPress={() => onNext()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { ...typography.serifBody, color: colors.textPrimary },
  actions: { gap: Spacing.two },
});
