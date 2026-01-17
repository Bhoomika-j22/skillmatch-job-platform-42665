import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui";

// PUBLIC_INTERFACE
export default function TopNav({ notificationCount = 0 }) {
  /** Main application top navigation bar. */
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand" aria-label="Talenvia">
          <div className="brand-badge" aria-hidden="true">
            T
          </div>
          <div className="brand-title">
            <strong>Talenvia</strong>
            <span>Cosmic Energy job platform</span>
          </div>
        </div>

        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
            Dashboard
          </NavLink>
          <NavLink to="/jobs" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
            Jobs
          </NavLink>
          <NavLink to="/applications" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
            Applications
          </NavLink>
          <NavLink to="/challenges" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
            Challenges
          </NavLink>
          <NavLink to="/mock-tests" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
            Mock Tests
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
            Profile & Skills
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
            Notifications {notificationCount ? <span className="badge secondary">{notificationCount}</span> : null}
          </NavLink>
        </nav>

        <div className="topbar-actions">
          <Button
            variant="ghost"
            type="button"
            onClick={() => window.open(process.env.REACT_APP_FRONTEND_URL || window.location.origin, "_blank")}
            title="Open frontend base URL"
          >
            Open
          </Button>
        </div>
      </div>
    </header>
  );
}
