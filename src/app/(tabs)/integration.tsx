import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { router } from 'expo-router';

import { colors, typography, Spacing, radii } from '@/constants/theme';
import { Screen, Card, SectionHeader, Button } from '@/components/ui';
import { ChargeDots } from '@/components/ChargeDots';
import { useParts, useSurfacingPatterns, useExperiments } from '@/hooks/useIntegration';
import { useRecentEntries } from '@/hooks/useEntries';
import {
  updateExperimentStatus,
  ExperimentItem,
  PartListItem,
  SurfacingPattern,
  EntryListItem,
} from '@/lib/db';

const HISTORY_LIMIT = 5;

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ms));
}

function formatDateTime(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));
}

function EntryRow({ entry }: { entry: EntryListItem }) {
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
        <Text style={styles.entryDate}>{formatDateTime(entry.created_at)}</Text>
        {entry.quality ? <Text style={styles.entryQuality}>{entry.quality}</Text> : null}
      </View>
      {entry.charge !== null ? <ChargeDots charge={entry.charge} /> : null}
    </Card>
  );
}

const DAY_MS = 24 * 60 * 60 * 1000;

function relativeRecency(ms: number): string {
  const days = Math.floor((Date.now() - ms) / DAY_MS);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return 'this week';
  if (days < 14) return 'last week';
  if (days < 35) return 'this month';
  if (days < 75) return 'last month';
  return 'a while ago';
}

