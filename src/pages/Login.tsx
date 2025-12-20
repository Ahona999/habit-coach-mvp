import React, { useState, useMemo } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { designSystem } from '../design-system';
// @ts-ignore - CSS module types are declared in global.d.ts
import styles from './Login.module.css';

// Design tokens
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

/**
 * Login Page
 * Magic-link authentication screen for Bloom.
 */
export function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Email validation function
  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Clear error when user starts typing after a failed submit
    if (emailError && hasAttemptedSubmit) {
      setEmailError(null);
    }
  };

  // CSS variables mapped from design system (Figma → Code)
  const cssVariables = useMemo(
    () =>
      ({
        '--login-bg': theme['25'],
        '--login-card-bg': theme.background.primary,
        '--login-card-width': '712px',
        '--login-card-height': '720px',
        '--login-card-padding': `${spacing[16]}px`,
        '--login-card-radius': '16px',
        '--login-card-gap': '56px',

        '--login-logo-bg': theme['status-info'].background,
        '--login-logo-size': '113px',
        '--login-logo-icon-size': '112px',
        '--login-logo-padding': `${spacing[32]}px`,
        '--login-logo-radius': '16px',
        '--login-logo-color': theme['brand-primary-blue']['600'],

        '--login-header-gap': `${spacing[24]}px`,
        '--login-title-gap': `${spacing[16]}px`,

        '--login-font-family': typography.fontFamily.primary,
        '--login-title-weight': typography.fontWeight.bold,
        '--login-title-size': `${typography.fontSize.h2}px`,
        '--login-title-line-height': `${typography.lineHeight.h2}px`,
        '--login-title-letter-spacing': `${typography.letterSpacing.h2}px`,

        '--login-text-primary': theme.text.primary,
        '--login-text-secondary': theme.text.secondary,
        '--login-error-text': theme['status-error'].text, // #B91C1C - error text color
        '--login-success-text': theme['semantic-success-green']['500'], // #22C55E - success message color

        '--login-subtitle-weight': typography.fontWeight.medium,
        '--login-subtitle-size': `${typography.fontSize.h6}px`,
        '--login-subtitle-line-height': `${typography.lineHeight.h6}px`,

        '--login-form-width': '568px',
        '--login-form-gap': isSuccess ? '36px' : emailError ? '36px' : '42px', // 36px when error/success, 42px default
        '--login-input-error-gap': `${spacing[16]}px`, // 16px gap between input and error/success message
        '--login-success-message-gap': '42px', // 42px gap between input and success message
        '--login-button-gap': `${spacing[16]}px`, // 16px gap between success message and button
      }) as CSSProperties,
    [emailError, isSuccess, spacing, typography, theme]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Validate email
    if (!email.trim() || !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setIsSuccess(false);
      return;
    }

    // Clear error if email is valid
    setEmailError(null);
    // Show success state
    setIsSuccess(true);
    // TODO: Supabase magic link auth
    console.log('Email submitted:', email);
  };

  return (
    <div className={styles.loginPage} style={cssVariables}>
      <div className={styles.loginCard}>
        {/* Header */}
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              {/* Bloom logo placeholder */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="8" fill="currentColor" />
                <path
                  d="M24 16C20 16 16 18 16 22C16 26 20 28 24 28C28 28 32 26 32 22C32 18 28 16 24 16Z"
                  fill="white"
                />
                <path
                  d="M24 20C22 20 20 21 20 22C20 23 22 24 24 24C26 24 28 23 28 22C28 21 26 20 24 20Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <div className={styles.titleSection}>
            <h1 className={styles.title}>Bloom</h1>
            <p className={styles.subtitle}>
              Cultivate habits that help you grow
            </p>
          </div>
        </div>

        {/* Form */}
        {isSuccess ? (
          <div className={styles.loginForm}>
            <div className={styles.formContent}>
              {/* Success State */}
              <div className={styles.successWrapper}>
                <div className={styles.successInputMessageWrapper}>
                  <div className={styles.successInputWrapper}>
                    <Input
                      id="email-success"
                      name="email"
                      type="email"
                      value={email}
                      readOnly
                      state="success"
                    />
                  </div>
                  <p className={styles.successMessage} style={cssVariables}>
                    Magic link sent! Check your inbox
                  </p>
                </div>

                <div className={styles.buttonSection}>
                  <Button
                    variant="primary"
                    size="large"
                    className={styles.submitButton}
                    onClick={() => {
                      // Could navigate to email or show instructions
                      console.log('Check email clicked');
                    }}
                  >
                    Check your email
                  </Button>
                </div>
              </div>

              <p className={styles.helperText}>
                No passwords. Just good habits.
              </p>
            </div>
          </div>
        ) : (
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formContent}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputSection}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    state={emailError ? 'error' : 'default'}
                  />
                </div>
                {emailError && (
                  <p className={styles.errorMessage} style={cssVariables}>
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div className={styles.buttonSection}>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  className={styles.submitButton}
                >
                  Send magic link
                </Button>
              </div>

              <p className={styles.helperText}>
                No passwords. Just good habits.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
