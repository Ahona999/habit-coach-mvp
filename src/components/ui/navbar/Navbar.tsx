import React, { useMemo, useState, useRef, useEffect } from 'react';
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
   * Logout handler
   */
  onLogout?: () => void;
  
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
  onLogout,
  className = '',
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        profileRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showPopup]);
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
          <div
            ref={profileRef}
            className={styles.userProfile}
            onClick={() => !collapsed && setShowPopup(!showPopup)}
            style={{ cursor: !collapsed ? 'pointer' : 'default' }}
          >
            {userProfile.avatar ? (
              <div className={styles.userAvatar}>
                {typeof userProfile.avatar === 'string' ? (
                  <img src={userProfile.avatar} alt={userProfile.name} />
                ) : (
                  userProfile.avatar
                )}
              </div>
            ) : (
              <div className={styles.userAvatar}>
                <div className={styles.avatarPlaceholder}>
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            {!collapsed && (
              <div className={styles.userInfo}>
                <div className={styles.userName}>{userProfile.name}</div>
                <div className={styles.userPlan}>{userProfile.plan}</div>
              </div>
            )}
          </div>
          {!collapsed && showPopup && (
            <div ref={popupRef} className={styles.userPopup}>
              <button
                className={styles.popupItem}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Profile</span>
              </button>
              <button
                className={styles.popupItem}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM13 19.93C11.5 19.58 10.22 18.68 9.35 17.42L13 13.77V19.93ZM13 11.23L9.35 7.58C10.22 6.32 11.5 5.42 13 5.07V11.23ZM15 5.07C16.5 5.42 17.78 6.32 18.65 7.58L15 11.23V5.07ZM15 18.93V12.77L18.65 16.42C17.78 17.68 16.5 18.58 15 18.93Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Dark Mode</span>
              </button>
              <button
                className={styles.popupItem}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                  if (onLogout) {
                    onLogout();
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

