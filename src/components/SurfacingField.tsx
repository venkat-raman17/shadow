import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { colors, typography, Spacing } from '@/constants/theme';
import type { SurfacingPattern } from '@/lib/db';

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * What keeps surfacing, shown as weather rather than a leaderboard. A quality's
 * visual *weight* — size and warmth — reflects how recently and how often it has
 * come up, but NO number or rank is ever shown. This is a deliberate
 * anti-gamification choice: it's a mirror of what's present, not a scoreboard.
 * The honest sentence is preserved as the accessibility label.
 */
export function SurfacingField({ patterns }: { patterns: SurfacingPattern[] }) {
  // Order by recency (temporal, not a ranking of importance).
  const ordered = [...patterns].sort((a, b) => b.lastAt - a.lastAt);
  return (
    <View style={styles.field}>
      {ordered.map((p) => (
        <Word key={p.quality} pattern={p} />
      ))}
    </View>
  );
}

function cap(s: string): string {
  return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function relativeRecency(ms: number): string {
  const days = Math.floor((Date.now() - ms) / DAY_MS);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return 'this week';
  if (days < 14) return 'last week';
  if (days < 35) return 'this month';
  if (days < 75) return 'last month';
  return 'a while ago';
}

// The same honest, tentative phrasing used elsewhere — never scored.
function patternSentence(quality: string, count: number, lastAt: number): string {
  const q = cap(quality);
  const stale = Date.now() - lastAt > 60 * DAY_MS;
  if (stale) {
    return count <= 1 ? `${q} came up once, a while back.` : `${q} surfaced a few times, though not recently.`;
  }
  const when = relativeRecency(lastAt);
  if (count <= 1) return `${q} surfaced ${when}.`;
  if (count <= 3) return `${q} seems to keep surfacing — most recently ${when}.`;
  return `${q} keeps coming up — most recently ${when}.`;
}

// Visual weight from recency + frequency — kept at module scope so the time
// read stays out of render. Returns presentation only; never a number on screen.
function weightFor(pattern: SurfacingPattern): { fontSize: number; color: string } {
  const recencyDays = (Date.now() - pattern.lastAt) / DAY_MS;
  const recencyFactor = recencyDays < 7 ? 1 : recencyDays < 35 ? 0.7 : recencyDays < 75 ? 0.5 : 0.35;
  // Cap the count contribution so a single quality can never dominate the field.
  const frequencyFactor = Math.min(pattern.count, 4) / 4;
  const weight = recencyFactor * (0.45 + 0.55 * frequencyFactor); // 0.16 … 1

  return {
    fontSize: 16 + Math.round(weight * 12), // 18 … 28
    color: weight > 0.6 ? colors.textPrimary : weight > 0.35 ? colors.textSecondary : colors.textFaint,
  };
}

function Word({ pattern }: { pattern: SurfacingPattern }) {
  const { fontSize, color } = weightFor(pattern);

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/history', params: { quality: pattern.quality } })}
      accessibilityRole="button"
      accessibilityLabel={patternSentence(pattern.quality, pattern.count, pattern.lastAt)}
      style={({ pressed }) => pressed && styles.pressed}>
      <Text style={[styles.word, { fontSize, lineHeight: fontSize + 8, color }]}>
        {pattern.quality}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: Spacing.three,
  },
  word: { ...typography.serifBody },
  pressed: { opacity: 0.6 },
});
