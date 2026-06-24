export default function EventFeed({ events }) {
  return (
    <div style={{
      background: "#18181b",
      border: "1px solid #27272a",
      borderRadius: "12px",
      padding: "24px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h2 style={{ color: "#f4f4f5", fontSize: "15px", fontWeight: "500", margin: 0 }}>
            Live event feed
          </h2>
          <p style={{ color: "#71717a", fontSize: "13px", margin: "4px 0 0" }}>
            Most recent first
          </p>
        </div>
        <span style={{
          background: "#27272a",
          color: "#a1a1aa",
          fontSize: "12px",
          padding: "4px 10px",
          borderRadius: "6px",
        }}>
          {events.length} events
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "380px", overflowY: "auto" }}>
        {events.length === 0 && (
          <p style={{ color: "#52525b", fontSize: "13px", textAlign: "center", padding: "32px 0" }}>
            Waiting for events...
          </p>
        )}

        {events.map((e, i) => {
          const isAlert = e.alertType === "ANOMALY";
          return (
            <div
              key={i}
              style={{
                background: isAlert ? "#1c0a0a" : "#09090b",
                border: `1px solid ${isAlert ? "#7f1d1d" : "#27272a"}`,
                borderRadius: "8px",
                padding: "10px 14px",
                fontFamily: "monospace",
                fontSize: "13px",
              }}
            >
              {isAlert ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ color: "#E24B4A", fontWeight: "600", fontSize: "12px", letterSpacing: "0.05em" }}>
                    ▲ ANOMALY — {e.event?.type}
                  </div>
                  <div style={{ color: "#fca5a5", fontSize: "12px", lineHeight: "1.5" }}>
                    {e.explanation}
                  </div>
                  <div style={{ color: "#6b2020", fontSize: "11px", marginTop: "2px" }}>
                    z-score {e.event?.anomalyScore?.toFixed(2)}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <span style={{ color: "#378ADD", minWidth: "120px" }}>{e.type}</span>
                  <span style={{ color: "#52525b" }}>·</span>
                  <span style={{ color: "#a1a1aa" }}>{e.userId}</span>
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