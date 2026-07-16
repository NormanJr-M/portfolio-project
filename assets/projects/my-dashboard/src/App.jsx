import { useState } from "react";

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "#101929",
        border: "1px solid #22304A",
        borderRadius: 10,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 12, color: "#8291AD" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

const tickets = [
  { id: "INF-4231", title: "Core switch DC1 packet loss", priority: "Critical", status: "Open" },
  { id: "INF-4227", title: "File server disk usage at 94%", priority: "High", status: "In progress" },
  { id: "INF-4222", title: "New hire laptop imaging request", priority: "Low", status: "Open" },
  { id: "INF-4208", title: "Backup job failed - nightly snapshot", priority: "High", status: "Resolved" },
];

export default function Dashboard() {
  const [filter, setFilter] = useState("All");

  const filteredTickets = tickets.filter(
    (t) => filter === "All" || t.status === filter
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0A1120",
        color: "#E6ECF5",
      }}
    >
      <div style={{ width: 200, borderRight: "1px solid #22304A", padding: 20 }}>
        <p>Infra-Desk</p>
      </div>

      <div style={{ flex: 1, padding: 24 }}>
        <h1>Ticket Queue</h1>
        <StatCard label="Open tickets" value={12} />

        <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
          {["All", "Open", "In progress", "Resolved"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div>
          {filteredTickets.map((t) => (
            <div key={t.id} style={{ padding: 10, borderBottom: "1px solid #22304A" }}>
              {t.id} - {t.title} ({t.status})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}