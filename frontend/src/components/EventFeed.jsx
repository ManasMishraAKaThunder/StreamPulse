export default function EventFeed({ events }) {
  return (
    <div style={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: "10px", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ fontSize: "13px", fontWeight: "500", color: "#d4d4d8" }}>Live event feed</div>
        <div style={{ fontSize: "11px", background: "#1f1f23", color: "#71717a", border: "1px solid #27272a", padding: "2px 7px", borderRadius: "4px" }}>
          {events.length} / 100
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", maxHeight: "260px", overflowY: "auto" }}>
        {events.length === 0 && (
          <div style={{ color: "#3f3f46", fontSize: "12px", textAlign: "center", padding: "32px 0" }}>
            Waiting for events...
          </div>
        )}
        {events.map((e, i) => {
          const isAlert = e.alertType === "ANOMALY";
          return (
            <div key={i} style={{ background: isAlert ? "#160808" : "#0c0c0e", border: `1px solid ${isAlert ? "#4a1515" : "#1f1f23"}`, borderRadius: "7px", padding: "8px 10px", fontFamily: "monospace", fontSize: "12px" }}>
              {isAlert ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <div style={{ color: "#E24B4A", fontWeight: "600", fontSize: "11px", letterSpacing: "0.05em" }}>
                    ▲ ANOMALY — {e.event?.type}
                  </div>
                  <div style={{ color: "#fca5a5", fontSize: "11px", lineHeight: "1.5" }}>{e.explanation}</div>
                  <div style={{ color: "#6b2020", fontSize: "10px" }}>z-score {e.event?.anomalyScore?.toFixed(2)}</div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span style={{ color: "#378ADD", minWidth: "110px" }}>{e.type}</span>
                  <span style={{ color: "#52525b" }}>·</span>
                  <span style={{ color: "#71717a" }}>{e.userId}</span>
                  <span style={{ color: "#52525b" }}>·</span>
                  <span style={{ color: "#1D9E75" }}>{e.region}</span>
                  <span style={{ color: "#3f3f46", fontSize: "11px", marginLeft: "auto" }}>
                    {e.timestamp ? new Date(e.timestamp).toLocaleTimeString() : "just now"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}