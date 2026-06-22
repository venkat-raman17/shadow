import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { router } from 'expo-router';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { usePressScale } from '@/hooks/usePressScale';
import { ChargeGauge } from '@/components/ChargeGauge';
import { SketchView, parseSketch } from '@/components/Sketch';
import { ExperimentCard } from '@/components/ExperimentCard';
import { feltSenseBand } from '@/lib/feltSense';
import { practiceLabel, gutterDate } from '@/lib/notebookTimeline';
import { MARGIN_W } from '@/components/notebook/JournalPaper';
import type { TimelineItem, ExperimentItem } from '@/lib/db';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const SKETCH_W = 104;
const SKETCH_H = 64;

/**
 * One dated moment on the ruled page. Entry/session/grounding read as flat ink on
 * the paper (no card chrome); the experiment variant keeps a soft lift because
 * it's an action, not a record. The left gutter holds the date, aligned to the
 * page's margin hairline.
 */
export function JournalRow({
  item,
  onExperimentStatus,
}: {
  item: TimelineItem;
  onExperimentStatus: (id: string, status: 'done' | 'let-go') => void;
}) {
  // Experiments are actions — render the existing ExperimentCard in the body so
  // its inline Done / Let it go / Reflect interactions carry over unchanged.
  if (item.kind === 'experiment') {
    const exp: ExperimentItem = {
      id: item.id,
      description: item.description,
      created_at: item.at,
      status: item.status,
    };
    return (
      <Frame at={item.at}>
        <ExperimentCard experiment={exp} onStatusChange={onExperimentStatus} />
      </Frame>
    );
  }

  return <NavRow item={item} />;
}

/** The shared [ date gutter ][ body ] frame; gutter aligns to the margin hairline. */
function Frame({ at, children }: { at: number; children: React.ReactNode }) {
  const styles = useThemedStyles(makeStyles);
  const { date, time } = gutterDate(at);
  return (
    <View style={styles.row}>
      <View style={styles.gutter}>
        <Text style={styles.gutterDate}>{date}</Text>
        <Text style={styles.gutterTime}>{time}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

/** Entry / session / grounding — flat ink, optionally tappable through to detail. */
function NavRow({ item }: { item: Exclude<TimelineItem, { kind: 'experiment' }> }) {
  const styles = useThemedStyles(makeStyles);
  const press = usePressScale();
  const label = practiceLabel(item);

  const onPress =
    item.kind === 'entry'
      ? () => router.push({ pathname: '/entry/[id]', params: { id: item.id } })
      : item.kind === 'session' && item.partId
        ? () => router.push({ pathname: '/part/[id]', params: { id: item.partId as string } })
        : undefined;

  const { date, time } = gutterDate(item.at);

  const inner = (
    <>
      <View style={styles.gutter}>
        <Text style={styles.gutterDate}>{date}</Text>
        <Text style={styles.gutterTime}>{time}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{label}</Text>
        {item.kind === 'entry' ? <EntryBody item={item} /> : null}
        {item.kind === 'session' ? <SessionBody item={item} /> : null}
        {item.kind === 'grounding' ? <GroundingBody item={item} /> : null}
      </View>
    </>
  );

  if (!onPress) {
    return (
      <View style={styles.row} accessibilityLabel={`${label}, ${date}`}>
        {inner}
      </View>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${date}`}
      style={[styles.row, press.animatedStyle]}>
      {inner}
    </AnimatedPressable>
  );
}

function EntryBody({ item }: { item: Extract<TimelineItem, { kind: 'entry' }> }) {
  const styles = useThemedStyles(makeStyles);
  const sketch = parseSketch(item.sketch);
  return (
    <>
      {sketch ? (
        <>
          <View style={styles.thumb}>
            <SketchView data={sketch} width={SKETCH_W} height={SKETCH_H} />
          </View>
          {item.subject ? (
            <Text style={styles.teaser} numberOfLines={2}>
              {item.subject}
            </Text>
          ) : null}
        </>
      ) : item.subject ? (
        <Text style={styles.teaser} numberOfLines={3}>
          {item.subject}
        </Text>
      ) : (
        <Text style={[styles.teaser, styles.teaserEmpty]} numberOfLines={1}>
          A quiet noticing
        </Text>
      )}
      {item.quality ? <Text style={styles.quality}>{item.quality}</Text> : null}
      {item.charge !== null ? <ChargeGauge charge={item.charge} word={false} width={120} /> : null}
    </>
  );
}

function SessionBody({ item }: { item: Extract<TimelineItem, { kind: 'session' }> }) {
  const styles = useThemedStyles(makeStyles);
  const hasCharge = item.chargeBefore !== null || item.chargeAfter !== null;
  const shift =
    item.chargeAfter !== null
      ? `${feltSenseBand(item.chargeBefore)} → ${feltSenseBand(item.chargeAfter)}`
      : feltSenseBand(item.chargeBefore);
  return (
    <>
      <Text style={styles.withPart}>with {item.partName ?? 'a part'}</Text>
      {hasCharge ? <Text style={styles.shift}>{shift}</Text> : null}
    </>
  );
}

function GroundingBody({ item }: { item: Extract<TimelineItem, { kind: 'grounding' }> }) {
  const styles = useThemedStyles(makeStyles);
  return item.note ? (
    <Text style={styles.teaser} numberOfLines={2}>
      {item.note}
    </Text>
  ) : (
    <Text style={[styles.teaser, styles.teaserEmpty]} numberOfLines={1}>
      A moment to settle
    </Text>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'flex-start' },
    gutter: {
      width: MARGIN_W,
      paddingLeft: Spacing.three,
      paddingRight: Spacing.two,
      paddingTop: 2,
    },
    gutterDate: { ...typography.caption, color: colors.textSecondary },
    gutterTime: { ...typography.caption, color: colors.textFaint, fontSize: 11, lineHeight: 16 },
    body: { flex: 1, paddingLeft: Spacing.three, paddingRight: Spacing.three, gap: Spacing.one },
    title: { ...typography.displaySmall, fontSize: 20, lineHeight: 28 },
    teaser: { ...typography.body, lineHeight: 24 },
    teaserEmpty: { fontStyle: 'italic', color: colors.textSecondary },
    quality: { ...typography.bodySmall, fontStyle: 'italic', color: colors.textSecondary },
    withPart: { ...typography.serifBody, fontSize: 16, lineHeight: 24, fontStyle: 'italic', color: colors.textSecondary },
    shift: { ...typography.bodySmall, color: colors.textSecondary },
    thumb: {
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      overflow: 'hidden',
      alignSelf: 'flex-start',
      marginVertical: 2,
    },
  });
