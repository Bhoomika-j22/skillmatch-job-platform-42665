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
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconUser({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBriefcase({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M10 7V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconBlock({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M7.5 7.5 16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
 * A compact bell trigger with a dropdown panel:
 * - Top: recent notifications (click = mark read)
 * - Below: Settings section (Account, Career Preferences, Blocked Companies) with icons + chevrons
 * - Bottom: divider + Logout
 */

// PUBLIC_INTERFACE
export default function NotificationBell({ notifications = [], setNotifications, maxItems = 4 }) {
  /** Notification bell dropdown with Naukri-inspired settings section + logout. */
  const navigate = useNavigate();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);

  const unreadCount = useMemo(() => (notifications || []).filter((n) => !n.read).length, [notifications]);

  const items = useMemo(() => {
    const list = Array.isArray(notifications) ? notifications : [];
    return list.slice(0, Math.max(0, maxItems));
  }, [notifications, maxItems]);

  const close = () => setOpen(false);

  const markRead = (id) => {
    if (!setNotifications) return;
    setNotifications((prev) => (prev || []).map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    if (!setNotifications) return;
    setNotifications((prev) => (prev || []).map((n) => ({ ...n, read: true })));
    toast({ title: "All caught up", message: "Marked all notifications as read.", variant: "success" });
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

  const settingsItems = [
    {
      key: "account",
      title: "Account",
      subtitle: "Change your primary email, mobile number, or password",
      icon: IconUser,
      to: "/settings/details",
    },
    {
      key: "career",
      title: "Career Preferences",
      subtitle: "Manage job preferences used for recommendations",
      icon: IconBriefcase,
      to: "/settings/career-preferences",
    },
    {
      key: "blocked",
      title: "Blocked Companies",
      subtitle: "Choose companies you don’t want to show your profile to",
      icon: IconBlock,
      to: "/settings/blocked-companies",
    },
  ];

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
          <span className="notify-dot" aria-label={`${unreadCount} unread notifications`}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="notify-dropdown" role="menu" aria-label="Notifications menu">
          <div className="notify-header" role="none">
            <div className="notify-header-title">
              <strong>Notifications</strong>
              {unreadCount ? (
                <span style={{ marginLeft: 8 }}>
                  <Badge variant="secondary">{unreadCount} new</Badge>
                </span>
              ) : null}
            </div>

            <button type="button" className="notify-linkbtn" onClick={() => (close(), navigate("/notifications"))}>
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
                        {!n.read ? <span className="notify-item-pill">New</span> : null}
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
              <button type="button" className="notify-utility" onClick={markAllRead}>
                Mark all read
              </button>
            ) : null}

            <div className="notify-section-title" role="presentation">
              Settings
            </div>

            <div className="notify-settings" role="none">
              {settingsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="menuitem"
                    className="notify-setting"
                    onClick={() => {
                      close();
                      navigate(item.to);
                    }}
                    aria-label={item.title}
                  >
                    <span className="notify-setting-icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <span className="notify-setting-main">
                      <span className="notify-setting-title">{item.title}</span>
                      <span className="notify-setting-sub">{item.subtitle}</span>
                    </span>
                    <span className="notify-setting-right" aria-hidden="true">
                      <ChevronRight size={18} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="notify-divider" role="separator" />

          <button type="button" className="notify-logout" role="menuitem" onClick={logout}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
