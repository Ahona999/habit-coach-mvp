export default function GoalStep({ selectedGoal, onSelect, onNext }) {
  const goals = [
    { id: "health", label: "Health", icon: "❤️" },
    { id: "focus", label: "Focus", icon: "🎯" },
    { id: "learning", label: "Learning", icon: "📚" },
    { id: "meditating", label: "Meditating", icon: "🧘" },
    { id: "sleeping", label: "Sleeping", icon: "😴" },
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
          padding: "24px",
          boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Progress Indicator */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "39px",
              height: "9px",
              background: "#4f46e5",
              borderRadius: "12px",
            }}
          />
          <div
            style={{
              width: "39px",
              height: "9px",
              background: "#e5e5e5",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
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
            What do you want to improve?
          </h1>
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              color: "#666666",
              margin: 0,
            }}
          >
            Select a goal to get started
          </p>
        </div>

        {/* Goal Tiles Grid - 3 on top, 2 on bottom */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {goals.map((goal, index) => {
            const isSelected = selectedGoal === goal.id;
            // Calculate width: first 3 items take 33.33% each, last 2 take ~48% each to center
            const width = index < 3 ? "calc(33.33% - 8px)" : "calc(48% - 6px)";
            return (
              <button
                key={goal.id}
                onClick={() => handleTileClick(goal.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "20px 12px",
                  background: isSelected ? "#EEF0FF" : "#ffffff",
                  border: `${isSelected ? "2px" : "1px"} solid ${
                    isSelected ? "#4F46E5" : "#E5E5E5"
                  }`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  minHeight: "100px",
                  width: width,
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "#BFDBFE";
                    e.currentTarget.style.background = "#EFF6FF";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "#E5E5E5";
                    e.currentTarget.style.background = "#ffffff";
                  }
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    lineHeight: "1",
                    color: isSelected ? "#4F46E5" : "#666666",
                  }}
                >
                  {goal.icon}
                </div>
                <p
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    color: isSelected ? "#4F46E5" : "#666666",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  {goal.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
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
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
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
          Continue
        </button>
      </div>
    </div>
  );
}

