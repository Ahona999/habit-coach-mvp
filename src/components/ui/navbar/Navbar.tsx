import React, { useMemo } from 'react';
import { designSystem } from '../../../design-system';
import styles from './Navbar.module.css';

// Get design tokens - using light mode by default
// In a real app, this would come from a theme context
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

/**
 * Navigation item type
 */
export interface NavItem {
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
}

/**
 * User profile type
 */
export interface UserProfile {
  /**
   * Avatar image URL or element
   */
  avatar?: string | React.ReactNode;
  
  /**
   * User name
   */
  name: string;
  
  /**
   * Plan/subscription text
   */
  plan: string;
}

/**
 * Navbar component props
 */
export interface NavbarProps {
  /**
   * Logo/title text (e.g., "Bloom")
   */
  title?: string;
  
  /**
   * Navigation items array
   */
  items: NavItem[];
  
  /**
   * User profile information
   */
  userProfile?: UserProfile;
  
  /**
   * Whether the navbar is collapsed
   */
  collapsed?: boolean;
  
  /**
   * Toggle handler for collapse/expand
   */
  onToggle?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Navbar Component
 * 
 * Replicates Figma Navbar component exactly using design system tokens.
 * 
 * Figma Mapping:
 * - Colors: Uses background, border, and status-info tokens from colors.ts
 * - Typography: Uses Satoshi font family with various weights and sizes
 * - Spacing: Uses spacing tokens for padding, gaps, and dimensions
 * - States: Expanded (241px width) and Collapsed (77px width)
 * 
 * @example
 * <Navbar
 *   title="Bloom"
 *   items={[
 *     { icon: <DashboardIcon />, label: 'Dashboard', active: true },
 *     { icon: <SettingsIcon />, label: 'Settings', active: false }
 *   ]}
 *   userProfile={{ name: 'Annie Roy', plan: 'Free Plan' }}
 *   collapsed={isCollapsed}
 *   onToggle={() => setIsCollapsed(!isCollapsed)}
 * />
 */
export const Navbar: React.FC<NavbarProps> = ({
  title = 'Bloom',
  items,
  userProfile,
  collapsed = false,
  onToggle,
  className = '',
}) => {
  // Compute CSS custom properties for design tokens
  // These map directly to Figma design tokens
  const cssVariables = useMemo(() => {
    // Dimensions from Figma
    // Expanded: 241px width, Collapsed: 77px width
    const width = collapsed ? '77px' : '241px';
    
    // Typography from design tokens
    // Title: H3 (28px bold, 36px line-height)
    // Nav items: H6 (18px medium, 24px line-height)
    // User name: Body Bold (16px bold, 24px line-height)
    // User plan: Body Small Regular (14px regular, 20px line-height)

    return {
      '--navbar-width': width,
      '--navbar-bg': theme.background.primary, // White background
      '--navbar-border': theme.border.default, // #E5E5E5
      '--navbar-active-bg': theme['status-info'].background, // #EFF6FF - light blue for active state
      '--navbar-text-primary': theme.text.primary, // Black
      '--navbar-text-secondary': theme.text.secondary, // #666666
      '--navbar-font-family': typography.fontFamily.primary,
      '--navbar-title-font-size': `${typography.fontSize.h3}px`, // 28px
      '--navbar-title-line-height': `${typography.lineHeight.h3}px`, // 36px
      '--navbar-title-font-weight': typography.fontWeight.bold, // 700
      '--navbar-title-letter-spacing': `${typography.letterSpacing.h3}px`, // -0.28px
      '--navbar-item-font-size': `${typography.fontSize.h6}px`, // 18px
      '--navbar-item-line-height': `${typography.lineHeight.h6}px`, // 24px
      '--navbar-item-font-weight': typography.fontWeight.medium, // 500
      '--navbar-user-name-font-size': `${typography.fontSize.body}px`, // 16px
      '--navbar-user-name-line-height': `${typography.lineHeight.body}px`, // 24px
      '--navbar-user-name-font-weight': typography.fontWeight.bold, // 700
      '--navbar-user-plan-font-size': `${typography.fontSize['body-small']}px`, // 14px
      '--navbar-user-plan-line-height': `${typography.lineHeight['body-small']}px`, // 20px
      '--navbar-user-plan-font-weight': typography.fontWeight.regular, // 400
      '--navbar-padding': `${spacing[12]}px`, // 12px padding
      '--navbar-gap': `${spacing[16]}px`, // 16px gap between items and icon/label
      '--navbar-gap-small': `${spacing[4]}px`, // 4px gap between user name and plan
      '--navbar-border-radius': `${spacing[12]}px`, // 12px border radius
      '--navbar-header-height': '69px', // 69px header height from Figma
      '--navbar-footer-height': '69px', // 69px footer height from Figma
      '--navbar-icon-size': '24px', // 24px icon size
      '--navbar-avatar-size': '48px', // 48px avatar size
    } as React.CSSProperties;
  }, [collapsed, theme, typography, spacing]);

  // Build class names
  const navbarClassNames = [
    styles.navbar,
    collapsed && styles['navbar--collapsed'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navbarClassNames} style={cssVariables}>
      {/* Header section with title and toggle button */}
      <div className={styles.navbarHeader}>
        {!collapsed && (
          <h1 className={styles.navbarTitle}>{title}</h1>
        )}
        <button
          className={styles.navbarToggle}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          aria-expanded={!collapsed}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.toggleIcon}
            style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Navigation items */}
      <div className={styles.navbarItems}>
        {items.map((item, index) => (
          <div
            key={index}
            className={[
              styles.navbarItem,
              item.active && styles['navbarItem--active'],
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className={styles.navbarItemIcon}>
              {item.icon}
            </div>
            {!collapsed && (
              <span className={styles.navbarItemLabel}>{item.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Footer section with user profile */}
      {userProfile && (
        <div className={styles.navbarFooter}>
          <div className={styles.userProfile}>
            {userProfile.avatar && (
              <div className={styles.userAvatar}>
                {typeof userProfile.avatar === 'string' ? (
                  <img src={userProfile.avatar} alt={userProfile.name} />
                ) : (
                  userProfile.avatar
                )}
              </div>
            )}
            {!collapsed && (
              <div className={styles.userInfo}>
                <div className={styles.userName}>{userProfile.name}</div>
                <div className={styles.userPlan}>{userProfile.plan}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

