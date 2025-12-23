import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import GoalStep from "../components/onboarding/GoalStep";
import NameStep from "../components/onboarding/NameStep";
import AIStep from "../components/onboarding/AIStep";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);

  const handleSelectGoal = (goalId) => {
    setSelectedGoal(goalId);
  };

  const handleGoalNext = () => {
    if (selectedGoal) {
      setStep(2);
    }
  };

  const handleNameNext = () => {
    if (name && name.trim().length > 0) {
      setStep(3);
    }
  };

  const handleFinish = async () => {
    // Save goal, name, age and mark onboarding as complete
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Upsert user profile: update if exists, insert if not
      const { error } = await supabase.from("user_profiles").upsert({
        user_id: user.id,
        selected_goal: selectedGoal,
        display_name: name.trim(),
        full_name: name.trim(),
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error saving onboarding data:", error);
        // Still navigate even if save fails (user can complete onboarding again)
      } else {
        console.log("Onboarding completed successfully");
        // Dispatch custom event to notify App.jsx to refresh onboarding status
        window.dispatchEvent(new CustomEvent("onboardingCompleted"));
        // Small delay to ensure event is processed
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
        return;
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
        onNext={handleGoalNext}
      />
    );
  }

  if (step === 2) {
    return (
      <NameStep
        name={name}
        age={age}
        onNameChange={setName}
        onAgeChange={setAge}
        onNext={handleNameNext}
      />
    );
  }

  return <AIStep onFinish={handleFinish} />;
}

