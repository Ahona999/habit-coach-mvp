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
      } else {
        console.log("Onboarding completed successfully");
      }
      
      // Dispatch event to refresh App.jsx state
      window.dispatchEvent(new CustomEvent("onboardingCompleted"));
      
      // Wait a moment for state to update, then navigate
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 200);
    } else {
      // No user - redirect to login
      navigate("/", { replace: true });
    }
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

