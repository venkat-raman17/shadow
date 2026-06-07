import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { colors, typography, Spacing, radii } from '@/constants/theme';
import { Screen, TextField, Chip, Button } from '@/components/ui';
import { getPractice } from '@/lib/practices';
import { doorwaysFor, routeFromText } from '@/lib/threshold';
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

// The flow to open when the user says "I'm not sure" — derived entirely from
// existing data (no tracking, no new state). Mirrors the three-depths
// progression that the old "Start here" card used.
function useFallbackFlowId(firstRun: boolean): string {
  const patterns = useSurfacingPatterns(1);
  const parts = useParts();
  const { experiments } = useExperiments();
  const profile = useUserProfile();

  if (firstRun) return 'noticing.somatic.v1';

  const strong = patterns.find((pt) => pt.count >= 2);
  if (strong && getPractice('meeting.active_imagination.v1')) {
    return 'meeting.active_imagination.v1';
  }

  const hasOpenExperiment = experiments.some((e) => e.status === 'open');
  if (parts.length > 0 && !hasOpenExperiment) return 'integration.after_meeting.v1';

  const hour = new Date().getHours();
  if (hour < 12) return 'noticing.somatic.v1';
  if (hour < 18) return 'noticing.projection_recall.v1';
  if (profile?.gender === 'man') return 'noticing.anima_projection.v1';
  if (profile?.gender === 'woman') return 'noticing.animus_projection.v1';
  return 'noticing.golden_shadow.v1';
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

  const fallbackFlowId = useFallbackFlowId(firstRun);
  const { entry: resurfaced, dismiss: dismissResurfaced } = useResurfacing();

  const [text, setText] = useState('');
  const doorways = doorwaysFor(profile?.gender);

  function enter(flowId: string) {
    router.push(`/flow/${flowId}`);
  }

  function beginFromText() {
    const id = routeFromText(text, profile?.gender) ?? fallbackFlowId;
    enter(id);
  }

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

      {/* The threshold: speak into it, or step through a doorway below. */}
      <View style={styles.threshold}>
        <Text style={styles.prompt}>What&apos;s here right now?</Text>
        <Text style={styles.promptSub}>
          A word or a sentence — whatever&apos;s present. Or choose a way in below.
        </Text>

        <TextField
          value={text}
          onChangeText={setText}
          placeholder="Name it, however roughly…"
          multiline
          returnKeyType="go"
          onSubmitEditing={beginFromText}
        />

        <Button
          label={text.trim() ? 'Sit with this →' : 'Begin where I am →'}
          onPress={beginFromText}
        />
      </View>

      <View style={styles.doorways}>
        {doorways.map((d) => (
          <Chip key={d.key} label={d.label} onPress={() => enter(d.resolve(profile?.gender))} />
        ))}
      </View>

      {resurfaced && <ResurfacingCard entry={resurfaced} onDismiss={dismissResurfaced} />}

      <Pressable style={styles.moreLink} onPress={() => router.push('/practices')}>
        <Text style={styles.moreLinkText}>
          {firstRun ? 'See the gentle starting practices' : 'Other ways to notice'}
        </Text>
        <SymbolView
          name={{ ios: 'chevron.right', web: 'chevron_right' }}
          size={15}
          tintColor={colors.textSecondary}
        />
      </Pressable>

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

  // Threshold
  threshold: { gap: Spacing.three },
  prompt: { ...typography.serifPrompt, fontSize: 28, lineHeight: 38 },
  promptSub: { ...typography.body, color: colors.textSecondary, marginTop: -Spacing.one },

  // Doorways
  doorways: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },

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

  // More ways
  moreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  moreLinkText: { ...typography.body, color: colors.textSecondary },

  footer: { marginTop: Spacing.two, paddingTop: Spacing.three },
  footerText: { ...typography.caption, textAlign: 'center', lineHeight: 20 },
});
