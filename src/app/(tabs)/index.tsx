import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { colors, typography, Spacing, radii } from '@/constants/theme';
import { Screen, Card } from '@/components/ui';
import { getPractice, type Practice } from '@/lib/practices';
import { useRecentEntries, useResurfacing } from '@/hooks/useEntries';
import { useParts, useSurfacingPatterns, useExperiments } from '@/hooks/useIntegration';
import { useUserProfile } from '@/hooks/useUserProfile';
import type { EntryDetail } from '@/lib/db';

const DAY_MS = 24 * 60 * 60 * 1000;

function getGreeting(name: string | null): string {
  const suffix = name ? `, ${name}` : '';
  const h = new Date().getHours();
  if (h < 5) return `Still awake${suffix}.`;
  if (h < 12) return `Good morning${suffix}.`;
  if (h < 17) return `Good afternoon${suffix}.`;
  if (h < 21) return `Good evening${suffix}.`;
  return `Late night${suffix}.`;
}

interface Suggestion {
  practice: Practice;
  label: string; // small uppercase eyebrow
  line: string; // the contextual "why now"
}

// The adaptive "start here". Derived entirely from existing data — no tracking,
// no new persisted state. Mirrors the three-depths progression.
function useSuggestion(firstRun: boolean): Suggestion | null {
  const patterns = useSurfacingPatterns(1);
  const parts = useParts();
  const { experiments } = useExperiments();

  if (firstRun) {
    const p = getPractice('noticing.somatic.v1');
    return p
      ? { practice: p, label: 'Start here', line: 'A gentle first noticing — just you and a sensation.' }
      : null;
  }

  // Something keeps surfacing → invite the deeper "sit with" practice.
  const strong = patterns.find((pt) => pt.count >= 2);
  if (strong) {
    const p = getPractice('meeting.active_imagination.v1');
    if (p) {
      return {
        practice: p,
        label: 'When you’re ready',
        line: `“${strong.quality}” keeps coming up. Want to sit with it?`,
      };
    }
  }

  // You've met a part → carry it into the week.
  const hasOpenExperiment = experiments.some((e) => e.status === 'open');
  if (parts.length > 0 && !hasOpenExperiment) {
    const p = getPractice('integration.after_meeting.v1');
    if (p) {
      return { practice: p, label: 'Next', line: 'Turn what you found into one small thing to try.' };
    }
  }

  // Otherwise, a gentle next noticing — shaped by the time of day so mornings
  // lean toward the body and evenings toward quieter reflection.
  const hour = new Date().getHours();
  let id: string;
  let line: string;
  if (hour < 12) {
    id = 'noticing.somatic.v1';
    line = 'Start with the body — what is it holding this morning?';
  } else if (hour < 18) {
    id = 'noticing.projection_recall.v1';
    line = 'Notice what got under your skin today.';
  } else {
    id = 'noticing.golden_shadow.v1';
    line = 'Notice what you admire — it often points back to you.';
  }
  const p = getPractice(id);
  return p ? { practice: p, label: 'A quiet invitation', line } : null;
}

function StartHereCard({ suggestion }: { suggestion: Suggestion }) {
  const { practice, label, line } = suggestion;
  return (
    <Pressable
      onPress={() => router.push(`/flow/${practice.id}`)}
      style={({ pressed }) => [styles.startCard, pressed && styles.startCardPressed]}>
      <Text style={styles.startLabel}>{label}</Text>
      <Text style={styles.startTitle}>{practice.title}</Text>
      <Text style={styles.startLine}>{line}</Text>
      <Text style={styles.startCta}>Begin · ~{practice.estimatedMinutes} min →</Text>
    </Pressable>
  );
}

function relativeWhen(ms: number): string {
  const days = Math.floor((Date.now() - ms) / DAY_MS);
  if (days < 14) return 'last week';
  if (days < 40) return 'a few weeks ago';
  if (days < 75) return 'last month';
  if (days < 200) return 'a few months ago';
  return 'a while ago';
}

