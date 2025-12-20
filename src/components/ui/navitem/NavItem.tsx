import React, { useMemo } from 'react';
import { designSystem } from '../../../design-system';
import styles from './NavItem.module.css';

// Get design tokens - using light mode by default
// In a real app, this would come from a theme context
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

/**
 * NavItem component props
 */
export interface NavItemProps {
  /**
   * Icon element (React node)
   */
  icon: React.ReactNode;
  
  /**
   * Label text
   */
  label: string;
  
  /**
   * Whether this item is active
   */
  active?: boolean;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * NavItem Component
 * 
 * Replicates Figma NavItem component exactly using design system tokens.
 * 
 * Figma Mapping:
 * - Colors: Uses status-info and text tokens from colors.ts
 * - Typography: Uses Satoshi font family, medium weight (500), h6 font-size/line-height
 * - Spacing: Uses spacing tokens for padding, border-radius, and gaps
 * - States: Active (light blue background) and Inactive (neutral)
 * 
 * @example
 * <NavItem
 *   icon={<DashboardIcon />}
 *   label="Dashboard"
 *   active={true}
 *   onClick={() => navigate('/dashboard')}
 * />
 */
export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
  className = '',
}) => {
  // Compute CSS custom properties for design tokens
  // These map directly to Figma design tokens
  const cssVariables = useMemo(() => {
    // Colors from design tokens based on state
    // Active state: Maps to Figma status-info/background (#EFF6FF)
    // Inactive state: No background (transparent)
    const backgroundColor = active ? theme['status-info'].background : 'transparent';
    
    // Text colors
    // Active: Maps to Figma black text
    // Inactive: Maps to Figma text/secondary (#666666)
    const textColor = active ? theme.text.primary : theme.text.secondary;

    // Typography from design tokens
    // Maps to Figma: Font family = Satoshi, Weight = Medium (500), Size = 18px (h6), Line height = 24px
    // Spacing: Maps to Figma (12px padding, 12px border-radius, 16px gap between icon and label)

    return {
      '--navitem-bg': backgroundColor,
      '--navitem-text': textColor,
      '--navitem-font-family': typography.fontFamily.primary,
      '--navitem-font-weight': typography.fontWeight.medium,
      '--navitem-font-size': `${typography.fontSize.h6}px`, // 18px - matches Figma
      '--navitem-line-height': `${typography.lineHeight.h6}px`, // 24px - matches Figma
      '--navitem-letter-spacing': `${typography.letterSpacing.h6}px`, // 0
      '--navitem-padding': `${spacing[12]}px`, // 12px - matches Figma
      '--navitem-gap': `${spacing[16]}px`, // 16px - matches Figma
      '--navitem-border-radius': `${spacing[12]}px`, // 12px - matches Figma
      '--navitem-icon-size': '24px', // 24px icon size from Figma
      '--navitem-hover-bg': theme['status-info'].background, // Light blue for hover
    } as React.CSSProperties;
  }, [active, theme, typography, spacing]);

  // Build class names
  const navItemClassNames = [
    styles.navItem,
    active && styles['navItem--active'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Handle keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={navItemClassNames}
      style={cssVariables}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.navItemIcon}>
        {icon}
      </div>
      <span className={styles.navItemLabel}>{label}</span>
    </div>
  );
};

