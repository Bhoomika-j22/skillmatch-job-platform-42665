import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui";
import { useToast } from "./ToastProvider";

/** Inline SVG icons (no extra dependencies). */
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

/**
 * Notifications dropdown.
 * IMPORTANT: Per requirements, Settings must NOT appear inside notification dropdowns.
 */

// PUBLIC_INTERFACE
export default function NotificationBell({
  notifications = [],
  setNotifications,
  maxItems = 4,
}) {
  /** Notification bell dropdown with recent notifications and a demo logout action. */
  const navigate = useNavigate();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);

  const unreadCount = useMemo(
    () => (notifications || []).filter((n) => !n.read).length,
    [notifications],
  );

  const items = useMemo(() => {
    const list = Array.isArray(notifications) ? notifications : [];
    return list.slice(0, Math.max(0, maxItems));
  }, [notifications, maxItems]);

  const close = () => setOpen(false);

  const markRead = (id) => {
    if (!setNotifications) return;
    setNotifications((prev) =>
      (prev || []).map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllRead = () => {
    if (!setNotifications) return;
    setNotifications((prev) => (prev || []).map((n) => ({ ...n, read: true })));
    toast({
      title: "All caught up",
      message: "Marked all notifications as read.",
      variant: "success",
    });
  };

  const logout = () => {
    close();
    toast({
      title: "Logged out (demo)",
      message: "Auth is not configured yet — this is a placeholder action.",
      variant: "info",
    });
  };

  useEffect(() => {
    if (!open) return;

    const onDocPointerDown = (e) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(e.target)) return;
      close();
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus?.();
      }
    };

    document.addEventListener("pointerdown", onDocPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="notify-menu" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`notify-trigger ${open ? "open" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="notify-trigger-icon" aria-hidden="true">
          <IconBell size={18} />
        </span>
        {unreadCount ? (
          <span
            className="notify-dot"
            aria-label={`${unreadCount} unread notifications`}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          className="notify-dropdown"
          role="menu"
          aria-label="Notifications menu"
        >
          <div className="notify-header" role="none">
            <div className="notify-header-title">
              <strong>Notifications</strong>
              {unreadCount ? (
                <span style={{ marginLeft: 8 }}>
                  <Badge variant="secondary">{unreadCount} new</Badge>
                </span>
              ) : null}
            </div>

            <button
              type="button"
              className="notify-linkbtn"
              onClick={() => {
                close();
                navigate("/notifications");
              }}
            >
              View all
            </button>
          </div>

          <div className="notify-scroll" role="none">
            {items.length ? (
              <div className="notify-list" role="none">
                {items.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    role="menuitem"
                    className={`notify-item ${n.read ? "" : "unread"}`}
                    onClick={() => {
                      markRead(n.id);
                      close();
                      navigate("/notifications");
                    }}
                    aria-label={`${n.title}. ${n.body}`}
                  >
                    <div className="notify-item-main">
                      <div className="notify-item-title">
                        <span>{n.title}</span>
                        {!n.read ? (
                          <span className="notify-item-pill">New</span>
                        ) : null}
                      </div>
                      <div className="notify-item-body">{n.body}</div>
                    </div>
                    <div className="notify-item-meta">{n.time}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="notify-empty" role="none">
                You’re all caught up.
              </div>
            )}

            {unreadCount ? (
              <button
                type="button"
                className="notify-utility"
                onClick={markAllRead}
              >
                Mark all read
              </button>
            ) : null}
          </div>

          <div className="notify-divider" role="separator" />

          <button
            type="button"
            className="notify-logout"
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
