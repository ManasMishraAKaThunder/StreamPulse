export default function RegionTraffic({ data }) {
  return (
    <div style={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: "10px", padding: "16px" }}>
      <div style={{ marginBottom: "14px" }}>
        <div style={{ fontSize: "13px", fontWeight: "500", color: "#d4d4d8" }}>Traffic by region</div>
        <div style={{ fontSize: "11px", color: "#52525b", marginTop: "2px" }}>Event count distribution</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.map(r => (
          <div key={r.name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", borderBottom: "1px solid #1a1a1c" }}>
            <div style={{ fontSize: "12px", color: "#a1a1aa", minWidth: "36px", fontFamily: "monospace" }}>{r.name}</div>
            <div style={{ flex: 1, background: "#1a1a1c", borderRadius: "3px", height: "5px", overflow: "hidden" }}>
              <div style={{ width: `${r.pct}%`, height: "100%", background: r.color, borderRadius: "3px" }} />
            </div>
            <div style={{ fontSize: "12px", color: "#52525b", minWidth: "52px", textAlign: "right" }}>
              {r.val.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}