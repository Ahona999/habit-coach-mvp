/**
 * Design Tokens - Colors
 * 
 * Generated from Figma Variables (Design System Collection)
 * Supports Light and Dark modes
 */

export const colors = {
  light: {
    // Generic
    '25': '#F6F9FC',

    // Background
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      tertiary: '#E5E5E5',
      inverse: '#171717',
    },

    // Surface
    surface: {
      default: '#FFFFFF',
      raised: '#FFFFFF',
      overlay: '#FFFFFF',
    },

    // Text
    text: {
      primary: '#171717',
      secondary: '#666666',
      tertiary: '#737373',
      disabled: '#A3A3A3',
      inverse: '#FFFFFF',
      link: '#4F46E5',
      success: '#16A34A',
      warning: '#D97706',
      error: '#DC2626',
      info: '#2563EB',
    },

    // Border
    border: {
      default: '#E5E5E5',
      hover: '#D4D4D4',
      focus: '#4F46E5',
      error: '#DC2626',
      disabled: '#F5F5F5',
      placeholder: '#A3A3A3',
    },

    // Button Primary
    'button-primary': {
      background: '#4F46E5',
      'background-hover': '#4338CA',
      'background-active': '#3730A3',
      'background-disabled': '#E5E5E5',
      text: '#FFFFFF',
      'text-disabled': '#A3A3A3',
    },

    // Button Secondary
    'button-secondary': {
      background: '#F5F5F5',
      'background-hover': '#E5E5E5',
      'background-active': '#D4D4D4',
      text: '#171717',
    },

    // Button Destructive
    'button-destructive': {
      background: '#DC2626',
      'background-hover': '#B91C1C',
      text: '#FFFFFF',
    },

    // Card
    card: {
      background: '#FFFFFF',
      border: '#E5E5E5',
      shadow: '#FFFFFF',
    },

    // Input
    input: {
      background: '#FFFFFF',
      'background-disabled': '#F5F5F5',
      border: '#E5E5E5',
      'border-hover': '#D4D4D4',
      'border-focus': '#4F46E5',
      'border-error': '#DC2626',
      text: '#171717',
      placeholder: '#A3A3A3',
    },

    // Status Success
    'status-success': {
      background: '#F0FDF4',
      border: '#BBF7D0',
      text: '#15803D',
      icon: '#16A34A',
    },

    // Status Warning
    'status-warning': {
      background: '#FFFBEB',
      border: '#FDE68A',
      text: '#B45309',
      icon: '#F59E0B',
    },

    // Status Error
    'status-error': {
      background: '#FEF2F2',
      border: '#FECACA',
      text: '#B91C1C',
      icon: '#DC2626',
    },

    // Status Info
    'status-info': {
      background: '#EFF6FF',
      border: '#BFDBFE',
      text: '#1D4ED8',
      icon: '#3B82F6',
    },

    // Habit Blue
    'habit-blue': {
      background: '#EEF2FF',
      dot: '#7C3AED',
      'dot-completed': '#8B5CF6',
    },

    // Habit Purple
    'habit-purple': {
      background: '#F5F3FF',
      dot: '#7C3AED',
      'dot-completed': '#8B5CF6',
    },

    // Habit Orange
    'habit-orange': {
      background: '#FFF7ED',
      dot: '#EA580C',
      'dot-completed': '#F97316',
    },

    // Habit Red
    'habit-red': {
      background: '#FEF2F2',
      dot: '#DC2626',
      'dot-completed': '#EF4444',
    },

    // Brand Primary Blue
    'brand-primary-blue': {
      '50': '#EEF2FF',
      '100': '#E0E7FF',
      '200': '#C7D2FE',
      '300': '#A5B4FC',
      '400': '#818CF8',
      '500': '#6366F1',
      '600': '#4F46E5',
      '700': '#4338CA',
      '800': '#3730A3',
      '900': '#312E81',
    },

    // Brand Secondary Purple
    'brand-secondary-purple': {
      '50': '#F5F3FF',
      '100': '#EDE9FE',
      '200': '#DDD6FE',
      '300': '#C4B5FD',
      '400': '#A78BFA',
      '500': '#8B5CF6',
      '600': '#7C3AED',
      '700': '#6D28D9',
      '800': '#5B21B6',
      '900': '#4C1D95',
    },

    // Semantic Success Green
    'semantic-success-green': {
      '50': '#F0FDF4',
      '100': '#DCFCE7',
      '200': '#BBF7D0',
      '300': '#86EFAC',
      '400': '#4ADE80',
      '500': '#22C55E',
      '600': '#16A34A',
      '700': '#15803D',
      '800': '#166534',
      '900': '#14532D',
    },

    // Semantic Warning Yellow
    'semantic-warning-yellow': {
      '50': '#FFFBEB',
      '100': '#FEF3C7',
      '200': '#FDE68A',
      '300': '#FCD34D',
      '400': '#FBBF24',
      '500': '#F59E0B',
      '600': '#D97706',
      '700': '#D45200',
      '800': '#92400E',
      '900': '#78350F',
    },

    // Semantic Error Red
    'semantic-error-red': {
      '50': '#FEF2F2',
      '100': '#FEE2E2',
      '200': '#FECACA',
      '300': '#FCA5A5',
      '400': '#F87171',
      '500': '#EF4444',
      '600': '#DC2626',
      '700': '#B91C1C',
      '800': '#991B1B',
      '900': '#7F1D1D',
    },

    // Semantic Info
    'semantic-info': {
      '50': '#EFF6FF',
      '100': '#DBEAFE',
      '200': '#BFDBFE',
      '300': '#93C5FD',
      '400': '#60A5FA',
      '500': '#3B82F6',
      '600': '#2563EB',
      '700': '#1D4ED8',
      '800': '#1E40AF',
      '900': '#1E3A8A',
    },

    // Semantic Neutral
    'semantic-neutral': {
      '50': '#FAFAFA',
      '100': '#F5F5F5',
      '200': '#E5E5E5',
      '300': '#D4D4D4',
      '400': '#A3A3A3',
      '500': '#737373',
      '600': '#525252',
      '700': '#262626',
      '800': '#171717',
      '900': '#0A0A0A',
    },
  },

  dark: {
    // Generic
    '25': '#F6F9FC',

    // Background
    background: {
      primary: '#0A0A0A',
      secondary: '#171717',
      tertiary: '#262626',
      inverse: '#FFFFFF',
    },

    // Surface
    surface: {
      default: '#171717',
      raised: '#262626',
      overlay: '#262626',
    },

    // Text
    text: {
      primary: '#FAFAFA',
      secondary: '#262626',
      tertiary: '#A3A3A3',
      disabled: '#737373',
      inverse: '#171717',
      link: '#818CF8',
      success: '#4ADE80',
      warning: '#FBBF24',
      error: '#F87171',
      info: '#60A5FA',
    },

    // Border
    border: {
      default: '#404040',
      hover: '#525252',
      focus: '#818CF8',
      error: '#F87171',
      disabled: '#262626',
      placeholder: '#737373',
    },

    // Button Primary
    'button-primary': {
      background: '#6366F1',
      'background-hover': '#4F46E5',
      'background-active': '#4338CA',
      'background-disabled': '#262626',
      text: '#FFFFFF',
      'text-disabled': '#737373',
    },

    // Button Secondary
    'button-secondary': {
      background: '#262626',
      'background-hover': '#404040',
      'background-active': '#525252',
      text: '#FAFAFA',
    },

    // Button Destructive
    'button-destructive': {
      background: '#EF4444',
      'background-hover': '#DC2626',
      text: '#FFFFFF',
    },

    // Card
    card: {
      background: '#171717',
      border: '#404040',
      shadow: '#FFFFFF',
    },

    // Input
    input: {
      background: '#1A1A1A',
      'background-disabled': '#262626',
      border: '#404040',
      'border-hover': '#525252',
      'border-focus': '#818CF8',
      'border-error': '#F87171',
      text: '#FAFAFA',
      placeholder: '#737373',
    },

    // Status Success
    'status-success': {
      background: '#14532D',
      border: '#166534',
      text: '#BBF7D0',
      icon: '#4ADE80',
    },

    // Status Warning
    'status-warning': {
      background: '#78350F',
      border: '#92400E',
      text: '#FDE68A',
      icon: '#FBBF24',
    },

    // Status Error
    'status-error': {
      background: '#7F1D1D',
      border: '#991B1B',
      text: '#FECACA',
      icon: '#F87171',
    },

    // Status Info
    'status-info': {
      background: '#1E3A8A',
      border: '#1E40AF',
      text: '#BFDBFE',
      icon: '#60A5FA',
    },

    // Habit Blue
    'habit-blue': {
      background: '#312E81',
      dot: '#8B5CF6',
      'dot-completed': '#A78BFA',
    },

    // Habit Purple
    'habit-purple': {
      background: '#4C1D95',
      dot: '#8B5CF6',
      'dot-completed': '#A78BFA',
    },

    // Habit Orange
    'habit-orange': {
      background: '#7C2D12',
      dot: '#F97316',
      'dot-completed': '#FB923C',
    },

    // Habit Red
    'habit-red': {
      background: '#7F1D1D',
      dot: '#EF4444',
      'dot-completed': '#F87171',
    },

    // Brand Primary Blue
    'brand-primary-blue': {
      '50': '#EEF2FF',
      '100': '#E0E7FF',
      '200': '#C7D2FE',
      '300': '#A5B4FC',
      '400': '#818CF8',
      '500': '#6366F1',
      '600': '#4F46E5',
      '700': '#4338CA',
      '800': '#3730A3',
      '900': '#312E81',
    },

    // Brand Secondary Purple
    'brand-secondary-purple': {
      '50': '#F5F3FF',
      '100': '#EDE9FE',
      '200': '#DDD6FE',
      '300': '#C4B5FD',
      '400': '#A78BFA',
      '500': '#8B5CF6',
      '600': '#7C3AED',
      '700': '#6D28D9',
      '800': '#5B21B6',
      '900': '#4C1D95',
    },

    // Semantic Success Green
    'semantic-success-green': {
      '50': '#F0FDF4',
      '100': '#DCFCE7',
      '200': '#BBF7D0',
      '300': '#86EFAC',
      '400': '#4ADE80',
      '500': '#22C55E',
      '600': '#16A34A',
      '700': '#15803D',
      '800': '#166534',
      '900': '#14532D',
    },

    // Semantic Warning Yellow
    'semantic-warning-yellow': {
      '50': '#FFFBEB',
      '100': '#FEF3C7',
      '200': '#FDE68A',
      '300': '#FCD34D',
      '400': '#FBBF24',
      '500': '#F59E0B',
      '600': '#D97706',
      '700': '#D45200',
      '800': '#92400E',
      '900': '#78350F',
    },

    // Semantic Error Red
    'semantic-error-red': {
      '50': '#FEF2F2',
      '100': '#FEE2E2',
      '200': '#FECACA',
      '300': '#FCA5A5',
      '400': '#F87171',
      '500': '#EF4444',
      '600': '#DC2626',
      '700': '#B91C1C',
      '800': '#991B1B',
      '900': '#7F1D1D',
    },

    // Semantic Info
    'semantic-info': {
      '50': '#EFF6FF',
      '100': '#DBEAFE',
      '200': '#BFDBFE',
      '300': '#93C5FD',
      '400': '#60A5FA',
      '500': '#3B82F6',
      '600': '#2563EB',
      '700': '#1D4ED8',
      '800': '#1E40AF',
      '900': '#1E3A8A',
    },

    // Semantic Neutral
    'semantic-neutral': {
      '50': '#FAFAFA',
      '100': '#F5F5F5',
      '200': '#E5E5E5',
      '300': '#D4D4D4',
      '400': '#A3A3A3',
      '500': '#737373',
      '600': '#525252',
      '700': '#262626',
      '800': '#171717',
      '900': '#0A0A0A',
    },
  },
} as const;
