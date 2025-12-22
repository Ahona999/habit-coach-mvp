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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <Routes>
      {/* Auth */}
      <Route
        path="/"
        element={session ? <Navigate to="/onboarding" replace /> : <Auth />}
      />
      <Route path="/login" element={<Login />} />

      {/* Onboarding (protected) */}
      <Route
        path="/onboarding"
        element={session ? <Onboarding /> : <Navigate to="/" replace />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={session ? <Dashboard /> : <Navigate to="/" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

