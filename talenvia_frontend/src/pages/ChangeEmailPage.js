import React, { useState } from "react";
import { Card, Button, Input } from "../components/ui";
import { useToast } from "../components/ToastProvider";

// PUBLIC_INTERFACE
export default function ChangeEmailPage() {
  /** Account page to change email address (demo/local UI placeholder). */
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Change Email</h1>
          <p className="page-subtitle">Update the email address used for account notifications and login.</p>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 620 }}>
        <Card title="Email address">
          <label className="mini" htmlFor="email">
            New email
          </label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            inputMode="email"
          />
          <div className="hr" />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="primary"
              type="button"
              onClick={() =>
                toast({
                  title: "Requested (demo)",
                  message: "Email update flow is not connected to backend yet.",
                  variant: "info",
                })
              }
              disabled={!email.trim()}
            >
              Save changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
