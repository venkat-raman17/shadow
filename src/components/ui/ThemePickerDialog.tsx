import React from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';

import { Spacing, radii, makeElevation, type Theme, type ThemePreference } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Chip } from './Chip';

const THEME_OPTIONS: { value: ThemePreference; label: string; swatch: string }[] = [
  { value: 'system', label: 'System', swatch: '#2b2923' },
  { value: 'light', label: 'Light', swatch: '#f4eedf' },
  { value: 'dark', label: 'Dark', swatch: '#1a1915' },
  { value: 'sepia', label: 'Sepia', swatch: '#f0e6d0' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

/**
 * A quick theme picker, reachable from the home header. Selecting a theme
 * applies it instantly (the whole app re-renders via useTheme); the dialog
 * stays open so the change is visible. Tap outside or press back to dismiss.
 */
export function ThemePickerDialog({ visible, onClose }: Props) {
  const { preference, setPreference } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close">
        {/* Absorbs taps so they don't reach the backdrop and close the dialog. */}
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>Appearance</Text>
          <Text style={styles.body}>Changes instantly. &ldquo;System&rdquo; follows your device.</Text>
          <View style={styles.options}>
            {THEME_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                swatch={opt.swatch}
                selected={preference === opt.value}
                onPress={() => setPreference(opt.value)}
              />
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: colors.overlay,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.four,
    },
    card: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: colors.surfaceRaised,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.four,
      gap: Spacing.three,
      ...makeElevation(colors).raised,
    },
    title: { ...typography.displaySmall },
    body: { ...typography.bodySmall, color: colors.textSecondary },
    options: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  });
