import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Spacing, radii, makeElevation, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { SketchView, parseSketch } from '@/components/Sketch';
import type { PartListItem } from '@/lib/db';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Edge of a drawn figure's face in the constellation. */
const FIGURE_SIZE = 72;

// Kept at module scope (not in the component body) so the time read stays out of
// render — matches how the rest of the app computes recency.
function metRecently(ms: number): boolean {
  return Date.now() - ms < 14 * DAY_MS;
}

/**
 * The parts you've sat with, rendered as presences you can return to rather
 * than dated rows — a soft field of figures, not a ledger. Recency warms a
 * presence slightly; nothing is counted or ranked.
 */
export function PresenceField({ parts }: { parts: PartListItem[] }) {
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.field}>
      {parts.map((part) => (
        <Presence key={part.id} part={part} />
      ))}
    </View>
  );
}

function Presence({ part }: { part: PartListItem }) {
  const styles = useThemedStyles(makeStyles);
  const recent = metRecently(part.last_met_at ?? part.created_at);
  const golden = part.golden === 1;
  const sketch = parseSketch(part.sketch);
  const name = part.name ?? 'An unnamed part';

  // A part you've drawn shows its face; one you haven't stays a quiet presence.
  if (sketch && sketch.paths.length > 0) {
    return (
      <Pressable
        onPress={() => router.push({ pathname: '/part/[id]', params: { id: part.id } })}
        style={({ pressed }) => [styles.figure, pressed && styles.pressed]}>
        <View
          style={[
            styles.figureFrame,
            golden && styles.figureFrameGolden,
            recent && styles.figureFrameRecent,
          ]}>
          <SketchView data={sketch} width={FIGURE_SIZE} height={FIGURE_SIZE} />
        </View>
        <Text style={styles.figureName} numberOfLines={1}>
          {name}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/part/[id]', params: { id: part.id } })}
      style={({ pressed }) => [
        styles.presence,
        golden && styles.presenceGolden,
        recent && styles.presenceRecent,
        pressed && styles.pressed,
      ]}>
      <View style={[styles.dot, golden && styles.dotGolden, recent && styles.dotRecent]} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </Pressable>
  );
}

const makeStyles = ({ colors, typography }: Theme) => {
  const e = makeElevation(colors);
  return StyleSheet.create({
  field: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, alignItems: 'flex-start' },
  figure: { alignItems: 'center', gap: Spacing.one, width: FIGURE_SIZE + Spacing.four * 2 },
  figureFrame: {
    width: FIGURE_SIZE + Spacing.two * 2,
    height: FIGURE_SIZE + Spacing.two * 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.two,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...e.subtle,
  },
  figureFrameRecent: { borderColor: colors.borderStrong },
  figureFrameGolden: { backgroundColor: colors.accentSoft, borderColor: colors.accentMuted },
  figureName: { ...typography.bodySmall, color: colors.textPrimary, textAlign: 'center', maxWidth: FIGURE_SIZE + Spacing.four * 2 },
  presence: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  presenceRecent: { borderColor: colors.borderStrong },
  presenceGolden: { backgroundColor: colors.accentSoft, borderColor: colors.accentMuted },
  pressed: { opacity: 0.7 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textFaint,
  },
  dotRecent: { backgroundColor: colors.accentMuted },
  dotGolden: { backgroundColor: colors.accentWarm },
  name: { ...typography.body, color: colors.textPrimary, maxWidth: 220 },
  });
};
