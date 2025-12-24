import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
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
        } else {
          await fetchData();
          resetForm();
        }
      } else {
        // Create new habit
        const { error } = await supabase.from("habits").insert({
          user_id: user.id,
          title: habitName.trim(),
          frequency: frequency,
          preferred_time: preferredTime,
          color: selectedColor,
        });

        if (error) {
          console.error("Error adding habit:", error);
        } else {
          await fetchData();
          resetForm();
        }
      }
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

    const { error } = await supabase.from("habits").delete().eq("id", habitId);

    if (error) {
      console.error("Error deleting habit:", error);
    } else {
      await fetchData();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f9fc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "#171717",
            margin: 0,
          }}
        >
          Bloom
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "16px",
              color: "#666666",
            }}
          >
            {userName}
          </span>
          <Button variant="secondary" size="medium" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "32px",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Empty State */}
        {habits.length === 0 && !showAddForm && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              padding: "48px",
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#171717",
                margin: "0 0 12px 0",
              }}
            >
              Welcome to Bloom
            </h2>
            <p
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "16px",
                color: "#666666",
                margin: "0 0 32px 0",
              }}
            >
              Start building habits that stick
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={() => setShowAddForm(true)}
            >
              Add your first habit
            </Button>
          </div>
        )}

        {/* Add/Edit Habit Form */}
        {showAddForm && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "32px",
            }}
          >
            <h2
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#171717",
                margin: "0 0 24px 0",
              }}
            >
              {editingHabit ? "Edit Habit" : "Add New Habit"}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <Input
                label="Habit Name"
                placeholder="E.g., Reading, Exercise"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required
              />

              <div>
                <label
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#171717",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 16px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    color: "#171717",
                    backgroundColor: "#ffffff",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#171717",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Preferred Time
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 16px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    color: "#171717",
                    backgroundColor: "#ffffff",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#171717",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  Color
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color.value)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: color.value,
                        border:
                          selectedColor === color.value
                            ? "3px solid #171717"
                            : "2px solid #e5e5e5",
                        cursor: "pointer",
                        outline: "none",
                      }}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  disabled={!habitName.trim()}
                >
                  {editingHabit ? "Update Habit" : "Add Habit"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="medium"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Habits List */}
        {habits.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#171717",
                  margin: 0,
                }}
              >
                Your Habits
              </h2>
              {!showAddForm && (
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setShowAddForm(true)}
                >
                  Add Habit
                </Button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    padding: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                    {/* Color Indicator */}
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: habit.color || "#4f46e5",
                        flexShrink: 0,
                      }}
                    />

                    {/* Habit Info */}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "Satoshi, sans-serif",
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#171717",
                          margin: "0 0 8px 0",
                        }}
                      >
                        {habit.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          fontFamily: "Satoshi, sans-serif",
                          fontSize: "14px",
                          color: "#666666",
                        }}
                      >
                        <span>{habit.frequency || "Daily"}</span>
                        <span>•</span>
                        <span>{habit.preferred_time || "Morning"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => handleEdit(habit)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="small"
                      onClick={() => handleDelete(habit.id)}
                    >
                      Delete
                    </Button>
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
