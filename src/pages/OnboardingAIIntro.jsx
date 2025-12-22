import { useNavigate } from "react-router-dom";
import styles from "./OnboardingAIIntro.module.css";

export default function OnboardingAIIntro() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.indicator}>
            <div className={styles.indicatorActive}></div>
            <div className={styles.indicatorActive}></div>
          </div>

          <div className={styles.iconContainer}>
            <div className={styles.icon}>🛡️</div>
          </div>

          <h1 className={styles.title}>Let AI help you stay consistent</h1>
          <p className={styles.subtitle}>
            We analyze your habit patterns to generate insights – no judgement,
            just guidance
          </p>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.insightCard}>
            <p className={styles.insightText}>
              "You're most consistent when you complete habits before 10am"
            </p>
          </div>

          <button
            className={styles.dashboardButton}
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

