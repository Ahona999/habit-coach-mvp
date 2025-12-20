import React, { useMemo } from 'react';
import { designSystem } from '../../../design-system';
import styles from './Dropdown.module.css';

// Get design tokens - using light mode by default
// In a real app, this would come from a theme context
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

/**
 * Dropdown option type
 */
export interface DropdownOption {
  label: string;
  value: string;
}

/**
 * Dropdown component props
 */
export interface DropdownProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Selected value
   */
  value?: string;
  
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  
  /**
   * Array of options to display
   */
  options: DropdownOption[];
  
  /**
   * Placeholder text (shown when no value is selected)
   */
  placeholder?: string;
  
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
}

/**
 * Dropdown Arrow Icon Component
 * Simple SVG icon matching Figma dropdown arrow (mingcute:down-line)
 */
const DropdownArrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Dropdown Component
 * 
 * Replicates Figma Dropdown component exactly using design system tokens.
 * 
 * Figma Mapping:
 * - Colors: Uses input.* tokens from colors.ts
 * - Typography: Uses Satoshi font family, medium weight (500), h5 font-size/line-height
 * - Spacing: Uses spacing tokens for padding, border-radius, and height
 * - States: Default, Hover (via CSS), Focus, Disabled
 * 
 * @example
 * <Dropdown
 *   value={selectedValue}
 *   onChange={handleChange}
 *   options={[{ label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' }]}
 *   placeholder="Select frequency"
 * />
 */
export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  className = '',
  id,
  ...props
}) => {
  // Generate unique ID if not provided
  const dropdownId = useMemo(() => id || `dropdown-${Math.random().toString(36).substr(2, 9)}`, [id]);

  // Compute CSS custom properties for design tokens
  // These map directly to Figma design tokens
  const cssVariables = useMemo(() => {
    // Colors from design tokens
    // Maps to Figma: input/background, input/border, input/text
    const backgroundColor = disabled 
      ? theme.input['background-disabled'] 
      : theme.input.background;
    
    const borderColor = disabled 
      ? theme.input.border 
      : theme.input.border;
    
    const textColor = disabled 
      ? theme.input.placeholder 
      : theme.text.secondary; // Maps to Figma text color (#666)

    // Typography from design tokens
    // Maps to Figma: Font family = Satoshi, Weight = Medium (500), Size = 20px (h5), Line height = 28px
    // Spacing: Maps to Figma (32px horizontal, 16px vertical padding, 12px border-radius, 64px height)

    return {
      '--dropdown-bg': backgroundColor,
      '--dropdown-border': borderColor,
      '--dropdown-border-hover': theme.input['border-hover'],
      '--dropdown-border-focus': theme.input['border-focus'],
      '--dropdown-text': textColor,
      '--dropdown-placeholder': theme.input.placeholder,
      '--dropdown-font-family': typography.fontFamily.primary,
      '--dropdown-font-weight': typography.fontWeight.medium,
      '--dropdown-font-size': `${typography.fontSize.h5}px`, // 20px - matches Figma
      '--dropdown-line-height': `${typography.lineHeight.h5}px`, // 28px - matches Figma
      '--dropdown-letter-spacing': `${typography.letterSpacing.h5}px`, // 0
      '--dropdown-padding-y': `${spacing[16]}px`, // 16px vertical - matches Figma
      '--dropdown-padding-x': `${spacing[32]}px`, // 32px horizontal - matches Figma
      '--dropdown-border-radius': `${spacing[12]}px`, // 12px - matches Figma
      '--dropdown-height': `${spacing[64]}px`, // 64px - matches Figma
      '--dropdown-icon-size': '24px', // 24px icon size from Figma
    } as React.CSSProperties;
  }, [disabled, theme, typography, spacing]);

  // Build class names
  const wrapperClassNames = [
    styles.dropdownWrapper,
    disabled && styles['dropdownWrapper--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const selectClassNames = [
    styles.dropdown,
    disabled && styles['dropdown--disabled'],
  ]
    .filter(Boolean)
    .join(' ');

  // Determine if placeholder should be shown
  const showPlaceholder = placeholder && !value;

  return (
    <div className={wrapperClassNames} style={cssVariables}>
      <select
        id={dropdownId}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className={selectClassNames}
        aria-disabled={disabled}
        {...props}
      >
        {showPlaceholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className={styles.arrow} aria-hidden="true">
        <DropdownArrow className={styles.arrowIcon} />
      </span>
    </div>
  );
};

