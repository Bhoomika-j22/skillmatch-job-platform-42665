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

function IconStar({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 2l3 7 7 .5-5.5 4.6 1.8 7.4L12 17.8 5.7 21.5l1.8-7.4L2 9.5 9 9l3-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// PUBLIC_INTERFACE
export default function AboutPage() {
  /** About Us page: full-page informational screen with Back to Dashboard navigation. */
  const navigate = useNavigate();

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
            <h1 className="page-title">About Talenvia</h1>
            <p className="page-subtitle">
              A modern, skill-first job platform designed to help you move from “searching” to “shortlisted” with clarity.
            </p>
          </div>
        </div>
      </div>

      <div className="grid" style={{ maxWidth: 980 }}>
        <Card>
          <div className="info-stack">
            <div>
              <h2 className="info-title">Our mission</h2>
              <p className="info-lead">
                Talenvia helps candidates find roles that actually match their skills, preferences, and growth goals—without
                endless scrolling. We bring structure to your job search through a clean dashboard, smart recommendations,
                and progress-based tools.
              </p>
            </div>

            <div className="hr" />

            <div>
              <h2 className="info-title">What we believe</h2>

              <div className="info-list" aria-label="Talenvia values">
                {[
                  {
                    title: "Skills over buzzwords",
                    body: "Your skills and real outcomes matter more than generic keywords.",
                  },
                  {
                    title: "Transparency in progress",
                    body: "Track applications, get insights, and understand what to improve next.",
                  },
                  {
                    title: "Confidence through practice",
                    body: "Mock tests and challenges make preparation measurable and motivating.",
                  },
                ].map((v) => (
                  <div key={v.title} className="info-row">
                    <span className="info-row-icon" aria-hidden="true">
                      <IconStar size={18} />
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 className="info-row-title">{v.title}</h3>
                      <p className="info-row-body">{v.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
