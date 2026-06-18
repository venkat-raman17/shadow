import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { colors, typography, Spacing, radii } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * Catches render/init errors anywhere below it (e.g. a failed SQLite init) so the
 * app shows a calm message instead of a blank crash. A class component is
 * required — only class components can be React error boundaries. Styled with the
 * static fallback palette since it may sit above the theme provider.
 */
export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.warn('Partwise error boundary caught:', error);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Something went wrong.</Text>
        <Text style={styles.body}>
          Partwise hit an unexpected error. Your reflections stay safe on your device. Try again, or
          reopen the app.
        </Text>
        <Pressable onPress={this.reset} style={styles.button}>
          <Text style={styles.buttonLabel}>Try again</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.five,
    gap: Spacing.three,
  },
  title: { ...typography.display, fontSize: 26, textAlign: 'center' },
  body: { ...typography.serifBody, color: colors.textSecondary, textAlign: 'center', lineHeight: 28 },
  button: {
    marginTop: Spacing.two,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  buttonLabel: { ...typography.body, color: colors.textPrimary, fontWeight: '500' },
});
