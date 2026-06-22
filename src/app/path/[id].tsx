import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, Button, Card } from '@/components/ui';
import { Illustration } from '@/components/illustrations';
import { getPath, pathSteps } from '@/lib/paths';
import { getPractice } from '@/lib/practices';
import { getReading } from '@/lib/readings';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function PathScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile = useUserProfile();
  const path = id ? getPath(id) : undefined;
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const steps = path ? pathSteps(path, profile?.gender) : [];
  const reading = path?.readingId ? getReading(path.readingId) : undefined;

  function enter(stepIndex: number) {
    const step = steps[stepIndex];
    if (!step || !path) return;
    router.push({
      pathname: '/flow/[id]',
      params: { id: step.flowId, path: path.id, pathStep: String(stepIndex) },
    });
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: '',
        }}
      />
      <Screen>
        {path ? (
          <>
            <View style={styles.head}>
              <Illustration name={path.icon ?? 'turning-arrow'} tone="soft" size={64} />
              <Text style={styles.title}>{path.title}</Text>
              <Text style={styles.when}>{path.when}</Text>
            </View>

            <Text style={styles.intro}>
              A worn trail, not a track — you can enter anywhere, stop anywhere, and come back
              whenever you return.
            </Text>

            <View style={styles.trail}>
              {steps.map((step, i) => {
                const practice = getPractice(step.flowId);
                const minutes = practice?.estimatedMinutes ?? 0;
                return (
                  <Card
                    key={`${step.flowId}-${i}`}
                    onPress={() => enter(i)}
                    accessibilityLabel={practice?.title ?? 'Open this practice'}
                    style={styles.step}>
                    <View style={styles.stepIcon}>
                      {practice ? (
                        <Illustration name={practice.icon} tone="soft" size={36} decorative />
                      ) : (
                        <Text style={styles.stepDot}>·</Text>
                      )}
                    </View>
                    <View style={styles.stepBody}>
                      <Text style={styles.stepTitle}>{practice?.title ?? 'A practice'}</Text>
                      <Text style={styles.stepWhy}>{step.why}</Text>
                      {minutes > 0 ? <Text style={styles.stepMeta}>~{minutes} min</Text> : null}
                    </View>
                  </Card>
                );
              })}
            </View>

            {steps.length > 0 ? (
              <Button label="Start the path →" onPress={() => enter(0)} />
            ) : null}

            {reading ? (
              <Pressable
                style={styles.readingLink}
                onPress={() => router.push({ pathname: '/reading/[id]', params: { id: reading.id } })}
                accessibilityRole="button">
                <Text style={styles.readingLinkText}>Read more about this →</Text>
              </Pressable>
            ) : null}
          </>
        ) : (
          <Text style={styles.missing}>That way isn&apos;t here.</Text>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    head: { gap: Spacing.two, marginBottom: Spacing.two },
    title: { ...typography.display, fontSize: 28, lineHeight: 35, marginTop: Spacing.two },
    when: { ...typography.serifBody, color: colors.textSecondary, lineHeight: 26 },
    intro: { ...typography.bodySmall, color: colors.textSecondary, fontStyle: 'italic', lineHeight: 21 },

    trail: { gap: Spacing.two },
    step: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
    stepIcon: { width: 26, alignItems: 'center' },
    stepDot: { ...typography.display, color: colors.accent, lineHeight: 20 },
    stepBody: { flex: 1, gap: Spacing.half },
    stepTitle: { ...typography.body, fontWeight: '500' },
    stepWhy: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
    stepMeta: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.half },

    readingLink: { alignSelf: 'flex-start', paddingVertical: Spacing.one },
    readingLinkText: { ...typography.bodySmall, color: colors.accent },

    missing: {
      ...typography.serifBody,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.six,
    },
  });
