import styles from "./Login.module.css";

export function Login({
  email,
  setEmail,
  status,
  errorMessage,
  onSubmit,
}) {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        
        {/* Header */}
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>🌱</div>
          </div>

          <div className={styles.titleSection}>
            <h2 className={styles.title}>Bloom</h2>
            <p className={styles.subtitle}>
              Build habits that actually stick
            </p>
          </div>
        </div>

        {/* Form */}
        <form className={styles.loginForm} onSubmit={onSubmit}>
          <div className={styles.formContent}>

            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputSection}
                required
              />

              {status === "error" && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}

              {status === "success" && (
                <p className={styles.successMessage}>
                  Magic link sent. Check your email ✨
                </p>
              )}
            </div>

            <div className={styles.buttonSection}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Sending link..."
                  : "Send magic link"}
              </button>
            </div>

            <p className={styles.helperText}>
              We’ll email you a secure magic link to sign in.
            </p>

          </div>
        </form>

      </div>
    </div>
  );
}
