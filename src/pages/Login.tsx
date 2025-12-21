import React, { useMemo } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { designSystem } from '../design-system';
// @ts-ignore
import styles from './Login.module.css';

const theme = designSystem.colors.light;
const spacing = designSystem.spacing;
const typography = designSystem.typography;

export interface LoginProps {
  email: string;
  onEmailChange: (email: string) => void;
  status: 'idle' | 'loading' | 'error' | 'success';
  errorMessage?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function Login({
  email,
  onEmailChange,
  status,
  errorMessage,
  onSubmit,
}: LoginProps) {
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

        '--login-font-family': typography.fontFamily.primary,
        '--login-text-primary': theme.text.primary,
        '--login-text-secondary': theme.text.secondary,
        '--login-error-text': theme['status-error'].text,
        '--login-success-text': theme['semantic-success-green']['500'],

        '--login-form-width': '568px',
        '--login-form-gap': status !== 'idle' ? '36px' : '42px',
      }) as CSSProperties,
    [status]
  );

  return (
    <div className={styles.loginPage} style={cssVariables}>
      <div className={styles.loginCard}>
        {/* Header */}
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon} />
          </div>

          <div className={styles.titleSection}>
            <h1 className={styles.title}>Bloom</h1>
            <p className={styles.subtitle}>
              Cultivate habits that help you grow
            </p>
          </div>
        </div>

        {/* Content */}
        {status === 'success' ? (
          <div className={styles.loginForm}>
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
        ) : (
          <form className={styles.loginForm} onSubmit={onSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
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
          </form>
        )}
      </div>
    </div>
  );
}

