import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge } from "../components/ui";

/**
 * Inline SVG icons (no extra dependencies).
 */
function IconUser({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBell({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSliders({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 21v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 10V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 21v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 21v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 10h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
      <path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
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

/**
 * Centralized navigation targets for the unified Settings list.
 * NOTE: "Settings" is kept as a row (per instructions) and routes to the detailed settings view.
 * In this app, "/settings" is the settings hub itself, so "Settings" routes to the same page.
 */
const SETTINGS_ROWS = [
  { key: "profile", title: "Profile & Skills", icon: IconUser, to: "/profile" },
  { key: "notifications", title: "Notifications", icon: IconBell, to: "/notifications", showUnreadBadge: true },
  { key: "settings", title: "Settings", icon: IconSliders, to: "/settings" },
  { key: "career", title: "Career Preferences", icon: IconBriefcase, to: "/settings/career-preferences" },
  { key: "mobile", title: "Change Mobile", icon: IconPhone, to: "/account/change-mobile" },
  { key: "email", title: "Change Email", icon: IconMail, to: "/account/change-email" },
  { key: "password", title: "Change Password", icon: IconLock, to: "/account/change-password" },
];

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Settings hub: unified single list (no section headers) with icon + title + chevron, matching Notifications list style. */
  const navigate = useNavigate();

  const unreadCount = useMemo(() => {
    try {
      const raw = window.localStorage.getItem("talenvia.notifications");
      if (!raw) return 0;
      const list = JSON.parse(raw);
      if (!Array.isArray(list)) return 0;
      return list.filter((n) => n && n.read === false).length;
    } catch {
      return 0;
    }
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your profile, notifications, account security, and career preferences.</p>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 760 }}>
        <Card title="Settings">
          <div className="list" aria-label="Settings options">
            {SETTINGS_ROWS.map((row) => {
              const Icon = row.icon;
              return (
                <button
                  key={row.key}
                  type="button"
                  className="list-item settings-unified-item"
                  onClick={() => navigate(row.to)}
                  aria-label={row.title}
                >
                  <div className="settings-unified-left">
                    <span className="settings-unified-icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <div className="settings-unified-titlewrap">
                      <h4 className="settings-unified-title" style={{ margin: 0 }}>
                        {row.title}{" "}
                        {row.showUnreadBadge && unreadCount > 0 ? (
                          <Badge variant="secondary">{unreadCount}</Badge>
                        ) : null}
                      </h4>
                    </div>
                  </div>

                  <span className="settings-unified-right" aria-hidden="true">
                    <ChevronRight size={18} />
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
