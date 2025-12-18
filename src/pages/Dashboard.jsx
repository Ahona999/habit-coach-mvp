import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  // READ state
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // CREATE state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  // EDIT state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // fetch habits on load
  useEffect(() => {
    fetchHabits();
  }, []);

  // READ
  async function fetchHabits() {
    setLoading(true);

    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setHabits(data);
    }

    setLoading(false);
  }

  // CREATE
  async function createHabit(e) {
    e.preventDefault();
    setCreating(true);

    const { error } = await supabase.from("habits").insert([
      {
        title,
        description,
      },
    ]);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setTitle("");
      setDescription("");
      fetchHabits();
    }

    setCreating(false);
  }

  // UPDATE
  async function updateHabit(id) {
    const { error } = await supabase
      .from("habits")
      .update({
        title: editTitle,
        description: editDescription,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setEditingId(null);
      fetchHabits();
    }
  }

  // DELETE (optimistic)
  async function deleteHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));

    const { error } = await supabase
      .from("habits")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      fetchHabits(); // rollback if delete fails
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h1>Dashboard</h1>

      {/* ADD HABIT */}
      <form onSubmit={createHabit} style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "8px" }}
        />

        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "8px" }}
        />

        <button type="submit" disabled={creating}>
          {creating ? "Adding..." : "Add Habit"}
        </button>
      </form>

      {/* STATES */}
      {loading && <p>Loading habits...</p>}

      {!loading && habits.length === 0 && (
        <p>No habits yet. Add one 👆</p>
      )}

      {/* HABIT LIST */}
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} style={{ marginBottom: "16px" }}>
            {editingId === habit.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginBottom: "6px",
                  }}
                />

                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginBottom: "6px",
                  }}
                />

                <button onClick={() => updateHabit(habit.id)}>Save</button>
                <button
                  onClick={() => setEditingId(null)}
                  style={{ marginLeft: "8px" }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <strong>{habit.title}</strong>
                {habit.description && <p>{habit.description}</p>}

                <div style={{ marginTop: "6px" }}>
                  <button
                    onClick={() => {
                      setEditingId(habit.id);
                      setEditTitle(habit.title);
                      setEditDescription(habit.description || "");
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHabit(habit.id)}
                    style={{ marginLeft: "8px", color: "red" }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


