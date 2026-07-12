export default function Topbar({ connected, activeNav, setActiveNav }) {
  const tabs = ["Overview", "Events", "Anomalies", "Settings"];
  return (
    <div style={{ background: "#0f0f11", borderBottom: "1px solid #1f1f23", padding: "0 24px", height: "48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ fontSize: "15px", fontWeight: "600", color: "#f4f4f5", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1D9E75" }} />
          StreamPulse
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {tabs.map(t => (
            <div key={t} onClick={() => setActiveNav(t)} style={{ fontSize: "12px", color: activeNav === t ? "#f4f4f5" : "#71717a", padding: "4px 10px", borderRadius: "6px", background: activeNav === t ? "#1f1f23" : "transparent", cursor: "pointer" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ background: "#0c2a1a", border: "1px solid #1D9E75", color: "#1D9E75", fontSize: "11px", padding: "3px 8px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: connected ? "#1D9E75" : "#E24B4A" }} />
          {connected ? "Live" : "Offline"}
        </div>
      </div>
    </div>
  );
}