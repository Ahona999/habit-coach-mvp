import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const session = true; // TEMP: replace with Supabase session later

  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Login />} />

      {/* Onboarding (protected) */}
      <Route
        path="/onboarding"
        element={session ? <Onboarding /> : <Navigate to="/login" replace />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={session ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

