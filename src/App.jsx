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
    let isMounted = true;

    // Initialize auth - get current session
    const initializeAuth = async () => {
      console.log("Starting auth initialization...");
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("Got session:", session ? "yes" : "no", error ? `Error: ${error.message}` : "");

        if (!isMounted) return;

        if (error) {
          console.error("Error getting session:", error);
          setLoading(false);
          return;
        }

        setSession(session);

        if (session?.user) {
          console.log("Fetching user profile for:", session.user.id);
          const { data, error: profileError } = await supabase
            .from("user_profiles")
            .select("onboarding_completed")
            .eq("user_id", session.user.id)
            .maybeSingle();

          console.log("Profile data:", data, profileError ? `Error: ${profileError.message}` : "");

          if (isMounted) {
            setOnboardingCompleted(data?.onboarding_completed === true);
          }
        }

        if (isMounted) {
          console.log("Auth initialization complete, setting loading to false");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Fallback timeout - if loading takes more than 5 seconds, force stop loading
    const timeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn("Auth initialization timed out, forcing loading to false");
        setLoading(false);
      }
    }, 5000);

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;
        
        setSession(session);

        if (session?.user) {
          const { data } = await supabase
            .from("user_profiles")
            .select("onboarding_completed")
            .eq("user_id", session.user.id)
            .maybeSingle();

          if (isMounted) {
            setOnboardingCompleted(data?.onboarding_completed === true);
          }
        } else {
          setOnboardingCompleted(false);
        }
      }
    );

    // Listen for onboarding completion event
    const handleOnboardingComplete = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && isMounted) {
        const { data } = await supabase
          .from("user_profiles")
          .select("onboarding_completed")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (isMounted) {
          setOnboardingCompleted(data?.onboarding_completed === true);
        }
      }
    };

    window.addEventListener("onboardingCompleted", handleOnboardingComplete);

    // Cleanup
    return () => {
      isMounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
      window.removeEventListener("onboardingCompleted", handleOnboardingComplete);
    };
  }, []);

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

