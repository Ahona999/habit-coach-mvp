import React, { useMemo, useRef } from 'react';
import { designSystem } from '../../../design-system';
import styles from './Toggle.module.css';

// Get design tokens - using light mode by default
// In a real app, this would come from a theme context
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;

/**
 * Toggle component props
 */
export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Whether the toggle is checked (on)
   */
  checked?: boolean;
  
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Label text (for accessibility)
   */
  label?: string;
  
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
}

/**
 * Toggle Component
 * 
 * Replicates Figma Toggle component exactly using design system tokens.
 * 
 * Figma Mapping:
 * - Colors: Uses button-primary and semantic-neutral tokens from colors.ts
 * - Spacing: Uses spacing tokens for dimensions and padding
 * - States: On (checked), Off (unchecked), Disabled
 * 
 * @example
 * <Toggle checked={isEnabled} onChange={handleToggle} label="Enable notifications" />
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
  id,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Generate unique ID if not provided
  const toggleId = useMemo(() => id || `toggle-${Math.random().toString(36).substr(2, 9)}`, [id]);

  // Compute CSS custom properties for design tokens
  // These map directly to Figma design tokens
  const cssVariables = useMemo(() => {
    // Colors from design tokens
    // ON state: Maps to Figma brand-primary-blue/700 (#4338CA)
    // OFF state: Maps to Figma semantic-neutral background with border-focus border
    const trackBackgroundOn = theme['button-primary']['background-hover']; // #4338CA - matches Figma brand-primary-blue/700
    const trackBackgroundOff = theme['semantic-neutral']['50']; // #FAFAFA - light background for off state
    const trackBorderOff = theme.input['border-focus']; // #4F46E5 - matches Figma border/focus
    
    // Thumb colors
    // ON state: White/light thumb
    // OFF state: Light gray thumb
    const thumbBackgroundOn = theme.background.primary; // #FFFFFF - white thumb when on
    const thumbBackgroundOff = theme['semantic-neutral']['100']; // #F5F5F5 - light gray thumb when off

    // Dimensions from Figma
    // Track: 73px width, 35px height (from Figma code)
    // Thumb: 24px size (from Figma code)
    // Padding: 8px horizontal, 5px vertical (from Figma code)
    // Border radius: 20px (pill shape, from Figma code)

    return {
      '--toggle-track-bg-on': trackBackgroundOn,
      '--toggle-track-bg-off': trackBackgroundOff,
      '--toggle-track-border-off': trackBorderOff,
      '--toggle-thumb-bg-on': thumbBackgroundOn,
      '--toggle-thumb-bg-off': thumbBackgroundOff,
      '--toggle-width': '73px', // From Figma - specific component dimension
      '--toggle-height': '35px', // From Figma - specific component dimension
      '--toggle-thumb-size': `${spacing[24]}px`, // 24px - matches Figma and spacing token
      '--toggle-padding-x': `${spacing[8]}px`, // 8px - matches Figma and spacing token
      '--toggle-padding-y': `${spacing[4]}px`, // 4px - closest to Figma 5px (using spacing token)
      '--toggle-border-radius': `${spacing[20]}px`, // 20px - matches Figma and spacing token
    } as React.CSSProperties;
  }, [theme, spacing]);

  // Build class names
  const wrapperClassNames = [
    styles.toggleWrapper,
    disabled && styles['toggleWrapper--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trackClassNames = [
    styles.toggleTrack,
    checked && styles['toggleTrack--checked'],
    disabled && styles['toggleTrack--disabled'],
  ]
    .filter(Boolean)
    .join(' ');

  const thumbClassNames = [
    styles.toggleThumb,
    checked && styles['toggleThumb--checked'],
    disabled && styles['toggleThumb--disabled'],
  ]
    .filter(Boolean)
    .join(' ');

  // Handle keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className={wrapperClassNames}>
      <div
        className={trackClassNames}
        style={cssVariables}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          id={toggleId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.toggleInput}
          aria-label={label}
          {...props}
        />
        <span className={thumbClassNames} />
      </div>
      {label && (
        <label htmlFor={toggleId} className={styles.toggleLabel}>
          {label}
        </label>
      )}
    </div>
  );
};

