import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [habits, setHabits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Form state
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [preferredTime, setPreferredTime] = useState("Morning");
  const [selectedColor, setSelectedColor] = useState("#4f46e5");

  // Color options
  const colors = [
    { value: "#4f46e5", name: "purple" },
    { value: "#16a34a", name: "green" },
    { value: "#d97706", name: "orange" },
    { value: "#ef4444", name: "red" },
    { value: "#3b82f6", name: "blue" },
    { value: "#7c3aed", name: "violet" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Error getting user:", userError);
        setError(userError.message);
        setLoading(false);
        return;
      }

      if (!user) {
        // No user, redirect to login
        navigate("/", { replace: true });
        return;
      }

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
      const { data: habitsData, error: habitsError } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (habitsError) {
        console.error("Error fetching habits:", habitsError);
      }

      setHabits(habitsData || []);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message);
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
    
    if (!habitName.trim()) {
      alert("Please enter a habit name");
      return;
    }

    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Session expired. Please login again.");
        navigate("/", { replace: true });
        return;
      }

      if (editingHabit) {
        // Update existing habit
        const { error } = await supabase
          .from("habits")
          .update({
            title: habitName.trim(),
            frequency: frequency,
            preferred_time: preferredTime,
            color: selectedColor,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingHabit.id);

        if (error) {
          console.error("Error updating habit:", error);
          alert("Failed to update habit: " + error.message);
        } else {
          console.log("Habit updated successfully");
          await fetchData();
          resetForm();
        }
      } else {
        // Create new habit
        const { data, error } = await supabase
          .from("habits")
          .insert({
            user_id: user.id,
            title: habitName.trim(),
            frequency: frequency,
            preferred_time: preferredTime,
            color: selectedColor,
          })
          .select();

        if (error) {
          console.error("Error adding habit:", error);
          alert("Failed to add habit: " + error.message);
        } else {
          console.log("Habit added successfully:", data);
          await fetchData();
          resetForm();
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error: " + err.message);
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
  };

  const handleDelete = async (habitId) => {
    if (!confirm("Are you sure you want to delete this habit?")) return;

    try {
      const { error } = await supabase.from("habits").delete().eq("id", habitId);

      if (error) {
        console.error("Error deleting habit:", error);
        alert("Failed to delete habit: " + error.message);
      } else {
        await fetchData();
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Force redirect to login
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      // Force redirect anyway
      window.location.href = "/";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <p style={styles.loadingText}>Loading dashboard...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={styles.centerContainer}>
        <p style={styles.errorText}>Error: {error}</p>
        <button onClick={fetchData} style={styles.primaryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Bloom</h1>
        <div style={styles.headerRight}>
          <span style={styles.userName}>{userName}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Empty State */}
        {habits.length === 0 && !showAddForm && (
          <div style={styles.emptyCard}>
            <h2 style={styles.emptyTitle}>Welcome to Bloom</h2>
            <p style={styles.emptySubtitle}>Start building habits that stick</p>
            <button
              onClick={() => setShowAddForm(true)}
              style={styles.primaryButton}
            >
              Add your first habit
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div style={styles.formCard}>
            {/* Back Button */}
            <button
              onClick={resetForm}
              style={styles.backButton}
              type="button"
            >
              ← Back
            </button>
            
            <h2 style={styles.formTitle}>
              {editingHabit ? "Edit Habit" : "Add New Habit"}
            </h2>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Habit Name */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Habit Name</label>
                <input
                  type="text"
                  placeholder="E.g., Reading, Exercise"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  style={styles.input}
                />
              </div>

              {/* Frequency */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  style={styles.select}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>

              {/* Preferred Time */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Preferred Time</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  style={styles.select}
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>

              {/* Color */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Color</label>
                <div style={styles.colorPicker}>
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color.value)}
                      style={{
                        ...styles.colorDot,
                        backgroundColor: color.value,
                        border: selectedColor === color.value
                          ? "3px solid #171717"
                          : "2px solid #e5e5e5",
                      }}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div style={styles.formButtons}>
                <button
                  type="submit"
                  disabled={saving || !habitName.trim()}
                  style={{
                    ...styles.primaryButton,
                    opacity: (saving || !habitName.trim()) ? 0.6 : 1,
                    cursor: (saving || !habitName.trim()) ? "not-allowed" : "pointer",
                  }}
                >
                  {saving ? "Saving..." : editingHabit ? "Update Habit" : "Add Habit"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={styles.secondaryButton}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Habits List */}
        {habits.length > 0 && (
          <div style={styles.habitsSection}>
            <div style={styles.habitsHeader}>
              <h2 style={styles.habitsTitle}>Your Habits ({habits.length})</h2>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  style={styles.primaryButton}
                >
                  + Add Habit
                </button>
              )}
            </div>

            <div style={styles.habitsList}>
              {habits.map((habit) => (
                <div key={habit.id} style={styles.habitCard}>
                  <div style={styles.habitLeft}>
                    <div
                      style={{
                        ...styles.habitColor,
                        backgroundColor: habit.color || "#4f46e5",
                      }}
                    />
                    <div style={styles.habitInfo}>
                      <h3 style={styles.habitName}>{habit.title}</h3>
                      <p style={styles.habitMeta}>
                        {habit.frequency || "Daily"} • {habit.preferred_time || "Morning"}
                      </p>
                    </div>
                  </div>
                  <div style={styles.habitActions}>
                    <button
                      onClick={() => handleEdit(habit)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(habit.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Inline styles
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  centerContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: "18px",
    color: "#666",
  },
  errorText: {
    fontSize: "18px",
    color: "#dc2626",
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e5e5",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#171717",
    margin: 0,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  userName: {
    fontSize: "16px",
    color: "#666",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#171717",
    cursor: "pointer",
  },
  main: {
    padding: "32px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "48px",
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#171717",
    margin: "0 0 12px 0",
  },
  emptySubtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 32px 0",
  },
  formCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "32px",
    marginBottom: "32px",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: "16px",
    left: "16px",
    padding: "8px 12px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
    cursor: "pointer",
  },
  formTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#171717",
    margin: "16px 0 24px 0",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#171717",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
  },
  select: {
    padding: "12px 16px",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    outline: "none",
  },
  colorPicker: {
    display: "flex",
    gap: "8px",
  },
  colorDot: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    cursor: "pointer",
    outline: "none",
  },
  formButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  primaryButton: {
    padding: "12px 24px",
    backgroundColor: "#4f46e5",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "12px 24px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#171717",
    cursor: "pointer",
  },
  habitsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  habitsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  habitsTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#171717",
    margin: 0,
  },
  habitsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  habitCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  habitLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  habitColor: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  habitInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  habitName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#171717",
    margin: 0,
  },
  habitMeta: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  habitActions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "8px 16px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #e5e5e5",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#171717",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#dc2626",
    cursor: "pointer",
  },
};
