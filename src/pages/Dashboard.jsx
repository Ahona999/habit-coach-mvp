import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [habits, setHabits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 1100);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme colors - darker black theme
  const theme = darkMode ? {
    bg: "#0a0a0a",
    cardBg: "#171717",
    border: "#262626",
    text: "#fafafa",
    textSecondary: "#a3a3a3",
    primary: "#6366f1",
    sidebarBg: "#141414",
    inputBg: "#262626",
  } : {
    bg: "#f8fafc",
    cardBg: "#ffffff",
    border: "#e5e5e5",
    text: "#171717",
    textSecondary: "#666666",
    primary: "#4f46e5",
    sidebarBg: "#ffffff",
    inputBg: "#ffffff",
  };

  // Form state
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [preferredTime, setPreferredTime] = useState("Morning");
  const [selectedColor, setSelectedColor] = useState("#4f46e5");

  // Colors
  const colors = [
    { value: "#4f46e5", name: "indigo" },
    { value: "#16a34a", name: "green" },
    { value: "#d97706", name: "orange" },
    { value: "#ef4444", name: "red" },
    { value: "#3b82f6", name: "blue" },
    { value: "#7c3aed", name: "violet" },
  ];

  // Get current date info
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  // Get greeting based on time
  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Generate calendar days
  const getDaysInMonth = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    const days = [];
    // Add empty slots for days before the 1st
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    // Add the days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const narrow = window.innerWidth < 1100;
      setIsMobile(mobile);
      setIsNarrow(narrow);
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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = () => setOpenMenu(null);
    if (openMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [openMenu]);

  const fetchData = async () => {
    try {
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

      // Fetch habits with checkins
      const { data: habitsData } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Fetch checkins for all habits
      if (habitsData && habitsData.length > 0) {
        const habitIds = habitsData.map(h => h.id);
        const { data: checkinsData } = await supabase
          .from("habit_checkins")
          .select("*")
          .in("habit_id", habitIds);

        // Attach checkins to habits
        const habitsWithCheckins = habitsData.map(habit => ({
          ...habit,
          checkins: checkinsData?.filter(c => c.habit_id === habit.id) || []
        }));

        setHabits(habitsWithCheckins);
      } else {
        setHabits([]);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setHabitName("");
    setFrequency("Daily");
    setPreferredTime("Morning");
    setSelectedColor("#4f46e5");
    setShowAddForm(false);
    setEditingHabit(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (editingHabit) {
        // Update existing habit
        const { error } = await supabase.from("habits").update({
          title: habitName.trim(),
          frequency,
          preferred_time: preferredTime,
          color: selectedColor,
        }).eq("id", editingHabit.id);
        
        if (!error) {
          // Optimistic update - update local state immediately
          setHabits(prev => prev.map(h => 
            h.id === editingHabit.id 
              ? { ...h, title: habitName.trim(), frequency, preferred_time: preferredTime, color: selectedColor }
              : h
          ));
        }
      } else {
        // Create new habit
        const { data, error } = await supabase.from("habits").insert({
          user_id: user.id,
          title: habitName.trim(),
          frequency,
          preferred_time: preferredTime,
          color: selectedColor,
        }).select().single();
        
        if (!error && data) {
          // Optimistic update - add to local state immediately
          setHabits(prev => [{ ...data, checkins: [] }, ...prev]);
        }
      }
      resetForm();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to save habit");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setHabitName(habit.title || "");
    setFrequency(habit.frequency || "Daily");
    setPreferredTime(habit.preferred_time || "Morning");
    setSelectedColor(habit.color || "#4f46e5");
    setShowAddForm(true);
    setOpenMenu(null);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    // Optimistic delete - remove from UI immediately
    setHabits(prev => prev.filter(h => h.id !== deleteConfirm));
    setDeleteConfirm(null);
    
    try {
      await supabase.from("habits").delete().eq("id", deleteConfirm);
    } catch (err) {
      console.error("Error:", err);
      // Refetch if delete failed
      fetchData();
    }
  };

  const toggleCheckin = async (habitId, date) => {
    try {
      const dateStr = date.toISOString().split('T')[0];
      const habit = habits.find(h => h.id === habitId);
      const existingCheckin = habit?.checkins?.find(c => c.completed_on === dateStr);

      if (existingCheckin) {
        await supabase.from("habit_checkins").delete().eq("id", existingCheckin.id);
      } else {
        await supabase.from("habit_checkins").insert({
          habit_id: habitId,
          completed_on: dateStr,
        });
      }
      await fetchData();
    } catch (err) {
      console.error("Error toggling checkin:", err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // Calculate streak and completion for a habit
  const getHabitStats = (habit) => {
    const checkins = habit.checkins || [];
    const totalDays = 30;
    const completedDays = checkins.length;
    const percentage = Math.round((completedDays / totalDays) * 100);
    
    // Calculate streak
    let streak = 0;
    const sortedCheckins = [...checkins].sort((a, b) => 
      new Date(b.completed_on) - new Date(a.completed_on)
    );
    
    if (sortedCheckins.length > 0) {
      const todayStr = today.toISOString().split('T')[0];
      const yesterdayStr = new Date(today - 86400000).toISOString().split('T')[0];
      
      if (sortedCheckins[0].completed_on === todayStr || 
          sortedCheckins[0].completed_on === yesterdayStr) {
        streak = 1;
        for (let i = 1; i < sortedCheckins.length; i++) {
          const curr = new Date(sortedCheckins[i-1].completed_on);
          const prev = new Date(sortedCheckins[i].completed_on);
          const diff = (curr - prev) / 86400000;
          if (diff === 1) streak++;
          else break;
        }
      }
    }
    
    return { streak, percentage, completedDays };
  };

  // Generate 30 dots for habit tracking
  const generateDots = (habit) => {
    const dots = [];
    const checkins = habit.checkins || [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const isCompleted = checkins.some(c => c.completed_on === dateStr);
      const isToday = i === 0;
      
      dots.push({
        date,
        dateStr,
        isCompleted,
        isToday,
        dayNum: date.getDate(),
        monthName: date.toLocaleString('default', { month: 'short' }),
      });
    }
    return dots;
  };

  if (loading) {
    return (
      <div style={{ ...styles.loadingContainer, backgroundColor: theme.bg, color: theme.text }}>
        <p>Loading...</p>
      </div>
    );
  }

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
        width: isMobile ? "240px" : (sidebarCollapsed ? "64px" : "220px"),
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
        <div style={{ 
          ...styles.sidebarHeader, 
          borderColor: theme.border,
          justifyContent: sidebarCollapsed && !isMobile ? "center" : "space-between",
          padding: sidebarCollapsed && !isMobile ? "20px 12px" : "20px 16px",
        }}>
          {(!sidebarCollapsed || isMobile) && (
            <h1 style={{ ...styles.logo, color: theme.text }}>Bloom</h1>
          )}
          {!isMobile && (
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
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
            style={{ 
              ...styles.navItemActive, 
              backgroundColor: darkMode ? "#312e81" : "#eff6ff",
              justifyContent: sidebarCollapsed && !isMobile ? "center" : "flex-start",
              padding: sidebarCollapsed && !isMobile ? "12px" : "12px 16px",
            }}
            title="Dashboard"
          >
            <span style={styles.navIcon}>📊</span>
            {(!sidebarCollapsed || isMobile) && <span>Dashboard</span>}
          </button>
          <button 
            onClick={() => navigate("/settings")}
            style={{ 
              ...styles.navItem, 
              color: theme.textSecondary,
              justifyContent: sidebarCollapsed && !isMobile ? "center" : "flex-start",
              padding: sidebarCollapsed && !isMobile ? "12px" : "12px 16px",
            }}
            title="Settings"
          >
            <span style={styles.navIcon}>⚙️</span>
            {(!sidebarCollapsed || isMobile) && <span>Settings</span>}
          </button>
        </nav>

        <div style={{ ...styles.sidebarFooter, borderColor: theme.border }}>
          <button 
            onClick={handleLogout} 
            style={{ 
              ...styles.logoutBtn, 
              color: theme.textSecondary,
              justifyContent: sidebarCollapsed && !isMobile ? "center" : "flex-start",
              padding: sidebarCollapsed && !isMobile ? "12px" : "12px 16px",
            }}
            title="Logout"
          >
            <span style={styles.navIcon}>🚪</span>
            {(!sidebarCollapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        marginLeft: isMobile ? 0 : (sidebarCollapsed ? "64px" : "220px"),
        padding: isMobile ? "16px" : "24px 32px",
      }}>
        {/* Header */}
        <header style={{
          ...styles.header,
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "16px" : "0",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            {isMobile && (
              <button 
                onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(true); }}
                style={{ ...styles.hamburgerBtn, color: theme.text }}
              >
                ☰
              </button>
            )}
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                ...styles.greeting, 
                color: theme.text,
                fontSize: isMobile ? "22px" : "28px",
              }}>{getGreeting()}, {userName}</h1>
              <p style={{ ...styles.subtitle, color: theme.textSecondary }}>Track your progress and build better habits.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddForm(true)} 
            style={{ 
              ...styles.addBtn, 
              backgroundColor: theme.primary,
              width: isMobile ? "100%" : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              whiteSpace: "nowrap",
            }}
          >
            <span>Add Habit</span>
            <span style={{ fontSize: "18px", fontWeight: "400" }}>+</span>
          </button>
        </header>

        {/* Content Grid */}
        <div style={{
          ...styles.contentGrid,
          gridTemplateColumns: isNarrow ? "1fr" : "1fr 340px",
          gap: isNarrow ? "16px" : "24px",
        }}>
          {/* Left Column - Habits */}
          <div style={styles.leftColumn}>
            {/* Add/Edit Form */}
            {showAddForm && (
              <div style={{ ...styles.formCard, backgroundColor: theme.cardBg, borderColor: theme.border }}>
                <div style={styles.formHeader}>
                  <h2 style={{ ...styles.formTitle, color: theme.text }}>
                    {editingHabit ? "Edit Habit" : "Add New Habit"}
                  </h2>
                  <button onClick={resetForm} style={{ ...styles.closeBtn, color: theme.textSecondary }}>✕</button>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                  <input
                    type="text"
                    placeholder="Habit name"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    style={{ ...styles.input, backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }}
                  />
                  <div style={{ ...styles.formRow, flexDirection: isMobile ? "column" : "row" }}>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)} style={{ ...styles.select, backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }}>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                    </select>
                    <select value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} style={{ ...styles.select, backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }}>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
                  <div style={styles.colorRow}>
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setSelectedColor(c.value)}
                        style={{
                          ...styles.colorDot,
                          backgroundColor: c.value,
                          border: selectedColor === c.value ? "3px solid #000" : "2px solid #e5e5e5",
                        }}
                      />
                    ))}
                  </div>
                  <div style={styles.formActions}>
                    <button type="submit" disabled={saving || !habitName.trim()} style={{ ...styles.saveBtn, backgroundColor: theme.primary }}>
                      {saving ? "Saving..." : editingHabit ? "Update" : "Add Habit"}
                    </button>
                    <button type="button" onClick={resetForm} style={{ ...styles.cancelBtn, borderColor: theme.border, color: theme.textSecondary }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Habits Section */}
            <div style={styles.habitsSection}>
              <div style={styles.habitsHeader}>
                <h2 style={{ ...styles.sectionTitle, color: theme.text }}>Your Habits</h2>
                <select style={{ ...styles.filterSelect, backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.text }}>
                  <option>Today</option>
                </select>
              </div>

              {habits.length === 0 ? (
                <div style={{ ...styles.emptyState, backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.textSecondary }}>
                  <p>No habits yet. Click "Add Habit +" to get started!</p>
                </div>
              ) : (
                habits.map((habit) => {
                  const stats = getHabitStats(habit);
                  const dots = generateDots(habit);
                  
                  return (
                    <div key={habit.id} style={{ ...styles.habitCard, backgroundColor: theme.cardBg, borderColor: theme.border }}>
                      <div style={{
                        ...styles.habitTop,
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? "12px" : "0",
                      }}>
                        <div style={styles.habitLeft}>
                          <div style={{
                            ...styles.habitCheck,
                            backgroundColor: habit.color || "#4f46e5",
                            width: isMobile ? "36px" : "40px",
                            height: isMobile ? "36px" : "40px",
                          }}>
                            ✓
                          </div>
                          <div>
                            <h3 style={{ ...styles.habitName, color: theme.text, fontSize: isMobile ? "15px" : "16px" }}>{habit.title}</h3>
                            <p style={{ ...styles.habitFreq, color: theme.textSecondary }}>{habit.frequency || "Daily"}</p>
                          </div>
                        </div>
                        <div style={{
                          ...styles.habitRight,
                          width: isMobile ? "100%" : "auto",
                          justifyContent: isMobile ? "space-between" : "flex-end",
                        }}>
                          <span style={styles.streak}>🔥 {stats.streak}d</span>
                          <span style={{ ...styles.percentage, color: theme.textSecondary }}>{stats.percentage}%</span>
                          <div style={styles.menuContainer}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenu(openMenu === habit.id ? null : habit.id);
                              }}
                              style={{ ...styles.menuBtn, color: theme.textSecondary }}
                            >
                              •••
                            </button>
                            {openMenu === habit.id && (
                              <div style={{ ...styles.dropdown, backgroundColor: theme.cardBg, borderColor: theme.border }}>
                                <button onClick={() => handleEdit(habit)} style={{ ...styles.dropdownItem, color: theme.text }}>
                                  ✏️ Edit
                                </button>
                                <button 
                                  onClick={() => { setDeleteConfirm(habit.id); setOpenMenu(null); }}
                                  style={{...styles.dropdownItem, color: "#dc2626"}}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Completion Dots */}
                      <div style={{
                        ...styles.dotsContainer,
                        gap: isMobile ? "4px" : "6px",
                      }}>
                        {dots.map((dot, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleCheckin(habit.id, dot.date)}
                            style={{
                              ...styles.dot,
                              width: isMobile ? "14px" : "18px",
                              height: isMobile ? "14px" : "18px",
                              backgroundColor: dot.isCompleted 
                                ? (habit.color || "#4f46e5") 
                                : (darkMode ? "#374151" : "#e5e5e5"),
                              border: dot.isToday ? `2px solid ${theme.text}` : "none",
                              boxSizing: "border-box",
                            }}
                            title={`${dot.monthName} ${dot.dayNum}: ${dot.isCompleted ? "Completed ✓" : "Not completed"}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column - Calendar & AI */}
          <div style={styles.rightColumn}>
            {/* Calendar */}
            <div style={{ ...styles.calendarCard, backgroundColor: theme.cardBg, borderColor: theme.border }}>
              <h3 style={{ ...styles.calendarTitle, color: theme.text }}>Activity Calendar</h3>
              <p style={{ ...styles.calendarMonth, color: theme.textSecondary }}>{currentMonth} {currentYear}</p>
              
              <div style={styles.calendarGrid}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <div key={day} style={{ ...styles.calendarDay, color: theme.textSecondary }}>{day}</div>
                ))}
                {getDaysInMonth().map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.calendarDate,
                      backgroundColor: day === currentDay ? "#3b82f6" : 
                                       day && day < currentDay ? (darkMode ? "#1e3a5f" : "#dbeafe") : "transparent",
                      color: day === currentDay ? "#fff" : theme.text,
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              <div style={{ ...styles.calendarLegend, color: theme.textSecondary }}>
                <span>Less</span>
                <div style={{...styles.legendDot, backgroundColor: darkMode ? "#1e293b" : "#eff6ff"}} />
                <div style={{...styles.legendDot, backgroundColor: darkMode ? "#1e3a5f" : "#bfdbfe"}} />
                <div style={{...styles.legendDot, backgroundColor: "#60a5fa"}} />
                <div style={{...styles.legendDot, backgroundColor: "#2563eb"}} />
                <span>More</span>
              </div>
            </div>

            {/* AI Insights */}
            <div style={{ ...styles.aiCard, backgroundColor: theme.cardBg, borderColor: theme.border }}>
              <h3 style={{ ...styles.aiTitle, color: theme.text }}>🤖 AI Insights</h3>
              <div style={{ ...styles.aiInsight, backgroundColor: darkMode ? "#1c1917" : "#fef2f2" }}>
                <span style={styles.aiIcon}>💡</span>
                <div>
                  <p style={{ ...styles.aiHeading, color: darkMode ? "#fb923c" : "#b91c1c" }}>Remarkable effort!</p>
                  <p style={{ ...styles.aiText, color: darkMode ? "#fdba74" : "#b91c1c" }}>
                    {habits.length > 0 
                      ? `You're tracking ${habits.length} habit${habits.length > 1 ? 's' : ''}. Keep up the great work!`
                      : "Add your first habit to start building better routines!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modal, backgroundColor: theme.cardBg }}>
            <h3 style={{ ...styles.modalTitle, color: theme.text }}>Delete Habit?</h3>
            <p style={{ ...styles.modalText, color: theme.textSecondary }}>
              Are you sure you want to delete this habit? This action cannot be undone.
            </p>
            <div style={styles.modalActions}>
              <button onClick={() => setDeleteConfirm(null)} style={{ ...styles.cancelBtn, borderColor: theme.border, color: theme.textSecondary }}>
                Cancel
              </button>
              <button onClick={handleDelete} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "system-ui, -apple-system, sans-serif",
    position: "relative",
  },
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  // Sidebar
  sidebar: {
    backgroundColor: "#fff",
    borderRight: "1px solid #e5e5e5",
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
    borderBottom: "1px solid #e5e5e5",
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
    color: "#666",
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
    color: "#666",
    transition: "background-color 0.15s, color 0.15s",
  },
  navItemActive: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    width: "100%",
    border: "none",
    background: "#eff6ff",
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
    borderTop: "1px solid #e5e5e5",
  },
  logoutBtn: {
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
  // Main
  main: {
    flex: 1,
    padding: "24px 32px",
    overflow: "auto",
    transition: "margin-left 0.2s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    gap: "20px",
    flexWrap: "wrap",
  },
  greeting: {
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 4px 0",
    color: "#171717",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: 0,
  },
  addBtn: {
    padding: "12px 20px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  // Content Grid
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "24px",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  // Form
  formCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e5e5e5",
  },
  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "14px",
  },
  formRow: {
    display: "flex",
    gap: "12px",
  },
  select: {
    flex: 1,
    padding: "12px",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fff",
  },
  colorRow: {
    display: "flex",
    gap: "8px",
  },
  colorDot: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  formActions: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  saveBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "12px 20px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },
  // Habits
  habitsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  habitsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  },
  filterSelect: {
    padding: "8px 16px",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fff",
  },
  emptyState: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "40px",
    textAlign: "center",
    border: "1px solid #e5e5e5",
    color: "#666",
  },
  habitCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e5e5e5",
  },
  habitTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  habitLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  habitCheck: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  },
  habitName: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 2px 0",
  },
  habitFreq: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  habitRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  streak: {
    fontSize: "14px",
    color: "#f59e0b",
  },
  percentage: {
    fontSize: "14px",
    color: "#666",
  },
  menuContainer: {
    position: "relative",
  },
  menuBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    padding: "4px 8px",
    color: "#666",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "100%",
    backgroundColor: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 10,
    minWidth: "120px",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    width: "100%",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "left",
  },
  dotsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 0",
  },
  dot: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "transform 0.1s, background-color 0.15s",
    flexShrink: 0,
  },
  // Calendar
  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e5e5e5",
  },
  calendarTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  calendarMonth: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 16px 0",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
    textAlign: "center",
  },
  calendarDay: {
    fontSize: "12px",
    color: "#666",
    padding: "4px",
    fontWeight: "500",
  },
  calendarDate: {
    fontSize: "12px",
    padding: "8px 4px",
    borderRadius: "6px",
  },
  calendarLegend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    marginTop: "16px",
    fontSize: "12px",
    color: "#666",
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "2px",
  },
  // AI Card
  aiCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e5e5e5",
  },
  aiTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 12px 0",
  },
  aiInsight: {
    backgroundColor: "#fef2f2",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    gap: "12px",
  },
  aiIcon: {
    fontSize: "20px",
  },
  aiHeading: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#b91c1c",
    margin: "0 0 4px 0",
  },
  aiText: {
    fontSize: "13px",
    color: "#b91c1c",
    margin: 0,
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    maxWidth: "400px",
    width: "90%",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },
  modalText: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 20px 0",
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  deleteBtn: {
    padding: "10px 20px",
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
