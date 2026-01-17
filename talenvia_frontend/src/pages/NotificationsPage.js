import React, { useMemo, useState } from "react";
import { Card, Badge, Button, Select } from "../components/ui";
import { useToast } from "../components/ToastProvider";
import { MOCK_NOTIFICATIONS } from "../data/mockData";

const TYPES = ["All", "job", "application", "challenge"];

// PUBLIC_INTERFACE
export default function NotificationsPage({ notifications, setNotifications }) {
  /** Notifications center (placeholder, ready for websocket integration). */
  const { toast } = useToast();
  const [type, setType] = useState("All");
  const wsUrl = process.env.REACT_APP_WS_URL || "";

  const filtered = useMemo(() => {
    if (type === "All") return notifications;
    return notifications.filter((n) => n.type === type);
  }, [notifications, type]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({ title: "All caught up", message: "Marked all notifications as read.", variant: "success" });
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Stay up to date on job matches, applications, and challenge updates.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter notifications by type">
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All types" : t}
              </option>
            ))}
          </Select>
          <Button type="button" onClick={markAllRead}>
            Mark all read
          </Button>
        </div>
      </div>

      <div className="grid">
        <Card title="Real-time (planned)">
          <p className="mini" style={{ marginTop: 0 }}>
            WebSocket URL (from <code>REACT_APP_WS_URL</code>):{" "}
            <strong>{wsUrl ? wsUrl : "not configured"}</strong>
          </p>
          <p className="mini" style={{ margin: 0 }}>
            This UI is ready to receive server events once the backend WS is available.
          </p>
        </Card>

        {filtered.map((n) => (
          <div key={n.id} className="list-item" style={{ alignItems: "center" }}>
            <div>
              <h4 style={{ margin: 0 }}>
                {n.title}{" "}
                {!n.read ? <Badge variant="secondary">New</Badge> : <Badge>Read</Badge>}
              </h4>
              <p style={{ margin: "4px 0 0" }}>{n.body}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <span className="mini">{n.time}</span>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
                  toast({ title: "Marked read", message: n.title, variant: "info" });
                }}
                disabled={!!n.read}
              >
                Mark read
              </Button>
            </div>
          </div>
        ))}

        {filtered.length === 0 ? (
          <Card title="No notifications">
            <p style={{ margin: 0, color: "var(--muted)" }}>You’re all caught up.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

export function getInitialNotifications() {
  // PUBLIC_INTERFACE
  /** Initial notifications set (mock). */
  return MOCK_NOTIFICATIONS.map((n) => ({ ...n, read: false }));
}
