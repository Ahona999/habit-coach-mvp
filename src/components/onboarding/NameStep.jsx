export default function NameStep({ name, age, onNameChange, onAgeChange, onNext }) {
  const isFormValid = name && name.trim().length > 0;

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
        {/* Progress Indicator - 2 of 3 active */}
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
            Tell us about yourself
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
            We'd love to know your name
          </p>
        </div>

        {/* Form */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Name Input */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
                color: "#171717",
              }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name || ""}
              onChange={(e) => onNameChange(e.target.value)}
              style={{
                width: "100%",
                height: "48px",
                padding: "12px 16px",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                fontFamily: "Satoshi, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#171717",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4f46e5";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e5e5";
              }}
            />
          </div>

          {/* Age Input (Optional) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
                color: "#171717",
              }}
            >
              Age <span style={{ color: "#999999", fontWeight: 400 }}>(Optional)</span>
            </label>
            <input
              type="number"
              placeholder="Enter your age"
              value={age || ""}
              onChange={(e) => onAgeChange(e.target.value ? parseInt(e.target.value) : null)}
              min="1"
              max="120"
              style={{
                width: "100%",
                height: "48px",
                padding: "12px 16px",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                fontFamily: "Satoshi, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#171717",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4f46e5";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e5e5";
              }}
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onNext}
          disabled={!isFormValid}
          style={{
            width: "100%",
            height: "56px",
            background: isFormValid ? "#4f46e5" : "#e5e5e5",
            color: isFormValid ? "#ffffff" : "#a3a3a3",
            border: "none",
            borderRadius: "12px",
            fontFamily: "Satoshi, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
            cursor: isFormValid ? "pointer" : "not-allowed",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (isFormValid) {
              e.target.style.opacity = "0.9";
            }
          }}
          onMouseLeave={(e) => {
            if (isFormValid) {
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

