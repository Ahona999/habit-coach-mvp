import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navbar } from "../components/ui/navbar";
import AddHabitModal from "../components/modals/AddHabitModal";

// Popular habits data
const popularHabits = [
  {
    id: "exercise",
    name: "Exercise",
    description: "30 min daily workout",
    iconBg: "#fef2f2",
    icon: "💪",
  },
  {
    id: "diet",
    name: "Diet",
    description: "Balanced meals",
    iconBg: "#fffbeb",
    icon: "🥗",
  },
  {
    id: "hydration",
    name: "Hydration",
    description: "2 liters of water daily",
    iconBg: "#eef2ff",
    icon: "💧",
  },
  {
    id: "no-caffeine",
    name: "No caffeine",
    description: "Better sleep quality",
    iconBg: "#fff7ed",
    icon: "☕",
  },
  {
    id: "meditation",
    name: "Meditation",
    description: "10 min mindfulness",
    iconBg: "#f0fdf4",
    icon: "🧘",
  },
  {
    id: "journaling",
    name: "Journaling",
    description: "10 min of reflecting",
    iconBg: "#f5f3ff",
    icon: "📝",
  },
];

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [selectedHabitTemplate, setSelectedHabitTemplate] = useState(null);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("display_name, full_name")
          .eq("user_id", user.id)
          .maybeSingle();

        const name =
          profileData?.display_name ||
          profileData?.full_name ||
          user.email?.split("@")[0] ||
          "User";
        setUserName(name);

        // Fetch habits
        const { data: habitsData } = await supabase
          .from("habits")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setHabits(habitsData || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Debug modal state
  useEffect(() => {
    console.log("Modal state changed - isAddHabitOpen:", isAddHabitOpen);
  }, [isAddHabitOpen]);

  const handleOpenModal = (habit = null) => {
    console.log("Opening modal with habit:", habit);
    setSelectedHabitTemplate(habit);
    setIsAddHabitOpen(true);
    console.log("Modal state set to true, isAddHabitOpen should be:", true);
  };

  const handleCloseModal = () => {
    setIsAddHabitOpen(false);
    setSelectedHabitTemplate(null);
  };

  const handleHabitAdded = async () => {
    // Refresh habits after adding
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setHabits(data || []);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      } else {
        console.log("Signed out successfully");
        // Navigation will be handled by App.jsx auth state change
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
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
        <p style={{ fontFamily: "Satoshi, sans-serif", color: "#666" }}>
          Loading...
        </p>
      </div>
    );
  }

  // Show first-time user view if no habits
  if (habits.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          background: "#f6f9fc",
        }}
      >
        <Navbar
          title="Bloom"
          items={[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
                    fill="currentColor"
                  />
                </svg>
              ),
              label: "Dashboard",
              active: true,
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                    fill="currentColor"
                  />
                </svg>
              ),
              label: "Settings",
              active: false,
            },
          ]}
          userProfile={{
            name: userName,
            plan: "Free Plan",
          }}
          collapsed={isNavbarCollapsed}
          onToggle={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
          onLogout={handleLogout}
        />

        <div
          style={{
            flex: 1,
            marginLeft: isNavbarCollapsed ? "77px" : "241px",
            paddingTop: "86px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "43px",
            transition: "margin-left 0.2s ease",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              textAlign: "center",
              width: "100%",
              maxWidth: "1196px",
              padding: "16px 32px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
                maxWidth: "500px",
              }}
            >
            <h1
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: "44px",
                letterSpacing: "-0.36px",
                color: "#171717",
                margin: 0,
              }}
            >
              Welcome to Bloom, {userName}
            </h1>
            <p
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#737373",
                margin: 0,
              }}
            >
              Let's start building habits that stick!
            </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "48px",
              width: "100%",
              maxWidth: "1132px",
              padding: "0 32px",
            }}
          >
            {/* Welcome Card */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e5e5",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                alignItems: "center",
                gap: "51px",
              }}
            >
              <div
                style={{
                  border: "2.416px dashed rgba(79, 70, 229, 0.6)",
                  borderRadius: "50%",
                  width: "215px",
                  height: "215px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "18.521px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    background: "#3b82f6",
                    borderRadius: "50%",
                    width: "177.154px",
                    height: "177.154px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24.157px",
                  }}
                >
                  <div
                    style={{
                      width: "128.839px",
                      height: "128.839px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "80px",
                    }}
                  >
                    🎯
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "28px",
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "36px",
                    fontWeight: 700,
                    lineHeight: "44px",
                    letterSpacing: "-0.36px",
                    color: "#171717",
                    margin: 0,
                  }}
                >
                  Your journey to better habits starts here
                </h2>
                <p
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    lineHeight: "28px",
                    color: "#666666",
                    margin: 0,
                  }}
                >
                  Track your daily progress, build streaks, and watch yourself
                  grow. Small steps lead to big changes.
                </p>
                <button
                  onClick={() => handleOpenModal()}
                  style={{
                    background: "#4f46e5",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8.815px",
                    padding: "11.753px 23.506px",
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "17.63px",
                    fontWeight: 700,
                    lineHeight: "23.506px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "7.346px",
                    width: "fit-content",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  Create First Habit
                  <span style={{ fontSize: "24px" }}>+</span>
                </button>
              </div>
            </div>

            {/* Popular Habits Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                  }}
                >
                  🤖
                </div>
                <h3
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "28px",
                    fontWeight: 700,
                    lineHeight: "36px",
                    letterSpacing: "-0.28px",
                    color: "#1a1a1a",
                    margin: 0,
                  }}
                >
                  Popular habits to get started
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "56px",
                    justifyContent: "flex-start",
                  }}
                >
                  {popularHabits.slice(0, 3).map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onClick={() => handleOpenModal(habit)}
                    />
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "56px",
                    justifyContent: "flex-start",
                  }}
                >
                  {popularHabits.slice(3, 6).map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onClick={() => handleOpenModal(habit)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AddHabitModal
          isOpen={isAddHabitOpen}
          onClose={handleCloseModal}
          defaultHabit={selectedHabitTemplate}
          onSuccess={handleHabitAdded}
        />
      </div>
    );
  }

  // Post-habit UI - show when habits exist
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f6f9fc",
      }}
    >
      <Navbar
        title="Bloom"
        items={[
          {
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
                  fill="currentColor"
                />
              </svg>
            ),
            label: "Dashboard",
            active: true,
          },
          {
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                  fill="currentColor"
                />
              </svg>
            ),
            label: "Settings",
            active: false,
          },
        ]}
        userProfile={{
          name: userName,
          plan: "Free Plan",
        }}
        collapsed={isNavbarCollapsed}
        onToggle={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
        onLogout={handleLogout}
      />

      <div
        style={{
          flex: 1,
          marginLeft: isNavbarCollapsed ? "77px" : "241px",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          transition: "margin-left 0.2s ease",
        }}
      >
        {/* Header with greeting and Add Habit button */}
        <div
          style={{
            padding: "16px 32px",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1196px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h1
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: "44px",
                letterSpacing: "-0.36px",
                color: "#171717",
                margin: 0,
              }}
            >
              {getGreeting()}, {userName}
            </h1>
            <p
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#737373",
                margin: 0,
              }}
            >
              Track your progress and build better habits.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            style={{
              background: "#4f46e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "8.815px",
              padding: "11.753px 23.506px",
              fontFamily: "Satoshi, sans-serif",
              fontSize: "17.63px",
              fontWeight: 700,
              lineHeight: "23.506px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7.346px",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
            }}
          >
            Add Habit
            <span style={{ fontSize: "24px" }}>+</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            padding: "16px 32px",
            width: "100%",
            maxWidth: "1196px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <StatsCard
              title="Today's Progress"
              value="3/4"
              icon="🎯"
            />
            <StatsCard
              title="Weekly Completion"
              value="61%"
              change="+12%"
              changeLabel="vs last week"
              icon="📈"
            />
            <StatsCard
              title="Avg Streak"
              value="7 days"
              change="+8%"
              icon="🔥"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            padding: "16px 32px",
            display: "flex",
            gap: "24px",
            width: "100%",
            maxWidth: "1196px",
            margin: "0 auto",
          }}
        >
          {/* Left Column - Habits */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Your Habits Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "28px",
                    fontWeight: 700,
                    lineHeight: "36px",
                    letterSpacing: "-0.28px",
                    color: "#171717",
                    margin: 0,
                  }}
                >
                  Your Habits
                </h3>
                <select
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    padding: "16px 32px",
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "28px",
                    color: "#666666",
                    cursor: "pointer",
                    outline: "none",
                    height: "56px",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 32px center",
                    paddingRight: "64px",
                  }}
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>

              {/* Habit Cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                }}
              >
                {habits.map((habit) => (
                  <HabitListItem key={habit.id} habit={habit} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Calendar and AI Insights */}
          <div
            style={{
              width: "503px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <ActivityCalendar />
            <AIInsightsCard />
          </div>
        </div>
      </div>

      <AddHabitModal
        isOpen={isAddHabitOpen}
        onClose={handleCloseModal}
        defaultHabit={selectedHabitTemplate}
        onSuccess={handleHabitAdded}
      />
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, value, change, changeLabel, icon }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1.5px solid #e5e5e5",
        borderRadius: "12px",
        padding: "20px 28px",
        height: "140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0px 4px 8px 0px #eaeaea",
        flex: "1 1 364px",
        minWidth: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#666666",
              margin: 0,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: "44px",
              letterSpacing: "-0.36px",
              color: "#171717",
              margin: 0,
            }}
          >
            {value}
          </p>
          {change && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  color: "#16a34a",
                }}
              >
                ↑
              </span>
              <p
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  color: "#16a34a",
                  margin: 0,
                }}
              >
                {change}
              </p>
              {changeLabel && (
                <p
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    color: "#666666",
                    margin: 0,
                  }}
                >
                  {changeLabel}
                </p>
              )}
            </div>
          )}
        </div>
        <div
          style={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// Habit List Item Component
function HabitListItem({ habit }) {
  // Mock data for progress visualization
  const progressDays = Array.from({ length: 30 }, (_, i) => i < 3);

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        padding: "24px 32px",
        marginBottom: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "24px",
            }}
          >
            ✓
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <p
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: "28px",
                color: "#171717",
                margin: 0,
              }}
            >
              {habit.title}
            </p>
            <p
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#666666",
                margin: 0,
              }}
            >
              Daily
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <span style={{ fontSize: "24px" }}>🔥</span>
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
              color: "#171717",
              margin: 0,
            }}
          >
            2d
          </p>
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
              color: "#666666",
              margin: 0,
            }}
          >
            10%
          </p>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              fontSize: "24px",
              color: "#666666",
            }}
          >
            ⋯
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        {progressDays.map((completed, index) => (
          <div
            key={index}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: completed ? "#6366f1" : "#eef2ff",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Activity Calendar Component
function ActivityCalendar() {
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  // Generate calendar days (simplified - showing first week)
  const days = Array.from({ length: 7 }, (_, i) => i + 1);
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1.5px solid #e5e5e5",
        borderRadius: "12px",
        padding: "24px 46px",
        boxShadow: "0px 4px 8px 0px #eaeaea",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <h4
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              color: "#171717",
              margin: 0,
            }}
          >
            Activity Calendar
          </h4>
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#666666",
              margin: 0,
            }}
          >
            {currentMonth} {currentYear}
          </p>
        </div>

        {/* Week Days Header */}
        <div
          style={{
            display: "flex",
            gap: "28px",
            justifyContent: "space-between",
          }}
        >
          {weekDays.map((day) => (
            <p
              key={day}
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
                color: "#666666",
                margin: 0,
                width: "54px",
                textAlign: "center",
              }}
            >
              {day}
            </p>
          ))}
        </div>

        {/* Calendar Grid - First Week */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const isCompleted = day <= 3;
              const isToday = day === 5;
              return (
                <div
                  key={day}
                  style={{
                    width: "54px",
                    height: "52px",
                    borderRadius: "12px",
                    background: isToday
                      ? "#2563eb"
                      : isCompleted
                      ? "#93c5fd"
                      : "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    color: isToday || isCompleted ? "#ffffff" : "#171717",
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
          }}
        >
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "20px",
              color: "#666666",
              margin: 0,
            }}
          >
            Less
          </p>
          <div
            style={{
              display: "flex",
              gap: "2px",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: i === 1 ? "#eff6ff" : i === 2 ? "#93c5fd" : "#2563eb",
                }}
              />
            ))}
          </div>
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "20px",
              color: "#666666",
              margin: 0,
            }}
          >
            More
          </p>
        </div>
      </div>
    </div>
  );
}

