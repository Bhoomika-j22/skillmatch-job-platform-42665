import React, { useMemo, useState } from "react";
import { Card, Badge, Button, Select } from "../components/ui";
import { useToast } from "../components/ToastProvider";
import { MOCK_TESTS } from "../data/mockData";

// PUBLIC_INTERFACE
export default function MockTestsPage({ testHistory, setTestHistory }) {
  /** Mock tests list and a basic "start/finish" flow stored locally. */
  const { toast } = useToast();
  const [activeId, setActiveId] = useState("");
  const active = useMemo(() => MOCK_TESTS.find((t) => t.id === activeId) || null, [activeId]);

  const start = (id) => setActiveId(id);

  const finish = () => {
    if (!active) return;
    const score = Math.max(50, Math.min(100, Math.round(60 + Math.random() * 35)));
    setTestHistory((prev) => [
      { id: `${active.id}_${Date.now()}`, testId: active.id, title: active.title, score, at: new Date().toISOString() },
      ...(prev || []),
    ]);
    setActiveId("");
    toast({ title: "Score saved", message: `${active.title} • ${score}%`, variant: "success" });
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Mock Tests</h1>
          <p className="page-subtitle">Practice with timed tests and track your scores over time.</p>
        </div>
        <Badge variant="primary">{(testHistory || []).length} attempts</Badge>
      </div>

      <div className="grid grid-2">
        <Card title="Available tests">
          <div className="list">
            {MOCK_TESTS.map((t) => (
              <div key={t.id} className="list-item" style={{ alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: 0 }}>{t.title}</h4>
                  <p style={{ margin: "4px 0 0" }}>
                    <span className="mini">
                      {t.questions} questions • {t.durationMin} min • {t.focus}
                    </span>
                  </p>
                </div>
                <Button variant="primary" type="button" onClick={() => start(t.id)}>
                  Start
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Active test (demo)">
          {active ? (
            <>
              <p style={{ marginTop: 0, color: "var(--muted)" }}>
                Running: <strong>{active.title}</strong>
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Badge variant="primary">{active.durationMin} min</Badge>
                <Badge>{active.questions} Q</Badge>
                <Badge variant="secondary">{active.focus}</Badge>
              </div>
              <div className="hr" />
              <p className="mini" style={{ marginTop: 0 }}>
                Placeholder experience: click “Finish” to record a simulated score.
              </p>
              <Button variant="primary" type="button" onClick={finish}>
                Finish & Save Score
              </Button>
              <div style={{ height: 10 }} />
              <Button type="button" onClick={() => setActiveId("")}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <p style={{ marginTop: 0, color: "var(--muted)" }}>Select a test to begin.</p>
              <Select value={activeId} onChange={(e) => setActiveId(e.target.value)} aria-label="Select a test">
                <option value="">Choose…</option>
                {MOCK_TESTS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </Select>
            </>
          )}
        </Card>
      </div>

      <div style={{ marginTop: 16 }} className="grid">
        <Card title="Recent attempts">
          {(testHistory || []).length ? (
            <div className="list">
              {(testHistory || []).slice(0, 8).map((h) => (
                <div key={h.id} className="list-item" style={{ alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{h.title}</h4>
                    <p style={{ margin: "4px 0 0" }} className="mini">
                      {new Date(h.at).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant={h.score >= 80 ? "primary" : "secondary"}>{h.score}%</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: "var(--muted)" }}>No attempts yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
