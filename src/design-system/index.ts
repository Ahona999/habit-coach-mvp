import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { breakpoints } from './breakpoints';

export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode = 'light') => ({
  colors: colors[mode],
  spacing,
  typography,
  breakpoints,
});

export const designSystem = {
  colors,
  spacing,
  typography,
  breakpoints,
};

