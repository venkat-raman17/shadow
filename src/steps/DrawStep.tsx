import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Button } from '@/components/ui';
import { SketchCanvas, type SketchData } from '@/components/Sketch';
import { resolveTokens } from '@/engine/tokens';
import type { DrawStep as DrawStepType } from '@/types/flow';
import type { StepProps } from './types';

/**
 * A drawing turn. Reuses the editable SketchCanvas (which owns the gesture/refs
 * handling) and commits the serialized { w, h, paths } via onNext. An empty
 * canvas advances with `undefined`, leaving inputs[inputKey] unset — exactly
 * like a skipped optional prompt.
 */
export default function DrawStep({ step, inputs, onNext, onExit }: StepProps<DrawStepType>) {
  const [data, setData] = useState<SketchData | null>(null);
  const styles = useThemedStyles(makeStyles);

  const hasDrawing = (data?.paths.length ?? 0) > 0;
  const canAdvance = step.optional || hasDrawing;
  const title = resolveTokens(step.title, inputs);
  const body = resolveTokens(step.body, inputs);

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}

      <SketchCanvas initial={null} onChange={setData} />

      <Button
        label="Continue"
        onPress={() => onNext(hasDrawing && data ? JSON.stringify(data) : undefined)}
        disabled={!canAdvance}
      />

      {step.exitOffer ? (
        <Button label="You can stop here. That’s enough." variant="ghost" onPress={onExit} />
      ) : null}
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    block: { gap: Spacing.three },
    title: { ...typography.serifPrompt },
    body: { ...typography.body, color: colors.textSecondary },
  });
