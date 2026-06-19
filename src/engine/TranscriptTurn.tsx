import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { resolveTokens } from '@/engine/tokens';
import { SketchView, parseSketch } from '@/components/Sketch';
import { ChargeGauge } from '@/components/ChargeGauge';
import type { FlowInputs, Step } from '@/types/flow';

/** Size of the read-only drawing thumbnail frozen into the transcript. */
const SKETCH_THUMB = 180;

/**
 * A completed step, frozen into the scrolling thread as a read-only turn — the
 * guide's words in one voice, the user's own answer in another. This is what
 * makes a session read like an accumulating conversation rather than a stack of
 * discarded form screens. Guide copy is token-resolved so the transcript shows
 * exactly what the user saw.
 */
export default function TranscriptTurn({
  step,
  inputs,
}: {
  step: Step;
  inputs: FlowInputs;
}) {
  const styles = useThemedStyles(makeStyles);
  switch (step.type) {
    case 'prompt': {
      const answer = strValue(inputs[step.inputKey]);
      return (
        <View style={styles.turn}>
          <Text style={styles.guide}>{resolveTokens(step.title, inputs)}</Text>
          {answer ? <Answer text={answer} /> : null}
        </View>
      );
    }

    case 'dialogue': {
      const answer = strValue(inputs[step.inputKey]);
      if (!answer) return null;
      const isPart = step.speaker === 'part';
      return (
        <View style={styles.turn}>
          <Text style={styles.speaker}>{isPart ? 'The part' : 'You'}</Text>
          <Answer text={answer} voice={isPart ? 'part' : 'you'} />
        </View>
      );
    }

    case 'scale': {
      const v = inputs[step.inputKey];
      return (
        <View style={styles.turn}>
          <Text style={styles.guide}>{resolveTokens(step.title, inputs)}</Text>
          {typeof v === 'number' ? <ChargeGauge charge={v} max={step.max} /> : null}
        </View>
      );
    }

    case 'choice': {
      const v = strValue(inputs[step.inputKey]);
      const chosen = step.options.find((o) => o.value === v);
      return (
        <View style={styles.turn}>
          <Text style={styles.guide}>{resolveTokens(step.title, inputs)}</Text>
          {chosen ? <Answer text={resolveTokens(chosen.label, inputs)} /> : null}
        </View>
      );
    }

    case 'draw': {
      const data = parseSketch(strValue(inputs[step.inputKey]));
      return (
        <View style={styles.turn}>
          <Text style={styles.guide}>{resolveTokens(step.title, inputs)}</Text>
          {data ? (
            <View style={styles.sketchFrame}>
              <SketchView data={data} width={SKETCH_THUMB} height={SKETCH_THUMB} />
            </View>
          ) : null}
        </View>
      );
    }

    case 'passage':
    case 'resource':
      return (
        <View style={styles.turn}>
          <Text style={styles.guideQuiet}>{resolveTokens(step.body, inputs)}</Text>
        </View>
      );

    case 'pause':
      return (
        <View style={[styles.turn, styles.pauseTurn]}>
          <View style={styles.pauseDot} />
        </View>
      );

    // exitOffer is a meta-gate; once passed it leaves no trace in the thread.
    case 'exitOffer':
    default:
      return null;
  }
}

function Answer({ text, voice = 'you' }: { text: string; voice?: 'you' | 'part' }) {
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.answerWrap}>
      <Text style={[styles.answer, voice === 'part' && styles.answerPart]}>{text}</Text>
    </View>
  );
}

function strValue(v: string | number | undefined): string {
  if (v === undefined || v === null) return '';
  return String(v).trim();
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  turn: { gap: Spacing.two },
  guide: { ...typography.serifBody, color: colors.textSecondary },
  guideQuiet: { ...typography.serifBody, color: colors.textFaint },
  speaker: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.accent,
  },
  answerWrap: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accentMuted,
    paddingLeft: Spacing.three,
    borderRadius: radii.sm,
  },
  answer: { ...typography.body, color: colors.textPrimary },
  answerPart: { ...typography.serifBody, fontStyle: 'italic' },
  sketchFrame: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: Spacing.two,
  },
  pauseTurn: { alignItems: 'center', paddingVertical: Spacing.one },
  pauseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
});
