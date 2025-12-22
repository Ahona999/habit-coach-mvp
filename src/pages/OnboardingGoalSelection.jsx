import { useState } from "react";
import styles from "./OnboardingGoalSelection.module.css";

export default function OnboardingGoalSelection() {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    { id: "health", label: "Health", icon: "❤️" },
    { id: "focus", label: "Focus", icon: "🎯" },
    { id: "learning", label: "Learning", icon: "📚" },
    { id: "meditating", label: "Meditating", icon: "🧘" },
    { id: "sleeping", label: "Sleeping", icon: "🌙" },
  ];

  const handleGoalClick = (goalId) => {
    // Single selection: clicking a goal selects it (or deselects if already selected)
    setSelectedGoal(selectedGoal === goalId ? null : goalId);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      console.log("Selected goal:", selectedGoal);
      // No routing yet
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.indicator}>
            <div className={styles.indicatorActive}></div>
            <div className={styles.indicatorInactive}></div>
          </div>
          <h1 className={styles.title}>What do you want to improve?</h1>
          <p className={styles.subtitle}>Select a goal to get started</p>
        </div>

        {/* Goal Options Grid */}
        <div className={styles.goalsGrid}>
          {goals.map((goal) => (
            <button
              key={goal.id}
              className={`${styles.goalTile} ${
                selectedGoal === goal.id ? styles.goalTileSelected : ""
              }`}
              onClick={() => handleGoalClick(goal.id)}
            >
              <div className={styles.goalIcon}>{goal.icon}</div>
              <p className={styles.goalLabel}>{goal.label}</p>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className={styles.continueButton}
          disabled={!selectedGoal}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

