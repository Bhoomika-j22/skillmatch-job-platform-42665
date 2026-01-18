import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastProvider";

/**
 * Derive initial letters for an avatar.
 */
function getInitials(name) {
  const cleaned = String(name || "").trim();
  if (!cleaned) return "U";
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || "U";
  const second = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${second}`.toUpperCase();
}

function ChevronDown({ size = 16 }) {
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
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// PUBLIC_INTERFACE
export default function ProfileMenu({ profileName = "" }) {
  /** Avatar + name trigger that opens a dropdown menu with Profile/Settings/Account and Logout actions. */
  const navigate = useNavigate();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const triggerId = useMemo(
    () => `profile-trigger-${Math.random().toString(16).slice(2)}`,
    [],
  );

  const displayName = String(profileName || "").trim() || "Guest";
  const initials = useMemo(() => getInitials(displayName), [displayName]);

  useEffect(() => {
    if (!open) return;

    const onDocPointerDown = (e) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(e.target)) return;
      setOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        // Restore focus to trigger for accessibility
        triggerRef.current?.focus?.();
      }
    };

    document.addEventListener("pointerdown", onDocPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const goProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  const logout = () => {
    setOpen(false);

    // Stub handler (no auth provider wired yet). Keeps behavior non-destructive.
    toast({
      title: "Logged out (demo)",
      message: "Auth is not configured yet — this is a placeholder action.",
      variant: "info",
    });

    // If later an auth solution is added, this is the integration point.
    // e.g., authClient.signOut(); navigate("/login");
  };

  return (
    <div className="profile-menu" ref={rootRef}>
      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        className={`profile-trigger ${open ? "open" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="profile-avatar" aria-hidden="true">
          {initials}
        </span>
        <span className="profile-name">{displayName}</span>
        <span className="profile-chevron" aria-hidden="true">
          <ChevronDown size={16} />
        </span>
      </button>

      {open ? (
        <div
          className="profile-dropdown"
          role="menu"
          aria-labelledby={triggerId}
        >
          <button
            type="button"
            className="profile-item"
            role="menuitem"
            onClick={goProfile}
          >
            Profile
          </button>

          <div className="profile-divider" role="separator" />

          <button
            type="button"
            className="profile-item danger"
            role="menuitem"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
