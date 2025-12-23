import React, { useMemo, useEffect, useRef } from 'react';
import { designSystem } from '../../../design-system';
import { Button } from '../button';
// @ts-ignore - CSS module types are declared in global.d.ts
import styles from './Modal.module.css';

// Get design tokens - using light mode by default
// In a real app, this would come from a theme context
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

/**
 * Modal component props
 */
export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Modal title
   */
  title: string;
  
  /**
   * Close handler
   */
  onClose: () => void;
  
  /**
   * Primary action handler
   */
  onPrimaryAction?: () => void;
  
  /**
   * Primary action button label
   * @default 'Add Habit'
   */
  primaryActionLabel?: string;
  
  /**
   * Secondary action button label
   * @default 'Cancel'
   */
  secondaryActionLabel?: string;
  
  /**
   * Whether the primary action button is disabled
   * @default false
   */
  primaryActionDisabled?: boolean;
  
  /**
   * Modal body content
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Close Icon Component
 */
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Modal Component
 * 
 * Replicates Figma Modal component exactly using design system tokens.
 * 
 * Figma Mapping:
 * - Colors: Uses background, surface, and border tokens from colors.ts
 * - Typography: Uses Satoshi font family with various weights and sizes
 * - Spacing: Uses spacing tokens for padding, gaps, and dimensions
 * - Features: Backdrop overlay, centered modal, header, body, footer
 * 
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   title="Add a new habit"
 *   onClose={() => setIsOpen(false)}
 *   onPrimaryAction={handleAddHabit}
 *   primaryActionLabel="Add Habit"
 *   secondaryActionLabel="Cancel"
 * >
 *   <Input label="Habit name" placeholder="E.g, Reading, Designing" />
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  onPrimaryAction,
  primaryActionLabel = 'Add Habit',
  secondaryActionLabel = 'Cancel',
  primaryActionDisabled = false,
  children,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Compute CSS custom properties for design tokens
  const cssVariables = useMemo(() => {
    return {
      '--modal-bg': theme.surface.default, // White background
      '--modal-backdrop': 'rgba(0, 0, 0, 0.5)', // Semi-transparent black backdrop
      '--modal-border': theme.border.default, // #E5E5E5
      '--modal-text': theme.text.primary, // Black
      '--modal-font-family': typography.fontFamily.primary,
      '--modal-title-font-size': `${typography.fontSize.h3}px`, // 28px - matches Figma
      '--modal-title-line-height': `${typography.lineHeight.h3}px`, // 36px - matches Figma
      '--modal-title-font-weight': typography.fontWeight.bold, // 700
      '--modal-title-letter-spacing': `${typography.letterSpacing.h3}px`, // -0.28px
      '--modal-padding-x': `${spacing[32]}px`, // 32px horizontal - matches Figma
      '--modal-padding-y': `${spacing[28]}px`, // 28px vertical - matches Figma
      '--modal-gap': `${spacing[28]}px`, // 28px gap between sections - matches Figma
      '--modal-border-radius': '16px', // 16px border radius from Figma
      '--modal-width': '662px', // 662px width from Figma
      '--modal-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Subtle shadow
    } as React.CSSProperties;
  }, [theme, typography, spacing]);

  // Focus trap: Store the previously focused element and restore on close
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else if (previousActiveElement.current) {
      // Only restore focus if element is still in the DOM
      if (document.body.contains(previousActiveElement.current)) {
        previousActiveElement.current.focus();
      }
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  // Focus trap: Focus close button when modal opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus the close button first (best UX)
      const closeButton = modalRef.current.querySelector(
        '[aria-label="Close modal"]'
      ) as HTMLElement;
      if (closeButton) {
        closeButton.focus();
      } else {
        // Fallback to first focusable element
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        if (firstElement) {
          firstElement.focus();
        }
      }
    }
  }, [isOpen]);

  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle primary action
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    }
  };

  if (!isOpen) {
    return null;
  }

  console.log("Modal rendering - isOpen is true");

  return (
    <div
      className={styles.modalBackdrop}
      style={cssVariables}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={className ? `${styles.modal} ${className}` : styles.modal}
        style={cssVariables}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            {title}
          </h2>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {children}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <Button
            variant="secondary"
            size="medium"
            onClick={onClose}
            style={{ width: '323px' }} // Matches Figma button width
          >
            {secondaryActionLabel}
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={handlePrimaryAction}
            disabled={primaryActionDisabled}
            style={{ width: '323px' }} // Matches Figma button width
          >
            {primaryActionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

