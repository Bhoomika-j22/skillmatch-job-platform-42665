import React, { useMemo, useState } from "react";
import { Card, Badge, Button, Input, Select } from "../components/ui";
import { useToast } from "../components/ToastProvider";
import ProfileSideCard from "../components/ProfileSideCard";

const LEVELS = ["Junior", "Mid", "Senior"];
const LOC_PREF = ["Remote", "Hybrid", "On-site"];

// PUBLIC_INTERFACE
export default function ProfilePage({ profile, setProfile }) {
  /** Skill-based profile editor. */
  const { toast } = useToast();
  const [skillInput, setSkillInput] = useState("");

  const skills = profile.skills || [];

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (skills.map((x) => x.toLowerCase()).includes(s.toLowerCase())) {
      setSkillInput("");
      toast({ title: "Already added", message: `${s} is already in your skills.`, variant: "info" });
      return;
    }
    setProfile((p) => ({ ...p, skills: [...(p.skills || []), s] }));
    setSkillInput("");
    toast({ title: "Skill added", message: s, variant: "success" });
  };

  const removeSkill = (skill) => {
    const ok = window.confirm(`Remove skill "${skill}"?`);
    if (!ok) return;
    setProfile((p) => ({ ...p, skills: (p.skills || []).filter((x) => x !== skill) }));
    toast({ title: "Skill removed", message: skill, variant: "warn" });
  };

  const matchHint = useMemo(() => {
    if (skills.length === 0) return "Add 5–8 skills to unlock better matching.";
    if (skills.length < 5) return "Good start — add a few more for higher match accuracy.";
    return "Great coverage — your matches should look strong.";
  }, [skills.length]);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile & Skills</h1>
          <p className="page-subtitle">Build a skill-based profile that powers job matches, tests, and challenges.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Badge variant="primary">{skills.length} skills</Badge>
          <Button
            size="sm"
            variant="primary"
            type="button"
            onClick={() => toast({ title: "Profile saved", message: "Your profile is stored locally (demo).", variant: "success" })}
            aria-label="Save profile"
          >
            Save
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <ProfileSideCard profile={profile} />
      </div>

      <div className="grid grid-2">
        <Card title="Profile">
          <label className="mini" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            placeholder="Your name"
          />
          <div style={{ height: 10 }} />

          <label className="mini" htmlFor="role">
            Target role
          </label>
          <Input
            id="role"
            value={profile.targetRole}
            onChange={(e) => setProfile((p) => ({ ...p, targetRole: e.target.value }))}
            placeholder="e.g., Frontend Engineer"
          />
          <div style={{ height: 10 }} />

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="mini" htmlFor="level">
                Level
              </label>
              <Select
                id="level"
                value={profile.level}
                onChange={(e) => setProfile((p) => ({ ...p, level: e.target.value }))}
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mini" htmlFor="pref">
                Work preference
              </label>
              <Select
                id="pref"
                value={profile.preference}
                onChange={(e) => setProfile((p) => ({ ...p, preference: e.target.value }))}
              >
                {LOC_PREF.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="hr" />
          <p className="mini" style={{ margin: 0 }}>
            {matchHint}
          </p>
        </Card>

        <Card title="Skills">
          <div style={{ display: "flex", gap: 10 }}>
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a skill (React, SQL, AWS…) "
              onKeyDown={(e) => {
                if (e.key === "Enter") addSkill();
              }}
              aria-label="Add a skill"
            />
            <Button variant="primary" type="button" onClick={addSkill}>
              Add
            </Button>
          </div>

          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s) => (
              <button
                key={s}
                type="button"
                className="badge primary"
                onClick={() => removeSkill(s)}
                title="Click to remove"
                aria-label={`Remove skill ${s}`}
                style={{ cursor: "pointer" }}
              >
                {s} <span aria-hidden="true">×</span>
              </button>
            ))}
            {skills.length === 0 ? <span className="mini">No skills yet. Add a few to get started.</span> : null}
          </div>

          <div className="hr" />
          <p className="mini" style={{ margin: 0 }}>
            Tip: keep skills specific (e.g., “React Hooks”, “REST APIs”, “PostgreSQL”).
          </p>
        </Card>
      </div>
    </div>
  );
}
