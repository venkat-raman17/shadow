import React from 'react';
import { Text, StyleSheet, Linking, Pressable } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, Card, Button } from '@/components/ui';
import type { ResourceStep as ResourceStepType } from '@/types/flow';

interface Props {
  step: ResourceStepType;
  onNext: () => void;
  onExit: () => void;
}

export default function ResourceStep({ step, onNext }: Props) {
  return (
    <Screen center>
      <Card>
        <Text style={styles.body}>{step.body}</Text>
        <Pressable onPress={() => Linking.openURL('tel:988')}>
          <Text style={styles.link}>988 — call or text anytime</Text>
        </Pressable>
      </Card>

      <Button label="Continue" variant="secondary" onPress={() => onNext()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { ...typography.body, color: colors.textSecondary, lineHeight: 28 },
  link: {
    ...typography.body,
    color: colors.accent,
    textDecorationLine: 'underline',
    marginTop: Spacing.two,
  },
});
