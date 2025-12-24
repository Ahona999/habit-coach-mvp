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

  // Check onboarding status for a user
  const checkOnboardingStatus = async (userId) => {
    if (!userId) return false;
    
    try {
      const { data } = await supabase
        .from("user_profiles")
        .select("onboarding_completed")
        .eq("user_id", userId)
        .maybeSingle();
      
      return data?.onboarding_completed === true;
    } catch (error) {
      console.error("Error checking onboarding:", error);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        setSession(session);
        
        if (session?.user) {
          const completed = await checkOnboardingStatus(session.user.id);
          if (isMounted) {
            setOnboardingCompleted(completed);
          }
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        
        if (!isMounted) return;
        
        setSession(session);
        
        if (session?.user) {
          const completed = await checkOnboardingStatus(session.user.id);
          if (isMounted) {
            setOnboardingCompleted(completed);
          }
        } else {
          setOnboardingCompleted(false);
        }
        
        // Always ensure loading is false after auth state change
        if (isMounted) {
          setLoading(false);
        }
      }
    );

    // Listen for manual onboarding completion
    const handleOnboardingComplete = async () => {
      if (!isMounted) return;
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const completed = await checkOnboardingStatus(session.user.id);
        if (isMounted) {
          setOnboardingCompleted(completed);
        }
      }
    };

    window.addEventListener("onboardingCompleted", handleOnboardingComplete);

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      window.removeEventListener("onboardingCompleted", handleOnboardingComplete);
    };
  }, []);

  // Show loading screen
  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontFamily: "Satoshi, sans-serif",
        color: "#666"
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Home - Login page */}
      <Route
        path="/"
        element={
          session ? (
            onboardingCompleted ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          ) : (
            <Auth />
          )
        }
      />
      
      {/* Login alias */}
      <Route path="/login" element={<Login />} />

      {/* Onboarding */}
      <Route
        path="/onboarding"
        element={
          !session ? (
            <Navigate to="/" replace />
          ) : onboardingCompleted ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Onboarding />
          )
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          !session ? (
            <Navigate to="/" replace />
          ) : !onboardingCompleted ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <Dashboard />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
