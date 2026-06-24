import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function EventChart({ data }) {
  return (
    <div style={{
      background: "#18181b",
      border: "1px solid #27272a",
      borderRadius: "12px",
      padding: "24px",
    }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#f4f4f5", fontSize: "15px", fontWeight: "500", margin: 0 }}>
          Event volume
        </h2>
        <p style={{ color: "#71717a", fontSize: "13px", margin: "4px 0 0" }}>
          5-second windows — red bars indicate anomaly activity
        </p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: "#52525b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#52525b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#09090b",
              border: "1px solid #27272a",
              borderRadius: "8px",
              fontSize: "13px",
            }}
            labelStyle={{ color: "#a1a1aa" }}
            itemStyle={{ color: "#f4f4f5" }}
            cursor={{ fill: "#27272a" }}
          />
          <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={32}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.hasAnomaly ? "#E24B4A" : "#378ADD"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}