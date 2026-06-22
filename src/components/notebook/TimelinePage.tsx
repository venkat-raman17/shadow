import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { JournalPaper, MARGIN_W } from '@/components/notebook/JournalPaper';
import { JournalRow } from '@/components/notebook/JournalRow';
import { groupByDay } from '@/lib/notebookTimeline';
import type { TimelineItem } from '@/lib/db';

/**
 * One leaf of the practice history — normally a single calendar month. Renders
 * an optional month header, then a faint day divider before each day's run of
 * rows, all on the ruled JournalPaper. Used for the small-record fallback too
 * (one un-chunked leaf) by passing all items and a gentler header.
 */
export function TimelinePage({
  headerLabel,
  items,
  pageWidth,
  pageHeight,
  onExperimentStatus,
}: {
  headerLabel?: string;
  items: TimelineItem[];
  pageWidth: number;
  pageHeight: number;
  onExperimentStatus: (id: string, status: 'done' | 'let-go') => void;
}) {
  const styles = useThemedStyles(makeStyles);
  const days = groupByDay(items);

  if (items.length === 0) {
    return (
      <JournalPaper width={pageWidth} height={pageHeight} contentStyle={styles.emptyContent}>
        <Text style={styles.empty}>No entries yet.</Text>
        <Text style={styles.emptyHint}>
          Whatever you sit with will gather here, in your own time.
        </Text>
      </JournalPaper>
    );
  }

  return (
    <JournalPaper width={pageWidth} height={pageHeight}>
      {headerLabel ? <Text style={styles.month}>{headerLabel}</Text> : null}
      {days.map((day) => (
        <View key={day.key} style={styles.day}>
          <Text style={styles.dayLabel}>{day.label}</Text>
          <View style={styles.rows}>
            {day.items.map((it) => (
              <JournalRow
                key={`${it.kind}-${it.id}`}
                item={it}
                onExperimentStatus={onExperimentStatus}
              />
            ))}
          </View>
        </View>
      ))}
    </JournalPaper>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    emptyContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.two },
    empty: { ...typography.serifBody, color: colors.textSecondary, fontStyle: 'italic' },
    emptyHint: {
      ...typography.bodySmall,
      color: colors.textFaint,
      textAlign: 'center',
      paddingHorizontal: Spacing.five,
    },
    month: {
      ...typography.display,
      paddingHorizontal: Spacing.three,
      marginBottom: Spacing.three,
    },
    day: { marginBottom: Spacing.four },
    dayLabel: {
      ...typography.caption,
      color: colors.textFaint,
      letterSpacing: 0.5,
      paddingLeft: MARGIN_W + Spacing.three,
      marginBottom: Spacing.two,
    },
    rows: { gap: Spacing.four },
  });