// AI Insights Card Component
function AIInsightsCard() {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1.5px solid #e5e5e5",
        borderRadius: "12px",
        padding: "32px",
        boxShadow: "0px 4px 4px 0px #eaeaea",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "24px" }}>🤖</span>
          <h4
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "28px",
              color: "#171717",
              margin: 0,
            }}
          >
            AI Insights
          </h4>
        </div>

        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
            }}
          >
            <span style={{ fontSize: "24px" }}>⚡</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    color: "#b91c1c",
                    margin: 0,
                  }}
                >
                  Remarkable effort!
                </p>
                <span style={{ fontSize: "20px", color: "#b91c1c" }}>→</span>
              </div>
              <p
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  color: "#b91c1c",
                  margin: 0,
                }}
              >
                Your "Innovate with Feedback" has hit a 20 day milestone!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Habit Card Component (for popular habits)
function HabitCard({ habit, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#ffffff",
        border: "2px solid #e5e5e5",
        borderRadius: "12px",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        cursor: "pointer",
        boxShadow: "0px 2px 12px 0px #eaeaea",
        transition: "all 0.2s ease",
        textAlign: "left",
        width: "fit-content",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#4f46e5";
        e.currentTarget.style.boxShadow =
          "0px 4px 16px 0px rgba(79, 70, 229, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e5e5";
        e.currentTarget.style.boxShadow = "0px 2px 12px 0px #eaeaea";
      }}
    >
      <div
        style={{
          background: habit.iconBg,
          borderRadius: "16px",
          width: "63px",
          height: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          flexShrink: 0,
        }}
      >
        {habit.icon}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <h4
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "32px",
            color: "#171717",
            margin: 0,
          }}
        >
          {habit.name}
        </h4>
        <p
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "24px",
            color: "#666666",
            margin: 0,
          }}
        >
          {habit.description}
        </p>
      </div>
    </button>
  );
}
