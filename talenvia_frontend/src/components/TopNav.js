import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui";

function SearchIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// PUBLIC_INTERFACE
export default function TopNav({ notificationCount = 0 }) {
  /** Main application top navigation bar (single, professional header). */

  const [query, setQuery] = useState("");
  const [compactOpen, setCompactOpen] = useState(false);
  const inputRef = useRef(null);

  // Responsive behavior: collapse search into icon on small screens.
  const isCompact = useMemo(() => {
    // Keep SSR-safe (CRA runs client-side, but guard anyway)
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(max-width: 760px)").matches;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(max-width: 760px)");
    const onChange = () => {
      // close inline expanded state when leaving compact mode
      if (!mq.matches) setCompactOpen(false);
    };

    // initialize + listen
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (compactOpen) {
      // focus input after UI updates
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [compactOpen]);

  const showInlineSearch = !isCompact || compactOpen;

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

        {/* Search between brand and nav */}
        <div className={`topbar-search ${isCompact ? "topbar-search--compact" : ""}`}>
          {!showInlineSearch ? (
            <button
              type="button"
              className="topbar-search-trigger"
              aria-label="Open search"
              aria-expanded={compactOpen}
              onClick={() => setCompactOpen(true)}
            >
              <SearchIcon size={16} />
            </button>
          ) : (
            <form
              className={`topbar-search-form ${compactOpen ? "is-open" : ""}`}
              role="search"
              aria-label="Site search"
              onSubmit={(e) => {
                e.preventDefault();
                // No global search results page yet; keep behavior non-destructive.
                // This component is a UI affordance for future wiring.
              }}
            >
              <label className="sr-only" htmlFor="topnav-search">
                Search jobs, skills, companies
              </label>
              <span className="topbar-search-icon" aria-hidden="true">
                <SearchIcon size={16} />
              </span>
              <input
                ref={inputRef}
                id="topnav-search"
                className="topbar-search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs, skills, companies..."
                autoComplete="off"
                aria-label="Search jobs, skills, companies"
                onBlur={() => {
                  // In compact mode, collapse back to icon when user leaves the input and it's empty.
                  if (typeof window !== "undefined" && window.matchMedia) {
                    const mq = window.matchMedia("(max-width: 760px)");
                    if (mq.matches && !query.trim()) setCompactOpen(false);
                  }
                }}
              />
              {isCompact && compactOpen ? (
                <button
                  type="button"
                  className="topbar-search-close"
                  aria-label="Close search"
                  onClick={() => setCompactOpen(false)}
                >
                  ×
                </button>
              ) : null}
            </form>
          )}
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
