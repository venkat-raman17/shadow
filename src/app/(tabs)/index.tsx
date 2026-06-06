import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { colors, typography, Spacing, BottomTabInset } from '@/constants/theme';

// ─── Practice catalogue ─────────────────────────────────────────────────────
// Grouped by the kind of work, not by hierarchy. Headers name the type of
// invitation — they are not levels to climb.

interface Practice {
  id: string;
  title: string;
  subtitle: string;
}

const NOTICE_PRACTICES: Practice[] = [
  {
    id: 'noticing.projection_recall.v1',
    title: 'Who got under your skin?',
    subtitle: 'Notice a reaction, name the quality underneath it.',
  },
  {
    id: 'noticing.somatic.v1',
    title: "What's the body holding?",
    subtitle: 'No trigger needed — start from a body sensation.',
  },
  {
    id: 'noticing.golden_shadow.v1',
    title: 'Who do you admire?',
    subtitle: 'Follow an admiration back to something unlived in you.',
  },
  {
    id: 'noticing.persona.v1',
    title: "Who are you when no one's watching?",
    subtitle: 'The gap between the self you show and the self you hide.',
  },
  {
    id: 'noticing.321.v1',
    title: "What's pulling your attention?",
    subtitle: 'Three moves — observe it, address it, become it.',
  },
  {
    id: 'noticing.facing_shame.v1',
    title: 'What shame says about you',
    subtitle: 'Not fixing it. Just naming it, and meeting it differently.',
  },
];

const DEEPER_PRACTICES: Practice[] = [
  {
    id: 'meeting.active_imagination.v1',
    title: 'Meet a part of you',
    subtitle: 'Sit with something difficult, or reclaim something admired. You write both voices.',
  },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Still awake.';
  if (h < 12) return 'Good morning.';
  if (h < 17) return 'Good afternoon.';
  if (h < 21) return 'Good evening.';
  return 'Late night.';
}

function PracticeCard({ practice }: { practice: Practice }) {
  return (
    <TouchableOpacity
      style={styles.practiceCard}
      onPress={() => router.push(`/flow/${practice.id}`)}>
      <Text style={styles.practiceTitle}>{practice.title}</Text>
      <Text style={styles.practiceSubtitle}>{practice.subtitle}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <SymbolView
              name={{ ios: 'gearshape', web: 'settings' }}
              size={20}
              tintColor={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.tagline}>
          A quiet space to notice what your reactions are pointing at.
        </Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notice</Text>
          {NOTICE_PRACTICES.map((p) => (
            <PracticeCard key={p.id} practice={p} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Go deeper</Text>
          {DEEPER_PRACTICES.map((p) => (
            <PracticeCard key={p.id} practice={p} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Nothing you write here leaves this device. No account, no cloud, no AI.
          </Text>
        </View>
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
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { ...typography.heading, fontSize: 28, lineHeight: 36 },
  tagline: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
  divider: { height: 1, backgroundColor: colors.border },

  section: { gap: Spacing.two },
  sectionLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
    marginBottom: Spacing.one,
  },

  practiceCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.half,
    borderWidth: 1,
    borderColor: colors.border,
  },
  practiceTitle: { ...typography.body, fontWeight: '500' },
  practiceSubtitle: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },

  footer: { marginTop: 'auto', paddingTop: Spacing.three },
  footerText: { ...typography.caption, textAlign: 'center', lineHeight: 20 },
});