function cap(s: string): string {
  return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

// Honest, tentative phrasing: a one-off never claims to be a pattern, and a
// stale quality isn't said to "keep coming up". Recency is spoken, never scored.
function patternSentence(quality: string, count: number, lastAt: number): string {
  const q = cap(quality);
  const stale = Date.now() - lastAt > 60 * DAY_MS;
  if (stale) {
    return count <= 1
      ? `${q} came up once, a while back.`
      : `${q} surfaced a few times, though not recently.`;
  }
  const when = relativeRecency(lastAt);
  if (count <= 1) return `${q} surfaced ${when}.`;
  if (count <= 3) return `${q} seems to keep surfacing — most recently ${when}.`;
  return `${q} keeps coming up — most recently ${when}.`;
}

function PatternCard({ pattern }: { pattern: SurfacingPattern }) {
  return (
    <Card onPress={() => router.push({ pathname: '/history', params: { quality: pattern.quality } })}>
      <Text style={styles.patternText}>
        {patternSentence(pattern.quality, pattern.count, pattern.lastAt)}
      </Text>
      <Text style={styles.patternCta}>See when →</Text>
    </Card>
  );
}

function PartCard({ part }: { part: PartListItem }) {
  return (
    <Card onPress={() => router.push({ pathname: '/part/[id]', params: { id: part.id } })}>
      <View style={styles.partHeader}>
        <Text style={styles.partName}>{part.name ?? 'Unnamed part'}</Text>
        {part.golden === 1 ? <View style={styles.goldenDot} /> : null}
      </View>
      {part.body_location ? <Text style={styles.partMeta}>{part.body_location}</Text> : null}
      <Text style={styles.partMeta}>First met {formatDate(part.created_at)}</Text>
    </Card>
  );
}

const REFLECT_AGE_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

function ExperimentCard({
  experiment,
  onStatusChange,
}: {
  experiment: ExperimentItem;
  onStatusChange: (id: string, status: 'done' | 'let-go') => void;
}) {
  const isOpen = experiment.status === 'open';
  const needsReflection = isOpen && Date.now() - experiment.created_at > REFLECT_AGE_MS;

  return (
    <Card muted={!isOpen}>
      <Text style={[styles.experimentDescription, !isOpen && styles.textMuted]}>
        {experiment.description}
      </Text>
      {!isOpen && (
        <Text style={styles.statusLabel}>{experiment.status === 'done' ? 'Done' : 'Let go'}</Text>
      )}
      {isOpen && (
        <View style={styles.statusActions}>
          <Button
            label="Done"
            variant="secondary"
            fullWidth={false}
            onPress={() => onStatusChange(experiment.id, 'done')}
            style={styles.statusBtn}
          />
          <Button
            label="Let it go"
            variant="secondary"
            fullWidth={false}
            onPress={() => onStatusChange(experiment.id, 'let-go')}
            style={styles.statusBtn}
          />
        </View>
      )}
      {needsReflection && (
        <Button
          label="Reflect on this →"
          variant="ghost"
          onPress={() => router.push({ pathname: '/reflect/[id]', params: { id: experiment.id } })}
        />
      )}
    </Card>
  );
}

export default function ReflectionsScreen() {
  const db = useSQLiteContext();
  const parts = useParts();
  const patterns = useSurfacingPatterns();
  const { experiments, setExperiments } = useExperiments();
  const entries = useRecentEntries(HISTORY_LIMIT + 1);

  const openExperiments = experiments.filter((e) => e.status === 'open');
  const closedExperiments = experiments.filter((e) => e.status !== 'open');

  const hasPriorWork = parts.length > 0 || experiments.length > 0;
  const isEmpty =
    parts.length === 0 &&
    patterns.length === 0 &&
    experiments.length === 0 &&
    entries.length === 0;

  const shownEntries = entries.slice(0, HISTORY_LIMIT);
  const hasMoreEntries = entries.length > HISTORY_LIMIT;

  async function handleStatusChange(id: string, status: 'done' | 'let-go') {
    await updateExperimentStatus(db, id, status);
    setExperiments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  return (
    <Screen withTabBar>
      <Text style={styles.heading}>Reflections</Text>
      <Text style={styles.tagline}>What you&apos;ve been sitting with.</Text>

      {isEmpty ? (
        <Text style={styles.empty}>
          Nothing here yet. Come back after noticing a few reactions or sitting with a part — this
          is where it gathers.
        </Text>
      ) : (
        <>
          {hasPriorWork && (
            <Card
              onPress={() => router.push('/flow/integration.after_meeting.v1')}
              style={styles.carryCard}>
              <Text style={styles.carryLabel}>Carry something forward</Text>
              <Text style={styles.carryBody}>
                Turn what you&apos;ve sat with into one small thing you can do this week.
              </Text>
              <Text style={styles.carryCta}>Begin →</Text>
            </Card>
          )}

          <View style={styles.section}>
            <SectionHeader>Parts you&apos;ve sat with</SectionHeader>
            {parts.length > 0 ? (
              parts.map((part) => <PartCard key={part.id} part={part} />)
            ) : (
              <Text style={styles.sectionEmpty}>
                When you sit with a part, it&apos;ll wait for you here.
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <SectionHeader>What keeps surfacing</SectionHeader>
            {patterns.length > 0 ? (
              patterns.map((p) => <PatternCard key={p.quality} pattern={p} />)
            ) : (
              <Text style={styles.sectionEmpty}>
                Patterns take a few reflections to appear. There&apos;s no rush.
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <SectionHeader>Experiments</SectionHeader>
            {experiments.length > 0 ? (
              <>
                {openExperiments.map((e) => (
                  <ExperimentCard key={e.id} experiment={e} onStatusChange={handleStatusChange} />
                ))}
                {closedExperiments.length > 0 && openExperiments.length > 0 && (
                  <View style={styles.closedDivider} />
                )}
                {closedExperiments.map((e) => (
                  <ExperimentCard key={e.id} experiment={e} onStatusChange={handleStatusChange} />
                ))}
              </>
            ) : (
              <Text style={styles.sectionEmpty}>
                Small things you decide to carry into a week show up here.
              </Text>
            )}
          </View>

          {entries.length > 0 && (
            <View style={styles.section}>
              <SectionHeader>Recently noticed</SectionHeader>
              {shownEntries.map((entry) => (
                <EntryRow key={entry.id} entry={entry} />
              ))}
              {hasMoreEntries && (
                <Button label="See all →" variant="ghost" onPress={() => router.push('/history')} />
              )}
            </View>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { ...typography.display },
  tagline: { ...typography.body, color: colors.textSecondary },
  empty: {
    ...typography.serifBody,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.four,
  },
  section: { gap: Spacing.two },
  sectionEmpty: {
    ...typography.bodySmall,
    color: colors.textFaint,
    fontStyle: 'italic',
    lineHeight: 22,
  },

  // Carry forward
  carryCard: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentMuted,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  carryLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.accent,
  },
  carryBody: { ...typography.body, color: colors.textSecondary, lineHeight: 24 },
  carryCta: { ...typography.body, color: colors.accentWarm, marginTop: Spacing.one },

  // Recently noticed
  entryTitle: { ...typography.body, fontWeight: '500', lineHeight: 24 },
  entryTitleEmpty: { fontWeight: '400', fontStyle: 'italic', color: colors.textSecondary },
  entryMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryDate: { ...typography.caption, color: colors.textSecondary },
  entryQuality: { ...typography.bodySmall, fontStyle: 'italic' },

  // Parts
  partHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  partName: { ...typography.body, fontWeight: '500', flex: 1 },
  goldenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accentWarm },
  partMeta: { ...typography.caption, color: colors.textSecondary },

  // Patterns
  patternText: { ...typography.serifBody, color: colors.textSecondary },
  patternCta: { ...typography.caption, color: colors.accentWarm, marginTop: Spacing.one },

  // Experiments
  experimentDescription: { ...typography.body, lineHeight: 24 },
  textMuted: { color: colors.textSecondary },
  statusLabel: { ...typography.caption, color: colors.textSecondary, marginTop: Spacing.one },
  statusActions: { flexDirection: 'row', gap: Spacing.two, marginTop: Spacing.two },
  statusBtn: { flex: 1, paddingVertical: Spacing.two, borderRadius: radii.sm },
  closedDivider: { height: 1, backgroundColor: colors.border, marginVertical: Spacing.one },
});
