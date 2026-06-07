import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen } from '@/components/ui';
import { ChargeDots } from '@/components/ChargeDots';
import { useEntry } from '@/hooks/useEntries';
import { readbackFields } from '@/lib/practices';

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));
}

/** A captured answer: the original question, then the user's words. */
function ReflectionBlock({ question, answer }: { question: string; answer: string }) {
  return (
    <View style={styles.block}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.answerRow}>
        <View style={styles.accent} />
        <Text style={styles.answer}>{answer}</Text>
      </View>
    </View>
  );
}

export default function EntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entry, loading } = useEntry(id);

  if (loading) {
    return (
      <Screen scroll={false} center>
        <ActivityIndicator color={colors.accent} />
      </Screen>
    );
  }

  if (!entry) {
    return (
      <Screen scroll={false} center>
        <Text style={styles.errorText}>Entry not found.</Text>
      </Screen>
    );
  }

  // Render each captured field under its original question, in the order the
  // user answered them. `quality` is included here (not just as a footer tag)
  // because in some flows it's a substantive written answer, not a one-word tag.
  const valueFor: Record<string, string | null> = {
    subject: entry.subject,
    quality: entry.quality,
    echo: entry.echo,
    reclaim: entry.reclaim,
  };
  // Pass the captured values so any echo tokens in the questions resolve to the
  // words the user actually saw.
  const written = readbackFields(entry.flow_id, {
    subject: entry.subject ?? undefined,
    quality: entry.quality ?? undefined,
    echo: entry.echo ?? undefined,
    reclaim: entry.reclaim ?? undefined,
  })
    .map((f) => ({ ...f, value: valueFor[f.key] ?? null }))
    .filter((f) => f.value && f.value.trim());

  return (
    <>
      <Stack.Screen
        options={{
          title: 'A moment you noticed',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: '',
        }}
      />
      <Screen>
        <Text style={styles.date}>{formatDate(entry.created_at)}</Text>

        {written.length > 0 ? (
          written.map((f) => (
            <ReflectionBlock key={f.key} question={f.question} answer={f.value as string} />
          ))
        ) : (
          <Text style={styles.empty}>
            You sat with this one quietly — nothing was written down.
          </Text>
        )}

        {entry.charge !== null && (
          <View style={styles.footer}>
            <Text style={styles.chargeLabel}>How present it felt</Text>
            <ChargeDots charge={entry.charge} />
          </View>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  date: { ...typography.caption, color: colors.textSecondary },
  block: { gap: Spacing.two },
  question: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 22 },
  answerRow: { flexDirection: 'row', gap: Spacing.three },
  accent: { width: 3, borderRadius: 2, backgroundColor: colors.accent },
  answer: { ...typography.serifBody, flex: 1, color: colors.textPrimary },
  empty: {
    ...typography.serifBody,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    marginTop: Spacing.two,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chargeLabel: { ...typography.caption, color: colors.textSecondary },
  errorText: { ...typography.body, color: colors.textSecondary },
});
