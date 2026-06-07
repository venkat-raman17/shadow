import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, SectionHeader, Button } from '@/components/ui';
import { ChargeDots } from '@/components/ChargeDots';
import { usePart } from '@/hooks/useIntegration';
import type { PartSessionItem } from '@/lib/db';

const MEETING_FLOW_ID = 'meeting.active_imagination.v1';

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ms));
}

function safeParse(json: string | null): Record<string, unknown> | null {
  if (!json) return null;
  try {
    const v = JSON.parse(json);
    return v && typeof v === 'object' ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function asText(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v : null;
}

const DIALOGUE_TURNS: { key: string; speaker: 'part' | 'you' }[] = [
  { key: 'd1', speaker: 'part' },
  { key: 'd2', speaker: 'you' },
  { key: 'd3', speaker: 'part' },
  { key: 'd4', speaker: 'you' },
  { key: 'd5', speaker: 'part' },
];

function SessionBlock({
  session,
  golden,
  index,
}: {
  session: PartSessionItem;
  golden: boolean;
  index: number;
}) {
  // Render by the session's OWN captured shape, not the part-level golden flag.
  // (A part can be re-met via the other path; reading by part.golden would drop
  // a difficult session's dialogue from a golden part, or vice versa.)
  const dialogue = safeParse(session.dialogue);
  const origin = asText(dialogue?.origin);
  const turns = DIALOGUE_TURNS.map((t) => ({ ...t, text: asText(dialogue?.[t.key]) })).filter(
    (t) => t.text,
  );
  const needIsGolden = origin ? true : turns.length > 0 ? false : golden;

  return (
    <View style={styles.session}>
      <Text style={styles.sessionDate}>
        {index === 0 ? 'Most recent · ' : ''}
        {formatDate(session.created_at)}
      </Text>

      {(session.charge_before !== null || session.charge_after !== null) && (
        <View style={styles.chargeRow}>
          {session.charge_before !== null && (
            <View style={styles.chargeItem}>
              <Text style={styles.chargeLabel}>Walked in</Text>
              <ChargeDots charge={session.charge_before} />
            </View>
          )}
          {session.charge_after !== null && (
            <View style={styles.chargeItem}>
              <Text style={styles.chargeLabel}>Left</Text>
              <ChargeDots charge={session.charge_after} />
            </View>
          )}
        </View>
      )}

      {origin && (
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>What you found</Text>
          <Text style={styles.fieldValue}>{origin}</Text>
        </View>
      )}

      {turns.map((t) => (
        <View key={t.key} style={styles.turn}>
          <Text style={styles.turnSpeaker}>{t.speaker === 'part' ? 'It said' : 'You said'}</Text>
          <View style={styles.turnRow}>
            <View style={[styles.turnAccent, t.speaker === 'you' && styles.turnAccentYou]} />
            <Text style={styles.turnText}>{t.text}</Text>
          </View>
        </View>
      ))}

      {session.need && (
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            {needIsGolden ? 'Where it could live' : 'What it needs'}
          </Text>
          <Text style={styles.fieldValue}>{session.need}</Text>
        </View>
      )}
    </View>
  );
}

export default function PartScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { part, loading } = usePart(id);

  if (loading) {
    return (
      <Screen scroll={false} center>
        <ActivityIndicator color={colors.accent} />
      </Screen>
    );
  }

  if (!part) {
    return (
      <Screen scroll={false} center>
        <Text style={styles.errorText}>Part not found.</Text>
      </Screen>
    );
  }

  const isGolden = part.golden === 1;
  const form = safeParse(part.form);
  const image = isGolden ? null : asText(form?.image);
  const age = isGolden ? null : asText(form?.age);
  const metAgain =
    part.last_met_at !== null && part.last_met_at - part.created_at > 60 * 1000;

  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <Screen>
        <View style={styles.header}>
          <Text style={styles.name}>{part.name ?? 'A part of you'}</Text>
          {isGolden ? <View style={styles.goldenDot} /> : null}
        </View>

        <View style={styles.meta}>
          <Text style={styles.metaLine}>First met {formatDate(part.created_at)}</Text>
          {metAgain && part.last_met_at !== null && (
            <Text style={styles.metaLine}>Last sat with {formatDate(part.last_met_at)}</Text>
          )}
          {part.body_location ? (
            <Text style={styles.metaLine}>Felt in the {part.body_location}</Text>
          ) : null}
          {age ? <Text style={styles.metaLine}>Feels about {age}</Text> : null}
        </View>

        {image ? (
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>How it appears</Text>
            <Text style={styles.fieldValue}>{image}</Text>
          </View>
        ) : null}

        {part.first_appeared ? (
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>When it first showed up</Text>
            <Text style={styles.fieldValue}>{part.first_appeared}</Text>
          </View>
        ) : null}

        <Button
          label="Sit with this part again"
          variant="secondary"
          onPress={() =>
            router.push({ pathname: '/flow/[id]', params: { id: MEETING_FLOW_ID, partId: part.id } })
          }
        />

        {part.sessions.length > 0 && (
          <View style={styles.sessionsSection}>
            <SectionHeader>
              {part.sessions.length === 1 ? 'Your meeting' : 'Your meetings'}
            </SectionHeader>
            {part.sessions.map((s, i) => (
              <SessionBlock key={s.id} session={s} golden={isGolden} index={i} />
            ))}
          </View>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  name: { ...typography.display, flexShrink: 1 },
  goldenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accentWarm },
  meta: { gap: Spacing.half },
  metaLine: { ...typography.caption, color: colors.textSecondary },

  field: { gap: Spacing.one },
  fieldLabel: { ...typography.bodySmall, color: colors.textSecondary },
  fieldValue: { ...typography.serifBody, color: colors.textPrimary },

  sessionsSection: { gap: Spacing.three },
  session: {
    gap: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sessionDate: { ...typography.caption, color: colors.textSecondary },
  chargeRow: { flexDirection: 'row', gap: Spacing.five, flexWrap: 'wrap' },
  chargeItem: { gap: Spacing.one },
  chargeLabel: { ...typography.caption, color: colors.textFaint },

  turn: { gap: Spacing.one },
  turnSpeaker: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.textFaint,
  },
  turnRow: { flexDirection: 'row', gap: Spacing.three },
  turnAccent: { width: 3, borderRadius: 2, backgroundColor: colors.accent },
  turnAccentYou: { backgroundColor: colors.accentWarm },
  turnText: { ...typography.serifBody, flex: 1, color: colors.textPrimary },

  errorText: { ...typography.body, color: colors.textSecondary },
});
