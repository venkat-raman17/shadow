import { Platform, Appearance } from 'react-native';

export interface Palette {
  background: string;
  surface: string;
  surfaceRaised: string;
  textPrimary: string;
  textSecondary: string;
  textFaint: string;
  accent: string;
  accentMuted: string;
  accentSoft: string;
  accentWarm: string;
  onAccent: string;
  danger: string;
  border: string;
  borderStrong: string;
  chip: string;
  chipActive: string;
  overlay: string;
  /** Warm shadow colour for soft, lamplit depth (per theme). */
  shadowTint: string;
  /** Translucent surface for the tab-bar ledge so content reads faintly behind it. */
  surfaceTranslucent: string;
}

// The original, calm near-black palette.
const dark: Palette = {
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
  shadowTint: '#000000',
  surfaceTranslucent: 'rgba(26,25,23,0.82)',
};

// A warm "aged paper" light palette — the same contemplative mood in daylight,
// with deepened sage/tan accents so they hold contrast on a pale ground.
const light: Palette = {
  background: '#f5f1ea',
  surface: '#ece6db',
  surfaceRaised: '#e3dccf',
  textPrimary: '#2a2722',
  textSecondary: '#6b655c',
  textFaint: '#9a9389',
  accent: '#5f7a6e',
  accentMuted: '#7c9e8e',
  accentSoft: 'rgba(95,122,110,0.12)',
  accentWarm: '#a8743f',
  onAccent: '#f5f1ea',
  danger: '#9e5b5b',
  border: '#ddd5c8',
  borderStrong: '#c9c0b0',
  chip: '#e6dfd2',
  chipActive: '#ddd3c2',
  overlay: 'rgba(40,36,32,0.4)',
  shadowTint: '#6f5d46',
  surfaceTranslucent: 'rgba(236,230,219,0.82)',
};

// A warmer "old book" sepia — yellower paper, browner ink — for a softer,
// candlelit read. Distinct from the cooler `light` paper tone.
const sepia: Palette = {
  background: '#efe6d3',
  surface: '#e6dcc4',
  surfaceRaised: '#ddd2b6',
  textPrimary: '#3a2f24',
  textSecondary: '#6b5d4a',
  textFaint: '#9a8b73',
  accent: '#6b7a5e',
  accentMuted: '#8a9472',
  accentSoft: 'rgba(107,122,94,0.14)',
  accentWarm: '#a8702f',
  onAccent: '#efe6d3',
  danger: '#9e5b4f',
  border: '#d6cab0',
  borderStrong: '#c2b393',
  chip: '#e0d5bd',
  chipActive: '#d6c9ad',
  overlay: 'rgba(58,47,36,0.42)',
  shadowTint: '#5e4a34',
  surfaceTranslucent: 'rgba(230,220,196,0.82)',
};

export const palettes = { dark, light, sepia } as const;
export type ThemeName = keyof typeof palettes;
/** What the user can choose; 'system' follows the OS light/dark setting. */
export type ThemePreference = ThemeName | 'system';

// A static fallback palette, resolved once at module load from the OS. Used only
// where the live theme context isn't available (and as the default before the
// stored preference loads). Live, switchable colours come from useTheme().
export const activeTheme: ThemeName = Appearance.getColorScheme() === 'light' ? 'light' : 'dark';
export const colors: Palette = palettes[activeTheme];

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

/** Build the typography scale for a palette so text colours follow the theme. */
export function makeTypography(c: Palette) {
  return {
    heading: {
      fontFamily: Platform.select({ ios: 'system-ui', default: 'normal' }),
      fontSize: 22,
      fontWeight: '500' as const,
      lineHeight: 30,
      color: c.textPrimary,
    },
    body: {
      fontFamily: Platform.select({ ios: 'system-ui', default: 'normal' }),
      fontSize: 16,
      lineHeight: 26,
      color: c.textPrimary,
    },
    bodySmall: {
      fontFamily: Platform.select({ ios: 'system-ui', default: 'normal' }),
      fontSize: 14,
      lineHeight: 22,
      color: c.textSecondary,
    },
    caption: {
      fontFamily: Platform.select({ ios: 'system-ui', default: 'normal' }),
      fontSize: 13,
      lineHeight: 20,
      color: c.textSecondary,
    },
    // ── Serif display styles (contemplative headings & flow prompts) ──────────
    display: {
      fontFamily: SERIF_REGULAR,
      fontSize: 32,
      fontWeight: '400' as const,
      lineHeight: 42,
      letterSpacing: 0.2,
      color: c.textPrimary,
    },
    displaySmall: {
      fontFamily: SERIF_MEDIUM,
      fontSize: 24,
      fontWeight: '500' as const,
      lineHeight: 32,
      color: c.textPrimary,
    },
    // Larger, relaxed serif for the one-question-per-screen flow prompts.
    serifPrompt: {
      fontFamily: SERIF_REGULAR,
      fontSize: 24,
      fontWeight: '400' as const,
      lineHeight: 34,
      color: c.textPrimary,
    },
    // Serif running text for passages the user reads slowly.
    serifBody: {
      fontFamily: SERIF_REGULAR,
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 30,
      color: c.textPrimary,
    },
  } as const;
}

export type Typography = ReturnType<typeof makeTypography>;

/** A combined theme handed to themed StyleSheet factories. */
export interface Theme {
  colors: Palette;
  typography: Typography;
}

/** Static fallback typography (default palette). Live typography is from useTheme(). */
export const typography = makeTypography(colors);

// ── Shape & depth tokens ────────────────────────────────────────────────────
export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

// Soft shadows — calm means barely-there depth, not heavy cards. Theme-aware so
// the shadow carries each palette's warm tint (lamplight on paper, not grey).
export function makeElevation(c: Palette) {
  return {
    subtle: {
      shadowColor: c.shadowTint,
      shadowOpacity: 0.18,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    raised: {
      shadowColor: c.shadowTint,
      shadowOpacity: 0.26,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
  } as const;
}

export type Elevation = ReturnType<typeof makeElevation>;

// ── Motion tokens ─────────────────────────────────────────────────────────
// One source of truth for every reanimated transition. Gentle, ease-out.
export const motion = {
  duration: {
    quick: 180,
    base: 280,
    slow: 420,
  },
  /** Press-depress scale target + duration for the shared usePressScale feedback. */
  press: 0.985,
  pressDuration: 120,
} as const;
