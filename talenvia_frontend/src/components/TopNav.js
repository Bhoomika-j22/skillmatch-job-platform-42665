import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui";

// PUBLIC_INTERFACE
export default function TopNav({ notificationCount = 0 }) {
  /** Main application top navigation bar (single, professional header). */

  return (
    <header className="topbar topbar--pro">
      <div className="topbar-inner topbar-inner--pro">
        <div className="brand brand--pro" aria-label="Talenvia">
          <div className="brand-badge brand-badge--pro" aria-hidden="true">
            T
          </div>
          <div className="brand-title">
            <strong>Talenvia</strong>
            <span>Cosmic Energy job platform</span>
          </div>
        </div>

        <nav className="nav nav--pro" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `nav-pill nav-pill--pro ${isActive ? "active" : ""}`}>
            Dashboard
          </NavLink>
          <NavLink to="/jobs" className={({ isActive }) => `nav-pill nav-pill--pro ${isActive ? "active" : ""}`}>
            Jobs
          </NavLink>
          <NavLink
            to="/applications"
            className={({ isActive }) => `nav-pill nav-pill--pro ${isActive ? "active" : ""}`}
          >
            Applications
          </NavLink>
          <NavLink to="/challenges" className={({ isActive }) => `nav-pill nav-pill--pro ${isActive ? "active" : ""}`}>
            Challenges
          </NavLink>
          <NavLink to="/mock-tests" className={({ isActive }) => `nav-pill nav-pill--pro ${isActive ? "active" : ""}`}>
            Mock Tests
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-pill nav-pill--pro ${isActive ? "active" : ""}`}>
            Profile & Skills
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) => `nav-pill nav-pill--pro ${isActive ? "active" : ""}`}
          >
            Notifications
            {notificationCount ? (
              <span className="nav-badge" aria-label={`${notificationCount} unread notifications`}>
                {notificationCount}
              </span>
            ) : null}
          </NavLink>
        </nav>

        <div className="topbar-actions topbar-actions--pro">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => window.open(process.env.REACT_APP_FRONTEND_URL || window.location.origin, "_blank")}
            aria-label="Open frontend base URL in a new tab"
            title="Open frontend base URL"
          >
            Open
          </Button>
        </div>
      </div>
    </header>
  );
}
