import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui";

function IconBookmark({ size = 16 }) {
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
      <path
        d="M7 4h10a2 2 0 0 1 2 2v16l-7-4-7 4V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDot({ size = 6 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: "currentColor",
        opacity: 0.7,
        display: "inline-block",
      }}
    />
  );
}

// PUBLIC_INTERFACE
export default function Sidebar({ notificationCount = 0 }) {
  /** Fixed left-side navigation sidebar with Talenvia branding and vertical nav. */
  return (
    <aside className="sidebar" aria-label="Primary sidebar navigation">
      <div className="sidebar-inner">
        <div className="sidebar-top">
          <div className="sidebar-brand" aria-label="Talenvia">
            <div className="sidebar-brand-badge" aria-hidden="true">
              T
            </div>
            <div className="sidebar-brand-title">
              <strong>Talenvia</strong>
              <span>Cosmic Energy</span>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Primary">
            <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconDot />
              </span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/jobs" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconDot />
              </span>
              <span>Jobs</span>
            </NavLink>

            {/* Saved Jobs is a UI placeholder: no dedicated route yet. */}
            <NavLink to="/applications" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconBookmark size={16} />
              </span>
              <span>Saved Jobs</span>
            </NavLink>

            <NavLink to="/applications" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconDot />
              </span>
              <span>Applications</span>
            </NavLink>

            <NavLink to="/challenges" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconDot />
              </span>
              <span>Challenges</span>
            </NavLink>

            <NavLink to="/mock-tests" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconDot />
              </span>
              <span>Mock Tests</span>
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconDot />
              </span>
              <span>Profile &amp; Skills</span>
            </NavLink>

            <NavLink to="/notifications" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconDot />
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Notifications
                {notificationCount ? (
                  <span className="sidebar-badge" aria-label={`${notificationCount} unread notifications`}>
                    {notificationCount}
                  </span>
                ) : null}
              </span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <Button
            variant="primary"
            size="md"
            type="button"
            className="sidebar-cta"
            onClick={() => window.open(process.env.REACT_APP_FRONTEND_URL || window.location.origin, "_blank")}
            aria-label="Open My Workspace in a new tab"
            title="My Workspace"
          >
            My Workspace
          </Button>

          <div className="sidebar-mini">
            <span style={{ opacity: 0.8 }}>Tip:</span> Use the search above to filter results on each page.
          </div>
        </div>
      </div>
    </aside>
  );
}
