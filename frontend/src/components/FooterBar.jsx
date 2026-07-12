export default function FooterBar({ connected }) {
  const items = [
    { label: "Kafka connected", color: "#1D9E75" },
    { label: "MongoDB healthy", color: "#1D9E75" },
    { label: "WebSocket active", color: connected ? "#1D9E75" : "#E24B4A" },
  ];
  return (
    <div style={{ background: "#0c0c0e", borderTop: "1px solid #1f1f23", padding: "8px 24px", display: "flex", alignItems: "center", gap: "20px" }}>
      {items.map(item => (
        <div key={item.label} style={{ fontSize: "11px", color: "#3f3f46", display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: item.color }} />
          {item.label}
        </div>
      ))}
      <div style={{ marginLeft: "auto", fontSize: "11px", color: "#3f3f46", display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#378ADD" }} />
        streampulse-events · partition 0
      </div>
    </div>
  );
}