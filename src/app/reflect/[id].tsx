import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, TextField, Button, Chip, SectionHeader } from '@/components/ui';
import { useCrypto } from '@/context/CryptoContext';
import { getExperimentById, saveExperimentReflection, type ExperimentItem } from '@/lib/db';

type ReflectStatus = 'open' | 'done' | 'let-go';

const STATUS_OPTIONS: { value: ReflectStatus; label: string }[] = [
  { value: 'open', label: 'Still with me' },
  { value: 'done', label: 'Done' },
  { value: 'let-go', label: 'Let it go' },
];

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ms));
}

export default function ReflectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const [experiment, setExperiment] = useState<ExperimentItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [whatHappened, setWhatHappened] = useState('');
  const [surprise, setSurprise] = useState('');
  const [shifted, setShifted] = useState('');
  const [newStatus, setNewStatus] = useState<ReflectStatus>('open');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id || !key) return;
    getExperimentById(db, id as string, key).then((e) => {
      setExperiment(e);
      if (e) setNewStatus(e.status as ReflectStatus);
      setLoading(false);
    });
  }, [db, id, key]);

  async function handleSave() {
    if (!id || !key || !experiment) return;
    setSaving(true);
    const parts = [whatHappened.trim(), surprise.trim(), shifted.trim()]
      .filter(Boolean)
      .join('\n\n');
    await saveExperimentReflection(db, id as string, parts || '—', newStatus, key);
    setSaving(false);
    setSaved(true);
  }

  if (loading) {
    return (
      <Screen scroll={false} center>
        <ActivityIndicator color={colors.accent} />
      </Screen>
    );
  }

  if (!experiment) {
    return (
      <Screen scroll={false} center>
        <Text style={styles.errorText}>Experiment not found.</Text>
      </Screen>
    );
  }

  if (saved) {
    return (
      <Screen scroll={false} center>
        <Text style={styles.savedText}>Saved.</Text>
        <Button label="Done" variant="secondary" fullWidth={false} onPress={() => router.back()} />
      </Screen>
    );
  }

  const hasContent = whatHappened.trim() || surprise.trim() || shifted.trim();

  return (
    <Screen>
      <SectionHeader>An experiment you carried</SectionHeader>

      <View style={styles.intentionBlock}>
        <View style={styles.intentionAccent} />
        <Text style={styles.intentionText}>{experiment.description}</Text>
      </View>
      <Text style={styles.dateText}>Started {formatDate(experiment.created_at)}</Text>

      <View style={styles.promptGroup}>
        <Text style={styles.promptLabel}>Did you try any part of it? What happened?</Text>
        <TextField
          value={whatHappened}
          onChangeText={setWhatHappened}
          multiline
          placeholder="Even partially, even imperfectly…"
        />
      </View>

      <View style={styles.promptGroup}>
        <Text style={styles.promptLabel}>What surprised you?</Text>
        <TextField
          value={surprise}
          onChangeText={setSurprise}
          multiline
          placeholder="Or what you expected but didn't happen…"
        />
      </View>

      <View style={styles.promptGroup}>
        <Text style={styles.promptLabel}>Has anything shifted in how you see this?</Text>
        <TextField
          value={shifted}
          onChangeText={setShifted}
          multiline
          placeholder="Even a small change in how it feels…"
        />
      </View>

      <View style={styles.promptGroup}>
        <Text style={styles.promptLabel}>Where does this stand now?</Text>
        <View style={styles.statusChips}>
          {STATUS_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              selected={newStatus === opt.value}
              onPress={() => setNewStatus(opt.value)}
            />
          ))}
        </View>
      </View>

      {saving ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.accent} size="small" />
          <Text style={styles.loadingText}>Saving…</Text>
        </View>
      ) : (
        <Button
          label="Save reflection"
          onPress={handleSave}
          disabled={!hasContent && newStatus === experiment.status}
        />
      )}
    </Screen>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  errorText: { ...typography.body, color: colors.textSecondary },
  savedText: {
    ...typography.display,
    fontSize: 26,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  intentionBlock: { flexDirection: 'row', gap: Spacing.three },
  intentionAccent: { width: 3, borderRadius: 2, backgroundColor: colors.accent },
  intentionText: { ...typography.serifBody, flex: 1, color: colors.textPrimary },
  dateText: { ...typography.caption, color: colors.textSecondary },
  promptGroup: { gap: Spacing.two },
  promptLabel: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 22 },
  statusChips: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.one },
  loadingText: { ...typography.bodySmall, color: colors.textSecondary },
});
