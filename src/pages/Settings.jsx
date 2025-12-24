import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Settings({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPlan] = useState("Free Plan");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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
        width: sidebarCollapsed ? "60px" : "200px",
        backgroundColor: theme.sidebarBg,
        borderColor: theme.border,
      }}>
        <div style={{ ...styles.sidebarHeader, borderColor: theme.border }}>
          {!sidebarCollapsed && <h1 style={{ ...styles.logo, color: theme.text }}>Bloom</h1>}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ ...styles.collapseBtn, color: theme.textSecondary }}
          >
            {sidebarCollapsed ? "→" : "←"}
          </button>
        </div>
        
        <nav style={styles.nav}>
          <button 
            onClick={() => navigate("/dashboard")}
            style={{ ...styles.navItem, color: theme.textSecondary }}
          >
            <span style={styles.navIcon}>📊</span>
            {!sidebarCollapsed && <span>Dashboard</span>}
          </button>
          <button style={{ ...styles.navItemActive, backgroundColor: darkMode ? "#312e81" : "#eff6ff" }}>
            <span style={styles.navIcon}>⚙️</span>
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
        </nav>

        {/* User Profile at bottom */}
        <div style={{ ...styles.sidebarFooter, borderColor: theme.border }}>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>
              {userName.charAt(0).toUpperCase()}
            </div>
            {!sidebarCollapsed && (
              <div>
                <p style={{ ...styles.userName, color: theme.text }}>{userName}</p>
                <p style={{ ...styles.userPlan, color: theme.textSecondary }}>{userPlan}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
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

          {/* Logout Button */}
          <button onClick={handleLogout} style={{ ...styles.logoutBtn, borderColor: theme.border, color: theme.textSecondary }}>
            Logout 🚪
          </button>
        </div>
      </main>
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
    borderRight: "1px solid",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.2s",
    flexShrink: 0,
  },
  sidebarHeader: {
    padding: "20px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    margin: 0,
  },
  collapseBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  nav: {
    padding: "16px 8px",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    width: "100%",
    border: "none",
    background: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  navItemActive: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#4f46e5",
    fontWeight: "500",
  },
  navIcon: {
    fontSize: "18px",
  },
  sidebarFooter: {
    padding: "16px",
    borderTop: "1px solid",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#e5e5e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "600",
    color: "#666",
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
    padding: "48px",
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
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "14px",
    backgroundColor: "transparent",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#666",
    cursor: "pointer",
    marginTop: "8px",
  },
};

