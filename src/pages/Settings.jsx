import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Settings({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPlan] = useState("Free Plan");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Settings state
  const [dailyReminders, setDailyReminders] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);

  useEffect(() => {
    fetchUserData();
    // Load settings from localStorage
    setDailyReminders(localStorage.getItem("dailyReminders") === "true");
    setWeeklySummary(localStorage.getItem("weeklySummary") !== "false");
    setAiInsights(localStorage.getItem("aiInsights") !== "false");
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/", { replace: true });
      return;
    }

    const { data: profileData } = await supabase
      .from("user_profiles")
      .select("display_name, full_name")
      .eq("user_id", user.id)
      .maybeSingle();

    setUserName(
      profileData?.display_name ||
      profileData?.full_name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  const handleToggle = (setting, value) => {
    localStorage.setItem(setting, value);
    switch (setting) {
      case "dailyReminders":
        setDailyReminders(value);
        break;
      case "weeklySummary":
        setWeeklySummary(value);
        break;
      case "aiInsights":
        setAiInsights(value);
        break;
    }
  };

  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Delete user's habits
        await supabase.from("habits").delete().eq("user_id", user.id);
        // Delete user's profile
        await supabase.from("user_profiles").delete().eq("user_id", user.id);
        // Sign out and redirect
        await supabase.auth.signOut();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setDeleting(false);
    }
  };

  // Theme colors - darker black theme
  const theme = darkMode ? {
    bg: "#0a0a0a",
    cardBg: "#171717",
    border: "#262626",
    text: "#fafafa",
    textSecondary: "#a3a3a3",
    primary: "#6366f1",
    sidebarBg: "#141414",
  } : {
    bg: "#f8fafc",
    cardBg: "#ffffff",
    border: "#e5e5e5",
    text: "#171717",
    textSecondary: "#666666",
    primary: "#4f46e5",
    sidebarBg: "#ffffff",
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg }}>
      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        width: sidebarCollapsed ? "64px" : "220px",
        backgroundColor: theme.sidebarBg,
        borderColor: theme.border,
      }}>
        <div style={{ 
          ...styles.sidebarHeader, 
          borderColor: theme.border,
          justifyContent: sidebarCollapsed ? "center" : "space-between",
          padding: sidebarCollapsed ? "20px 12px" : "20px 16px",
        }}>
          {!sidebarCollapsed && (
            <h1 style={{ ...styles.logo, color: theme.text }}>Bloom</h1>
          )}
          <button 
            onClick={() => {
              const newState = !sidebarCollapsed;
              setSidebarCollapsed(newState);
              localStorage.setItem("sidebarCollapsed", newState);
            }}
            style={{ 
              ...styles.collapseBtn, 
              color: theme.textSecondary,
              padding: "6px 10px",
              borderRadius: "6px",
              backgroundColor: darkMode ? "#262626" : "#f5f5f5",
            }}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? "›" : "‹"}
          </button>
        </div>
        
        <nav style={styles.nav}>
          <button 
            onClick={() => navigate("/dashboard")}
            style={{ 
              ...styles.navItem, 
              color: theme.textSecondary,
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
              padding: sidebarCollapsed ? "12px" : "12px 16px",
            }}
            title="Dashboard"
          >
            <span style={styles.navIcon}>📊</span>
            {!sidebarCollapsed && <span>Dashboard</span>}
          </button>
          <button 
            style={{ 
              ...styles.navItemActive, 
              backgroundColor: darkMode ? "#312e81" : "#eff6ff",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
              padding: sidebarCollapsed ? "12px" : "12px 16px",
            }}
            title="Settings"
          >
            <span style={styles.navIcon}>⚙️</span>
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
        </nav>

        {/* Logout at bottom */}
        <div style={{ ...styles.sidebarFooter, borderColor: theme.border }}>
          <button 
            onClick={handleLogout} 
            style={{ 
              ...styles.logoutSidebarBtn, 
              color: theme.textSecondary,
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
              padding: sidebarCollapsed ? "12px" : "12px 16px",
            }}
            title="Logout"
          >
            <span style={styles.navIcon}>🚪</span>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        marginLeft: sidebarCollapsed ? "64px" : "220px",
        transition: "margin-left 0.2s ease",
      }}>
        <div style={styles.mainInner}>
          <h1 style={{ ...styles.pageTitle, color: theme.text }}>Settings</h1>

          {/* Appearance Section */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.border }}>
            <h2 style={{ ...styles.sectionTitle, color: theme.text }}>Appearance</h2>
            
            <div style={styles.settingRow}>
              <div style={styles.settingLeft}>
                <div style={{ ...styles.iconBox, backgroundColor: darkMode ? "#262626" : "#eff6ff" }}>
                  {darkMode ? "🌙" : "☀️"}
                </div>
                <div>
                  <p style={{ ...styles.settingLabel, color: theme.text }}>Dark mode</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary }}>
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <Toggle checked={darkMode} onChange={handleDarkModeToggle} />
            </div>
          </div>

          {/* Notifications Section */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.border }}>
            <h2 style={{ ...styles.sectionTitle, color: theme.text }}>Notifications</h2>
            
            <div style={styles.settingRow}>
              <div style={styles.settingLeft}>
                <div style={{ ...styles.iconBox, backgroundColor: darkMode ? "#262626" : "#eff6ff" }}>
                  🔔
                </div>
                <div>
                  <p style={{ ...styles.settingLabel, color: theme.text }}>Daily reminders</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary }}>
                    Get notified to complete your habits
                  </p>
                </div>
              </div>
              <Toggle 
                checked={dailyReminders} 
                onChange={() => handleToggle("dailyReminders", !dailyReminders)} 
              />
            </div>

            <div style={{ ...styles.divider, backgroundColor: theme.border }} />

            <div style={styles.settingRow}>
              <div style={styles.settingLeft}>
                <div style={{ ...styles.iconBox, backgroundColor: darkMode ? "#262626" : "#eff6ff" }}>
                  ✉️
                </div>
                <div>
                  <p style={{ ...styles.settingLabel, color: theme.text }}>Weekly summary</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary }}>
                    Receive a weekly progress report
                  </p>
                </div>
              </div>
              <Toggle 
                checked={weeklySummary} 
                onChange={() => handleToggle("weeklySummary", !weeklySummary)} 
              />
            </div>

            <div style={{ ...styles.divider, backgroundColor: theme.border }} />

            <div style={styles.settingRow}>
              <div style={styles.settingLeft}>
                <div style={{ ...styles.iconBox, backgroundColor: darkMode ? "#262626" : "#eff6ff" }}>
                  ✨
                </div>
                <div>
                  <p style={{ ...styles.settingLabel, color: theme.text }}>AI insights enabled</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary }}>
                    Allow AI to analyze your patterns
                  </p>
                </div>
              </div>
              <Toggle 
                checked={aiInsights} 
                onChange={() => handleToggle("aiInsights", !aiInsights)} 
              />
            </div>
          </div>

          {/* Delete Account Section */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.border }}>
            <h2 style={{ ...styles.sectionTitle, color: theme.text }}>Danger Zone</h2>
            
            <div style={styles.settingRow}>
              <div style={styles.settingLeft}>
                <div style={{ ...styles.iconBox, backgroundColor: "#fef2f2" }}>
                  ⚠️
                </div>
                <div>
                  <p style={{ ...styles.settingLabel, color: theme.text }}>Delete account</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary }}>
                    Permanently delete your account and all data
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowDeleteModal(true)} 
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div 
            style={{ ...styles.modal, backgroundColor: theme.cardBg, borderColor: theme.border }} 
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalIcon}>⚠️</div>
            <h2 style={{ ...styles.modalTitle, color: theme.text }}>Delete Account?</h2>
            <p style={{ ...styles.modalText, color: theme.textSecondary }}>
              Are you sure you want to delete your account? This action cannot be undone. All your habits and progress data will be permanently removed.
            </p>
            <div style={styles.modalActions}>
              <button 
                onClick={() => setShowDeleteModal(false)} 
                style={{ ...styles.cancelBtn, borderColor: theme.border, color: theme.textSecondary }}
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount} 
                disabled={deleting}
                style={styles.confirmDeleteBtn}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Toggle Component
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{
        ...toggleStyles.track,
        backgroundColor: checked ? "#4f46e5" : "#e5e5e5",
      }}
    >
      <div
        style={{
          ...toggleStyles.thumb,
          transform: checked ? "translateX(20px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}

const toggleStyles = {
  track: {
    width: "48px",
    height: "28px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    position: "relative",
    transition: "background-color 0.2s",
  },
  thumb: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    position: "absolute",
    top: "2px",
    transition: "transform 0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  // Sidebar
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    borderRight: "1px solid",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.2s ease",
    zIndex: 100,
  },
  sidebarHeader: {
    padding: "20px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  collapseBtn: {
    background: "none",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.15s",
  },
  nav: {
    padding: "12px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    width: "100%",
    border: "none",
    background: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.15s, color 0.15s",
  },
  navItemActive: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    width: "100%",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#3b82f6",
    fontWeight: "600",
  },
  navIcon: {
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
  },
  sidebarFooter: {
    padding: "12px",
    borderTop: "1px solid",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "500",
    margin: 0,
  },
  userPlan: {
    fontSize: "12px",
    margin: 0,
  },
  // Main
  main: {
    flex: 1,
    padding: "32px 48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainInner: {
    width: "100%",
    maxWidth: "600px",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 24px 0",
  },
  card: {
    borderRadius: "12px",
    border: "1px solid",
    padding: "24px",
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 20px 0",
  },
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
  },
  settingLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconBox: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  settingLabel: {
    fontSize: "15px",
    fontWeight: "500",
    margin: "0 0 2px 0",
  },
  settingDesc: {
    fontSize: "13px",
    margin: 0,
  },
  divider: {
    height: "1px",
    margin: "8px 0",
  },
  logoutSidebarBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    width: "100%",
    border: "none",
    background: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
    transition: "background-color 0.15s, color 0.15s",
  },
  deleteBtn: {
    padding: "10px 20px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.15s",
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },
  modal: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid",
    textAlign: "center",
  },
  modalIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 12px 0",
  },
  modalText: {
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 24px 0",
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  cancelBtn: {
    padding: "12px 24px",
    backgroundColor: "transparent",
    border: "1px solid",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  confirmDeleteBtn: {
    padding: "12px 24px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
};

