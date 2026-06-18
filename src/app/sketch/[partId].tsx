import React, { useState } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, Button } from '@/components/ui';
import { SketchCanvas, parseSketch, type SketchData } from '@/components/Sketch';
import { useCrypto } from '@/context/CryptoContext';
import { usePart } from '@/hooks/useIntegration';
import { savePartSketch } from '@/lib/db';

export default function SketchScreen() {
  const { partId } = useLocalSearchParams<{ partId: string }>();
  const db = useSQLiteContext();
  const { key } = useCrypto();
  const { part, loading } = usePart(partId);
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  // Only set once the user actually draws — null means "leave the existing one".
  const [data, setData] = useState<SketchData | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!key || !partId || saving) return;
    setSaving(true);
    if (data !== null) {
      const payload = data.paths.length ? JSON.stringify(data) : null;
      await savePartSketch(db, partId, payload, key);
    }
    router.back();
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: 'Back',
        }}
      />
      <Screen>
        <Text style={styles.heading}>Draw it</Text>
        <Text style={styles.tagline}>
          A face, a shape, a colour, a scribble. Active imagination is visual too — there&apos;s no
          right way, and no one else sees it.
        </Text>

        {loading ? (
          <ActivityIndicator color={colors.accent} style={styles.loading} />
        ) : (
          <>
            <SketchCanvas initial={parseSketch(part?.sketch)} onChange={setData} />
            <Button label={saving ? 'Saving…' : 'Save drawing'} onPress={handleSave} />
          </>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  heading: { ...typography.display },
  tagline: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
  loading: { marginTop: Spacing.six },
});
