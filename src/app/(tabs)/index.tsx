import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, type NativeSyntheticEvent, type TextInputContentSizeChangeEventData } from 'react-native';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, TextField, Button, Card, FadeSlide, ThemePickerDialog } from '@/components/ui';
import { Illustration, type IllustrationKey } from '@/components/illustrations';
import { getItem, setItem } from '@/lib/kv';
import { saveEntry } from '@/lib/db';
import { useCrypto } from '@/context/CryptoContext';
import { suggestPath } from '@/lib/paths';
import { useSurfacingPatterns, useUsedFlowIds } from '@/hooks/useIntegration';
import { useHasPriorWork, useDaysSinceLastVisit } from '@/hooks/useProgress';
import { useUserProfile } from '@/hooks/useUserProfile';

const DEPTHS_SEEN_KEY = 'shadow.depths_seen';

// One free-writing "page" holds this many characters; reaching it nudges the
// writer to turn the page (which saves the page to the Notebook and starts a
// fresh one). Auto-grow bounds keep the Home box comfortable but not endless.
const FREE_WRITE_PAGE_LIMIT = 1000;
const WRITE_MIN_HEIGHT = 140;
const WRITE_MAX_HEIGHT = 360;

// The few ways in (the spine). Each opens a short, branching entryway that
// re-routes from a couple of answers — not a flat menu of practices. The deeper
// 'sit' and 'carry' doors open once there's prior work, mirroring titration:
// notice and steady are always available, depth arrives when you're ready.
interface Entryway {
  id: string;
  title: string;
  sub: string;
  icon: IllustrationKey;
  gated: boolean;
}
const ENTRYWAYS: Entryway[] = [
  {
    id: 'entry.notice.v1',
    title: "Notice what's here",
    sub: 'A feeling, a person, a sensation',
    icon: 'symbol-eye',
    gated: false,
  },
  {
    id: 'entry.sit.v1',
    title: 'Sit with a figure',
    sub: 'Meet a part of you, in writing',
    icon: 'two-seats',
    gated: true,
  },
  {
    id: 'entry.carry.v1',
    title: 'Carry & return',
    sub: 'Bring it into your week',
    icon: 'open-door',
    gated: true,
  },
  {
    id: 'entry.steady.v1',
    title: 'Steady myself',
    sub: 'Come back when things speed up',
    icon: 'steady-anchor',
    gated: false,
  },
];

// The time-of-day greeting, without the name — the name is stacked on its own
// line below so a long name never crowds the header icons.
function greetingPrefix(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Still awake';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Late night';
}

const LONG_GAP_DAYS = 14;

