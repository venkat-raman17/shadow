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
    <Card>
      <View style={styles.entryMeta}>
        <Text style={styles.entryDate}>{formatDateTime(entry.created_at)}</Text>
        {entry.quality ? <Text style={styles.entryQuality}>{entry.quality}</Text> : null}
      </View>
      {entry.charge !== null ? <ChargeDots charge={entry.charge} /> : null}
    </Card>
  );
}

function patternSentence(quality: string, count: number): string {
  if (count <= 1) return `${quality} has come up.`;
  if (count <= 3) return `${quality} has come up a few times.`;
  return `${quality} keeps coming up.`;
}

function PartCard({ part }: { part: PartListItem }) {
  return (
    <Card>
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

      {isEmpty && (
        <Text style={styles.empty}>
          Nothing here yet. Come back after noticing a few reactions or sitting with a part.
        </Text>
      )}

      {hasPriorWork && (
        <Card onPress={() => router.push('/flow/integration.after_meeting.v1')} style={styles.carryCard}>
          <Text style={styles.carryLabel}>Carry something forward</Text>
          <Text style={styles.carryBody}>
            Turn what you&apos;ve sat with into one small thing you can do this week.
          </Text>
          <Text style={styles.carryCta}>Begin →</Text>
        </Card>
      )}

      {parts.length > 0 && (
        <View style={styles.section}>
          <SectionHeader>Parts you&apos;ve sat with</SectionHeader>
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </View>
      )}

      {patterns.length > 0 && (
        <View style={styles.section}>
          <SectionHeader>What keeps surfacing</SectionHeader>
          {patterns.map((p) => (
            <Text key={p.quality} style={styles.patternText}>
              {patternSentence(p.quality, p.count)}
            </Text>
          ))}
        </View>
      )}

      {experiments.length > 0 && (
        <View style={styles.section}>
          <SectionHeader>Experiments</SectionHeader>
          {openExperiments.map((e) => (
            <ExperimentCard key={e.id} experiment={e} onStatusChange={handleStatusChange} />
          ))}
          {closedExperiments.length > 0 && openExperiments.length > 0 && (
            <View style={styles.closedDivider} />
          )}
          {closedExperiments.map((e) => (
            <ExperimentCard key={e.id} experiment={e} onStatusChange={handleStatusChange} />
          ))}
        </View>
      )}

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

  // Experiments
  experimentDescription: { ...typography.body, lineHeight: 24 },
  textMuted: { color: colors.textSecondary },
  statusLabel: { ...typography.caption, color: colors.textSecondary, marginTop: Spacing.one },
  statusActions: { flexDirection: 'row', gap: Spacing.two, marginTop: Spacing.two },
  statusBtn: { flex: 1, paddingVertical: Spacing.two, borderRadius: radii.sm },
  closedDivider: { height: 1, backgroundColor: colors.border, marginVertical: Spacing.one },
});
