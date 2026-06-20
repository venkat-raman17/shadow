import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Card, Button } from '@/components/ui';
import { ExperimentItem } from '@/lib/db';

const REFLECT_AGE_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

// At module scope so the time read stays out of render.
function isOlderThanReflectAge(createdAt: number): boolean {
  return Date.now() - createdAt > REFLECT_AGE_MS;
}

/**
 * One "experiment" the user set out to carry — shown in the Notebook's
 * reflections page. Open ones can be marked Done / Let go, and (once they've had
 * a few days to breathe) invite a reflection. Closed ones read back, muted.
 */
export function ExperimentCard({
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

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
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
  });
