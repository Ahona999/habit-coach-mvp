/**
 * Design Tokens - Breakpoints
 * 
 * Generated from Figma Variables (Design System Collection)
 * Supports Desktop, Tablet, and Mobile modes
 * Includes breakpoint thresholds, margins, gaps, and grid system values
 */

export const breakpoints = {
  desktop: {
    breakpoint: 1440,
    margin: {
      'page-x': 32,
      'page-y': 32,
    },
    gap: {
      xs: 4,
      s: 8,
      md: 16,
      lg: 24,
      xl: 40,
      '2xl': 48,
    },
    grid: {
      columns: 12,
      gutter: 24,
      margin: 32,
    },
  },

  tablet: {
    breakpoint: 810,
    margin: {
      'page-x': 24,
      'page-y': 24,
    },
    gap: {
      xs: 4,
      s: 8,
      md: 16,
      lg: 20,
      xl: 32,
      '2xl': 40,
    },
    grid: {
      columns: 8,
      gutter: 24,
      margin: 24,
    },
  },

  mobile: {
    breakpoint: 393,
    margin: {
      'page-x': 16,
      'page-y': 16,
    },
    gap: {
      xs: 4,
      s: 8,
      md: 12,
      lg: 16,
      xl: 24,
      '2xl': 32,
    },
    grid: {
      columns: 4,
      gutter: 16,
      margin: 16,
    },
  },
} as const;
