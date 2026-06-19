import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { router } from 'expo-router';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Screen, Card, SectionHeader, Button } from '@/components/ui';
import { PresenceField } from '@/components/PresenceField';
import { SurfacingField } from '@/components/SurfacingField';
import {
  useParts,
  useSurfacingPatterns,
  useExperiments,
  useReturnInvitation,
} from '@/hooks/useIntegration';

import { updateExperimentStatus, ExperimentItem } from '@/lib/db';

const MEETING_FLOW_ID = 'meeting.active_imagination.v1';

const REFLECT_AGE_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

// At module scope so the time read stays out of render.
function isOlderThanReflectAge(createdAt: number): boolean {
  return Date.now() - createdAt > REFLECT_AGE_MS;
}

function ExperimentCard({
  experiment,
  onStatusChange,
}: {
  experiment: ExperimentItem;
  onStatusChange: (id: string, status: 'done' | 'let-go') => void;
}) {
  const styles = useThemedStyles(makeStyles);
  const isOpen = experiment.status === 'open';
  const needsReflection = isOpen && isOlderThanReflectAge(experiment.created_at);

  const statusLabel = experiment.status === 'open' ? 'Open' : experiment.status === 'done' ? 'Done' : 'Let go';

  return (
    <Card muted={!isOpen}>
      <View style={styles.expHeader}>
        <Text style={[styles.experimentDescription, !isOpen && styles.textMuted, { flex: 1 }]}>
          {experiment.description}
        </Text>
        <View style={[styles.statusPill, isOpen ? styles.statusPillOpen : styles.statusPillClosed]}>
          <Text style={[styles.statusPillText, isOpen ? styles.statusPillTextOpen : styles.statusPillTextClosed]}>
            {statusLabel}
          </Text>
        </View>
      </View>
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
  const returnPart = useReturnInvitation();
  const styles = useThemedStyles(makeStyles);

  // A recurring quality the user could personify and sit with (Zweig's move:
  // from an abstract tag to a part with a face). Patterns are count-sorted.
  const topPattern = patterns.find((p) => p.count >= 2);

  const openExperiments = experiments.filter((e) => e.status === 'open');
  const closedExperiments = experiments.filter((e) => e.status !== 'open');

  const hasPriorWork = parts.length > 0 || experiments.length > 0;
  const isEmpty = parts.length === 0 && patterns.length === 0 && experiments.length === 0;

  async function handleStatusChange(id: string, status: 'done' | 'let-go') {
    await updateExperimentStatus(db, id, status);
    setExperiments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  return (
    <Screen withTabBar>
      <Text style={styles.heading}>Your inner world</Text>
      <Text style={styles.tagline}>A mirror of what you&apos;ve been sitting with.</Text>

      {isEmpty ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyHeading}>Nothing here yet.</Text>
          <Text style={styles.emptyBody}>
            Your inner world takes shape as you work with it. Start with one noticing — something you
            felt, someone who got under your skin.
          </Text>
          <Pressable onPress={() => router.push('/')}>
            <Text style={styles.emptyCtaText}>Start noticing →</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {returnPart && (
            <Card
              onPress={() => router.push({ pathname: '/part/[id]', params: { id: returnPart.id } })}
              style={styles.returnCard}>
              <Text style={styles.returnLabel}>A thread to pick back up</Text>
              <Text style={styles.returnBody}>
                It&apos;s been a while since you sat with {returnPart.name ?? 'this part'}. Return —
                what&apos;s here now?
              </Text>
              <Text style={styles.returnCta}>Return →</Text>
            </Card>
          )}

          {parts.length > 0 && (
            <View style={styles.section}>
              <SectionHeader>Who you&apos;ve sat with</SectionHeader>
              <Text style={styles.sectionNote}>Tap a presence to pick up where you left off.</Text>
              <PresenceField parts={parts} />
            </View>
          )}

          {patterns.length > 0 && (
            <View style={styles.section}>
              <SectionHeader>What keeps surfacing</SectionHeader>
              <Text style={styles.sectionNote}>
                The bigger and warmer a word, the more recently and often it&apos;s come up — not a
                score, just a weather. Tap one to see when.
              </Text>
              <SurfacingField patterns={patterns} />
              {topPattern && (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: '/flow/[id]',
                      params: { id: MEETING_FLOW_ID, seedQuality: topPattern.quality },
                    })
                  }>
                  <Text style={styles.personifyLink}>
                    Sit with the part that carries “{topPattern.quality}” →
                  </Text>
                </Pressable>
              )}
            </View>
          )}

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

          {experiments.length > 0 && (
            <View style={styles.section}>
              <SectionHeader>What you&apos;re carrying</SectionHeader>
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

        </>
      )}
    </Screen>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  heading: { ...typography.display },
  tagline: { ...typography.body, color: colors.textSecondary },
  section: { gap: Spacing.two },
  sectionNote: { ...typography.bodySmall, color: colors.textSecondary, marginTop: -Spacing.one },

  // Return invitation (the integration loop closing)
  returnCard: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentMuted,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  returnLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.accent,
  },
  returnBody: { ...typography.body, color: colors.textSecondary, lineHeight: 24 },
  returnCta: { ...typography.body, color: colors.accentWarm, marginTop: Spacing.one },

  // Personification bridge
  personifyLink: { ...typography.bodySmall, color: colors.accentWarm, marginTop: Spacing.one },

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

  // Empty state
  emptyState: { gap: Spacing.three, paddingVertical: Spacing.four },
  emptyHeading: { ...typography.serifBody, color: colors.textPrimary },
  emptyBody: { ...typography.body, color: colors.textSecondary },
  emptyCtaText: { ...typography.body, color: colors.accent },

  // Experiments
  expHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.two },
  experimentDescription: { ...typography.body, lineHeight: 24 },
  textMuted: { color: colors.textSecondary },
  statusPill: {
    borderRadius: radii.pill,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  statusPillOpen: { backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: colors.accentMuted },
  statusPillClosed: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  statusPillText: { fontSize: 11, lineHeight: 18 },
  statusPillTextOpen: { color: colors.accent },
  statusPillTextClosed: { color: colors.textFaint },
  statusActions: { flexDirection: 'row', gap: Spacing.two, marginTop: Spacing.two },
  statusBtn: { flex: 1, paddingVertical: Spacing.two, borderRadius: radii.sm },
  closedDivider: { height: 1, backgroundColor: colors.border, marginVertical: Spacing.one },
});
