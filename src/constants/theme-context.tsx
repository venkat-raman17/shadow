import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';

import { getItem, setItem } from '@/lib/kv';
import {
  palettes,
  makeTypography,
  colors as fallbackColors,
  typography as fallbackTypography,
  type Theme,
  type ThemeName,
  type ThemePreference,
} from '@/constants/theme';

const KEY = 'shadow.theme';

interface ThemeContextValue extends Theme {
  /** What the user chose ('system' follows the OS). */
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolve(pref: ThemePreference, scheme: 'light' | 'dark'): ThemeName {
  return pref === 'system' ? scheme : pref;
}

/**
 * Holds the live theme. The chosen palette + matching typography are recomputed
 * on every switch, so wrapping the app means a theme change re-renders every
 * surface that reads colours via useTheme()/useThemedStyles() — instantly, with
 * no reload.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPref] = useState<ThemePreference>('system');
  const [scheme, setScheme] = useState<'light' | 'dark'>(
    Appearance.getColorScheme() === 'light' ? 'light' : 'dark',
  );

  useEffect(() => {
    getItem(KEY).then((v) => {
      if (v === 'light' || v === 'dark' || v === 'sepia' || v === 'system') setPref(v);
    });
  }, []);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) =>
      setScheme(colorScheme === 'light' ? 'light' : 'dark'),
    );
    return () => sub.remove();
  }, []);

  const setPreference = useCallback((p: ThemePreference) => {
    setPref(p);
    void setItem(KEY, p);
  }, []);

  const name = resolve(preference, scheme);
  const colors = palettes[name];
  const typography = useMemo(() => makeTypography(colors), [colors]);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, setPreference, colors, typography }),
    [preference, setPreference, colors, typography],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

const FALLBACK: ThemeContextValue = {
  preference: 'system',
  setPreference: () => {},
  colors: fallbackColors,
  typography: fallbackTypography,
};

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext) ?? FALLBACK;
}

/**
 * Build themed StyleSheets at render time. `factory` is a module-scope function
 * `({ colors, typography }) => StyleSheet.create({...})`; the styles rebuild only
 * when the theme changes.
 */
export function useThemedStyles<T>(factory: (t: Theme) => T): T {
  const { colors, typography } = useTheme();
  return useMemo(() => factory({ colors, typography }), [colors, typography, factory]);
}
