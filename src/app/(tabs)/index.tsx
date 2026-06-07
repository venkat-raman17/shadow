import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { colors, typography, Spacing, radii } from '@/constants/theme';
import { Screen, Card, SectionHeader } from '@/components/ui';
import {
  PRACTICES,
  practicesByDepth,
  getPractice,
  type Practice,
} from '@/lib/practices';
import { useRecentEntries } from '@/hooks/useEntries';
import { useParts, useSurfacingPatterns, useExperiments } from '@/hooks/useIntegration';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Still awake.';
  if (h < 12) return 'Good morning.';
  if (h < 17) return 'Good afternoon.';
  if (h < 21) return 'Good evening.';
  return 'Late night.';
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

  // Otherwise, a gentle next noticing.
  const p = getPractice('noticing.golden_shadow.v1');
  return p
    ? { practice: p, label: 'A quiet invitation', line: 'Notice what you admire — it often points back to you.' }
    : null;
}

function PracticeCard({ practice }: { practice: Practice }) {
  return (
    <Card onPress={() => router.push(`/flow/${practice.id}`)} style={styles.practiceCard}>
      <SymbolView
        name={practice.icon}
        size={22}
        tintColor={colors.accent}
        style={styles.practiceIcon}
      />
      <View style={styles.practiceBody}>
        <Text style={styles.practiceTitle}>{practice.title}</Text>
        <Text style={styles.practiceSubtitle}>{practice.blurb}</Text>
        <Text style={styles.practiceMeta}>~{practice.estimatedMinutes} min</Text>
      </View>
    </Card>
  );
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

export default function HomeScreen() {
  const entries = useRecentEntries(1);
  const parts = useParts();
  const { experiments } = useExperiments();

  const firstRun = entries.length === 0 && parts.length === 0 && experiments.length === 0;
  const hasPriorWork = !firstRun;

  const suggestion = useSuggestion(firstRun);
  const noticePractices = practicesByDepth('notice');
  const deeperPractices = PRACTICES.filter((p) => p.depth !== 'notice');

  return (
    <Screen withTabBar>
      <View style={styles.topRow}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
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

      <View style={styles.section}>
        <SectionHeader>Notice</SectionHeader>
        {noticePractices.map((p) => (
          <PracticeCard key={p.id} practice={p} />
        ))}
      </View>

      {hasPriorWork ? (
        <View style={styles.section}>
          <SectionHeader>Go deeper</SectionHeader>
          {deeperPractices.map((p) => (
            <PracticeCard key={p.id} practice={p} />
          ))}
        </View>
      ) : (
        <Text style={styles.lockedHint}>
          Deeper practices open here once you&apos;ve noticed a few things.
        </Text>
      )}

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

  // Sections
  section: { gap: Spacing.two },
  practiceCard: { flexDirection: 'row', gap: Spacing.three, alignItems: 'flex-start' },
  practiceIcon: { marginTop: Spacing.half, width: 22, height: 22 },
  practiceBody: { flex: 1, gap: Spacing.half },
  practiceTitle: { ...typography.body, fontWeight: '500' },
  practiceSubtitle: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
  practiceMeta: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.half },

  lockedHint: {
    ...typography.bodySmall,
    color: colors.textFaint,
    fontStyle: 'italic',
    lineHeight: 22,
  },

  footer: { marginTop: Spacing.two, paddingTop: Spacing.three },
  footerText: { ...typography.caption, textAlign: 'center', lineHeight: 20 },
});
