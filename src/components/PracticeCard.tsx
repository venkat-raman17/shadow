import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { colors, typography, Spacing } from '@/constants/theme';
import { Card } from '@/components/ui';
import type { Practice } from '@/lib/practices';

/**
 * The icon + title + blurb + duration row used on Home and the practices
 * browse list. Tapping opens the practice's flow.
 */
export function PracticeCard({ practice }: { practice: Practice }) {
  return (
    <Card onPress={() => router.push(`/flow/${practice.id}`)} style={styles.practiceCard}>
      <SymbolView
        name={practice.icon}
        size={22}
        tintColor={colors.accent}
        style={styles.practiceIcon}
      />
      <View style={styles.practiceBody}>
        <Text style={styles.practiceTitle}>{practice.title}</Text>
        <Text style={styles.practiceSubtitle}>{practice.blurb}</Text>
        <Text style={styles.practiceMeta}>~{practice.estimatedMinutes} min</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  practiceCard: { flexDirection: 'row', gap: Spacing.three, alignItems: 'flex-start' },
  practiceIcon: { marginTop: Spacing.half, width: 22, height: 22 },
  practiceBody: { flex: 1, gap: Spacing.half },
  practiceTitle: { ...typography.body, fontWeight: '500' },
  practiceSubtitle: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
  practiceMeta: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.half },
});
