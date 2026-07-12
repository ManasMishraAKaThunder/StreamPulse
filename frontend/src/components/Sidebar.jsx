const sections = [
  { items: [
    { label: "Dashboard", icon: "⊞" },
    { label: "Event stream", icon: "⚡" },
    { label: "Anomalies", icon: "▲" },
    { label: "Analytics", icon: "▦" },
  ]},
  { title: "System", items: [
    { label: "MongoDB", icon: "◈" },
    { label: "Kafka", icon: "⬡" },
    { label: "Containers", icon: "⬢" },
  ]},
  { title: "Dev", items: [
    { label: "API docs", icon: "⊕" },
    { label: "WebSocket", icon: "↕" },
  ]},
];

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <div style={{ width: "200px", background: "#0c0c0e", borderRight: "1px solid #1f1f23", padding: "16px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
      {sections.map((section, si) => (
        <div key={si}>
          {section.title && (
            <div style={{ fontSize: "11px", color: "#3f3f46", padding: "12px 10px 4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {section.title}
            </div>
          )}
          {section.items.map(item => (
            <div key={item.label} onClick={() => setActiveNav(item.label)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 10px", borderRadius: "8px", fontSize: "13px", color: activeNav === item.label ? "#f4f4f5" : "#71717a", background: activeNav === item.label ? "#1f1f23" : "transparent", cursor: "pointer" }}>
              <span style={{ fontSize: "14px" }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}