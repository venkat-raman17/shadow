import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { setItem } from '@/lib/kv';
import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, Button, FadeSlide } from '@/components/ui';

// Paced one-thing-per-screen panels — the same contemplative rhythm as the
// practices, from the very first moment. The safety panel is unskippable: you
// pass through it on the way to the acknowledge, which only lives on the last.
const PANEL_COUNT = 4;

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const isLast = index === PANEL_COUNT - 1;

  async function handleAcknowledge() {
    await setItem('shadow.onboarding_complete', 'true');
    router.replace('/');
  }

  function next() {
    if (isLast) handleAcknowledge();
    else setIndex((i) => i + 1);
  }

  return (
    <Screen>
      <FadeSlide key={index} style={styles.panel}>
        {index === 0 && (
          <>
            <Text style={styles.title}>Welcome to Shadow.</Text>
            <Text style={styles.body}>
              Shadow is a space for slow inner work — noticing your reactions, meeting the parts of
              yourself you&apos;ve pushed away, and sitting with what you find.
            </Text>
            <Text style={styles.body}>Take it gently. There&apos;s nothing to finish here.</Text>
          </>
        )}

        {index === 1 && (
          <>
            <Text style={styles.title}>First, a moment of care.</Text>
            <Text style={styles.label}>This app is not for you right now if:</Text>
            <Text style={styles.listItem}>
              — You&apos;re in active crisis, or having thoughts of suicide or self-harm.
            </Text>
            <Text style={styles.listItem}>— You&apos;re processing fresh or acute trauma.</Text>
            <Text style={styles.listItem}>
              — You need immediate emotional support from another person.
            </Text>
            <Text style={styles.body}>
              If any of those fit right now, please reach out to a person who can actually help. The
              Support tab has crisis lines you can call or text immediately.
            </Text>
          </>
        )}

        {index === 2 && (
          <>
            <Text style={styles.title}>This is not therapy.</Text>
            <Text style={styles.body}>
              It won&apos;t replace a therapist, and it won&apos;t monitor your safety. It&apos;s a
              private container for reflection — nothing more, and nothing less.
            </Text>
          </>
        )}

        {index === 3 && (
          <>
            <Text style={styles.title}>What you write stays yours.</Text>
            <Text style={styles.body}>
              Nothing you write here leaves this device. No account, no cloud, no AI — your reflections
              are encrypted and kept only by you.
            </Text>
          </>
        )}
      </FadeSlide>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {Array.from({ length: PANEL_COUNT }, (_, i) => (
            <View key={i} style={[styles.dot, i <= index && styles.dotFilled]} />
          ))}
        </View>
        <Button label={isLast ? 'I understand — take me in' : 'Continue'} onPress={next} />
        {index > 0 && !isLast ? (
          <Button label="Back" variant="ghost" onPress={() => setIndex((i) => i - 1)} />
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: { gap: Spacing.three },
  title: { ...typography.display, marginBottom: Spacing.two },
  label: {
    ...typography.bodySmall,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.textSecondary,
  },
  body: { ...typography.serifBody, color: colors.textSecondary, lineHeight: 30 },
  listItem: { ...typography.body, color: colors.textPrimary, lineHeight: 28 },
  footer: { gap: Spacing.two, paddingTop: Spacing.five },
  dots: {
    flexDirection: 'row',
    gap: Spacing.one + Spacing.half,
    justifyContent: 'center',
    paddingBottom: Spacing.two,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotFilled: { backgroundColor: colors.accentMuted },
});
