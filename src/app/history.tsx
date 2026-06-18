import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, Card, SectionHeader } from '@/components/ui';
import { ChargeDots } from '@/components/ChargeDots';
import { useRecentEntries, useEntriesByQuality } from '@/hooks/useEntries';
import type { EntryListItem } from '@/lib/db';

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));
}

function monthLabel(ms: number): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(ms));
}

function EntryRow({ entry }: { entry: EntryListItem }) {
  const styles = useThemedStyles(makeStyles);
  return (
    <Card onPress={() => router.push({ pathname: '/entry/[id]', params: { id: entry.id } })}>
      {entry.subject ? (
        <Text style={styles.entryTitle} numberOfLines={2}>
          {entry.subject}
        </Text>
      ) : (
        <Text style={[styles.entryTitle, styles.entryTitleEmpty]} numberOfLines={1}>
          A quiet noticing
        </Text>
      )}
      <View style={styles.entryMeta}>
        <Text style={styles.entryDate}>{formatDate(entry.created_at)}</Text>
        {entry.quality ? <Text style={styles.entryQuality}>{entry.quality}</Text> : null}
      </View>
      {entry.charge !== null ? <ChargeDots charge={entry.charge} /> : null}
    </Card>
  );
}

export default function HistoryScreen() {
  const { quality } = useLocalSearchParams<{ quality?: string }>();
  const recent = useRecentEntries(200);
  const filtered = useEntriesByQuality(quality, 200);
  const entries = quality ? filtered : recent;
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  // Patterns pass a normalized (lowercased) family token; tidy it for display.
  const qualityLabel = quality ? quality.charAt(0).toUpperCase() + quality.slice(1) : '';
  const title = quality ? `When “${qualityLabel}” surfaced` : "What you've noticed";
  const emptyText = quality
    ? `Nothing tagged “${qualityLabel}” yet.`
    : 'Nothing yet. Come back after a practice.';

  // Group already-sorted (desc) entries under month headers — computed purely so
  // each row carries the header to show (if the month changed from the row above).
  const rows = entries.map((entry, i) => {
    const month = monthLabel(entry.created_at);
    const prevMonth = i > 0 ? monthLabel(entries[i - 1].created_at) : null;
    return { entry, header: month !== prevMonth ? month : null };
  });

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: '',
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/search')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Search your reflections">
              <SymbolView
                name={{ ios: 'magnifyingglass', web: 'search' }}
                size={18}
                tintColor={colors.textSecondary}
              />
            </Pressable>
          ),
        }}
      />
      <Screen edges={['bottom']} contentStyle={styles.content}>
        {entries.length === 0 ? (
          <Text style={styles.empty}>{emptyText}</Text>
        ) : (
          <View style={styles.list}>
            {rows.map(({ entry, header }) => (
              <React.Fragment key={entry.id}>
                {header && (
                  <View style={styles.monthHeader}>
                    <SectionHeader>{header}</SectionHeader>
                  </View>
                )}
                <EntryRow entry={entry} />
              </React.Fragment>
            ))}
          </View>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  content: { paddingTop: Spacing.three },
  list: { gap: Spacing.two },
  monthHeader: { marginTop: Spacing.two },
  entryTitle: { ...typography.body, fontWeight: '500', lineHeight: 24 },
  entryTitleEmpty: { fontWeight: '400', fontStyle: 'italic', color: colors.textSecondary },
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
