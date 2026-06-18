import React from 'react';
import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Card, Button } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { ResourceStep as ResourceStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function ResourceStep({ step, inputs, onNext }: StepProps<ResourceStepType>) {
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.block}>
      <Card>
        <Text style={styles.body}>{resolveTokens(step.body, inputs)}</Text>
        <Pressable onPress={() => Linking.openURL('tel:988')}>
          <Text style={styles.link}>988 — call or text anytime</Text>
        </Pressable>
      </Card>

      <Button label="Continue" variant="secondary" onPress={() => onNext()} />
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  block: { gap: Spacing.three },
  body: { ...typography.body, color: colors.textSecondary, lineHeight: 28 },
  link: {
    ...typography.body,
    color: colors.accent,
    textDecorationLine: 'underline',
    marginTop: Spacing.two,
  },
});
