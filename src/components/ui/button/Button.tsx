import React, { useMemo } from 'react';
import { designSystem } from '../../../design-system';
import styles from './Button.module.css';

// Get design tokens - using light mode by default
// In a real app, this would come from a theme context
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

/**
 * Button variant types
 * Maps to Figma button variants: primary, secondary, destructive
 */
export type ButtonVariant = 'primary' | 'secondary' | 'destructive';

/**
 * Button size types
 * Maps to Figma button sizes: Large, Medium, Small
 */
export type ButtonSize = 'large' | 'medium' | 'small';

/**
 * Button state types
 * Maps to Figma button states: Default, Hover, Disabled
 * Note: Active state is handled via CSS :active pseudo-class
 */
export type ButtonState = 'default' | 'hover' | 'disabled';

/**
 * Button component props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant - determines color scheme
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size - determines padding, font-size, and border-radius
   * @default 'medium'
   */
  size?: ButtonSize;
  
  /**
   * Button state - for controlled state management
   * Note: Hover is typically handled via CSS, but can be controlled via this prop
   * @default 'default'
   */
  state?: ButtonState;
  
  /**
   * Button content
   */
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * Replicates Figma Button component exactly using design system tokens.
 * 
 * Figma Mapping:
 * - Colors: Uses button-primary, button-secondary, button-destructive from colors.ts
 * - Typography: Uses Satoshi font family, bold weight, button font-size/line-height
 * - Spacing: Uses spacing tokens for padding and border-radius
 * - States: Default, Hover (via CSS), Disabled
 * 
 * @example
 * <Button variant="primary" size="large">Click me</Button>
 * <Button variant="secondary" disabled>Disabled</Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  state = 'default',
  children,
  disabled,
  className = '',
  ...props
}) => {
  // Determine if button is disabled (either via prop or state)
  const isDisabled = disabled || state === 'disabled';

  // Compute CSS custom properties for design tokens
  // These map directly to Figma design tokens
  const cssVariables = useMemo(() => {
    // Get variant colors based on state
    let backgroundColor: string;
    let hoverBackgroundColor: string;
    let activeBackgroundColor: string;
    let color: string;

    if (isDisabled) {
      // Disabled state - same for all variants
      // Maps to Figma: button-primary/background-disabled
      backgroundColor = theme['button-primary']['background-disabled'];
      color = theme['button-primary']['text-disabled'];
      hoverBackgroundColor = backgroundColor;
      activeBackgroundColor = backgroundColor;
    } else if (variant === 'primary') {
      // Primary variant colors
      // Default: Maps to Figma: brand-primary-blue/600 (#4F46E5)
      backgroundColor = theme['button-primary'].background;
      // Hover: Maps to Figma: brand-primary-blue/500 or button-primary/background-hover
      hoverBackgroundColor = theme['button-primary']['background-hover'];
      // Active: Maps to Figma: button-primary/background-active
      activeBackgroundColor = theme['button-primary']['background-active'];
      color = theme['button-primary'].text; // white (#FFFFFF)
    } else if (variant === 'secondary') {
      // Secondary variant colors
      backgroundColor = theme['button-secondary'].background;
      hoverBackgroundColor = theme['button-secondary']['background-hover'];
      activeBackgroundColor = theme['button-secondary']['background-active'];
      color = theme['button-secondary'].text;
    } else {
      // Destructive variant colors
      backgroundColor = theme['button-destructive'].background;
      hoverBackgroundColor = theme['button-destructive']['background-hover'];
      activeBackgroundColor = theme['button-destructive'].background; // No active state defined
      color = theme['button-destructive'].text; // white (#FFFFFF)
    }

    // Size-based typography and spacing
    // Maps to Figma sizes: Large (24px font, 32px/16px padding, 12px radius)
    // Medium (18px font, 24px/12px padding, 8px radius)
    // Small (12px font, 16px/8px padding, 6px radius)
    const sizeConfig = {
      large: {
        fontSize: typography.fontSize.h4, // 24px - matches Figma Large
        lineHeight: typography.lineHeight.h4, // 32px
        letterSpacing: typography.letterSpacing.h4, // 0
        paddingY: spacing[16], // 16px vertical - matches Figma Large
        paddingX: spacing[32], // 32px horizontal - matches Figma Large
        borderRadius: spacing[12], // 12px - matches Figma Large
      },
      medium: {
        fontSize: typography.fontSize['body-large'], // 18px - close to Figma Medium (17.63px)
        lineHeight: typography.lineHeight['body-large'], // 28px
        letterSpacing: typography.letterSpacing['body-large'], // 0
        paddingY: spacing[12], // 12px - close to Figma Medium (11.753px)
        paddingX: spacing[24], // 24px - close to Figma Medium (23.506px)
        borderRadius: spacing[8], // 8px - close to Figma Medium (8.815px)
      },
      small: {
        fontSize: typography.fontSize.caption, // 12px - close to Figma Small (12.049px)
        lineHeight: typography.lineHeight.caption, // 16px
        letterSpacing: typography.letterSpacing.caption, // 0.12px
        paddingY: spacing[8], // 8px - close to Figma Small (8.033px)
        paddingX: spacing[16], // 16px - close to Figma Small (16.066px)
        borderRadius: spacing[8], // 8px - using closest spacing token (Figma: 6.025px)
      },
    };

    const size = sizeConfig[size];

    return {
      '--button-bg': backgroundColor,
      '--button-bg-hover': hoverBackgroundColor,
      '--button-bg-active': activeBackgroundColor,
      '--button-color': color,
      '--button-font-family': typography.fontFamily.primary,
      '--button-font-weight': typography.fontWeight.bold,
      '--button-font-size': `${size.fontSize}px`,
      '--button-line-height': `${size.lineHeight}px`,
      '--button-letter-spacing': `${size.letterSpacing}px`,
      '--button-padding-y': `${size.paddingY}px`,
      '--button-padding-x': `${size.paddingX}px`,
      '--button-border-radius': `${size.borderRadius}px`,
    } as React.CSSProperties;
  }, [variant, size, isDisabled, theme, typography, spacing]);

  // Build class names
  const classNames = [
    styles.button,
    isDisabled && styles['button--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classNames}
      style={cssVariables}
      {...props}
    >
      {children}
    </button>
  );
};

