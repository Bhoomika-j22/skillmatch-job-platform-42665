import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "../components/ui";

// PUBLIC_INTERFACE
export default function NotFoundPage() {
  /** 404 fallback page. */
  return (
    <div className="container">
      <Card title="Page not found">
        <p style={{ marginTop: 0, color: "var(--muted)" }}>
          The page you’re looking for doesn’t exist. Use navigation or go back
          to the dashboard.
        </p>
        <Link to="/">
          <Button variant="primary" type="button">
            Go to Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  );
}