// A one-time, dismissible map of the three depths — shown only to a newcomer so
// the Notice → Sit → Carry spine isn't invisible. No ladder, no progress.
function DepthsCard({ onDismiss }: { onDismiss: () => void }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.depthsCard}>
      <View style={styles.nudgeHeader}>
        <Text style={styles.nudgeLabel}>How this works</Text>
        <Pressable
          onPress={onDismiss}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Dismiss">
          <Illustration name="ui-close" size={16} maxStroke={9} color={colors.textFaint} decorative />
        </Pressable>
      </View>
      <Text style={styles.depthsBody}>
        A few ways in, no ladder. <Text style={styles.depthsWord}>Notice</Text> what&apos;s here ·{' '}
        <Text style={styles.depthsWord}>Sit</Text> with a figure ·{' '}
        <Text style={styles.depthsWord}>Carry</Text> one small thing ·{' '}
        <Text style={styles.depthsWord}>Steady</Text> yourself anytime.
      </Text>
      <Text style={styles.depthsSub}>
        No words for it? Just draw it. No streaks, no finishing — you return when you return.
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const profile = useUserProfile();
  const hasPriorWork = useHasPriorWork();
  const firstRun = !hasPriorWork;

  const db = useSQLiteContext();
  const { key } = useCrypto();
  const gapDays = useDaysSinceLastVisit();

  const shelfPatterns = useSurfacingPatterns(8);
  const usedFlowIds = useUsedFlowIds();
  const signal = { qualityFamilies: shelfPatterns.map((p) => p.quality), flowIds: usedFlowIds };
  const suggestedPath = suggestPath(signal);

  // A soft welcome after a moderate gap.
  const showWelcomeBack = gapDays !== null && gapDays >= 7 && gapDays < LONG_GAP_DAYS;

  const [text, setText] = useState('');
  const [writeHeight, setWriteHeight] = useState(WRITE_MIN_HEIGHT);
  const [justSaved, setJustSaved] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  // Deep doors (sit / carry) appear once there's prior work; notice & steady
  // are always open. Drawing and the open threshold sit above them all.
  const entryways = ENTRYWAYS.filter((e) => !e.gated || hasPriorWork);
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  // The first-run depths map: shown once to a newcomer, dismissible for good.
  const [depthsDismissed, setDepthsDismissed] = useState<boolean | null>(null);
  useEffect(() => {
    getItem(DEPTHS_SEEN_KEY).then((v) => setDepthsDismissed(v === '1'));
  }, []);
  function dismissDepths() {
    setDepthsDismissed(true);
    setItem(DEPTHS_SEEN_KEY, '1');
  }
  const showDepths = firstRun && depthsDismissed === false;

  function enter(flowId: string) {
    router.push(`/flow/${flowId}`);
  }

  // Grow the writing box with its content, clamped so it never swallows the page.
  function onWriteContentSize(e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) {
    const h = e.nativeEvent.contentSize.height;
    setWriteHeight(Math.max(WRITE_MIN_HEIGHT, Math.min(h, WRITE_MAX_HEIGHT)));
  }

  // Turning the page commits the current page to the Notebook and clears the box
  // for a fresh one — long writing naturally becomes a few dated pages.
  async function turnThePage() {
    if (!key || !text.trim()) return;
    await saveEntry(db, { subject: text.trim() }, 'noticing.free_writing.v1', key);
    setText('');
    setWriteHeight(WRITE_MIN_HEIGHT);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2400);
  }

  const pageNearlyFull = text.length >= FREE_WRITE_PAGE_LIMIT - 40;

  return (
    <Screen withTabBar>
      <View style={styles.topRow}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>
            {profile?.name ? `${greetingPrefix()},` : `${greetingPrefix()}.`}
          </Text>
          {profile?.name ? <Text style={styles.greeting}>{profile.name}.</Text> : null}
        </View>
        <View style={styles.headerActions}>
          <Pressable
            onPress={() => setThemeOpen(true)}
            accessibilityLabel="Change theme"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Illustration name="ui-theme" size={24} maxStroke={9} color={colors.textSecondary} decorative />
          </Pressable>
          <Pressable
            onPress={() => router.push('/settings')}
            accessibilityLabel="Settings"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Illustration name="ui-sliders" size={24} maxStroke={9} color={colors.textSecondary} decorative />
          </Pressable>
        </View>
      </View>

      <ThemePickerDialog visible={themeOpen} onClose={() => setThemeOpen(false)} />

      {showWelcomeBack && (
        <Text style={styles.welcomeBack}>Welcome back — no need to catch up.</Text>
      )}

      {/* The threshold: write freely into the page, or draw it instead. */}
      <View style={styles.threshold}>
        <Text style={styles.prompt}>What&apos;s here right now?</Text>
        <Text style={styles.promptSub}>
          Write freely — it stays on this device. Turn the page to keep it.
        </Text>

        <TextField
          value={text}
          onChangeText={setText}
          placeholder="Whatever&apos;s present, however roughly…"
          multiline
          maxLength={FREE_WRITE_PAGE_LIMIT}
          onContentSizeChange={onWriteContentSize}
          style={{ height: writeHeight }}
        />

        {pageNearlyFull ? (
          <Text style={styles.pageFullHint}>
            This page is full — turn the page to keep going.
          </Text>
        ) : justSaved ? (
          <Text style={styles.savedHint}>Saved to your notebook.</Text>
        ) : null}

        <Button
          label="Turn the page →"
          onPress={turnThePage}
          disabled={!text.trim()}
        />

        <Button
          label="Draw it freely →"
          variant="ghost"
          onPress={() => enter('noticing.free_drawing.v1')}
        />
      </View>

      {showDepths && <DepthsCard onDismiss={dismissDepths} />}

      <View style={styles.waysSection}>
        <Text style={styles.waysLabel}>Or choose a way in</Text>
        <View style={styles.tiles}>
          {entryways.map((e) => (
            <Card key={e.id} onPress={() => enter(e.id)} accessibilityLabel={e.title} style={styles.tile}>
              <Illustration name={e.icon} tone="soft" size={36} decorative />
              <View style={styles.tileText}>
                <Text style={styles.tileTitle}>{e.title}</Text>
                <Text style={styles.tileSub}>{e.sub}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <Pressable
        style={styles.quickRow}
        onPress={() => enter('noticing.in_the_moment.v1')}
        accessibilityRole="button"
        accessibilityLabel="Something just happened — catch it now">
        <Illustration name="ui-bolt-heart" size={18} maxStroke={9} color={colors.accentWarm} decorative />
        <Text style={styles.nowLinkText}>Something just happened — catch it now →</Text>
      </Pressable>

      <Pressable
        style={styles.libraryLink}
        onPress={() => router.navigate('/read')}
        accessibilityRole="button">
        <Text style={styles.libraryLinkText}>Not sure what you&apos;re feeling? Read about it in the Library →</Text>
      </Pressable>

      {suggestedPath && (
        <FadeSlide style={styles.pathSection}>
          <Text style={styles.waysLabel}>A way through, if you&apos;d like one</Text>
          <Card
            onPress={() => router.push({ pathname: '/path/[id]', params: { id: suggestedPath.id } })}
            style={styles.pathCard}>
            <Illustration name={suggestedPath.icon ?? 'generic-practice'} tone="soft" size={34} />
            <View style={styles.pathText}>
              <Text style={styles.pathTitle}>{suggestedPath.title}</Text>
              <Text style={styles.pathWhen} numberOfLines={2}>
                {suggestedPath.when}
              </Text>
            </View>
            <Illustration name="ui-chevron" size={18} maxStroke={9} color={colors.textFaint} decorative />
          </Card>
        </FadeSlide>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Nothing you write here leaves this device. No account, no cloud, no AI.
        </Text>
      </View>
    </Screen>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  headerText: { flex: 1 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  greeting: { ...typography.display },
  welcomeBack: { ...typography.body, color: colors.textSecondary, marginTop: -Spacing.one },

  // Threshold
  threshold: { gap: Spacing.three },
  prompt: { ...typography.serifPrompt, fontSize: 28, lineHeight: 38 },
  promptSub: { ...typography.body, color: colors.textSecondary, marginTop: -Spacing.one },
  pageFullHint: { ...typography.bodySmall, color: colors.accentWarm, marginTop: -Spacing.one },
  savedHint: { ...typography.bodySmall, color: colors.accent, marginTop: -Spacing.one },

  nowLinkText: { ...typography.body, color: colors.accentWarm },
  libraryLink: { paddingVertical: Spacing.one },
  libraryLinkText: { ...typography.bodySmall, color: colors.textFaint },

  // Ways in (entry tiles)
  waysSection: { gap: Spacing.two },
  waysLabel: { ...typography.caption, color: colors.textFaint },
  tiles: { gap: Spacing.two },
  tile: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.three },
  tileText: { flex: 1, gap: 2 },
  tileTitle: { ...typography.body, color: colors.textPrimary },
  tileSub: { ...typography.bodySmall, color: colors.textSecondary },

  // Depths map (first-run)
  depthsCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.accentMuted,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  depthsBody: { ...typography.serifBody, color: colors.textPrimary },
  depthsWord: { color: colors.accent },
  depthsSub: { ...typography.bodySmall, color: colors.textSecondary },

  // Shared header used by the depths map
  nudgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nudgeLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
  },

  // Quick "catch it now" link
  quickRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },

  // Suggested path
  pathSection: { gap: Spacing.two },
  pathCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.three },
  pathText: { flex: 1, gap: 2 },
  pathTitle: { ...typography.body, color: colors.textPrimary },
  pathWhen: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 19 },

  footer: { marginTop: Spacing.two, paddingTop: Spacing.three },
  footerText: { ...typography.caption, textAlign: 'center', lineHeight: 20 },
});
