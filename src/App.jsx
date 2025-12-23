import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      // Check if onboarding is completed
      if (session?.user) {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("onboarding_completed")
          .eq("user_id", session.user.id)
          .maybeSingle();

        // If profile exists and onboarding is completed, set to true
        // If no profile exists (new user) or onboarding not completed, set to false
        setOnboardingCompleted(data?.onboarding_completed === true);
      }

      setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      // Check onboarding status when auth state changes
      if (session?.user) {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("onboarding_completed")
          .eq("user_id", session.user.id)
          .maybeSingle();

        // If profile exists and onboarding is completed, set to true
        // If no profile exists (new user) or onboarding not completed, set to false
        setOnboardingCompleted(data?.onboarding_completed === true);
      } else {
        setOnboardingCompleted(false);
      }
    });

    // Listen for onboarding completion event to refresh status
    const checkOnboardingStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from("user_profiles")
          .select("onboarding_completed")
          .eq("user_id", session.user.id)
          .maybeSingle();

        setOnboardingCompleted(data?.onboarding_completed === true);
      }
    };

    window.addEventListener("onboardingCompleted", checkOnboardingStatus);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("onboardingCompleted", checkOnboardingStatus);
    };
  }, []);

  if (loading) return null;

  // Determine redirect path for authenticated users
  const getAuthRedirect = () => {
    if (!session) return "/";
    if (!onboardingCompleted) return "/onboarding";
    return "/dashboard";
  };

  return (
    <Routes>
      {/* Auth */}
      <Route
        path="/"
        element={
          session ? (
            <Navigate to={getAuthRedirect()} replace />
          ) : (
            <Auth />
          )
        }
      />
      <Route path="/login" element={<Login />} />

      {/* Onboarding (protected, only if not completed) */}
      <Route
        path="/onboarding"
        element={
          session ? (
            onboardingCompleted ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Onboarding />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          session ? (
            onboardingCompleted ? (
              <Dashboard />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

