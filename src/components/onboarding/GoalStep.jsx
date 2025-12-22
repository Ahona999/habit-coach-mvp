export default function GoalStep({ selectedGoal, onSelect, onNext }) {
  const goals = [
    { id: "healthy-habits", label: "Build healthy habits" },
    { id: "focus", label: "Improve focus" },
    { id: "consistency", label: "Stay consistent" },
  ];

  const handleTileClick = (goalId) => {
    onSelect(goalId);
  };

  const handleNext = () => {
    if (selectedGoal) {
      onNext();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6f9fc",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "48px 32px",
          boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "42px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            textAlign: "center",
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
            What's your main goal?
          </h1>
        </div>

        {/* Goal Tiles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => handleTileClick(goal.id)}
                style={{
                  width: "100%",
                  padding: "24px",
                  background: isSelected ? "#eff6ff" : "#ffffff",
                  border: `2px solid ${isSelected ? "#4f46e5" : "#e5e5e5"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = "#bfdbfe";
                    e.target.style.background = "#eff6ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = "#e5e5e5";
                    e.target.style.background = "#ffffff";
                  }
                }}
              >
                <p
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    lineHeight: "28px",
                    color: isSelected ? "#1d4ed8" : "#171717",
                    margin: 0,
                  }}
                >
                  {goal.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!selectedGoal}
          style={{
            width: "100%",
            height: "56px",
            background: selectedGoal ? "#4f46e5" : "#e5e5e5",
            color: selectedGoal ? "#ffffff" : "#a3a3a3",
            border: "none",
            borderRadius: "12px",
            fontFamily: "Satoshi, sans-serif",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "32px",
            cursor: selectedGoal ? "pointer" : "not-allowed",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (selectedGoal) {
              e.target.style.opacity = "0.9";
            }
          }}
          onMouseLeave={(e) => {
            if (selectedGoal) {
              e.target.style.opacity = "1";
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

