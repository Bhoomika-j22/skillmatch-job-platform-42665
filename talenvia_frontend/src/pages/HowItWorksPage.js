import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/ui";

function IconArrowLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBolt({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M13 2 3 14h7l-1 8 12-14h-7l-1-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// PUBLIC_INTERFACE
export default function HowItWorksPage() {
  /** How Talenvia Works page: explains the platform flow with clear steps and Back to Dashboard navigation. */
  const navigate = useNavigate();

  const steps = [
    {
      title: "Build your skill profile",
      body: "Add your target role, experience level, work preference, and key skills. This improves match quality immediately.",
      icon: IconCheck,
    },
    {
      title: "Discover jobs with smarter recommendations",
      body: "See curated roles on the dashboard and refine via filters—remote, full-time, or top-match—without losing momentum.",
      icon: IconBolt,
    },
    {
      title: "Track applications end-to-end",
      body: "Every applied or saved role becomes part of your pipeline so you can stay organized and follow up on time.",
      icon: IconCheck,
    },
    {
      title: "Improve with mock tests and challenges",
      body: "Practice in a structured way, earn progress, and sharpen the skills employers actually evaluate.",
      icon: IconBolt,
    },
  ];

  return (
    <div className="container">
      <div className="page-header" style={{ alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button variant="ghost" type="button" onClick={() => navigate("/")} aria-label="Back to Dashboard">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span aria-hidden="true">
                <IconArrowLeft size={18} />
              </span>
              Back to Dashboard
            </span>
          </Button>

          <div>
            <h1 className="page-title">How Talenvia Works</h1>
            <p className="page-subtitle">A simple flow: profile → recommendations → tracking → improvement.</p>
          </div>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 980 }}>
        <Card>
          <div className="info-stack">
            <div>
              <h2 className="info-title">Your journey in 4 steps</h2>
              <p className="info-lead">
                Talenvia is built to keep you focused on high-signal actions that move you closer to interviews.
              </p>
            </div>

            <div className="hr" />

            <div className="info-list" aria-label="How Talenvia Works steps">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="info-row">
                    <span className="info-row-icon" aria-hidden="true" title={`Step ${idx + 1}`}>
                      <Icon size={18} />
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 className="info-row-title">{`Step ${idx + 1}: ${s.title}`}</h3>
                      <p className="info-row-body">{s.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hr" />

            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <Button type="button" onClick={() => navigate("/profile")} aria-label="Go to Profile and Skills">
                Go to Profile &amp; Skills
              </Button>
              <Button variant="primary" type="button" onClick={() => navigate("/jobs")} aria-label="Browse Jobs">
                Browse Jobs
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
