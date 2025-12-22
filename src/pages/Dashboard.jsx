import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // App.jsx will handle redirect automatically via onAuthStateChange
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6f9fc",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "48px",
        }}
      >
        <h1
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "56px",
            color: "#171717",
            margin: "0 0 16px 0",
          }}
        >
          Welcome to Dashboard
        </h1>
        <p
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "28px",
            color: "#666666",
            margin: "0 0 32px 0",
          }}
        >
          Your dashboard is ready!
        </p>
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 24px",
            background: "#ffffff",
            color: "#666666",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontFamily: "Satoshi, sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#f9fafb";
            e.target.style.borderColor = "#d1d5db";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#ffffff";
            e.target.style.borderColor = "#e5e7eb";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
