import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalStep from "../components/onboarding/GoalStep";
import AIStep from "../components/onboarding/AIStep";

export default function Onboarding() {
  const navigate = useNavigate();
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
    navigate("/dashboard");
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

