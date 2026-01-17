import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input } from "../components/ui";
import { useToast } from "../components/ToastProvider";

function ChevronLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function normalizeCompanyName(name) {
  return String(name || "").trim().replace(/\s+/g, " ");
}

function readBlockedCompanies() {
  try {
    const raw = window.localStorage.getItem("talenvia.blockedCompanies");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Support string[] or {name}[]; normalize into string[].
    return parsed
      .map((x) => (typeof x === "string" ? x : x && typeof x.name === "string" ? x.name : ""))
      .map(normalizeCompanyName)
      .filter(Boolean);
  } catch {
    return [];
  }
}

function writeBlockedCompanies(list) {
  window.localStorage.setItem("talenvia.blockedCompanies", JSON.stringify(list));
}

// PUBLIC_INTERFACE
export default function BlockedCompaniesPage() {
  /** Settings sub-page: manage companies that should not see the user profile (demo/local persistence). */
  const navigate = useNavigate();
  const { toast } = useToast();

  const [company, setCompany] = useState("");
  const [blocked, setBlocked] = useState(() => readBlockedCompanies());

  const sortedBlocked = useMemo(() => {
    return [...(blocked || [])].sort((a, b) => a.localeCompare(b));
  }, [blocked]);

  const addCompany = () => {
    const name = normalizeCompanyName(company);
    if (!name) {
      toast({ title: "Fix required", message: "Company name cannot be empty.", variant: "error" });
      return;
    }
    const exists = (blocked || []).some((c) => c.toLowerCase() === name.toLowerCase());
    if (exists) {
      toast({ title: "Already blocked", message: "This company is already in your blocked list.", variant: "info" });
      return;
    }
    const next = [...(blocked || []), name];
    setBlocked(next);
    writeBlockedCompanies(next);
    setCompany("");
    toast({ title: "Added", message: "Company added to blocked list.", variant: "success" });
  };

  const removeCompany = (name) => {
    const next = (blocked || []).filter((c) => c.toLowerCase() !== String(name).toLowerCase());
    setBlocked(next);
    writeBlockedCompanies(next);
    toast({ title: "Removed", message: "Company removed from blocked list.", variant: "success" });
  };

  const clearAll = () => {
    setBlocked([]);
    writeBlockedCompanies([]);
    toast({ title: "Cleared", message: "Blocked companies cleared.", variant: "success" });
  };

  return (
    <div className="container">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <button type="button" className="settings-backbtn" onClick={() => navigate("/settings")} aria-label="Back">
            <ChevronLeft size={18} />
            Back
          </button>

          <div>
            <h1 className="page-title">Blocked Companies</h1>
            <p className="page-subtitle">Choose companies you don’t want to show your profile to.</p>
          </div>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 860 }}>
        <Card
          title="Add a company"
          header={
            <span className="settings-inline-icon" aria-hidden="true" title="Blocked">
              <IconBlock size={18} />
            </span>
          }
        >
          <div className="settings-form-grid">
            <Input
              label="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Example Corp"
            />
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
              <Button variant="primary" type="button" onClick={addCompany} disabled={!company.trim()}>
                Add
              </Button>
              <Button variant="ghost" type="button" onClick={clearAll} disabled={!blocked.length}>
                Clear all
              </Button>
            </div>
          </div>
        </Card>

        <Card title={`Blocked list (${sortedBlocked.length})`}>
          {sortedBlocked.length === 0 ? (
            <div className="dash-empty" style={{ background: "rgba(245, 247, 251, 0.55)" }}>
              <div className="dash-empty-title">No blocked companies</div>
              <div className="dash-empty-text">Add a company above to prevent it from seeing your profile (demo UI).</div>
            </div>
          ) : (
            <div className="list" aria-label="Blocked companies list" style={{ gap: 10 }}>
              {sortedBlocked.map((name) => (
                <div key={name} className="list-item" style={{ alignItems: "center" }}>
                  <div className="settings-unified-left" style={{ flex: 1 }}>
                    <span className="settings-unified-icon" aria-hidden="true">
                      <IconBlock size={18} />
                    </span>
                    <div className="settings-unified-titlewrap" style={{ flex: 1 }}>
                      <h4 className="settings-unified-title" style={{ margin: 0 }}>
                        {name}
                      </h4>
                      <p style={{ margin: "4px 0 0" }}>Your profile won’t be shown to this company.</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => removeCompany(name)}
                    aria-label={`Remove ${name} from blocked companies`}
                    className="danger"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
