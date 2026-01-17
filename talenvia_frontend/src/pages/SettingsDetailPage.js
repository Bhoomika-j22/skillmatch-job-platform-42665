import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, Input, Select } from "../components/ui";
import { useToast } from "../components/ToastProvider";

const WORK_PREF = ["Remote", "Hybrid", "On-site"];
const LEVELS = ["Junior", "Mid", "Senior"];

function IconBriefcase({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M10 7V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconPhone({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.58-1.15a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconLock({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function normalizePhone(value) {
  return String(value || "").replace(/[^\d+]/g, "").trim();
}

// PUBLIC_INTERFACE
export default function SettingsDetailPage() {
  /**
   * Settings detail screen.
   * Requirements:
   * - Contains Career Preferences (editable), Change Mobile, Change Email, Change Password.
   * - Shows validation + success feedback.
   * - Keeps overall look clean/minimal with smooth navigation.
   */
  const navigate = useNavigate();
  const { toast } = useToast();

  // Career preferences are persisted locally (demo-friendly) so the user sees updates.
  const [role, setRole] = useState(() => window.localStorage.getItem("talenvia.pref.role") || "Frontend Engineer");
  const [level, setLevel] = useState(() => window.localStorage.getItem("talenvia.pref.level") || "Mid");
  const [workPreference, setWorkPreference] = useState(
    () => window.localStorage.getItem("talenvia.pref.workPreference") || "Remote"
  );

  const [mobile, setMobile] = useState(() => window.localStorage.getItem("talenvia.account.mobile") || "");
  const [email, setEmail] = useState(() => window.localStorage.getItem("talenvia.account.email") || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = confirm && nextPassword && confirm !== nextPassword;
  const emailValid = email.trim() ? validateEmail(email) : false;
  const normalizedMobile = useMemo(() => normalizePhone(mobile), [mobile]);
  const mobileValid = normalizedMobile.length >= 8;

  const saveCareer = () => {
    const cleanRole = role.trim();
    if (!cleanRole) {
      toast({ title: "Fix required", message: "Target role cannot be empty.", variant: "error" });
      return;
    }

    window.localStorage.setItem("talenvia.pref.role", cleanRole);
    window.localStorage.setItem("talenvia.pref.level", level);
    window.localStorage.setItem("talenvia.pref.workPreference", workPreference);

    toast({ title: "Saved", message: "Career preferences updated.", variant: "success" });
  };

  const saveMobile = () => {
    if (!mobileValid) {
      toast({ title: "Fix required", message: "Enter a valid mobile number.", variant: "error" });
      return;
    }
    window.localStorage.setItem("talenvia.account.mobile", normalizedMobile);
    toast({ title: "Saved", message: "Mobile number updated.", variant: "success" });
  };

  const saveEmail = () => {
    if (!emailValid) {
      toast({ title: "Fix required", message: "Enter a valid email address.", variant: "error" });
      return;
    }
    window.localStorage.setItem("talenvia.account.email", email.trim());
    toast({ title: "Saved", message: "Email updated.", variant: "success" });
  };

  const savePassword = () => {
    if (!currentPassword || !nextPassword || !confirm) {
      toast({ title: "Fix required", message: "Please complete all password fields.", variant: "error" });
      return;
    }
    if (nextPassword.length < 8) {
      toast({ title: "Fix required", message: "New password must be at least 8 characters.", variant: "error" });
      return;
    }
    if (mismatch) {
      toast({ title: "Fix required", message: "Passwords do not match.", variant: "error" });
      return;
    }

    // Demo: no backend call, but we still provide success feedback and clear fields.
    setCurrentPassword("");
    setNextPassword("");
    setConfirm("");
    toast({ title: "Updated", message: "Password updated successfully.", variant: "success" });
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
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Edit preferences and update account details.</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Badge variant="info">Editable</Badge>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 860 }}>
        <Card title="Career Preferences">
          <div className="settings-form-grid">
            <Input
              label="Target role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Data Analyst"
              error={!role.trim() ? "Required" : ""}
            />

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

          <div className="hr" />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <Button variant="primary" type="button" onClick={saveCareer} disabled={!role.trim()}>
              Save
            </Button>
          </div>
        </Card>

        <Card title="Account">
          <div className="list" style={{ gap: 10 }}>
            {/* Keep rows visually consistent with Notifications list-item style via list-item + icon+chevron layout */}
            <div className="list-item" style={{ alignItems: "center" }}>
              <div className="settings-unified-left" style={{ flex: 1 }}>
                <span className="settings-unified-icon" aria-hidden="true">
                  <IconPhone size={18} />
                </span>
                <div className="settings-unified-titlewrap" style={{ flex: 1 }}>
                  <h4 className="settings-unified-title" style={{ margin: 0 }}>
                    Change Mobile Number
                  </h4>
                  <p style={{ margin: "4px 0 0" }}>Update the phone number used for verification.</p>

                  <div style={{ marginTop: 10 }}>
                    <Input
                      label="New mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g., +1 555 123 4567"
                      inputMode="tel"
                      error={mobile.trim() && !mobileValid ? "Enter a valid mobile number" : ""}
                    />
                  </div>

                  <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="primary" type="button" onClick={saveMobile} disabled={!mobile.trim() || !mobileValid}>
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>

              <span className="settings-unified-right" aria-hidden="true">
                <ChevronRight size={18} />
              </span>
            </div>

            <div className="list-item" style={{ alignItems: "center" }}>
              <div className="settings-unified-left" style={{ flex: 1 }}>
                <span className="settings-unified-icon" aria-hidden="true">
                  <IconMail size={18} />
                </span>
                <div className="settings-unified-titlewrap" style={{ flex: 1 }}>
                  <h4 className="settings-unified-title" style={{ margin: 0 }}>
                    Change Email
                  </h4>
                  <p style={{ margin: "4px 0 0" }}>Update the email used for login and notifications.</p>

                  <div style={{ marginTop: 10 }}>
                    <Input
                      label="New email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      inputMode="email"
                      error={email.trim() && !emailValid ? "Enter a valid email address" : ""}
                    />
                  </div>

                  <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="primary" type="button" onClick={saveEmail} disabled={!email.trim() || !emailValid}>
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>

              <span className="settings-unified-right" aria-hidden="true">
                <ChevronRight size={18} />
              </span>
            </div>

            <div className="list-item" style={{ alignItems: "center" }}>
              <div className="settings-unified-left" style={{ flex: 1 }}>
                <span className="settings-unified-icon" aria-hidden="true">
                  <IconLock size={18} />
                </span>
                <div className="settings-unified-titlewrap" style={{ flex: 1 }}>
                  <h4 className="settings-unified-title" style={{ margin: 0 }}>
                    Change Password
                  </h4>
                  <p style={{ margin: "4px 0 0" }}>Choose a strong password you don’t use elsewhere.</p>

                  <div style={{ marginTop: 10 }} className="grid" aria-label="Change password form">
                    <Input
                      label="Current password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                    <Input
                      label="New password"
                      type="password"
                      value={nextPassword}
                      onChange={(e) => setNextPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      error={nextPassword && nextPassword.length < 8 ? "Use at least 8 characters" : ""}
                    />
                    <Input
                      label="Confirm new password"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      error={mismatch ? "Passwords do not match" : ""}
                    />
                  </div>

                  <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={savePassword}
                      disabled={!currentPassword || !nextPassword || !confirm || mismatch || nextPassword.length < 8}
                    >
                      Update password
                    </Button>
                  </div>
                </div>
              </div>

              <span className="settings-unified-right" aria-hidden="true">
                <ChevronRight size={18} />
              </span>
            </div>
          </div>
        </Card>

        <Card title="Quick links">
          <div className="list" aria-label="Settings shortcuts" style={{ gap: 10 }}>
            <button
              type="button"
              className="list-item settings-unified-item"
              onClick={() => navigate("/settings/career-preferences")}
              aria-label="Open Career Preferences full page"
            >
              <div className="settings-unified-left">
                <span className="settings-unified-icon" aria-hidden="true">
                  <IconBriefcase size={18} />
                </span>
                <div className="settings-unified-titlewrap">
                  <h4 className="settings-unified-title" style={{ margin: 0 }}>
                    Career Preferences (full page)
                  </h4>
                </div>
              </div>
              <span className="settings-unified-right" aria-hidden="true">
                <ChevronRight size={18} />
              </span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
