/**
 * Design Tokens - Typography
 * 
 * Generated from Figma Variables (Design System Collection)
 * Includes font families, weights, sizes, line heights, letter spacing, and text colors
 */

export const typography = {
  fontFamily: {
    primary: 'Satoshi',
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },

  fontSize: {
    h1: 48,
    h2: 36,
    h3: 28,
    h4: 24,
    h5: 20,
    h6: 18,
    'body-large': 18,
    body: 16,
    'body-small': 14,
    caption: 12,
    overline: 11,
    button: 16,
  },

  lineHeight: {
    h1: 56,
    h2: 44,
    h3: 36,
    h4: 32,
    h5: 28,
    h6: 24,
    'body-large': 28,
    body: 24,
    'body-small': 20,
    caption: 16,
    overline: 16,
    button: 20,
  },

  letterSpacing: {
    h1: -0.96,
    h2: -0.36,
    h3: -0.28,
    h4: 0,
    h5: 0,
    h6: 0,
    'body-large': 0,
    body: 0,
    'body-small': 0,
    caption: 0.12,
    overline: 0.88,
    button: 0,
  },

  colorText: {
    primary: '#1A1A1A',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#FFFFFF',
    disabled: '#CCCCCC',
  },
} as const;
