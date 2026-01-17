import React, { useState } from "react";
import { Card, Button, Input } from "../components/ui";
import { useToast } from "../components/ToastProvider";

// PUBLIC_INTERFACE
export default function ChangeMobilePage() {
  /** Account page to change mobile number (demo/local UI placeholder). */
  const { toast } = useToast();
  const [mobile, setMobile] = useState("");

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Change Mobile</h1>
          <p className="page-subtitle">Update the mobile number associated with your account.</p>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 620 }}>
        <Card title="Mobile number">
          <label className="mini" htmlFor="mobile">
            New mobile number
          </label>
          <Input
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="e.g., +1 555 123 4567"
            inputMode="tel"
          />
          <div className="hr" />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="primary"
              type="button"
              onClick={() =>
                toast({
                  title: "Requested (demo)",
                  message: "Mobile update flow is not connected to backend yet.",
                  variant: "info",
                })
              }
              disabled={!mobile.trim()}
            >
              Save changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
