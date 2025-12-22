import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Login from "./Login";
import OnboardingGoal from "./OnboardingGoal";

export default function Auth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  // NOT logged in → Login
  if (!session) {
    return <Login />;
  }

  // Logged in → Onboarding (for now)
  return <OnboardingGoal />;
}



