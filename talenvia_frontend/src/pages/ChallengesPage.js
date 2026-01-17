import React, { useMemo } from "react";
import { Card, Badge, Button } from "../components/ui";
import { MOCK_CHALLENGES } from "../data/mockData";

// PUBLIC_INTERFACE
export default function ChallengesPage({ completedChallenges, setCompletedChallenges }) {
  /** Gamified challenges with XP rewards and completion toggles. */
  const completedSet = useMemo(() => new Set(completedChallenges || []), [completedChallenges]);

  const toggle = (id) => {
    setCompletedChallenges((prev) => {
      const set = new Set(prev || []);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return Array.from(set);
    });
  };

  const totalXP = useMemo(() => {
    const xp = (id) => {
      const c = MOCK_CHALLENGES.find((x) => x.id === id);
      if (!c) return 0;
      const match = String(c.reward).match(/(\d+)/);
      return match ? Number(match[1]) : 0;
    };
    return (completedChallenges || []).reduce((sum, id) => sum + xp(id), 0);
  }, [completedChallenges]);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Challenges</h1>
          <p className="page-subtitle">Complete challenges to earn XP and show evidence of skills.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Badge variant="primary">{(completedChallenges || []).length} completed</Badge>
          <Badge variant="secondary">{totalXP} XP</Badge>
        </div>
      </div>

      <div className="grid">
        {MOCK_CHALLENGES.map((c) => {
          const done = completedSet.has(c.id);
          return (
            <Card key={c.id}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{c.title}</h3>
                  <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 13 }}>{c.description}</p>
                  <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Badge variant="primary">{c.reward}</Badge>
                    <Badge>{c.difficulty}</Badge>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  {done ? <Badge variant="secondary">Completed</Badge> : <Badge>Available</Badge>}
                  <Button variant={done ? "ghost" : "primary"} type="button" onClick={() => toggle(c.id)}>
                    {done ? "Mark Incomplete" : "Mark Complete"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
