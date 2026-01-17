import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastProvider";
import { Input, Select, Button } from "./ui";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon({ size = 16 }) {
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
        d="M12 20h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SaveIcon({ size = 16 }) {
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
        d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 21v-8H7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ size = 16 }) {
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
      <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m6 6 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Basic phone validator (kept intentionally permissive for demo).
 * Accepts digits with optional +, spaces, dashes, parentheses.
 */
function isLikelyPhone(value) {
  const v = String(value || "").trim();
  if (!v) return false;
  const cleaned = v.replace(/[^\d+]/g, "");
  // Very permissive: require at least 8 digits
  const digits = cleaned.replace(/[^\d]/g, "");
  return digits.length >= 8;
}

function isLikelyEmail(value) {
  const v = String(value || "").trim();
  if (!v) return false;
  // Simple email check (frontend demo)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isStrongEnoughPassword(value) {
  const v = String(value || "");
  // Demo strength rule: min 8 chars
  return v.length >= 8;
}

// PUBLIC_INTERFACE
export default function ProfileMenu({ profileName = "" }) {
  /** Avatar + name trigger that opens a dropdown menu with Profile/Settings/Account and Logout actions. */
  const navigate = useNavigate();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const triggerId = useMemo(() => `profile-trigger-${Math.random().toString(16).slice(2)}`, []);

  // Persisted fields for dropdown editing (demo-only storage, ready for API wiring).
  const [settings, setSettings] = useLocalStorage("talenvia.profileMenu.settings", {
    careerPreference: "Open to opportunities",
  });

  const [account, setAccount] = useLocalStorage("talenvia.profileMenu.account", {
    mobile: "",
    email: "",
    // For demo we store password, but a real app must never store a password in localStorage.
    // Here it enables the UX + persistence requirement without a backend.
    password: "",
  });

  const [editingKey, setEditingKey] = useState(null); // "careerPreference" | "mobile" | "email" | "password" | null
  const [draftValue, setDraftValue] = useState("");
  const [fieldError, setFieldError] = useState("");

  const displayName = String(profileName || "").trim() || "Guest";
  const initials = useMemo(() => getInitials(displayName), [displayName]);

  const beginEdit = (key, initialValue) => {
    setEditingKey(key);
    setDraftValue(String(initialValue ?? ""));
    setFieldError("");
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setDraftValue("");
    setFieldError("");
  };

  const validateAndSave = () => {
    const key = editingKey;
    if (!key) return;

    const value = String(draftValue ?? "").trim();

    if (key === "careerPreference") {
      if (!value) {
        setFieldError("Please enter your career preference.");
        return;
      }
      setSettings((prev) => ({ ...(prev || {}), careerPreference: value }));
      toast({ title: "Updated", message: "Career preference saved.", variant: "success" });
      cancelEdit();
      return;
    }

    if (key === "mobile") {
      if (!isLikelyPhone(value)) {
        setFieldError("Please enter a valid mobile number.");
        return;
      }
      setAccount((prev) => ({ ...(prev || {}), mobile: value }));
      toast({ title: "Updated", message: "Mobile number saved.", variant: "success" });
      cancelEdit();
      return;
    }

    if (key === "email") {
      if (!isLikelyEmail(value)) {
        setFieldError("Please enter a valid email address.");
        return;
      }
      setAccount((prev) => ({ ...(prev || {}), email: value }));
      toast({ title: "Updated", message: "Email address saved.", variant: "success" });
      cancelEdit();
      return;
    }

    if (key === "password") {
      if (!isStrongEnoughPassword(value)) {
        setFieldError("Password must be at least 8 characters.");
        return;
      }
      setAccount((prev) => ({ ...(prev || {}), password: value }));
      toast({ title: "Updated", message: "Password saved (demo).", variant: "success" });
      cancelEdit();
      return;
    }
  };

  useEffect(() => {
    if (!open) return;

    const onDocPointerDown = (e) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(e.target)) return;
      setOpen(false);
      cancelEdit();
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        cancelEdit();
        // Restore focus to trigger for accessibility
        triggerRef.current?.focus?.();
        return;
      }

      // When editing, Enter saves and Esc cancels.
      if (editingKey) {
        if (e.key === "Enter") {
          e.preventDefault();
          validateAndSave();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          cancelEdit();
        }
      }
    };

    document.addEventListener("pointerdown", onDocPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editingKey, draftValue]);

  // When opening the menu, ensure we start not editing (prevents stale draft).
  useEffect(() => {
    if (open) cancelEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const goProfile = () => {
    setOpen(false);
    cancelEdit();
    navigate("/profile");
  };

  const logout = () => {
    setOpen(false);
    cancelEdit();

    // Stub handler (no auth provider wired yet). Keeps behavior non-destructive.
    toast({
      title: "Logged out (demo)",
      message: "Auth is not configured yet — this is a placeholder action.",
      variant: "info",
    });

    // If later an auth solution is added, this is the integration point.
    // e.g., authClient.signOut(); navigate("/login");
  };

  const renderMenuRow = ({ label, value, editKey, type = "text", placeholder, helperText }) => {
    const isEditing = editingKey === editKey;

    return (
      <div className="profile-row" role="none">
        <div className="profile-row-main">
          <div className="profile-row-label">{label}</div>

          {!isEditing ? (
            <div className="profile-row-value" title={String(value || "")}>
              {value ? String(value) : <span className="profile-row-muted">Not set</span>}
            </div>
          ) : (
            <div className="profile-row-editor">
              {editKey === "careerPreference" ? (
                <Select
                  aria-label={label}
                  value={draftValue}
                  onChange={(e) => setDraftValue(e.target.value)}
                  error={fieldError}
                >
                  <option value="Open to opportunities">Open to opportunities</option>
                  <option value="Actively looking">Actively looking</option>
                  <option value="Not looking">Not looking</option>
                </Select>
              ) : (
                <Input
                  aria-label={label}
                  type={type}
                  value={draftValue}
                  onChange={(e) => setDraftValue(e.target.value)}
                  placeholder={placeholder}
                  error={fieldError}
                  autoFocus
                />
              )}

              {helperText && !fieldError ? <div className="profile-row-help">{helperText}</div> : null}

              <div className="profile-row-actions">
                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={validateAndSave}
                  className="profile-row-actionbtn"
                >
                  <span className="profile-row-icon" aria-hidden="true">
                    <SaveIcon size={14} />
                  </span>
                  Save
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={cancelEdit}
                  className="profile-row-actionbtn"
                >
                  <span className="profile-row-icon" aria-hidden="true">
                    <XIcon size={14} />
                  </span>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {!isEditing ? (
          <button
            type="button"
            className="profile-row-edit"
            onClick={() => beginEdit(editKey, value)}
            aria-label={`Edit ${label}`}
          >
            <span className="profile-row-icon" aria-hidden="true">
              <EditIcon size={14} />
            </span>
            Edit
          </button>
        ) : null}
      </div>
    );
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
        <div className="profile-dropdown profile-dropdown--wide" role="menu" aria-labelledby={triggerId}>
          <button type="button" className="profile-item" role="menuitem" onClick={goProfile}>
            Profile
          </button>

          <div className="profile-group" role="none">
            <div className="profile-group-title" role="presentation">
              Settings
            </div>
            {renderMenuRow({
              label: "Career Preferences",
              value: settings?.careerPreference || "",
              editKey: "careerPreference",
              helperText: "Choose how recruiters should see your availability.",
            })}
          </div>

          <div className="profile-group" role="none">
            <div className="profile-group-title" role="presentation">
              Account
            </div>

            {renderMenuRow({
              label: "Change Mobile",
              value: account?.mobile || "",
              editKey: "mobile",
              placeholder: "+1 555 123 4567",
              helperText: "Used for account recovery and alerts.",
            })}

            {renderMenuRow({
              label: "Change Email",
              value: account?.email || "",
              editKey: "email",
              placeholder: "you@example.com",
              helperText: "We’ll use this email for login and updates.",
            })}

            {renderMenuRow({
              label: "Change Password",
              value: account?.password ? "••••••••" : "",
              editKey: "password",
              type: "password",
              placeholder: "New password",
              helperText: "Minimum 8 characters.",
            })}
          </div>

          <div className="profile-divider" role="separator" />

          <button type="button" className="profile-item danger" role="menuitem" onClick={logout}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