// A quiet, dismissible nudge to revisit a past reflection — never a notification.
function ResurfacingCard({ entry, onDismiss }: { entry: EntryDetail; onDismiss: () => void }) {
  const text =
    (entry.reclaim && entry.reclaim.trim()) || (entry.subject && entry.subject.trim()) || '';
  if (!text) return null;
  return (
    <View style={styles.resurfaceCard}>
      <View style={styles.resurfaceHeader}>
        <Text style={styles.resurfaceLabel}>Something you sat with before</Text>
        <Pressable onPress={onDismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <SymbolView name={{ ios: 'xmark', web: 'close' }} size={13} tintColor={colors.textFaint} />
        </Pressable>
      </View>
      <Pressable onPress={() => router.push({ pathname: '/entry/[id]', params: { id: entry.id } })}>
        <Text style={styles.resurfaceText} numberOfLines={3}>
          {text}
        </Text>
        <Text style={styles.resurfaceCta}>From {relativeWhen(entry.created_at)} · revisit →</Text>
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  const profile = useUserProfile();
  const entries = useRecentEntries(1);
  const parts = useParts();
  const { experiments } = useExperiments();

  const firstRun = entries.length === 0 && parts.length === 0 && experiments.length === 0;

  const suggestion = useSuggestion(firstRun);
  const { entry: resurfaced, dismiss: dismissResurfaced } = useResurfacing();

  return (
    <Screen withTabBar>
      <View style={styles.topRow}>
        <Text style={styles.greeting}>{getGreeting(profile?.name ?? null)}</Text>
        <Pressable
          onPress={() => router.push('/settings')}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <SymbolView
            name={{ ios: 'gearshape', web: 'settings' }}
            size={20}
            tintColor={colors.textSecondary}
          />
        </Pressable>
      </View>

      <Text style={styles.tagline}>
        A quiet space to notice what you&apos;re feeling — and what it&apos;s pointing at.
      </Text>

      {suggestion && <StartHereCard suggestion={suggestion} />}

      {resurfaced && <ResurfacingCard entry={resurfaced} onDismiss={dismissResurfaced} />}

      <Card onPress={() => router.push('/practices')} style={styles.moreCard}>
        <View style={styles.moreBody}>
          <Text style={styles.moreTitle}>More ways to notice</Text>
          <Text style={styles.moreSubtitle}>
            {firstRun
              ? 'Browse the gentle starting practices.'
              : 'Browse the full set of practices.'}
          </Text>
        </View>
        <SymbolView
          name={{ ios: 'chevron.right', web: 'chevron_right' }}
          size={18}
          tintColor={colors.textSecondary}
        />
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Nothing you write here leaves this device. No account, no cloud, no AI.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { ...typography.display },
  tagline: { ...typography.body, color: colors.textSecondary },

  // Start here
  startCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.lg,
    padding: Spacing.four,
    gap: Spacing.one,
    borderWidth: 1,
    borderColor: colors.accentMuted,
  },
  startCardPressed: { opacity: 0.8 },
  startLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.accent,
  },
  startTitle: { ...typography.displaySmall, marginTop: Spacing.one },
  startLine: { ...typography.body, color: colors.textSecondary, lineHeight: 24 },
  startCta: { ...typography.body, color: colors.accentWarm, marginTop: Spacing.two },

  // Resurfacing
  resurfaceCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  resurfaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resurfaceLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
  },
  resurfaceText: { ...typography.serifBody, color: colors.textPrimary },
  resurfaceCta: { ...typography.caption, color: colors.accentWarm, marginTop: Spacing.one },

  // More ways to notice
  moreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  moreBody: { flex: 1, gap: Spacing.half },
  moreTitle: { ...typography.body, fontWeight: '500' },
  moreSubtitle: { ...typography.bodySmall, color: colors.textSecondary },

  footer: { marginTop: Spacing.two, paddingTop: Spacing.three },
  footerText: { ...typography.caption, textAlign: 'center', lineHeight: 20 },
});
