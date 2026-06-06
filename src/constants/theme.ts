import { Platform } from 'react-native';

export const colors = {
  background: '#0e0d0c',
  surface: '#1a1917',
  surfaceRaised: '#22201e',
  textPrimary: '#e8e3db',
  textSecondary: '#8a847c',
  accent: '#7c9e8e',
  accentWarm: '#c4956a',
  danger: '#9e6b6b',
  border: '#2e2c29',
  chip: '#2a2826',
  chipActive: '#3a3632',
} as const;

// Legacy Colors export kept for any template components that still reference it
export const Colors = {
  light: {
    text: colors.textPrimary,
    background: colors.background,
    backgroundElement: colors.surface,
    backgroundSelected: colors.surfaceRaised,
    textSecondary: colors.textSecondary,
  },
  dark: {
    text: colors.textPrimary,
    background: colors.background,
    backgroundElement: colors.surface,
    backgroundSelected: colors.surfaceRaised,
    textSecondary: colors.textSecondary,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const typography = {
  heading: {
    fontFamily: Platform.select({ ios: 'system-ui', default: 'normal' }),
    fontSize: 22,
    fontWeight: '500' as const,
    lineHeight: 30,
    color: colors.textPrimary,
  },
  body: {
    fontFamily: Platform.select({ ios: 'system-ui', default: 'normal' }),
    fontSize: 16,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  bodySmall: {
    fontFamily: Platform.select({ ios: 'system-ui', default: 'normal' }),
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  caption: {
    fontFamily: Platform.select({ ios: 'system-ui', default: 'normal' }),
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
} as const;
