import React, { useState } from "react";
import { Card, Button, Select, Input } from "../components/ui";
import { useToast } from "../components/ToastProvider";

const WORK_PREF = ["Remote", "Hybrid", "On-site"];
const LEVELS = ["Junior", "Mid", "Senior"];

// PUBLIC_INTERFACE
export default function CareerPreferencesPage() {
  /** User settings page to manage career preference signals (demo/local UI placeholder). */
  const { toast } = useToast();

  const [role, setRole] = useState("Frontend Engineer");
  const [workPreference, setWorkPreference] = useState("Remote");
  const [level, setLevel] = useState("Mid");

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Career Preferences</h1>
          <p className="page-subtitle">Tune your job matching signals: role, level, and work preference.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={() =>
              toast({
                title: "Saved (demo)",
                message: "Preferences are currently stored only for this session UI.",
                variant: "success",
              })
            }
          >
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-2">
        <Card title="Preferences">
          <label className="mini" htmlFor="pref-role">
            Target role
          </label>
          <Input id="pref-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g., Data Analyst" />
          <div style={{ height: 10 }} />

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="mini" htmlFor="pref-level">
                Level
              </label>
              <Select id="pref-level" value={level} onChange={(e) => setLevel(e.target.value)}>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="mini" htmlFor="pref-work">
                Work preference
              </label>
              <Select id="pref-work" value={workPreference} onChange={(e) => setWorkPreference(e.target.value)}>
                {WORK_PREF.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="hr" />
          <p className="mini" style={{ margin: 0 }}>
            These preferences will be used to improve job matches once backend persistence is connected.
          </p>
        </Card>

        <Card title="What this affects">
          <div className="list" style={{ gap: 10 }}>
            <div className="list-item" style={{ alignItems: "center" }}>
              <div>
                <h4 style={{ margin: 0 }}>Job recommendations</h4>
                <p style={{ margin: "4px 0 0" }}>Prioritize roles and locations aligned to your preference.</p>
              </div>
            </div>
            <div className="list-item" style={{ alignItems: "center" }}>
              <div>
                <h4 style={{ margin: 0 }}>Skill suggestions</h4>
                <p style={{ margin: "4px 0 0" }}>Suggest skills commonly required for your selected role & level.</p>
              </div>
            </div>
            <div className="list-item" style={{ alignItems: "center" }}>
              <div>
                <h4 style={{ margin: 0 }}>Mock tests and challenges</h4>
                <p style={{ margin: "4px 0 0" }}>Focus content on your role path.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
