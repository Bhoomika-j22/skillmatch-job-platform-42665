import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge } from "../components/ui";

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

function IconBell({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

function ChevronRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Flat Settings list (no section headers).
 * Requirements: show exactly 3 rows (Profile & Skills, Notifications w/ badge, Settings).
 * "Settings" must look identical to Notifications list rows and navigate to the Settings detail screen.
 */
const SETTINGS_ROWS = [
  { key: "profile", title: "Profile & Skills", icon: IconUser, to: "/profile" },
  { key: "notifications", title: "Notifications", icon: IconBell, to: "/notifications", showUnreadBadge: true },
  { key: "settings", title: "Settings", icon: IconSliders, to: "/settings/details" },
];

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Flat Settings list screen (single Settings item; details are on /settings/details). */
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
          <p className="page-subtitle">Quick access to profile, notifications, and your account settings.</p>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 760 }}>
        <Card>
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
