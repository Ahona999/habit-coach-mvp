import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Modal } from "../ui/modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function AddHabitModal({ isOpen, onClose, defaultHabit, onSuccess }) {
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [preferredTime, setPreferredTime] = useState("Morning");
  const [selectedColor, setSelectedColor] = useState("#4f46e5");

  // Color options matching Figma
  const colors = [
    { value: "#4f46e5", name: "purple" }, // Indigo
    { value: "#16a34a", name: "green" },
    { value: "#d97706", name: "orange" },
    { value: "#ef4444", name: "red" },
    { value: "#3b82f6", name: "blue" },
    { value: "#7c3aed", name: "violet" },
  ];

  // Pre-fill form when defaultHabit is provided
  useEffect(() => {
    if (defaultHabit) {
      setHabitName(defaultHabit.name || "");
    } else {
      setHabitName("");
    }
    // Reset other fields to defaults
    setFrequency("Daily");
    setPreferredTime("Morning");
    setSelectedColor("#4f46e5");
  }, [defaultHabit, isOpen]);

  const handleAddHabit = async () => {
    if (!habitName.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from("habits").insert({
        user_id: user.id,
        title: habitName.trim(),
        description: `${frequency} - ${preferredTime}`, // Store frequency and time in description for now
      });

      if (error) {
        console.error("Error adding habit:", error);
        // TODO: Show error message to user
      } else {
        // Reset form
        setHabitName("");
        setFrequency("Daily");
        setPreferredTime("Morning");
        setSelectedColor("#4f46e5");
        // Close modal and trigger refresh
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }
    }
  };

  const modalTitle = defaultHabit
    ? `Add new habit: ${defaultHabit.name}`
    : "Add a new habit";

  useEffect(() => {
    console.log("AddHabitModal - isOpen changed to:", isOpen);
  }, [isOpen]);
  
  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      onClose={onClose}
      onPrimaryAction={handleAddHabit}
      primaryActionLabel="Add Habit"
      secondaryActionLabel="Cancel"
      primaryActionDisabled={!habitName.trim()}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
        }}
      >
        {/* Habit Name Input */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Input
            label="Habit name"
            placeholder="E.g, Reading, Designing"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </div>

        {/* Frequency Dropdown */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <label
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#171717",
            }}
          >
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            style={{
              width: "100%",
              height: "64px",
              padding: "16px 32px",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              fontFamily: "Satoshi, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#666666",
              backgroundColor: "#ffffff",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 32px center",
              paddingRight: "64px",
            }}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>

        {/* Preferred Time Dropdown */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <label
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#171717",
            }}
          >
            Preferred time
          </label>
          <select
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            style={{
              width: "100%",
              height: "64px",
              padding: "16px 32px",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              fontFamily: "Satoshi, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#666666",
              backgroundColor: "#ffffff",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 32px center",
              paddingRight: "64px",
            }}
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        {/* Color Picker */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <label
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#171717",
            }}
          >
            Color
          </label>
          <div
            style={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          >
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: color.value,
                  border:
                    selectedColor === color.value
                      ? "3px solid #171717"
                      : "none",
                  cursor: "pointer",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxShadow:
                    selectedColor === color.value
                      ? "0 0 0 2px rgba(79, 70, 229, 0.2)"
                      : "none",
                }}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

