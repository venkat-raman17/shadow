import React from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';

import { Spacing, radii, makeElevation, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, SectionHeader, Button } from '@/components/ui';
import { ChargeGauge } from '@/components/ChargeGauge';
import { SketchView, parseSketch } from '@/components/Sketch';
import { Illustration } from '@/components/illustrations';
import { usePart } from '@/hooks/useIntegration';
import { feltSenseBand } from '@/lib/feltSense';
import { iconForFlow } from '@/lib/practices';
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
  expanded,
  onToggle,
}: {
  session: PartSessionItem;
  golden: boolean;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const styles = useThemedStyles(makeStyles);
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
      <View style={styles.sessionDateRow}>
        <View style={styles.sessionDateLeft}>
          <Illustration name={iconForFlow(session.flow_id)} tone="line" size={20} decorative />
          <Text style={styles.sessionDate}>
            {index === 0 ? 'Most recent · ' : ''}
            {formatDate(session.created_at)}
          </Text>
        </View>
        {index > 0 && (
          <Pressable onPress={onToggle}>
            <Text style={styles.sessionToggle}>{expanded ? 'Hide ↑' : 'Show ↓'}</Text>
          </Pressable>
        )}
      </View>

      {(session.charge_before !== null || session.charge_after !== null) && (
        <View style={styles.chargeRow}>
          {session.charge_before !== null && (
            <View style={styles.chargeItem}>
              <Text style={styles.chargeLabel}>Walked in</Text>
              <ChargeGauge charge={session.charge_before} />
            </View>
          )}
          {session.charge_after !== null && (
            <View style={styles.chargeItem}>
              <Text style={styles.chargeLabel}>Left</Text>
              <ChargeGauge charge={session.charge_after} />
            </View>
          )}
        </View>
      )}

      {expanded && origin && (
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>What you found</Text>
          <Text style={styles.fieldValue}>{origin}</Text>
        </View>
      )}

      {expanded && turns.map((t) => (
        <View key={t.key} style={styles.turn}>
          <Text style={styles.turnSpeaker}>{t.speaker === 'part' ? 'It said' : 'You said'}</Text>
          <View style={styles.turnRow}>
            <View style={[styles.turnAccent, t.speaker === 'you' && styles.turnAccentYou]} />
            <Text style={styles.turnText}>{t.text}</Text>
          </View>
        </View>
      ))}

      {expanded && session.need && (
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
  const { width } = useWindowDimensions();
  const sketchBox = Math.min(width - Spacing.three * 2, 360);
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

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
  const sketch = parseSketch(part.sketch);
  const form = safeParse(part.form);
  const image = isGolden ? null : asText(form?.image);
  const age = isGolden ? null : asText(form?.age);
  const metAgain =
    part.last_met_at !== null && part.last_met_at - part.created_at > 60 * 1000;

  // The last thing it said, to pick the conversation back up where it ended.
  const recent = part.sessions[0];
  const recentDialogue = safeParse(recent?.dialogue ?? null);
  const lastSaid = recentDialogue
    ? asText(recentDialogue.d5) ??
      asText(recentDialogue.d3) ??
      asText(recentDialogue.d1) ??
      asText(recentDialogue.origin)
    : null;

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

        {lastSaid ? (
          <View style={styles.lastSaid}>
            <Text style={styles.fieldLabel}>Last time, it said</Text>
            <View style={styles.lastSaidRow}>
              <View style={styles.lastSaidAccent} />
              <Text style={styles.lastSaidText} numberOfLines={4}>
                {lastSaid}
              </Text>
            </View>
          </View>
        ) : null}

        {sketch ? (
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>How you drew it</Text>
            <View style={styles.sketchLift}>
              <View style={[styles.sketchFrame, { width: sketchBox, height: sketchBox }]}>
                <SketchView data={sketch} width={sketchBox} height={sketchBox} />
              </View>
            </View>
          </View>
        ) : (
          <Pressable
            style={styles.sketchPlaceholder}
            onPress={() => router.push({ pathname: '/sketch/[partId]', params: { partId: part.id } })}>
            <Text style={styles.sketchPlaceholderText}>
              No drawing yet — tap to draw what this part looks like →
            </Text>
          </Pressable>
        )}

        <Button
          label={lastSaid ? 'Pick up where you left off' : 'Sit with this part again'}
          variant="secondary"
          onPress={() =>
            router.push({
              pathname: '/flow/[id]',
              params: {
                id: MEETING_FLOW_ID,
                partId: part.id,
                partName: part.name ?? '',
                // A word for how it last felt — so the return can ask, in words,
                // what's shifted. Never a number.
                priorFelt: feltSenseBand(recent?.charge_after ?? recent?.charge_before),
              },
            })
          }
        />

        {sketch && (
          <Button
            label="Edit your drawing"
            variant="ghost"
            onPress={() => router.push({ pathname: '/sketch/[partId]', params: { partId: part.id } })}
          />
        )}

        {part.sessions.length > 0 && (
          <View style={styles.sessionsSection}>
            <SectionHeader>
              {part.sessions.length === 1 ? 'Your meeting' : 'Your meetings'}
            </SectionHeader>
            {part.sessions.map((s, i) => (
              <SessionBlock
                key={s.id}
                session={s}
                golden={isGolden}
                index={i}
                expanded={i === 0 || expandedIds.has(s.id)}
                onToggle={() =>
                  setExpandedIds((prev) => {
                    const next = new Set(prev);
                    if (next.has(s.id)) next.delete(s.id);
                    else next.add(s.id);
                    return next;
                  })
                }
              />
            ))}
          </View>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) => {
  const e = makeElevation(colors);
  return StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  name: { ...typography.display, flexShrink: 1 },
  goldenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accentWarm },
  meta: { gap: Spacing.half },
  metaLine: { ...typography.caption, color: colors.textSecondary },

  field: { gap: Spacing.one },
  fieldLabel: { ...typography.bodySmall, color: colors.textSecondary },
  fieldValue: { ...typography.serifBody, color: colors.textPrimary },
  // The lift sits on a wrapper so the framed portrait can keep `overflow: hidden`
  // for clean corners while still casting a soft shadow (iOS clips a shadow on the
  // same view that clips its bounds).
  sketchLift: {
    alignSelf: 'flex-start',
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    ...e.subtle,
  },
  sketchFrame: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sketchPlaceholder: {
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radii.md,
    padding: Spacing.three,
  },
  sketchPlaceholderText: { ...typography.bodySmall, color: colors.textFaint, fontStyle: 'italic' },

  lastSaid: { gap: Spacing.one },
  lastSaidRow: { flexDirection: 'row', gap: Spacing.three },
  lastSaidAccent: { width: 3, borderRadius: 2, backgroundColor: colors.accent },
  lastSaidText: { ...typography.serifBody, flex: 1, color: colors.textPrimary, fontStyle: 'italic' },

  sessionsSection: { gap: Spacing.three },
  session: {
    gap: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sessionDateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sessionDateLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, flexShrink: 1 },
  sessionDate: { ...typography.caption, color: colors.textSecondary },
  sessionToggle: { ...typography.caption, color: colors.accent },
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
};
