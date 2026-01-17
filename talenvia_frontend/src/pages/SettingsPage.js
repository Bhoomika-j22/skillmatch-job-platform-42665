import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/ui";
import { useToast } from "../components/ToastProvider";

/**
 * Inline SVG icons (no extra dependencies).
 */
function IconUser({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function IconBlock({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M7.5 7.5 16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconLogout({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M10 17H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M14 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m18 8 3 4-3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

/**
 * Settings landing items (full-page cards -> route to dedicated full-page screens).
 * Note: "Communication & Privacy" is intentionally excluded per requirements.
 */
const SETTINGS_ITEMS = [
  {
    key: "account",
    title: "Account",
    description: "Change email, mobile number, or password",
    icon: IconUser,
    to: "/settings/account",
  },
  {
    key: "career",
    title: "Career Preferences",
    description: "Manage job recommendation preferences",
    icon: IconBriefcase,
    to: "/settings/career-preferences",
  },
  {
    key: "blocked",
    title: "Blocked Companies",
    description: "Hide your profile from selected companies",
    icon: IconBlock,
    to: "/settings/blocked-companies",
  },
];

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Settings landing page: list of settings cards + Logout at bottom. */
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loggingOut, setLoggingOut] = useState(false);

  const blockedCount = useMemo(() => {
    try {
      const raw = window.localStorage.getItem("talenvia.blockedCompanies");
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return 0;
      return parsed.filter(Boolean).length;
    } catch {
      return 0;
    }
  }, []);

  const onLogout = async () => {
    setLoggingOut(true);
    try {
      // Demo-safe logout: clear known local demo keys without assuming a backend auth system.
      const keysToClear = [
        "talenvia.profile",
        "talenvia.notifications",
        "talenvia.applications",
        "talenvia.challenges.completed",
        "talenvia.tests.history",
        "talenvia.pref.role",
        "talenvia.pref.level",
        "talenvia.pref.workPreference",
        "talenvia.account.mobile",
        "talenvia.account.email",
        "talenvia.blockedCompanies",
      ];
      keysToClear.forEach((k) => window.localStorage.removeItem(k));

      toast({ title: "Logged out", message: "You have been logged out on this device (demo).", variant: "success" });
      navigate("/");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and preferences.</p>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 900 }}>
        <Card>
          <div className="list" aria-label="Settings options" style={{ gap: 10 }}>
            {SETTINGS_ITEMS.map((item) => {
              const Icon = item.icon;
              const showCount = item.key === "blocked" && blockedCount > 0;

              return (
                <button
                  key={item.key}
                  type="button"
                  className="list-item settings-unified-item"
                  onClick={() => navigate(item.to)}
                  aria-label={item.title}
                >
                  <div className="settings-unified-left">
                    <span className="settings-unified-icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>

                    <div className="settings-unified-titlewrap" style={{ flex: 1 }}>
                      <h4 className="settings-unified-title" style={{ margin: 0, display: "flex", gap: 10, alignItems: "center" }}>
                        <span>{item.title}</span>
                        {showCount ? (
                          <span className="badge info" aria-label={`${blockedCount} blocked companies`}>
                            {blockedCount}
                          </span>
                        ) : null}
                      </h4>
                      <p style={{ margin: "4px 0 0" }}>{item.description}</p>
                    </div>
                  </div>

                  <span className="settings-unified-right" aria-hidden="true">
                    <ChevronRight size={18} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hr" />

          <div style={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
            <Button
              variant="ghost"
              type="button"
              onClick={onLogout}
              loading={loggingOut}
              aria-label="Logout"
              className="settings-logout danger"
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span aria-hidden="true">
                  <IconLogout size={18} />
                </span>
                Logout
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
