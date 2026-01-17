import React, { useMemo, useState } from "react";
import { Card, Badge, Button, Input, Select } from "../components/ui";

const STATUSES = ["Saved", "Applied", "Interview", "Offer", "Rejected"];

// PUBLIC_INTERFACE
export default function ApplicationsPage({ applications, setApplications }) {
  /** Track job applications and update pipeline statuses. */
  const [filter, setFilter] = useState("All");
  const [note, setNote] = useState("");

  const summary = useMemo(() => {
    const total = applications.length;
    const byStatus = STATUSES.reduce((acc, s) => {
      acc[s] = applications.filter((a) => a.status === s).length;
      return acc;
    }, {});
    return { total, byStatus };
  }, [applications]);

  const filtered = useMemo(() => {
    if (filter === "All") return applications;
    return applications.filter((a) => a.status === filter);
  }, [applications, filter]);

  const updateStatus = (id, status) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const addNoteToFirst = () => {
    if (!note.trim() || applications.length === 0) return;
    const first = applications[0];
    setApplications((prev) =>
      prev.map((a) =>
        a.id === first.id ? { ...a, notes: [...(a.notes || []), { text: note.trim(), at: new Date().toISOString() }] } : a
      )
    );
    setNote("");
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Applications</h1>
          <p className="page-subtitle">Your pipeline at a glance: update statuses and keep notes.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Badge variant="primary">{summary.total} total</Badge>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
            <option value="All">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-3">
        {STATUSES.slice(0, 3).map((s) => (
          <Card key={s} title={s}>
            <div className="kpi">
              <strong>{summary.byStatus[s] || 0}</strong>
              <span>items</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <Card title="Quick Note (demo)">
          <p className="mini" style={{ marginTop: 0 }}>
            Adds a note to your most recent tracked application (placeholder behavior).
          </p>
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g., Recruiter asked for portfolio…" />
          <div style={{ height: 10 }} />
          <Button variant="primary" type="button" onClick={addNoteToFirst} disabled={!note.trim() || applications.length === 0}>
            Add Note
          </Button>
        </Card>

        <Card title="Status Legend">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Badge>Saved</Badge>
            <Badge variant="secondary">Applied</Badge>
            <Badge variant="primary">Interview</Badge>
            <Badge variant="primary">Offer</Badge>
            <Badge>Rejected</Badge>
          </div>
          <div className="hr" />
          <p className="mini" style={{ margin: 0 }}>
            In the full product, statuses would sync to backend via REACT_APP_API_BASE.
          </p>
        </Card>
      </div>

      <div style={{ marginTop: 16 }} className="grid">
        {filtered.map((a) => (
          <div key={a.id} className="list-item" style={{ alignItems: "center" }}>
            <div>
              <h4 style={{ margin: 0 }}>
                {a.jobTitle} <span className="mini">at {a.company}</span>
              </h4>
              <p style={{ margin: "4px 0 0" }}>
                Status:{" "}
                <strong style={{ color: a.status === "Rejected" ? "var(--error)" : "var(--text)" }}>{a.status}</strong>
                {" • "}
                <span className="mini">Tracked {a.trackedAtLabel}</span>
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)} aria-label="Update status">
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
              <Button type="button" onClick={() => setApplications((prev) => prev.filter((x) => x.id !== a.id))}>
                Remove
              </Button>
            </div>
          </div>
        ))}

        {filtered.length === 0 ? (
          <Card title="No applications">
            <p style={{ margin: 0, color: "var(--muted)" }}>Track an application from the Jobs page to start.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
