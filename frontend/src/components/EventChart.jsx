import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function EventChart({ data }) {
  return (
    <div style={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: "10px", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#d4d4d8" }}>Event volume</div>
          <div style={{ fontSize: "11px", color: "#52525b", marginTop: "2px" }}>5-second buckets · red = anomaly window</div>
        </div>
        <div style={{ fontSize: "11px", background: "#1f1f23", color: "#71717a", border: "1px solid #27272a", padding: "2px 7px", borderRadius: "4px" }}>
          30 min
        </div>
      </div>
      {data.length === 0 ? (
        <div style={{ height: "160px", display: "flex", alignItems: "center", justifyContent: "center", color: "#3f3f46", fontSize: "12px" }}>
          Waiting for data...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
            <XAxis dataKey="label" tick={{ fill: "#52525b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#52525b", fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip
              contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px" }}
              labelStyle={{ color: "#a1a1aa" }}
              itemStyle={{ color: "#f4f4f5" }}
              cursor={{ fill: "#1f1f23" }}
            />
            <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={28}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.hasAnomaly ? "#E24B4A" : "#1e3a5f"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}