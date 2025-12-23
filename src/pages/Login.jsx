import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Remove navigation logic - let App.jsx handle routing based on onboarding status

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    } else {
      setStatus("success");
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoBox}>🌱</div>

        <h1 className={styles.title}>Bloom</h1>
        <p className={styles.subtitle}>
          Cultivate habits that help you grow
        </p>

        {status === "success" ? (
          <p className={styles.success}>
            Magic link sent. Check your inbox ✨
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />

            {status === "error" && (
              <p className={styles.error}>{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className={styles.button}
            >
              {status === "loading" ? "Sending…" : "Send magic link"}
            </button>
          </form>
        )}

        <p className={styles.helper}>
          No passwords. Just good habits.
        </p>
      </div>
    </div>
  );
}
