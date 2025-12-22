import { useState } from "react";
import GoalStep from "../components/onboarding/GoalStep";
import AIStep from "../components/onboarding/AIStep";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleSelectGoal = (goalId) => {
    setSelectedGoal(goalId);
  };

  const handleNext = () => {
    if (selectedGoal) {
      setStep(2);
    }
  };

  const handleFinish = () => {
    console.log("Onboarding completed");
  };

  if (step === 1) {
    return (
      <GoalStep
        selectedGoal={selectedGoal}
        onSelect={handleSelectGoal}
        onNext={handleNext}
      />
    );
  }

  return <AIStep onFinish={handleFinish} />;
}

