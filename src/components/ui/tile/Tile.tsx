import React, { useMemo } from 'react';
import { designSystem } from '../../../design-system';
import styles from './Tile.module.css';

// Get design tokens - using light mode by default
// In a real app, this would come from a theme context
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

/**
 * Tile component props
 */
export interface TileProps {
  /**
   * Label text displayed below the icon
   */
  label: string;
  
  /**
   * Icon element (React node)
   */
  icon?: React.ReactNode;
  
  /**
   * Whether the tile is selected
   */
  selected?: boolean;
  
  /**
   * Whether the tile is disabled
   */
  disabled?: boolean;
  
  /**
   * Click handler
   */
  onSelect?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Tile Component
 * 
 * Replicates Figma Tile component exactly using design system tokens.
 * 
 * Figma Mapping:
 * - Colors: Uses surface, border, and brand-primary-blue tokens from colors.ts
 * - Typography: Uses Satoshi font family, medium weight (500), h5 font-size/line-height
 * - Spacing: Uses spacing tokens for padding, border-radius, and gaps
 * - States: Default, Hover (via CSS), Selected, Disabled
 * 
 * @example
 * <Tile
 *   label="Health"
 *   icon={<HeartIcon />}
 *   selected={isSelected}
 *   onSelect={() => setSelected(true)}
 * />
 */
export const Tile: React.FC<TileProps> = ({
  label,
  icon,
  selected = false,
  disabled = false,
  onSelect,
  className = '',
}) => {
  // Compute CSS custom properties for design tokens
  // These map directly to Figma design tokens
  const cssVariables = useMemo(() => {
    // Colors from design tokens based on state
    let backgroundColor: string;
    let borderColor: string;
    let textColor: string;
    let iconColor: string;

    if (disabled) {
      // Disabled state - Maps to Figma Disabled state
      // Background: button-primary/background-disabled (#E5E5E5)
      backgroundColor = theme['button-primary']['background-disabled'];
      // Border: input/background-disabled (#F5F5F5)
      borderColor = theme.input['background-disabled'];
      // Text: button-primary/text-disabled (#A3A3A3)
      textColor = theme['button-primary']['text-disabled'];
      iconColor = theme['button-primary']['text-disabled'];
    } else if (selected) {
      // Selected state - Maps to Figma Active/Selected state
      // Background: status-info/background (#EFF6FF)
      backgroundColor = theme['status-info'].background;
      // Border: input/border-focus (#4F46E5)
      borderColor = theme.input['border-focus'];
      // Text: status-info/text (#1D4ED8)
      textColor = theme['status-info'].text;
      iconColor = theme['status-info'].text;
    } else {
      // Default state - Maps to Figma Default state
      // Background: surface.default (white)
      backgroundColor = theme.surface.default;
      // Border: border.default (#E5E5E5)
      borderColor = theme.border.default;
      // Text: text.primary (black)
      textColor = theme.text.primary;
      iconColor = theme.text.primary;
    }

    // Typography from design tokens
    // Maps to Figma: Font family = Satoshi, Weight = Medium (500), Size = 20px (h5), Line height = 28px
    // Spacing: Maps to Figma (12px border-radius, 14px gap between icon and text, 150px height, 213px width)

    return {
      '--tile-bg': backgroundColor,
      '--tile-border': borderColor,
      '--tile-text': textColor,
      '--tile-icon': iconColor,
      '--tile-border-hover': theme['status-info'].border, // Light blue for hover (#BFDBFE)
      '--tile-font-family': typography.fontFamily.primary,
      '--tile-font-weight': typography.fontWeight.medium,
      '--tile-font-size': `${typography.fontSize.h5}px`, // 20px - matches Figma
      '--tile-line-height': `${typography.lineHeight.h5}px`, // 28px - matches Figma
      '--tile-letter-spacing': `${typography.letterSpacing.h5}px`, // 0
      '--tile-border-radius': `${spacing[12]}px`, // 12px - matches Figma
      '--tile-gap': `${spacing[12]}px`, // 12px - closest spacing token to Figma's 14px gap
      '--tile-height': '150px', // 150px height from Figma
      '--tile-width': '213px', // 213px width from Figma
      '--tile-icon-size': '48px', // 48px icon size from Figma
    } as React.CSSProperties;
  }, [selected, disabled, theme, typography, spacing]);

  // Build class names
  const tileClassNames = [
    styles.tile,
    selected && styles['tile--selected'],
    disabled && styles['tile--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Handle click
  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect();
    }
  };

  // Handle keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={tileClassNames}
      style={cssVariables}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.tileContent}>
        {icon && (
          <div className={styles.tileIcon}>
            {icon}
          </div>
        )}
        <span className={styles.tileLabel}>{label}</span>
      </div>
    </div>
  );
};

