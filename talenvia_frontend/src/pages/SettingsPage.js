import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, Button, Input, Select } from "../components/ui";
import { useToast } from "../components/ToastProvider";

const SETTINGS_ITEMS = [
  {
    key: "communication",
    title: "Communication & Privacy",
    description: "Notification preferences and privacy controls.",
    disabled: true,
  },
  {
    key: "account",
    title: "Account",
    description: "Mobile, email, password and account security.",
  },
  {
    key: "career",
    title: "Career Preferences",
    description: "Job roles, locations, experience and job type.",
  },
  {
    key: "blocked",
    title: "Blocked Companies",
    description: "Companies you don't want to see in recommendations.",
    disabled: true,
  },
];

const ROLE_SUGGESTIONS = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full-stack Engineer",
  "Product Designer",
  "Data Analyst",
  "Data Scientist",
  "QA Engineer",
  "DevOps Engineer",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const EXPERIENCES = ["Entry", "Mid", "Senior", "Lead"];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];

/**
 * Determine whether we should use a split view (list left + detail panel right).
 * We intentionally use window matchMedia here to avoid adding dependencies.
 */
function useIsDesktopSplit(breakpointPx = 980) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(`(min-width: ${breakpointPx}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    // Support older browsers
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [breakpointPx]);

  return isDesktop;
}

function ChevronRight({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeft({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeader({ title, subtitle, onBack, right }) {
  return (
    <div className="settings-section-header">
      <div className="settings-section-header-left">
        {onBack ? (
          <button type="button" className="settings-backbtn" onClick={onBack} aria-label="Back to Settings">
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        ) : null}
        <div>
          <h2 className="settings-section-title">{title}</h2>
          {subtitle ? <p className="settings-section-subtitle">{subtitle}</p> : null}
        </div>
      </div>
      {right ? <div className="settings-section-header-right">{right}</div> : null}
    </div>
  );
}

function validateEmail(value) {
  const v = String(value || "").trim();
  if (!v) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address.";
  return "";
}

function validateMobile(value) {
  const v = String(value || "").trim();
  if (!v) return "Mobile number is required.";
  const digits = v.replace(/[^\d]/g, "");
  if (digits.length < 8) return "Please enter a valid mobile number.";
  return "";
}

function validatePassword(next, confirm) {
  const n = String(next || "");
  const c = String(confirm || "");
  if (!n) return "New password is required.";
  if (n.length < 8) return "Password must be at least 8 characters.";
  if (c && c !== n) return "Passwords do not match.";
  return "";
}

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Settings screen with main list + two detailed sections and responsive split/stack navigation. */
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { toast } = useToast();
  const isDesktop = useIsDesktopSplit(980);

  // "panel" controls which detailed view is shown: "career" | "account" | null
  const panelParam = params.get("panel");
  const panel = panelParam === "career" || panelParam === "account" ? panelParam : null;

  // Demo local state for preferences/account (no backend wired).
  const [career, setCareer] = useState({
    role: "Frontend Engineer",
    locations: "Remote",
    experience: "Mid",
    jobType: "Full-time",
  });

  const [account, setAccount] = useState({
    mobile: "",
    email: "",
  });

  // Account edit flow: mobile | email | password | null
  const [accountFlow, setAccountFlow] = useState(null);

  const [draftMobile, setDraftMobile] = useState("");
  const [draftEmail, setDraftEmail] = useState("");
  const [draftPwd, setDraftPwd] = useState({ current: "", next: "", confirm: "" });

  const [errors, setErrors] = useState({ mobile: "", email: "", password: "" });

  // Keep drafts aligned when opening flows.
  useEffect(() => {
    if (accountFlow === "mobile") setDraftMobile(account.mobile || "");
    if (accountFlow === "email") setDraftEmail(account.email || "");
    if (accountFlow === "password") setDraftPwd({ current: "", next: "", confirm: "" });
    setErrors({ mobile: "", email: "", password: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFlow]);

  // If switching to desktop, keep the list visible and show detail side-by-side.
  // If switching to mobile and a panel is open, we still allow it (stack mode).
  useEffect(() => {
    // On desktop, ensure a panel selection does not break layout; no special action required.
    // On mobile, if a detail is open, we want the back button to return to list.
  }, [isDesktop]);

  const openPanel = (key) => {
    if (key === "account" || key === "career") {
      setParams({ panel: key });
      if (key === "account") setAccountFlow(null);
      return;
    }
    // For not-yet-built sections, show a friendly toast.
    toast({
      title: "Coming soon",
      message: "This section is planned but not implemented yet in this demo.",
      variant: "info",
    });
  };

  const closePanel = () => {
    setParams({});
    setAccountFlow(null);
  };

  const showListOnly = !panel || (!isDesktop && panel); // on mobile, list hides when a panel is open (stack UX)
  const showDetail = !!panel;

  const settingsList = (
    <div className="settings-list" role="list" aria-label="Settings options">
      {SETTINGS_ITEMS.map((it) => (
        <button
          key={it.key}
          type="button"
          className={`settings-item ${it.disabled ? "disabled" : ""}`}
          onClick={() => (it.disabled ? openPanel(it.key) : openPanel(it.key))}
          aria-disabled={it.disabled ? "true" : "false"}
          role="listitem"
        >
          <div className="settings-item-main">
            <div className="settings-item-title">{it.title}</div>
            <div className="settings-item-desc">{it.description}</div>
          </div>
          <span className="settings-item-right" aria-hidden="true">
            <ChevronRight size={18} />
          </span>
        </button>
      ))}
    </div>
  );

  const saveCareer = () => {
    toast({
      title: "Saved",
      message: "Career preferences updated successfully (demo).",
      variant: "success",
    });
  };

  const careerPanel = (
    <div className="settings-panel">
      <SectionHeader
        title="Career Preferences"
        subtitle="Update job roles, location preference, experience and job type."
        onBack={!isDesktop ? closePanel : null}
        right={
          <Button type="button" variant="primary" size="sm" onClick={saveCareer}>
            Save
          </Button>
        }
      />

      <Card title="Preferences" className="settings-card">
        <div className="settings-form-grid">
          <div>
            <label className="mini" htmlFor="career-role">
              Job role
            </label>
            <Input
              id="career-role"
              value={career.role}
              onChange={(e) => setCareer((p) => ({ ...p, role: e.target.value }))}
              placeholder="e.g., Data Analyst"
              list="roles"
            />
            <datalist id="roles">
              {ROLE_SUGGESTIONS.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mini" htmlFor="career-location">
              Location / Work mode
            </label>
            <Select
              id="career-location"
              value={career.locations}
              onChange={(e) => setCareer((p) => ({ ...p, locations: e.target.value }))}
            >
              {WORK_MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mini" htmlFor="career-exp">
              Experience
            </label>
            <Select
              id="career-exp"
              value={career.experience}
              onChange={(e) => setCareer((p) => ({ ...p, experience: e.target.value }))}
            >
              {EXPERIENCES.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mini" htmlFor="career-type">
              Job type
            </label>
            <Select
              id="career-type"
              value={career.jobType}
              onChange={(e) => setCareer((p) => ({ ...p, jobType: e.target.value }))}
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="hr" />
        <p className="mini" style={{ margin: 0 }}>
          These settings improve matching and recommendations once backend persistence is connected.
        </p>
      </Card>
    </div>
  );

  const accountSummary = useMemo(() => {
    const parts = [];
    if (account.mobile) parts.push("Mobile set");
    if (account.email) parts.push("Email set");
    if (!parts.length) return "No account details updated yet.";
    return parts.join(" • ");
  }, [account.email, account.mobile]);

  const saveMobile = () => {
    const err = validateMobile(draftMobile);
    setErrors((e) => ({ ...e, mobile: err }));
    if (err) return;
    setAccount((a) => ({ ...a, mobile: draftMobile.trim() }));
    toast({ title: "Updated", message: "Mobile number updated successfully.", variant: "success" });
    setAccountFlow(null);
  };

  const saveEmail = () => {
    const err = validateEmail(draftEmail);
    setErrors((e) => ({ ...e, email: err }));
    if (err) return;
    setAccount((a) => ({ ...a, email: draftEmail.trim() }));
    toast({ title: "Updated", message: "Email updated successfully.", variant: "success" });
    setAccountFlow(null);
  };

  const savePassword = () => {
    const err = validatePassword(draftPwd.next, draftPwd.confirm);
    setErrors((e) => ({ ...e, password: err }));
    if (err) return;

    // Demo-only behavior. Real apps must never store passwords client-side.
    toast({ title: "Updated", message: "Password updated successfully (demo).", variant: "success" });
    setAccountFlow(null);
  };

  const accountPanel = (
    <div className="settings-panel">
      <SectionHeader
        title="Account"
        subtitle="Manage mobile number, email address and password."
        onBack={!isDesktop ? closePanel : null}
        right={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              // Provide a helpful route to existing standalone pages (optional).
              toast({ title: "Tip", message: "You can also use the dedicated routes from the sidebar.", variant: "info" });
            }}
          >
            Help
          </Button>
        }
      />

      <Card title="Account overview" className="settings-card">
        <p className="mini" style={{ marginTop: 0 }}>
          {accountSummary}
        </p>

        <div className="settings-actions">
          <button type="button" className="settings-action" onClick={() => setAccountFlow("mobile")}>
            <div className="settings-action-main">
              <div className="settings-action-title">Change Mobile Number</div>
              <div className="settings-action-sub">{account.mobile ? account.mobile : "Not set"}</div>
            </div>
            <ChevronRight size={18} />
          </button>

          <button type="button" className="settings-action" onClick={() => setAccountFlow("email")}>
            <div className="settings-action-main">
              <div className="settings-action-title">Change Email</div>
              <div className="settings-action-sub">{account.email ? account.email : "Not set"}</div>
            </div>
            <ChevronRight size={18} />
          </button>

          <button type="button" className="settings-action" onClick={() => setAccountFlow("password")}>
            <div className="settings-action-main">
              <div className="settings-action-title">Change Password</div>
              <div className="settings-action-sub">Minimum 8 characters</div>
            </div>
            <ChevronRight size={18} />
          </button>
        </div>

        {accountFlow ? (
          <>
            <div className="hr" />
            <div className="settings-flow">
              {accountFlow === "mobile" ? (
                <>
                  <div className="settings-flow-head">
                    <h3 className="settings-flow-title">Update mobile number</h3>
                    <div className="settings-flow-actions">
                      <Button type="button" size="sm" variant="ghost" onClick={() => setAccountFlow(null)}>
                        Cancel
                      </Button>
                      <Button type="button" size="sm" variant="primary" onClick={saveMobile}>
                        Save
                      </Button>
                    </div>
                  </div>
                  <Input
                    label="New mobile number"
                    value={draftMobile}
                    onChange={(e) => setDraftMobile(e.target.value)}
                    placeholder="e.g., +1 555 123 4567"
                    inputMode="tel"
                    error={errors.mobile}
                  />
                </>
              ) : null}

              {accountFlow === "email" ? (
                <>
                  <div className="settings-flow-head">
                    <h3 className="settings-flow-title">Update email address</h3>
                    <div className="settings-flow-actions">
                      <Button type="button" size="sm" variant="ghost" onClick={() => setAccountFlow(null)}>
                        Cancel
                      </Button>
                      <Button type="button" size="sm" variant="primary" onClick={saveEmail}>
                        Save
                      </Button>
                    </div>
                  </div>
                  <Input
                    label="New email address"
                    value={draftEmail}
                    onChange={(e) => setDraftEmail(e.target.value)}
                    placeholder="you@example.com"
                    inputMode="email"
                    error={errors.email}
                  />
                </>
              ) : null}

              {accountFlow === "password" ? (
                <>
                  <div className="settings-flow-head">
                    <h3 className="settings-flow-title">Update password</h3>
                    <div className="settings-flow-actions">
                      <Button type="button" size="sm" variant="ghost" onClick={() => setAccountFlow(null)}>
                        Cancel
                      </Button>
                      <Button type="button" size="sm" variant="primary" onClick={savePassword}>
                        Save
                      </Button>
                    </div>
                  </div>

                  <Input
                    label="Current password"
                    type="password"
                    value={draftPwd.current}
                    onChange={(e) => setDraftPwd((p) => ({ ...p, current: e.target.value }))}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <Input
                    label="New password"
                    type="password"
                    value={draftPwd.next}
                    onChange={(e) => setDraftPwd((p) => ({ ...p, next: e.target.value }))}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    error={errors.password}
                  />
                  <Input
                    label="Confirm new password"
                    type="password"
                    value={draftPwd.confirm}
                    onChange={(e) => setDraftPwd((p) => ({ ...p, confirm: e.target.value }))}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    error={errors.password}
                  />
                  <div className="mini">
                    Note: this is a frontend-only demo. Real apps must validate and update passwords on the server.
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null}

        <div className="hr" />
        <div className="settings-secondary-actions">
          <Button type="button" variant="secondary" onClick={() => navigate("/account/change-mobile")}>
            Use dedicated Change Mobile page
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/account/change-email")}>
            Use dedicated Change Email page
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/account/change-password")}>
            Use dedicated Change Password page
          </Button>
        </div>
      </Card>
    </div>
  );

  const detail = panel === "career" ? careerPanel : panel === "account" ? accountPanel : null;

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage account, privacy and career preferences.</p>
        </div>

        {/* Desktop convenience: allow closing the side panel to return to list-only */}
        {isDesktop && panel ? (
          <Button type="button" variant="ghost" size="sm" onClick={closePanel} aria-label="Close settings panel">
            Close
          </Button>
        ) : null}
      </div>

      <div className={`settings-layout ${isDesktop ? "split" : "stack"} ${panel ? "has-detail" : ""}`}>
        {/* List column (desktop always visible; mobile visible only when no panel selected) */}
        {isDesktop || !panel ? (
          <div className="settings-col settings-col-list">
            <Card title="Settings" className="settings-card">
              {settingsList}
            </Card>
          </div>
        ) : null}

        {/* Detail column */}
        {showDetail ? (
          <div className="settings-col settings-col-detail" aria-label="Settings detail">
            <Card title={panel === "career" ? "Career Preferences" : "Account"} className="settings-card settings-detail-card">
              {detail}
            </Card>
          </div>
        ) : isDesktop ? (
          <div className="settings-col settings-col-detail" aria-label="Settings detail">
            <Card title="Select an item" className="settings-card settings-detail-card">
              <p className="mini" style={{ marginTop: 0 }}>
                Choose an option on the left to view and edit settings.
              </p>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
}
