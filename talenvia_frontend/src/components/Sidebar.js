import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui";

function IconDashboard({ size = 18 }) {
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
        d="M4 4h7v7H4V4Zm9 0h7v10h-7V4ZM4 13h7v7H4v-7Zm9 3h7v4h-7v-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBriefcase({ size = 18 }) {
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
        d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 13h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

function IconHeart({ size = 18 }) {
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
        d="M12 20s-7-4.4-9.2-8.6C1.1 8.1 3.2 5 6.6 5c1.9 0 3.2 1 3.9 2.1C11.2 6 12.5 5 14.4 5c3.4 0 5.5 3.1 3.8 6.4C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDocument({ size = 18 }) {
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
        d="M7 3h7l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 13h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

function IconTarget({ size = 18 }) {
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
        d="M12 21a9 9 0 1 1 9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 17a5 5 0 1 1 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M12 13a1 1 0 1 1 1-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M14.5 9.5 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.5 3H21v2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconClipboard({ size = 18 }) {
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
        d="M9 4h6a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 4.5A2.5 2.5 0 0 0 11.5 2h1A2.5 2.5 0 0 0 15 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M10 10h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

function IconUser({ size = 18 }) {
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
        d="M20 21a8 8 0 1 0-16 0"
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
        d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 19a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSettings({ size = 18 }) {
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
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a8.2 8.2 0 0 0 .1-2l2-1.2-2-3.4-2.3.6a7.7 7.7 0 0 0-1.7-1l-.3-2.4H11l-.3 2.4c-.6.3-1.2.6-1.7 1l-2.3-.6-2 3.4 2 1.2a8.2 8.2 0 0 0 .1 2l-2 1.2 2 3.4 2.3-.6c.5.4 1.1.7 1.7 1l.3 2.4h4l.3-2.4c.6-.3 1.2-.6 1.7-1l2.3.6 2-3.4-2-1.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.95"
      />
    </svg>
  );
}

function IconShield({ size = 18 }) {
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
        d="M12 3 20 7v6c0 5-3.5 8.4-8 10-4.5-1.6-8-5-8-10V7l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.5 11 14l3.5-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
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
                <IconDashboard size={18} />
              </span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/jobs" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconBriefcase size={18} />
              </span>
              <span>Jobs</span>
            </NavLink>

            {/* Saved Jobs is a UI placeholder: no dedicated route yet. */}
            <NavLink to="/applications" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconHeart size={18} />
              </span>
              <span>Saved Jobs</span>
            </NavLink>

            <NavLink to="/applications" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconDocument size={18} />
              </span>
              <span>Applications</span>
            </NavLink>

            <NavLink to="/challenges" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconTarget size={18} />
              </span>
              <span>Challenges</span>
            </NavLink>

            <NavLink to="/mock-tests" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconClipboard size={18} />
              </span>
              <span>Mock Tests</span>
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconUser size={18} />
              </span>
              <span>Profile &amp; Skills</span>
            </NavLink>

            <NavLink to="/notifications" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="sidebar-icon" aria-hidden="true">
                <IconBell size={18} />
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

            {/* New groups requested: Settings and Account (placed directly below Notifications). */}
            <div className="sidebar-group" role="group" aria-label="Settings">
              <div className="sidebar-group-title">Settings</div>

              <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
                <span className="sidebar-icon" aria-hidden="true">
                  <IconSettings size={18} />
                </span>
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/settings/career-preferences"
                className={({ isActive }) => `sidebar-link sidebar-link--sub ${isActive ? "active" : ""}`}
              >
                <span className="sidebar-icon" aria-hidden="true">
                  <IconSettings size={18} />
                </span>
                <span>Career Preferences</span>
              </NavLink>
            </div>

            <div className="sidebar-group" role="group" aria-label="Account">
              <div className="sidebar-group-title">Account</div>

              <NavLink
                to="/account/change-mobile"
                className={({ isActive }) => `sidebar-link sidebar-link--sub ${isActive ? "active" : ""}`}
              >
                <span className="sidebar-icon" aria-hidden="true">
                  <IconShield size={18} />
                </span>
                <span>Change Mobile</span>
              </NavLink>

              <NavLink
                to="/account/change-email"
                className={({ isActive }) => `sidebar-link sidebar-link--sub ${isActive ? "active" : ""}`}
              >
                <span className="sidebar-icon" aria-hidden="true">
                  <IconShield size={18} />
                </span>
                <span>Change Email</span>
              </NavLink>

              <NavLink
                to="/account/change-password"
                className={({ isActive }) => `sidebar-link sidebar-link--sub ${isActive ? "active" : ""}`}
              >
                <span className="sidebar-icon" aria-hidden="true">
                  <IconShield size={18} />
                </span>
                <span>Change Password</span>
              </NavLink>
            </div>
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
            <span className="sidebar-cta-icon" aria-hidden="true">
              <IconUser size={18} />
            </span>
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
