import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Card } from '@/components/ui';
import type { Practice } from '@/lib/practices';

interface Props {
  practice: Practice;
  /** When provided, an always-visible pin toggle is shown (curation, not a metric). */
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

/**
 * The icon + title + blurb row used on Home and the practices browse list.
 * Tapping opens the practice's flow. The duration sits as a compact pill on the
 * right (rather than a third text line), with an optional pin beneath it that
 * toggles the practice in the user's "Yours" shelf.
 */
export function PracticeCard({ practice, isFavorite, onToggleFavorite }: Props) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    // The surface is a plain container; the open-area and the pin are SIBLING
    // pressables (never nested — nested buttons are invalid on web).
    <Card style={styles.practiceCard}>
      <Pressable
        onPress={() => router.push(`/flow/${practice.id}`)}
        accessibilityRole="button"
        accessibilityLabel={practice.title}
        style={({ pressed }) => [styles.openArea, pressed && styles.pressed]}>
        <SymbolView
          name={practice.icon}
          size={22}
          tintColor={colors.accent}
          style={styles.practiceIcon}
        />
        <View style={styles.practiceBody}>
          <Text style={styles.practiceTitle}>{practice.title}</Text>
          <Text style={styles.practiceSubtitle}>{practice.blurb}</Text>
        </View>
      </Pressable>
      <View style={styles.trailing}>
        <View style={styles.durationPill}>
          <Text style={styles.durationText}>~{practice.estimatedMinutes} min</Text>
        </View>
        {onToggleFavorite ? (
          <Pressable
            onPress={() => onToggleFavorite(practice.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? `Unpin ${practice.title}` : `Pin ${practice.title}`}
            accessibilityState={{ selected: !!isFavorite }}
            style={styles.pin}>
            <SymbolView
              name={isFavorite ? { ios: 'pin.fill', web: 'push_pin' } : { ios: 'pin', web: 'push_pin' }}
              size={16}
              tintColor={isFavorite ? colors.accentWarm : colors.textFaint}
            />
          </Pressable>
        ) : null}
      </View>
    </Card>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  practiceCard: { flexDirection: 'row', gap: Spacing.two, alignItems: 'flex-start' },
  openArea: { flex: 1, flexDirection: 'row', gap: Spacing.three, alignItems: 'flex-start' },
  pressed: { opacity: 0.7 },
  practiceIcon: { marginTop: Spacing.half, width: 22, height: 22 },
  practiceBody: { flex: 1, gap: Spacing.half },
  practiceTitle: { ...typography.body, fontWeight: '500' },
  practiceSubtitle: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
  // Right rail: duration pill on top, optional pin tucked beneath it.
  trailing: { alignItems: 'flex-end', gap: Spacing.two, marginTop: Spacing.half },
  durationPill: {
    backgroundColor: colors.chip,
    borderRadius: radii.pill,
    paddingHorizontal: Spacing.two,
    paddingVertical: 1,
  },
  durationText: { ...typography.caption, color: colors.textFaint },
  pin: { paddingLeft: Spacing.two },
});
