import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Button } from "./ui";

const ToastContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Hook to enqueue toast/snackbar notifications.
 * @returns {{ toast: (t: {title: string, message?: string, variant?: 'success'|'error'|'warn'|'info', durationMs?: number}) => void }}
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fail gracefully if provider not mounted (should not happen in this app after integration).
    return { toast: () => {} };
  }
  return ctx;
}

/**
 * PUBLIC_INTERFACE
 * Provider to render toasts and expose a `toast()` function via context.
 */
export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, message = "", variant = "info", durationMs = 2600 } = {}) => {
      const id = `t_${Date.now()}_${idRef.current++}`;
      const next = { id, title, message, variant };
      setToasts((prev) => [next, ...(prev || [])].slice(0, 4));

      if (durationMs > 0) {
        window.setTimeout(() => remove(id), durationMs);
      }
    },
    [remove]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* aria-live region for announcing toast content */}
      <div className="toast-viewport" role="region" aria-label="Notifications" aria-live="polite" aria-relevant="additions">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.variant}`}>
            <div className="toast-title">{t.title}</div>
            {t.message ? <div className="toast-body">{t.message}</div> : null}
            <div className="toast-actions">
              <Button size="sm" variant="ghost" type="button" onClick={() => remove(t.id)} aria-label="Dismiss notification">
                Dismiss
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
