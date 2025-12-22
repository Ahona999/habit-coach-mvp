export default function AIStep({ onFinish }) {
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
          maxWidth: "712px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "48px 32px",
          boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            textAlign: "center",
          }}
        >
          {/* Progress Indicator - Both bars active */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
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
          </div>

          {/* Icon Container */}
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#eff6ff",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "40px" }}>🛡️</div>
          </div>

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
            Let AI help you stay consistent
          </h1>
          <p
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#666666",
              margin: 0,
              maxWidth: "500px",
            }}
          >
            We analyze your habit patterns to generate insights – no judgement,
            just guidance
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            width: "100%",
            maxWidth: "568px",
            margin: "0 auto",
          }}
        >
          {/* Insight Card */}
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: "12px",
              padding: "16px 32px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                textAlign: "center",
              }}
            >
              "You're most consistent when you complete habits before 10am"
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onFinish}
            style={{
              width: "100%",
              height: "48px",
              background: "#4f46e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontFamily: "Satoshi, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              cursor: "pointer",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

