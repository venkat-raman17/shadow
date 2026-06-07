import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, Card } from '@/components/ui';
import { ChargeDots } from '@/components/ChargeDots';
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

function EntryRow({ entry }: { entry: EntryListItem }) {
  return (
    <Card>
      <View style={styles.entryMeta}>
        <Text style={styles.entryDate}>{formatDate(entry.created_at)}</Text>
        {entry.quality ? <Text style={styles.entryQuality}>{entry.quality}</Text> : null}
      </View>
      {entry.charge !== null ? <ChargeDots charge={entry.charge} /> : null}
    </Card>
  );
}

export default function HistoryScreen() {
  const entries = useRecentEntries(200);

  return (
    <>
      <Stack.Screen
        options={{
          title: "What you've noticed",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: '',
        }}
      />
      <Screen edges={['bottom']} contentStyle={styles.content}>
        {entries.length === 0 ? (
          <Text style={styles.empty}>Nothing yet. Come back after a practice.</Text>
        ) : (
          <View style={styles.list}>
            {entries.map((entry) => (
              <EntryRow key={entry.id} entry={entry} />
            ))}
          </View>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: Spacing.three },
  list: { gap: Spacing.two },
  entryMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryDate: { ...typography.caption, color: colors.textSecondary },
  entryQuality: { ...typography.bodySmall, fontStyle: 'italic' },
  empty: {
    ...typography.serifBody,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.six,
  },
});
