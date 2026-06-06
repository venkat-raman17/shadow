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

import { colors, typography, Spacing, BottomTabInset } from '@/constants/theme';
import { useParts, useSurfacingPatterns, useExperiments } from '@/hooks/useIntegration';
import { updateExperimentStatus, ExperimentItem, PartListItem, SurfacingPattern } from '@/lib/db';

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ms));
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

function ExperimentCard({
  experiment,
  onStatusChange,
}: {
  experiment: ExperimentItem;
  onStatusChange: (id: string, status: 'done' | 'let-go') => void;
}) {
  const isOpen = experiment.status === 'open';

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
    </View>
  );
}

export default function IntegrationScreen() {
  const db = useSQLiteContext();
  const parts = useParts();
  const patterns = useSurfacingPatterns();
  const { experiments, setExperiments } = useExperiments();

  const openExperiments = experiments.filter((e) => e.status === 'open');
  const closedExperiments = experiments.filter((e) => e.status !== 'open');

  const isEmpty = parts.length === 0 && patterns.length === 0 && experiments.length === 0;

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
});
