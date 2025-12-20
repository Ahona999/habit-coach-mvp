import React, { useMemo } from 'react';
import { designSystem } from '../../../design-system';
import styles from './Input.module.css';

// Get design tokens - using light mode by default
// In a real app, this would come from a theme context
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

/**
 * Input state types
 * Maps to Figma input states: Default, Hover, Active (Focus), Disabled, Error, Success
 */
export type InputState = 'default' | 'error' | 'success';

/**
 * Input component props
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input value
   */
  value?: string;
  
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Label text (displayed above the input)
   */
  label?: string;
  
  /**
   * Helper text (displayed below the input)
   * Can be used for hints or error messages
   */
  helperText?: string;
  
  /**
   * Input state - affects border color, background, and text color
   * @default 'default'
   */
  state?: InputState;
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
}

/**
 * Error Icon Component
 * Simple SVG icon matching Figma error icon style
 */
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M12 8V12M12 16H12.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Success Icon Component
 * Simple SVG icon matching Figma success icon style
 */
const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M8 12L11 15L16 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Input Component
 * 
 * Replicates Figma Input component exactly using design system tokens.
 * 
 * Figma Mapping:
 * - Colors: Uses input.* and status-error/status-success tokens from colors.ts
 * - Typography: Uses Satoshi font family, medium weight (500), h5 font-size/line-height
 * - Spacing: Uses spacing tokens for padding and border-radius
 * - States: Default, Hover (via CSS), Focus, Disabled, Error, Success
 * 
 * @example
 * <Input label="Email" placeholder="Enter your email" value={email} onChange={handleChange} />
 * <Input state="error" helperText="Invalid email address" />
 * <Input state="success" helperText="Email verified" />
 */
export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  helperText,
  state = 'default',
  disabled = false,
  className = '',
  id,
  ...props
}) => {
  // Generate unique ID for label/input association if not provided
  const inputId = useMemo(() => id || `input-${Math.random().toString(36).substr(2, 9)}`, [id]);

  // Compute CSS custom properties for design tokens
  // These map directly to Figma design tokens
  const cssVariables = useMemo(() => {
    let backgroundColor: string;
    let borderColor: string;
    let textColor: string;
    let placeholderColor: string;
    let borderWidth: number = 1; // Default 1px border

    if (disabled) {
      // Disabled state - Maps to Figma Disabled state
      // Background: input/background-disabled
      backgroundColor = theme.input['background-disabled'];
      // Border: input/border (same as default)
      borderColor = theme.input.border;
      // Text: faded appearance (using text.secondary with reduced opacity)
      textColor = theme.text.secondary;
      placeholderColor = theme.input.placeholder;
    } else if (state === 'error') {
      // Error state - Maps to Figma Error state
      // Background: status-error/background
      backgroundColor = theme['status-error'].background;
      // Border: input/border-error
      borderColor = theme.input['border-error'];
      // Text: input/border-error (red text color)
      textColor = theme.input['border-error'];
      placeholderColor = theme.input['border-error'];
    } else if (state === 'success') {
      // Success state - Maps to Figma Success state
      // Background: status-success/background
      backgroundColor = theme['status-success'].background;
      // Border: status-success/icon (green border color)
      borderColor = theme['status-success'].icon;
      // Text: status-success/text
      textColor = theme['status-success'].text;
      placeholderColor = theme['status-success'].text;
    } else {
      // Default state - Maps to Figma Default state
      // Background: input/background
      backgroundColor = theme.input.background;
      // Border: input/border
      borderColor = theme.input.border;
      // Text: text/secondary (for placeholder-like appearance when empty)
      textColor = theme.text.secondary;
      placeholderColor = theme.input.placeholder;
    }

    // Typography from design tokens
    // Maps to Figma: Font family = Satoshi, Weight = Medium (500), Size = 20px (h5), Line height = 28px
    // Spacing: Maps to Figma Large size (32px horizontal, 16px vertical padding, 12px border-radius)

    return {
      '--input-bg': backgroundColor,
      '--input-border': borderColor,
      '--input-border-hover': theme.input['border-hover'],
      '--input-border-focus': theme.input['border-focus'],
      '--input-text': textColor,
      '--input-placeholder': placeholderColor,
      '--input-font-family': typography.fontFamily.primary,
      '--input-font-weight': typography.fontWeight.medium,
      '--input-font-size': `${typography.fontSize.h5}px`, // 20px - matches Figma
      '--input-line-height': `${typography.lineHeight.h5}px`, // 28px - matches Figma
      '--input-letter-spacing': `${typography.letterSpacing.h5}px`, // 0
      '--input-padding-y': `${spacing[16]}px`, // 16px vertical - matches Figma Large
      '--input-padding-x': `${spacing[32]}px`, // 32px horizontal - matches Figma Large
      '--input-border-radius': `${spacing[12]}px`, // 12px - matches Figma Large
      '--input-border-width': `${borderWidth}px`,
      '--input-font-size-small': `${typography.fontSize['body-small']}px`, // 14px for helper text
      '--input-line-height-small': `${typography.lineHeight['body-small']}px`, // 20px for helper text
    } as React.CSSProperties;
  }, [state, disabled, theme, typography, spacing]);

  // Build class names
  const inputClassNames = [
    styles.input,
    state === 'error' && styles['input--error'],
    state === 'success' && styles['input--success'],
    disabled && styles['input--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClassNames = [
    styles.inputWrapper,
    state === 'error' && styles['inputWrapper--error'],
    state === 'success' && styles['inputWrapper--success'],
  ]
    .filter(Boolean)
    .join(' ');

  // Determine helper text color based on state
  const helperTextColor = useMemo(() => {
    if (state === 'error') {
      return theme.input['border-error']; // Red for errors
    } else if (state === 'success') {
      return theme['status-success'].text; // Green for success
    }
    return theme.text.secondary; // Gray for default
  }, [state, theme]);

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={wrapperClassNames}>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassNames}
          style={cssVariables}
          aria-invalid={state === 'error' ? 'true' : undefined}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {state === 'error' && !disabled && (
          <span className={styles.icon} aria-hidden="true">
            <ErrorIcon className={styles.errorIcon} />
          </span>
        )}
        {state === 'success' && !disabled && (
          <span className={styles.icon} aria-hidden="true">
            <SuccessIcon className={styles.successIcon} />
          </span>
        )}
      </div>
      {helperText && (
        <span
          id={`${inputId}-helper`}
          className={styles.helperText}
          style={{ color: helperTextColor }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

