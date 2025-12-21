import React, { useState, useMemo } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { designSystem } from '../design-system';
import { supabase } from '../lib/supabaseClient';
// @ts-ignore
import styles from './Login.module.css';

// Design tokens
const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

export function Login() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
        '--login-error-text': theme['status-error'].text,
        '--login-success-text': theme['semantic-success-green']['500'],

        '--login-subtitle-weight': typography.fontWeight.medium,
        '--login-subtitle-size': `${typography.fontSize.h6}px`,
        '--login-subtitle-line-height': `${typography.lineHeight.h6}px`,

        '--login-form-width': '568px',
        '--login-form-gap': status !== 'idle' ? '36px' : '42px',
      }) as CSSProperties,
    [status]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus('error');
      return;
    }

    setStatus('success');
  };

  return (
    <div className={styles.loginPage} style={cssVariables}>
      <div className={styles.loginCard}>
        {/* Header */}
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
                <rect width="48" height="48" rx="8" />
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
        {status === 'success' ? (
          <div className={styles.loginForm}>
            <div className={styles.formContent}>
              <Input value={email} readOnly state="success" />
              <p className={styles.successMessage}>
                Magic link sent! Check your inbox
              </p>

              <Button size="large" variant="primary">
                Check your email
              </Button>

              <p className={styles.helperText}>
                No passwords. Just good habits.
              </p>
            </div>
          </div>
        ) : (
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formContent}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                state={status === 'error' ? 'error' : 'default'}
              />

              {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}

              <Button
                type="submit"
                size="large"
                variant="primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : 'Send magic link'}
              </Button>

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

