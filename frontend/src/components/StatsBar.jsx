export default function StatsBar({ total, anomalies, eventsPerSec, connected }) {
  const stats = [
    { label: "Total Events", value: total, accent: "#378ADD", bg: "#E6F1FB" },
    { label: "Anomalies Flagged", value: anomalies, accent: "#E24B4A", bg: "#FCEBEB" },
    { label: "Events / sec", value: eventsPerSec.toFixed(1), accent: "#1D9E75", bg: "#E1F5EE" },
    {
      label: "Stream",
      value: connected ? "Live" : "Offline",
      accent: connected ? "#1D9E75" : "#E24B4A",
      bg: connected ? "#E1F5EE" : "#FCEBEB",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#71717a", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {s.label}
          </span>
          <span style={{ fontSize: "28px", fontWeight: "600", color: s.accent }}>
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}