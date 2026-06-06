import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';
import { router } from 'expo-router';

import { colors, typography, Spacing, BottomTabInset } from '@/constants/theme';
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

function ChargeDots({ charge }: { charge: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: 10 }, (_, i) => (
        <View key={i} style={[styles.dot, i < charge ? styles.dotFilled : styles.dotEmpty]} />
      ))}
    </View>
  );
}

function EntryRow({ entry }: { entry: EntryListItem }) {
  return (
    <View style={styles.entryRow}>
      <View style={styles.entryMeta}>
        <Text style={styles.entryDate}>{formatDateTime(entry.created_at)}</Text>
        {entry.quality ? <Text style={styles.entryQuality}>{entry.quality}</Text> : null}
      </View>
      {entry.charge !== null ? <ChargeDots charge={entry.charge} /> : null}
    </View>
  );
}

function patternSentence(quality: string, count: number): string {
  if (count <= 1) return `${quality} has come up.`;
  if (count <= 3) return `${quality} has come up a few times.`;
  return `${quality} keeps coming up.`;
}

function PartCard({ part }: { part: PartListItem }) {
  return (
    <View style={styles.card}>
      <View style={styles.partHeader}>
        <Text style={styles.partName}>{part.name ?? 'Unnamed part'}</Text>
        {part.golden === 1 ? <View style={styles.goldenDot} /> : null}
      </View>
      {part.body_location ? (
        <Text style={styles.partMeta}>{part.body_location}</Text>
      ) : null}
      <Text style={styles.partDate}>First met {formatDate(part.created_at)}</Text>
    </View>
  );
}

function PatternRow({ pattern }: { pattern: SurfacingPattern }) {
  return (
    <Text style={styles.patternText}>{patternSentence(pattern.quality, pattern.count)}</Text>
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
    <View style={[styles.card, !isOpen && styles.cardMuted]}>
      <Text style={[styles.experimentDescription, !isOpen && styles.textMuted]}>
        {experiment.description}
      </Text>
      {!isOpen && (
        <Text style={styles.statusLabel}>
          {experiment.status === 'done' ? 'Done' : 'Let go'}
        </Text>
      )}
      {isOpen && (
        <View style={styles.statusActions}>
          <TouchableOpacity
            style={styles.statusBtn}
            onPress={() => onStatusChange(experiment.id, 'done')}>
            <Text style={styles.statusBtnText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statusBtn}
            onPress={() => onStatusChange(experiment.id, 'let-go')}>
            <Text style={styles.statusBtnText}>Let it go</Text>
          </TouchableOpacity>
        </View>
      )}
      {needsReflection && (
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/reflect/[id]', params: { id: experiment.id } })}>
          <Text style={styles.reflectLink}>Reflect on this →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function IntegrationScreen() {
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
    setExperiments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Integration</Text>
        <Text style={styles.tagline}>What you've been sitting with.</Text>

        <View style={styles.divider} />

        {isEmpty && (
          <Text style={styles.empty}>
            Nothing here yet. Come back after noticing a few reactions or sitting with a part.
          </Text>
        )}

        {hasPriorWork && (
          <TouchableOpacity
            style={styles.carryCard}
            onPress={() => router.push('/flow/integration.after_meeting.v1')}>
            <Text style={styles.carryLabel}>Carry something forward</Text>
            <Text style={styles.carryBody}>
              Turn what you've sat with into one small thing you can do this week.
            </Text>
            <Text style={styles.carryCta}>Begin →</Text>
          </TouchableOpacity>
        )}

        {parts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Parts you've sat with</Text>
            {parts.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </View>
        )}

        {patterns.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>What keeps surfacing</Text>
            {patterns.map((p) => (
              <PatternRow key={p.quality} pattern={p} />
            ))}
          </View>
        )}

        {experiments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Experiments</Text>
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
            <Text style={styles.sectionLabel}>Recently noticed</Text>
            {shownEntries.map((entry) => (
              <EntryRow key={entry.id} entry={entry} />
            ))}
            {hasMoreEntries && (
              <TouchableOpacity
                style={styles.seeAllLink}
                onPress={() => router.push('/history')}>
                <Text style={styles.seeAllText}>See all →</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.four,
    flexGrow: 1,
  },
  heading: { ...typography.heading, fontSize: 26, lineHeight: 34 },
  tagline: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
  divider: { height: 1, backgroundColor: colors.border },
  empty: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginTop: Spacing.four,
  },
  section: { gap: Spacing.two },
  sectionLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
    marginBottom: Spacing.one,
  },

  // Carry forward entry
  carryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: Spacing.four,
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: colors.border,
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
  seeAllLink: { alignSelf: 'flex-end', paddingTop: Spacing.one },
  seeAllText: { ...typography.caption, color: colors.accent },

  // Part card
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.one,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardMuted: { opacity: 0.55 },
  partHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  partName: { ...typography.body, fontWeight: '500', flex: 1 },
  goldenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accentWarm,
  },
  partMeta: { ...typography.caption, color: colors.textSecondary },
  partDate: { ...typography.caption, color: colors.textSecondary },

  // Patterns
  patternText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 26,
  },

  // Experiments
  experimentDescription: { ...typography.body, lineHeight: 24 },
  textMuted: { color: colors.textSecondary },
  statusLabel: { ...typography.caption, color: colors.textSecondary, marginTop: Spacing.one },
  statusActions: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  statusBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: Spacing.one + Spacing.half,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusBtnText: { ...typography.caption, color: colors.textSecondary },
  closedDivider: { height: 1, backgroundColor: colors.border, marginVertical: Spacing.one },
  reflectLink: {
    ...typography.caption,
    color: colors.accent,
    marginTop: Spacing.one,
  },
});
