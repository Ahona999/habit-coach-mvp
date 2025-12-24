import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Settings({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPlan] = useState("Free Plan");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClick = () => setMobileMenuOpen(false);
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [mobileMenuOpen]);

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
      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          style={styles.mobileOverlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        width: isMobile ? "240px" : (sidebarCollapsed ? "60px" : "200px"),
        backgroundColor: theme.sidebarBg,
        borderColor: theme.border,
        ...(isMobile && {
          position: "fixed",
          left: mobileMenuOpen ? "0" : "-240px",
          top: 0,
          bottom: 0,
          zIndex: 1000,
          transition: "left 0.3s ease",
        }),
      }}>
        <div style={{ ...styles.sidebarHeader, borderColor: theme.border }}>
          <h1 style={{ ...styles.logo, color: theme.text }}>Bloom</h1>
          {!isMobile && (
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{ ...styles.collapseBtn, color: theme.textSecondary }}
            >
              {sidebarCollapsed ? "→" : "←"}
            </button>
          )}
          {isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={{ ...styles.collapseBtn, color: theme.textSecondary }}
            >
              ✕
            </button>
          )}
        </div>
        
        <nav style={styles.nav}>
          <button 
            onClick={() => navigate("/dashboard")}
            style={{ ...styles.navItem, color: theme.textSecondary }}
          >
            <span style={styles.navIcon}>📊</span>
            <span>Dashboard</span>
          </button>
          <button style={{ ...styles.navItemActive, backgroundColor: darkMode ? "#312e81" : "#eff6ff" }}>
            <span style={styles.navIcon}>⚙️</span>
            <span>Settings</span>
          </button>
        </nav>

        {/* User Profile at bottom */}
        <div style={{ ...styles.sidebarFooter, borderColor: theme.border }}>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ ...styles.userName, color: theme.text }}>{userName}</p>
              <p style={{ ...styles.userPlan, color: theme.textSecondary }}>{userPlan}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        marginLeft: isMobile ? 0 : (sidebarCollapsed ? "60px" : "200px"),
        padding: isMobile ? "24px 16px" : "48px",
      }}>
        <div style={{ ...styles.mainInner, padding: isMobile ? "0" : undefined }}>
          {/* Mobile Header */}
          {isMobile && (
            <div style={styles.mobileHeader}>
              <button 
                onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(true); }}
                style={{ ...styles.hamburgerBtn, color: theme.text }}
              >
                ☰
              </button>
              <h1 style={{ ...styles.pageTitle, color: theme.text, margin: 0, flex: 1 }}>Settings</h1>
            </div>
          )}
          {!isMobile && <h1 style={{ ...styles.pageTitle, color: theme.text }}>Settings</h1>}

          {/* Appearance Section */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.border, padding: isMobile ? "16px" : "24px" }}>
            <h2 style={{ ...styles.sectionTitle, color: theme.text }}>Appearance</h2>
            
            <div style={{ ...styles.settingRow, gap: isMobile ? "12px" : "16px" }}>
              <div style={{ ...styles.settingLeft, gap: isMobile ? "12px" : "16px" }}>
                <div style={{ ...styles.iconBox, backgroundColor: darkMode ? "#262626" : "#eff6ff", width: isMobile ? "38px" : "44px", height: isMobile ? "38px" : "44px", fontSize: isMobile ? "18px" : "20px" }}>
                  {darkMode ? "🌙" : "☀️"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...styles.settingLabel, color: theme.text, fontSize: isMobile ? "14px" : "15px" }}>Dark mode</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary, fontSize: isMobile ? "12px" : "13px" }}>
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <Toggle checked={darkMode} onChange={handleDarkModeToggle} />
            </div>
          </div>

          {/* Notifications Section */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.border, padding: isMobile ? "16px" : "24px" }}>
            <h2 style={{ ...styles.sectionTitle, color: theme.text }}>Notifications</h2>
            
            <div style={{ ...styles.settingRow, gap: isMobile ? "12px" : "16px" }}>
              <div style={{ ...styles.settingLeft, gap: isMobile ? "12px" : "16px" }}>
                <div style={{ ...styles.iconBox, backgroundColor: darkMode ? "#262626" : "#eff6ff", width: isMobile ? "38px" : "44px", height: isMobile ? "38px" : "44px", fontSize: isMobile ? "18px" : "20px" }}>
                  🔔
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...styles.settingLabel, color: theme.text, fontSize: isMobile ? "14px" : "15px" }}>Daily reminders</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary, fontSize: isMobile ? "12px" : "13px" }}>
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

            <div style={{ ...styles.settingRow, gap: isMobile ? "12px" : "16px" }}>
              <div style={{ ...styles.settingLeft, gap: isMobile ? "12px" : "16px" }}>
                <div style={{ ...styles.iconBox, backgroundColor: darkMode ? "#262626" : "#eff6ff", width: isMobile ? "38px" : "44px", height: isMobile ? "38px" : "44px", fontSize: isMobile ? "18px" : "20px" }}>
                  ✉️
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...styles.settingLabel, color: theme.text, fontSize: isMobile ? "14px" : "15px" }}>Weekly summary</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary, fontSize: isMobile ? "12px" : "13px" }}>
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

            <div style={{ ...styles.settingRow, gap: isMobile ? "12px" : "16px" }}>
              <div style={{ ...styles.settingLeft, gap: isMobile ? "12px" : "16px" }}>
                <div style={{ ...styles.iconBox, backgroundColor: darkMode ? "#262626" : "#eff6ff", width: isMobile ? "38px" : "44px", height: isMobile ? "38px" : "44px", fontSize: isMobile ? "18px" : "20px" }}>
                  ✨
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...styles.settingLabel, color: theme.text, fontSize: isMobile ? "14px" : "15px" }}>AI insights enabled</p>
                  <p style={{ ...styles.settingDesc, color: theme.textSecondary, fontSize: isMobile ? "12px" : "13px" }}>
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
    position: "relative",
  },
  // Mobile Overlay
  mobileOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  // Hamburger Button
  hamburgerBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    padding: "4px 8px",
    flexShrink: 0,
  },
  // Mobile Header
  mobileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  // Sidebar
  sidebar: {
    borderRight: "1px solid",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.2s, left 0.3s ease",
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
    transition: "margin-left 0.2s ease",
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

