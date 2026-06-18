import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, TextField, Card } from '@/components/ui';
import { ChargeDots } from '@/components/ChargeDots';
import { useCrypto } from '@/context/CryptoContext';
import { useParts } from '@/hooks/useIntegration';
import { searchEntries, type SearchResult } from '@/lib/db';

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ms));
}

export default function SearchScreen() {
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const parts = useParts();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  // Search is for memory recall, not compulsive self-checking — it opens once
  // the user has done some deeper work (sat with a part).
  const gated = parts.length === 0;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!key || gated) return;
    const q = query.trim();
    let active = true;
    // Debounced so we only decrypt-and-scan once the user pauses typing.
    const t = setTimeout(() => {
      if (q.length < 2) {
        setResults([]);
        setSearched(false);
        return;
      }
      searchEntries(db, q, key).then((rows) => {
        if (active) {
          setResults(rows);
          setSearched(true);
        }
      });
    }, 250);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [db, key, query, gated]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: 'Back',
        }}
      />
      <Screen edges={['bottom']}>
        <Text style={styles.heading}>Find a reflection</Text>

        {gated ? (
          <Text style={styles.gate}>
            Search opens once you&apos;ve sat with a part. For now, your recent reflections are on the
            Reflections tab.
          </Text>
        ) : (
          <>
            <Text style={styles.intent}>
              For finding something you wrote before — a gentle return, not a checking-up on yourself.
            </Text>

            <TextField
              value={query}
              onChangeText={setQuery}
              placeholder="A word or a name…"
              returnKeyType="search"
            />

            {searched && results.length === 0 ? (
              <Text style={styles.empty}>Nothing matches that yet.</Text>
            ) : (
              <View style={styles.list}>
                {results.map((r) => (
                  <Card
                    key={r.id}
                    onPress={() => router.push({ pathname: '/entry/[id]', params: { id: r.id } })}
                    accessibilityLabel={r.subject ?? 'A quiet noticing'}>
                    <Text style={styles.title} numberOfLines={1}>
                      {r.subject ?? 'A quiet noticing'}
                    </Text>
                    {r.snippet ? (
                      <Text style={styles.snippet} numberOfLines={2}>
                        {r.snippet}
                      </Text>
                    ) : null}
                    <View style={styles.meta}>
                      <Text style={styles.date}>{formatDate(r.created_at)}</Text>
                      {r.quality ? <Text style={styles.quality}>{r.quality}</Text> : null}
                    </View>
                    {r.charge !== null ? <ChargeDots charge={r.charge} /> : null}
                  </Card>
                ))}
              </View>
            )}
          </>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  heading: { ...typography.display },
  gate: { ...typography.serifBody, color: colors.textSecondary, marginTop: Spacing.two, lineHeight: 28 },
  intent: { ...typography.bodySmall, color: colors.textSecondary, marginTop: -Spacing.one },
  list: { gap: Spacing.two },
  title: { ...typography.body, fontWeight: '500', lineHeight: 24 },
  snippet: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { ...typography.caption, color: colors.textSecondary },
  quality: { ...typography.bodySmall, fontStyle: 'italic' },
  empty: {
    ...typography.serifBody,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.six,
  },
});
