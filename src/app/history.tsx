import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography, Spacing } from '@/constants/theme';
import { useRecentEntries } from '@/hooks/useEntries';
import type { EntryListItem } from '@/lib/db';

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));
}

function ChargeDots({ charge }: { charge: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: 10 }, (_, i) => (
        <View
          key={i}
          style={[styles.dot, i < charge ? styles.dotFilled : styles.dotEmpty]}
        />
      ))}
    </View>
  );
}

function EntryRow({ entry }: { entry: EntryListItem }) {
  return (
    <View style={styles.entryRow}>
      <View style={styles.entryMeta}>
        <Text style={styles.entryDate}>{formatDate(entry.created_at)}</Text>
        {entry.quality ? (
          <Text style={styles.entryQuality}>{entry.quality}</Text>
        ) : null}
      </View>
      {entry.charge !== null ? <ChargeDots charge={entry.charge} /> : null}
    </View>
  );
}

export default function HistoryScreen() {
  const entries = useRecentEntries(200);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'What you\'ve noticed',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: '',
        }}
      />
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          {entries.length === 0 ? (
            <Text style={styles.empty}>Nothing yet. Come back after a practice.</Text>
          ) : (
            entries.map((entry) => <EntryRow key={entry.id} entry={entry} />)
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: Spacing.four,
    paddingTop: Spacing.three,
    gap: Spacing.two,
    flexGrow: 1,
  },
  entryRow: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: Spacing.three,
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: colors.border,
  },
  entryMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryDate: { ...typography.caption, color: colors.textSecondary },
  entryQuality: { ...typography.bodySmall, fontStyle: 'italic' },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  dotFilled: { backgroundColor: colors.accentWarm },
  dotEmpty: { backgroundColor: colors.border },
  empty: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: Spacing.six },
});
