import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

import { Spacing, radii, makeElevation, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen } from '@/components/ui';
import { ChargeGauge } from '@/components/ChargeGauge';
import { SketchView, parseSketch } from '@/components/Sketch';
import { Illustration } from '@/components/illustrations';
import { useEntry } from '@/hooks/useEntries';
import { readbackFields, iconForFlow, getPractice } from '@/lib/practices';

/** Size of the drawing shown on an entry it belongs to. */
const ENTRY_SKETCH_SIZE = 260;

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
  const styles = useThemedStyles(makeStyles);
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
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

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

  const sketch = parseSketch(entry.sketch);

  return (
    <>
      <Stack.Screen
        options={{
          title: getPractice(entry.flow_id ?? '')?.title ?? 'A moment you noticed',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: '',
        }}
      />
      <Screen>
        <View style={styles.headerIllo}>
          <Illustration name={iconForFlow(entry.flow_id)} tone="soft" width={120} height={106} decorative />
        </View>
        <Text style={styles.date}>{formatDate(entry.created_at)}</Text>

        {written.map((f) => (
          <ReflectionBlock key={f.key} question={f.question} answer={f.value as string} />
        ))}

        {sketch ? (
          <View style={styles.sketchBlock}>
            <Text style={styles.question}>What you drew</Text>
            <View style={styles.sketchFrame}>
              <SketchView data={sketch} width={ENTRY_SKETCH_SIZE} height={ENTRY_SKETCH_SIZE} />
            </View>
          </View>
        ) : null}

        {written.length === 0 && !sketch ? (
          <Text style={styles.empty}>
            You sat with this one quietly — nothing was written down.
          </Text>
        ) : null}

        {entry.charge !== null && (
          <View style={styles.footer}>
            <Text style={styles.chargeLabel}>How present it felt</Text>
            <ChargeGauge charge={entry.charge} />
          </View>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) => {
  const e = makeElevation(colors);
  return StyleSheet.create({
  headerIllo: { alignItems: 'center', marginBottom: Spacing.two },
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
  sketchBlock: { gap: Spacing.two },
  sketchFrame: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: Spacing.three,
    ...e.subtle,
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
};
