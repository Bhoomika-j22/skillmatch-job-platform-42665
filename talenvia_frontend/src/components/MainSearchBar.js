import React, { useEffect, useMemo, useRef, useState } from "react";

function SearchIcon({ size = 16 }) {
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
      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * PUBLIC_INTERFACE
 * Search bar component.
 * Supports `variant="main"` (default) and `variant="header"` for placement inside the fixed top header.
 */
export default function MainSearchBar({
  placeholder = "Search jobs, skills, companies…",
  initialValue = "",
  onSearch,
  variant = "main",
}) {
  /** Search bar (UI affordance; wiring to page-level filters can be added later). */
  const [query, setQuery] = useState(initialValue || "");
  const inputRef = useRef(null);

  const isCompact = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(max-width: 760px)").matches;
  }, []);

  useEffect(() => {
    if (!isCompact) return;
    // Keep focus behavior pleasant on small screens after route changes.
    // (No auto-focus by default; just ensure ref is stable.)
  }, [isCompact]);

  const isHeader = variant === "header";
  const rootClass = isHeader ? "header-search" : "main-search";
  const formClass = isHeader ? "header-search-form" : "main-search-form";
  const iconClass = isHeader ? "header-search-icon" : "main-search-icon";
  const inputClass = isHeader ? "header-search-input" : "main-search-input";
  const inputId = isHeader ? "header-search-input" : "main-search-input";

  return (
    <div className={rootClass} aria-label="Search area">
      <form
        className={formClass}
        role="search"
        aria-label="Search"
        onSubmit={(e) => {
          e.preventDefault();
          if (onSearch) onSearch(query);
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          Search
        </label>
        <span className={iconClass} aria-hidden="true">
          <SearchIcon size={16} />
        </span>
        <input
          ref={inputRef}
          id={inputId}
          className={inputClass}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
