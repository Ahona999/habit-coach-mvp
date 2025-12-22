export default function Dashboard() {
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
      <div
        style={{
          textAlign: "center",
          padding: "48px",
        }}
      >
        <h1
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "56px",
            color: "#171717",
            margin: "0 0 16px 0",
          }}
        >
          Welcome to Dashboard
        </h1>
        <p
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "28px",
            color: "#666666",
            margin: 0,
          }}
        >
          Your dashboard is ready!
        </p>
      </div>
    </div>
  );
}
