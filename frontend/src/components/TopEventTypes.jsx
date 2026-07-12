export default function TopEventTypes({ data }) {
  return (
    <div style={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: "10px", padding: "16px" }}>
      <div style={{ fontSize: "13px", fontWeight: "500", color: "#d4d4d8", marginBottom: "14px" }}>
        Top event types
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {data.map(t => (
          <div key={t.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "#0c0c0e", border: "1px solid #1f1f23", borderRadius: "7px" }}>
            <div style={{ fontSize: "12px", color: "#a1a1aa", fontFamily: "monospace" }}>{t.name}</div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ fontSize: "12px", color: t.color }}>{t.count.toLocaleString()}</div>
              <div style={{ fontSize: "11px", color: t.color === "#E24B4A" ? "#E24B4A" : "#1D9E75", minWidth: "36px", textAlign: "right" }}>{t.pct}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}