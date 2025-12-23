import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
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

  const handleFinish = async () => {
    // Save goal and mark onboarding as complete
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Upsert user profile: update if exists, insert if not
      const { error } = await supabase.from("user_profiles").upsert({
        user_id: user.id,
        selected_goal: selectedGoal,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error saving onboarding data:", error);
        // Still navigate even if save fails (user can complete onboarding again)
      } else {
        // Dispatch custom event to notify App.jsx to refresh onboarding status
        window.dispatchEvent(new CustomEvent("onboardingCompleted"));
      }
    }

    // Navigate to dashboard - App.jsx will handle routing
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

