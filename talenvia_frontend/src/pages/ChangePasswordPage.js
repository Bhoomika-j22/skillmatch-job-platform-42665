import React, { useState } from "react";
import { Card, Button, Input } from "../components/ui";
import { useToast } from "../components/ToastProvider";

// PUBLIC_INTERFACE
export default function ChangePasswordPage() {
  /** Account page to change password (demo/local UI placeholder). */
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = confirm && nextPassword && confirm !== nextPassword;

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Change Password</h1>
          <p className="page-subtitle">
            Choose a strong password you don’t use elsewhere.
          </p>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 620 }}>
        <Card title="Password">
          <label className="mini" htmlFor="current">
            Current password
          </label>
          <Input
            id="current"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <div style={{ height: 10 }} />

          <label className="mini" htmlFor="next">
            New password
          </label>
          <Input
            id="next"
            type="password"
            value={nextPassword}
            onChange={(e) => setNextPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <div style={{ height: 10 }} />

          <label className="mini" htmlFor="confirm">
            Confirm new password
          </label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-invalid={mismatch ? "true" : "false"}
          />
          {mismatch ? (
            <div
              className="field-help"
              style={{ color: "rgba(239, 68, 68, 0.85)" }}
            >
              Passwords do not match.
            </div>
          ) : (
            <div className="field-help">
              Use at least 8 characters with a mix of letters and numbers.
            </div>
          )}

          <div className="hr" />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="primary"
              type="button"
              onClick={() =>
                toast({
                  title: "Requested (demo)",
                  message:
                    "Password update flow is not connected to backend yet.",
                  variant: "info",
                })
              }
              disabled={
                !currentPassword || !nextPassword || !confirm || mismatch
              }
            >
              Update password
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
