import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Select, Input, Badge } from "../components/ui";
import { useToast } from "../components/ToastProvider";

const WORK_PREF = ["Remote", "Hybrid", "On-site"];
const LEVELS = ["Junior", "Mid", "Senior"];

function ChevronLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// PUBLIC_INTERFACE
export default function CareerPreferencesPage() {
  /** Full-page settings screen: Career Preferences, with Back to Settings landing. */
  const navigate = useNavigate();
  const { toast } = useToast();

  const [role, setRole] = useState(() => window.localStorage.getItem("talenvia.pref.role") || "Frontend Engineer");
  const [workPreference, setWorkPreference] = useState(
    () => window.localStorage.getItem("talenvia.pref.workPreference") || "Remote"
  );
  const [level, setLevel] = useState(() => window.localStorage.getItem("talenvia.pref.level") || "Mid");

  const canSave = useMemo(() => !!role.trim(), [role]);

  const save = () => {
    if (!role.trim()) {
      toast({ title: "Fix required", message: "Target role cannot be empty.", variant: "error" });
      return;
    }
    window.localStorage.setItem("talenvia.pref.role", role.trim());
    window.localStorage.setItem("talenvia.pref.workPreference", workPreference);
    window.localStorage.setItem("talenvia.pref.level", level);

    toast({ title: "Saved", message: "Career preferences updated.", variant: "success" });
  };

  return (
    <div className="container">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <button type="button" className="settings-backbtn" onClick={() => navigate("/settings")} aria-label="Back">
            <ChevronLeft size={18} />
            Back
          </button>

          <div>
            <h1 className="page-title">Career Preferences</h1>
            <p className="page-subtitle">Manage job recommendation preferences.</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Badge variant="info">Editable</Badge>
          <Button variant="primary" size="sm" type="button" onClick={save} disabled={!canSave}>
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-2" style={{ maxWidth: 980 }}>
        <Card title="Preferences">
          <div style={{ display: "grid", gap: 12 }}>
            <Input
              label="Target role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Data Analyst"
              error={!role.trim() ? "Required" : ""}
            />

            <div className="grid grid-2" style={{ gap: 12 }}>
              <Select label="Level" value={level} onChange={(e) => setLevel(e.target.value)}>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>

              <Select label="Work preference" value={workPreference} onChange={(e) => setWorkPreference(e.target.value)}>
                {WORK_PREF.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="hr" />
          <p className="mini" style={{ margin: 0, lineHeight: 1.45 }}>
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
