import { Platform } from 'react-native';

export const colors = {
  background: '#0e0d0c',
  surface: '#1a1917',
  surfaceRaised: '#22201e',
  textPrimary: '#e8e3db',
  textSecondary: '#8a847c',
  textFaint: '#5e594f',
  accent: '#7c9e8e',
  accentMuted: '#5f7a6e',
  accentSoft: 'rgba(124,158,142,0.12)',
  accentWarm: '#c4956a',
  onAccent: '#0e0d0c',
  danger: '#9e6b6b',
  border: '#2e2c29',
  borderStrong: '#3a3733',
  chip: '#2a2826',
  chipActive: '#3a3632',
  overlay: 'rgba(8,7,6,0.72)',
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

// Custom serif loaded via @expo-google-fonts/newsreader in src/app/_layout.tsx.
// The family name is the font-map key passed to useFonts. Used only for
// contemplative display headings / flow prompts — body & UI stay on system sans.
// Falls back to platform serif if the font fails to load (app still renders).
const SERIF_REGULAR = 'Newsreader_400Regular';
const SERIF_MEDIUM = 'Newsreader_500Medium';
const SYSTEM_SERIF = Platform.select({ ios: 'ui-serif', default: 'serif' });

export const fontFamilies = {
  serif: SERIF_REGULAR,
  serifMedium: SERIF_MEDIUM,
  systemSerif: SYSTEM_SERIF,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: SERIF_REGULAR,
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: SERIF_REGULAR,
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui',
    serif: SERIF_REGULAR,
    rounded: 'system-ui',
    mono: 'monospace',
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
  // ── Serif display styles (contemplative headings & flow prompts) ──────────
  display: {
    fontFamily: SERIF_REGULAR,
    fontSize: 32,
    fontWeight: '400' as const,
    lineHeight: 42,
    letterSpacing: 0.2,
    color: colors.textPrimary,
  },
  displaySmall: {
    fontFamily: SERIF_MEDIUM,
    fontSize: 24,
    fontWeight: '500' as const,
    lineHeight: 32,
    color: colors.textPrimary,
  },
  // Larger, relaxed serif for the one-question-per-screen flow prompts.
  serifPrompt: {
    fontFamily: SERIF_REGULAR,
    fontSize: 24,
    fontWeight: '400' as const,
    lineHeight: 34,
    color: colors.textPrimary,
  },
  // Serif running text for passages the user reads slowly.
  serifBody: {
    fontFamily: SERIF_REGULAR,
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 30,
    color: colors.textPrimary,
  },
} as const;

// ── Shape & depth tokens ────────────────────────────────────────────────────
export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

// Soft shadows — calm means barely-there depth, not heavy cards.
export const elevation = {
  subtle: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  raised: {
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
} as const;

// ── Motion tokens ─────────────────────────────────────────────────────────
// One source of truth for every reanimated transition. Gentle, ease-out.
export const motion = {
  duration: {
    quick: 180,
    base: 280,
    slow: 420,
  },
} as const;
