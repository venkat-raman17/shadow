import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { colors, typography, Spacing } from '@/constants/theme';
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
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!experiment) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Experiment not found.</Text>
      </View>
    );
  }

  if (saved) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.savedContainer}>
          <Text style={styles.savedText}>Saved.</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const hasContent = whatHappened.trim() || surprise.trim() || shifted.trim();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionLabel}>An experiment you carried</Text>

        {/* Original intention block */}
        <View style={styles.intentionBlock}>
          <View style={styles.intentionAccent} />
          <Text style={styles.intentionText}>{experiment.description}</Text>
        </View>
        <Text style={styles.dateText}>Started {formatDate(experiment.created_at)}</Text>

        <View style={styles.divider} />

        {/* Reflection prompts */}
        <View style={styles.promptGroup}>
          <Text style={styles.promptLabel}>Did you try any part of it? What happened?</Text>
          <TextInput
            style={styles.input}
            value={whatHappened}
            onChangeText={setWhatHappened}
            multiline
            textAlignVertical="top"
            placeholder="Even partially, even imperfectly…"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.promptGroup}>
          <Text style={styles.promptLabel}>What surprised you?</Text>
          <TextInput
            style={styles.input}
            value={surprise}
            onChangeText={setSurprise}
            multiline
            textAlignVertical="top"
            placeholder="Or what you expected but didn't happen…"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.promptGroup}>
          <Text style={styles.promptLabel}>Has anything shifted in how you see this?</Text>
          <TextInput
            style={styles.input}
            value={shifted}
            onChangeText={setShifted}
            multiline
            textAlignVertical="top"
            placeholder="Even a small change in how it feels…"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* Status chips */}
        <View style={styles.statusGroup}>
          <Text style={styles.promptLabel}>Where does this stand now?</Text>
          <View style={styles.statusChips}>
            {STATUS_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.chip,
                  newStatus === opt.value && styles.chipActive,
                ]}
                onPress={() => setNewStatus(opt.value)}>
                <Text
                  style={[
                    styles.chipText,
                    newStatus === opt.value && styles.chipTextActive,
                  ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save */}
        {saving ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.accent} size="small" />
            <Text style={styles.loadingText}>Saving…</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.saveBtn, !hasContent && styles.saveBtnDim]}
            onPress={handleSave}
            disabled={!hasContent && newStatus === experiment.status}>
            <Text style={styles.saveBtnText}>Save reflection</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: { ...typography.body, color: colors.textSecondary },
  container: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.four,
    flexGrow: 1,
  },
  sectionLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
  },
  intentionBlock: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  intentionAccent: {
    width: 3,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  intentionText: {
    ...typography.body,
    lineHeight: 26,
    flex: 1,
    color: colors.textPrimary,
  },
  dateText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  divider: { height: 1, backgroundColor: colors.border },
  promptGroup: { gap: Spacing.two },
  promptLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: Spacing.three,
    ...typography.body,
    minHeight: 80,
  },
  statusGroup: { gap: Spacing.two },
  statusChips: {
    flexDirection: 'row',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: Spacing.one + 2,
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: {
    borderColor: colors.accent,
  },
  chipText: { ...typography.bodySmall, color: colors.textSecondary },
  chipTextActive: { color: colors.accent, fontWeight: '500' },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  loadingText: { ...typography.bodySmall, color: colors.textSecondary },
  saveBtn: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: Spacing.three,
    alignItems: 'center',
  },
  saveBtnDim: { opacity: 0.6 },
  saveBtnText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.background,
  },
  savedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.five,
    padding: Spacing.four,
  },
  savedText: {
    ...typography.heading,
    fontSize: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  doneBtn: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    borderWidth: 1,
    borderColor: colors.border,
  },
  doneBtnText: { ...typography.body, fontWeight: '500' },
});
