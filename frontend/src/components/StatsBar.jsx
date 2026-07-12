export default function StatsBar({ total, anomalies, eventsPerSec }) {
  const stats = [
    { label: "Total Events",     value: total.toLocaleString(), delta: "+12.4% vs last window", deltaUp: true,  accent: "#378ADD" },
    { label: "Anomalies Flagged", value: anomalies,              delta: `${anomalies} this session`,deltaUp: false, accent: "#E24B4A" },
    { label: "Events / sec",     value: eventsPerSec.toFixed(1), delta: "peak measured",           deltaUp: true,  accent: "#1D9E75" },
    { label: "Avg Latency",      value: "18ms",                  delta: "p99: 42ms",               deltaUp: true,  accent: "#EF9F27" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
      {stats.map(s => (
        <div key={s.label} style={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: "10px", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "#52525b", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px" }}>
            {s.label}
          </div>
          <div style={{ fontSize: "26px", fontWeight: "500", color: s.accent, lineHeight: 1 }}>
            {s.value}
          </div>
          <div style={{ fontSize: "11px", marginTop: "6px", color: s.deltaUp ? "#1D9E75" : "#E24B4A" }}>
            {s.delta}
          </div>
        </div>
      ))}
    </div>
  );
}