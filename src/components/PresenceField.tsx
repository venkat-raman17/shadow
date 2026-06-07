import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { colors, typography, Spacing, radii } from '@/constants/theme';
import type { PartListItem } from '@/lib/db';

const DAY_MS = 24 * 60 * 60 * 1000;

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
  return (
    <View style={styles.field}>
      {parts.map((part) => (
        <Presence key={part.id} part={part} />
      ))}
    </View>
  );
}

function Presence({ part }: { part: PartListItem }) {
  const recent = metRecently(part.last_met_at ?? part.created_at);
  const golden = part.golden === 1;

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
        {part.name ?? 'An unnamed part'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
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
