import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen } from '@/components/ui';
import { Illustration } from '@/components/illustrations';
import { getReading, parseBody, readTimeOf, type Block } from '@/lib/readings';

/** Render a run of text, lifting any **term** into the accent colour. */
function renderInline(text: string, termStyle: object): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <Text key={i} style={termStyle}>
        {p}
      </Text>
    ) : (
      p
    ),
  );
}

export default function ReadingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reading = id ? getReading(id) : undefined;
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const renderBlock = (block: Block, i: number) => {
    switch (block.kind) {
      case 'subhead':
        return (
          <Text key={i} style={styles.subhead}>
            {block.text}
          </Text>
        );
      case 'quote':
        return (
          <View key={i} style={styles.quoteWrap}>
            <Text style={styles.quote}>{renderInline(block.text, styles.term)}</Text>
          </View>
        );
      case 'figure':
        return (
          <View key={i} style={styles.figureWrap}>
            <Illustration name={block.name} tone="line" width={120} height={96} />
            {block.caption ? <Text style={styles.figureCaption}>{block.caption}</Text> : null}
          </View>
        );
      case 'callout':
        return (
          <View key={i} style={[styles.callout, block.variant === 'note' && styles.calloutNote]}>
            <Text style={[styles.calloutLabel, block.variant === 'note' && styles.calloutLabelNote]}>
              {block.variant === 'note' ? 'Notice this' : 'Try this'}
            </Text>
            <Text style={styles.calloutBody}>{renderInline(block.text, styles.term)}</Text>
          </View>
        );
      case 'para':
      default:
        return (
          <Text key={i} style={styles.para}>
            {renderInline(block.text, styles.term)}
          </Text>
        );
    }
  };

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
        {reading ? (
          <>
            {reading.cover ? (
              <View style={styles.headerIllo}>
                <Illustration name={reading.cover} tone="soft" width={150} height={132} />
              </View>
            ) : null}
            <Text style={styles.title}>{reading.title}</Text>
            <Text style={styles.meta}>{readTimeOf(reading)}</Text>
            {reading.epigraph ? (
              <View style={styles.epigraphWrap}>
                <Text style={styles.epigraph}>{reading.epigraph.text}</Text>
                {reading.epigraph.attribution ? (
                  <Text style={styles.epigraphAttr}>— {reading.epigraph.attribution}</Text>
                ) : null}
              </View>
            ) : null}
            {parseBody(reading.body).map(renderBlock)}
          </>
        ) : (
          <Text style={styles.missing}>That reading isn&apos;t here.</Text>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    headerIllo: { alignItems: 'center', marginBottom: -Spacing.one },
    title: { ...typography.display, fontSize: 28, lineHeight: 36, marginBottom: -Spacing.two },
    meta: { ...typography.caption, color: colors.textFaint, marginBottom: Spacing.one },

    epigraphWrap: {
      borderLeftWidth: 2,
      borderLeftColor: colors.accentMuted,
      paddingLeft: Spacing.three,
      gap: Spacing.one,
      marginBottom: Spacing.one,
    },
    epigraph: { ...typography.serifBody, fontSize: 17, fontStyle: 'italic', color: colors.textSecondary, lineHeight: 27 },
    epigraphAttr: { ...typography.caption, color: colors.textFaint },

    subhead: {
      ...typography.displaySmall,
      fontSize: 19,
      lineHeight: 26,
      color: colors.textPrimary,
      marginTop: Spacing.two,
      marginBottom: -Spacing.one,
    },
    para: { ...typography.serifBody, color: colors.textPrimary, marginBottom: Spacing.three },
    term: { color: colors.accent, fontWeight: '500' },

    quoteWrap: {
      borderLeftWidth: 3,
      borderLeftColor: colors.accent,
      paddingLeft: Spacing.three,
      marginVertical: Spacing.two,
    },
    quote: { ...typography.serifPrompt, fontSize: 21, lineHeight: 31, color: colors.textPrimary },

    figureWrap: { alignItems: 'center', gap: Spacing.one, marginVertical: Spacing.two },
    figureCaption: {
      ...typography.caption,
      color: colors.textSecondary,
      fontStyle: 'italic',
      textAlign: 'center',
      maxWidth: 260,
    },

    callout: {
      backgroundColor: colors.surfaceRaised,
      borderRadius: radii.md,
      borderLeftWidth: 3,
      borderLeftColor: colors.accent,
      padding: Spacing.three,
      gap: Spacing.one,
      marginVertical: Spacing.two,
    },
    calloutNote: { borderLeftColor: colors.danger },
    calloutLabel: {
      ...typography.caption,
      color: colors.accent,
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontWeight: '600',
    },
    calloutLabelNote: { color: colors.danger },
    calloutBody: { ...typography.serifBody, fontSize: 16, lineHeight: 26, color: colors.textPrimary },

    missing: {
      ...typography.serifBody,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.six,
    },
  });
