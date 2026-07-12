import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatsBar from "./components/StatsBar";
import EventChart from "./components/EventChart";
import EventFeed from "./components/EventFeed";
import RegionTraffic from "./components/RegionTraffic";
import TopEventTypes from "./components/TopEventTypes";
import FooterBar from "./components/FooterBar";

const BUCKET_SIZE_MS = 5000;
const MAX_BUCKETS = 24;

function makeBucketLabel(ts) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
}

export default function App() {
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [connected, setConnected] = useState(false);
  const [anomalyCount, setAnomalyCount] = useState(0);
  const [eventsPerSec, setEventsPerSec] = useState(0);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const bucketRef = useRef({ start: Date.now(), count: 0, hasAnomaly: false });
  const eventsLastSecRef = useRef([]);
  const wsRef = useRef(null);
  const totalRef = useRef(0);

  useEffect(() => {
    axios.get("/api/events").then((res) => {
      const data = res.data.slice(-50).reverse();
      setEvents(data);
      totalRef.current = res.data.length;
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      eventsLastSecRef.current = eventsLastSecRef.current.filter(ts => now - ts < 1000);
      setEventsPerSec(eventsLastSecRef.current.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws/events");
    wsRef.current = ws;
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      const isAnomaly = data.alertType === "ANOMALY";
      const now = Date.now();
      eventsLastSecRef.current.push(now);
      totalRef.current += 1;
      setEvents(prev => [data, ...prev].slice(0, 100));
      if (isAnomaly) setAnomalyCount(c => c + 1);
      const bucket = bucketRef.current;
      if (now - bucket.start >= BUCKET_SIZE_MS) {
        setChartData(prev => [...prev, {
          label: makeBucketLabel(bucket.start),
          count: bucket.count,
          hasAnomaly: bucket.hasAnomaly,
        }].slice(-MAX_BUCKETS));
        bucketRef.current = { start: now, count: 1, hasAnomaly: isAnomaly };
      } else {
        bucket.count += 1;
        if (isAnomaly) bucket.hasAnomaly = true;
      }
    };
    return () => ws.close();
  }, []);

  const regionData = [
    { name: "IN", val: 18240, pct: 38, color: "#378ADD" },
    { name: "US", val: 14490, pct: 30, color: "#1D9E75" },
    { name: "EU", val: 9660,  pct: 20, color: "#EF9F27" },
    { name: "CN", val: 3860,  pct: 8,  color: "#7F77DD" },
    { name: "Other", val: 2041, pct: 4, color: "#52525b" },
  ];

  const typeData = [
    { name: "user_clicked",   count: 21440, pct: "44.4%", color: "#a1a1aa" },
    { name: "page_view",      count: 12881, pct: "26.7%", color: "#a1a1aa" },
    { name: "order_placed",   count: 8102,  pct: "16.8%", color: "#a1a1aa" },
    { name: "video_watched",  count: 4210,  pct: "8.7%",  color: "#a1a1aa" },
    { name: "payment_failed", count: 1658,  pct: "3.4%",  color: "#E24B4A" },
  ];

  return (
    <div style={{ background: "#09090b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Topbar connected={connected} activeNav={activeNav} setActiveNav={setActiveNav} />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <main style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", gap: "16px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "500", color: "#f4f4f5" }}>Overview</div>
              <div style={{ fontSize: "13px", color: "#52525b", marginTop: "3px" }}>Real-time event streaming · anomaly detection</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["Last 30 min", "Auto refresh"].map(t => (
                <div key={t} style={{ fontSize: "11px", background: "#1f1f23", color: "#71717a", border: "1px solid #27272a", padding: "3px 8px", borderRadius: "6px" }}>{t}</div>
              ))}
            </div>
          </div>

          <StatsBar
            total={events.length}
            anomalies={anomalyCount}
            eventsPerSec={eventsPerSec}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "16px" }}>
            <EventChart data={chartData} />
            <EventFeed events={events} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <RegionTraffic data={regionData} />
            <TopEventTypes data={typeData} />
          </div>
        </main>
      </div>
      <FooterBar connected={connected} />
    </div>
  );
}