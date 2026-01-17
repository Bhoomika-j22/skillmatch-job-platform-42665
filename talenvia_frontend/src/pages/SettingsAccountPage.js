import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, Input } from "../components/ui";
import { useToast } from "../components/ToastProvider";

function ChevronLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function normalizePhone(value) {
  return String(value || "").replace(/[^\d+]/g, "").trim();
}

// PUBLIC_INTERFACE
export default function SettingsAccountPage() {
  /** Full-page Account settings screen (email, mobile, password) with Back to Settings landing. */
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mobile, setMobile] = useState(() => window.localStorage.getItem("talenvia.account.mobile") || "");
  const [email, setEmail] = useState(() => window.localStorage.getItem("talenvia.account.email") || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = confirm && nextPassword && confirm !== nextPassword;
  const emailValid = email.trim() ? validateEmail(email) : false;

  const normalizedMobile = useMemo(() => normalizePhone(mobile), [mobile]);
  const mobileValid = normalizedMobile.length >= 8;

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

    // Demo: no backend call, but provide success feedback and clear fields.
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
            <h1 className="page-title">Account</h1>
            <p className="page-subtitle">Change email, mobile number, or password.</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Badge variant="info">Secure</Badge>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 900 }}>
        <Card title="Change mobile number" header={<span className="settings-inline-icon" aria-hidden="true"><IconPhone size={18} /></span>}>
          <div className="settings-form-grid">
            <Input
              label="New mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="e.g., +1 555 123 4567"
              inputMode="tel"
              error={mobile.trim() && !mobileValid ? "Enter a valid mobile number" : ""}
            />
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <Button variant="primary" type="button" onClick={saveMobile} disabled={!mobile.trim() || !mobileValid}>
                Save
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Change email" header={<span className="settings-inline-icon" aria-hidden="true"><IconMail size={18} /></span>}>
          <div className="settings-form-grid">
            <Input
              label="New email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              inputMode="email"
              error={email.trim() && !emailValid ? "Enter a valid email address" : ""}
            />
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <Button variant="primary" type="button" onClick={saveEmail} disabled={!email.trim() || !emailValid}>
                Save
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Change password" header={<span className="settings-inline-icon" aria-hidden="true"><IconLock size={18} /></span>}>
          <div className="grid" aria-label="Change password form" style={{ gap: 12 }}>
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

          <div className="hr" />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="primary"
              type="button"
              onClick={savePassword}
              disabled={!currentPassword || !nextPassword || !confirm || mismatch || nextPassword.length < 8}
            >
              Update password
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
