import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EventFeed from "./components/EventFeed";
import EventChart from "./components/EventChart";
import StatsBar from "./components/StatsBar";

const BUCKET_SIZE_MS = 5000;
const MAX_BUCKETS = 24;

function makeBucketLabel(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function App() {
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [connected, setConnected] = useState(false);
  const [anomalyCount, setAnomalyCount] = useState(0);
  const bucketRef = useRef({ start: Date.now(), count: 0, hasAnomaly: false });
  const eventsLastSecRef = useRef([]);
  const [eventsPerSec, setEventsPerSec] = useState(0);
  const wsRef = useRef(null);

  useEffect(() => {
    axios.get("/api/events").then((res) => {
      setEvents(res.data.slice(-50).reverse());
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      eventsLastSecRef.current = eventsLastSecRef.current.filter(
        (ts) => now - ts < 1000
      );
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
      setEvents((prev) => [data, ...prev].slice(0, 100));
      if (isAnomaly) setAnomalyCount((c) => c + 1);
      const bucket = bucketRef.current;
      if (now - bucket.start >= BUCKET_SIZE_MS) {
        const newEntry = {
          label: makeBucketLabel(bucket.start),
          count: bucket.count,
          hasAnomaly: bucket.hasAnomaly,
        };
        setChartData((prev) => [...prev, newEntry].slice(-MAX_BUCKETS));
        bucketRef.current = { start: now, count: 1, hasAnomaly: isAnomaly };
      } else {
        bucket.count += 1;
        if (isAnomaly) bucket.hasAnomaly = true;
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ borderBottom: "1px solid #27272a", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#f4f4f5", margin: 0 }}>
            StreamPulse
          </h1>
          <p style={{ color: "#71717a", fontSize: "14px", margin: "6px 0 0" }}>
            Real-time event streaming · anomaly detection · live analytics
          </p>
        </div>
        <StatsBar
          total={events.length}
          anomalies={anomalyCount}
          eventsPerSec={eventsPerSec}
          connected={connected}
        />
        <EventChart data={chartData} />
        <EventFeed events={events} />
      </div>
    </div>
  );
}