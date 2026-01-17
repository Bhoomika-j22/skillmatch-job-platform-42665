import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "../components/ui";
import { MOCK_JOBS } from "../data/mockData";

/**
 * Simple inline SVG icon set to match the design without adding dependencies.
 */
function Icon({ name = "search", size = 16, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": "true",
    focusable: "false",
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <path
            d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M21 21l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path
            d="M4 6h16M7 12h10M10 18h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "dots":
      return (
        <svg {...common}>
          <path
            d="M5 12h.01M12 12h.01M19 12h.01"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
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
    case "help":
      return (
        <svg {...common}>
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M12 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function ProgressRing({ value = 80, size = 76 }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (clamped / 100) * c;

  return (
    <div className="dash-ring" aria-label={`Career score ${clamped} out of 100`}>
      <svg width={size} height={size} className="dash-ring-svg" aria-hidden="true">
        <circle className="dash-ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
        <circle
          className="dash-ring-meter"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <div className="dash-ring-center">
        <div className="dash-ring-value">{clamped}</div>
        <div className="dash-ring-label">Your score</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function DashboardPage({ profile, applications }) {
  /** Dashboard landing page matching the extracted 3-column design notes. */
  const [chip, setChip] = useState("Recommended");
  const [sort, setSort] = useState("Relevance");

  const kpis = useMemo(() => {
    const skillsCount = (profile?.skills || []).length;
    const apps = applications?.length || 0;
    // Derived tracker stats (demo)
    const inReview = Math.max(0, Math.min(apps, Math.round(apps * 0.45)));
    const interviews = Math.max(0, Math.min(apps, Math.round(apps * 0.18)));
    return { skillsCount, apps, inReview, interviews };
  }, [profile, applications]);

  const recommendedJobs = useMemo(() => {
    const base = MOCK_JOBS.slice().sort((a, b) => b.match - a.match);

    let filtered = base;
    if (chip === "Remote") filtered = filtered.filter((j) => String(j.location).toLowerCase().includes("remote"));
    if (chip === "Full-time") filtered = filtered.filter((j) => String(j.type).toLowerCase().includes("full"));
    if (chip === "Top Match") filtered = filtered.filter((j) => Number(j.match) >= 80);

    if (sort === "Newest") {
      filtered = filtered.slice().sort((a, b) => (a.postedDaysAgo || 0) - (b.postedDaysAgo || 0));
    } else if (sort === "Match") {
      filtered = filtered.slice().sort((a, b) => (b.match || 0) - (a.match || 0));
    } // "Relevance" keeps default

    return filtered;
  }, [chip, sort]);

  const careerScore = useMemo(() => {
    // Demo scoring: skills contribute, applications contribute slightly; capped.
    const skills = (profile?.skills || []).length;
    const score = Math.min(100, Math.round(55 + skills * 5 + (applications?.length || 0) * 3));
    return Math.max(0, score);
  }, [profile, applications]);

  return (
    <div className="dash">
      <main className="dash-main" aria-label="Dashboard content">
        <div className="dash-grid">
          {/* Left column - Recommended Jobs */}
          <section className="dash-panel" aria-label="Recommended Jobs">
            <div className="dash-panel-head">
              <div>
                <h1 className="dash-title">Recommended Jobs</h1>
                <p className="dash-subtitle">Based on your profile and recent activity</p>
              </div>

              <div className="dash-panel-controls">
                <div className="dash-chips" role="tablist" aria-label="Job filters">
                  {["Recommended", "Remote", "Full-time", "Top Match"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`dash-chip ${chip === c ? "active" : ""}`}
                      onClick={() => setChip(c)}
                      aria-pressed={chip === c}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="dash-control-row">
                  <label className="dash-selectwrap">
                    <span className="dash-selectlabel">Sort by:</span>
                    <select
                      className="dash-select"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      aria-label="Sort recommended jobs"
                    >
                      <option value="Relevance">Relevance</option>
                      <option value="Match">Match</option>
                      <option value="Newest">Newest</option>
                    </select>
                  </label>

                  <button className="dash-iconbtn" type="button" aria-label="More filters">
                    <Icon name="filter" />
                  </button>
                </div>
              </div>
            </div>

            <div className="dash-joblist" role="list" aria-label="Recommended job results">
              {recommendedJobs.map((job) => (
                <article key={job.id} className="dash-jobcard" role="listitem">
                  <div className="dash-job-left">
                    <div className="dash-company-icon" aria-hidden="true">
                      {String(job.company || "C").slice(0, 1).toUpperCase()}
                    </div>

                    <div className="dash-job-meta">
                      <div className="dash-job-title">{job.title}</div>
                      <div className="dash-job-sub">
                        {job.company} • {job.location} • {job.type} • {job.postedDaysAgo}d ago
                      </div>

                      <div className="dash-tags" aria-label="Job tags">
                        {(job.tags || []).slice(0, 3).map((t) => (
                          <span key={t} className="dash-tag">
                            {t}
                          </span>
                        ))}
                        <span className="dash-tag dash-tag-blue">{job.match}% match</span>
                      </div>
                    </div>
                  </div>

                  <div className="dash-job-right">
                    <Link to="/jobs" className="dash-applylink" aria-label={`Apply now for ${job.title} at ${job.company}`}>
                      <Button type="button" className="dash-applybtn">
                        Apply Now
                      </Button>
                    </Link>

                    <Link to="/jobs" className="dash-viewlink" aria-label={`View details for ${job.title}`}>
                      View details
                    </Link>
                  </div>
                </article>
              ))}

              {recommendedJobs.length === 0 ? (
                <div className="dash-empty">
                  <div className="dash-empty-title">No matches</div>
                  <div className="dash-empty-text">Try a different filter or clear your search query.</div>
                  <div style={{ height: 10 }} />
                  <Link to="/profile">
                    <Button type="button">Update Profile</Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </section>

          {/* Middle column - Career Insights */}
          <aside className="dash-side" aria-label="Career Insights">
            <section className="dash-card">
              <div className="dash-card-head">
                <h2 className="dash-card-title">Career Insights</h2>
                <button className="dash-iconbtn" type="button" aria-label="Career insights menu">
                  <Icon name="dots" />
                </button>
              </div>

              <div className="dash-insights">
                <ProgressRing value={careerScore} size={76} />
                <div className="dash-stats">
                  <div className="dash-stat">
                    <div className="dash-stat-label">Skills</div>
                    <div className="dash-stat-value">{kpis.skillsCount}</div>
                  </div>
                  <div className="dash-stat">
                    <div className="dash-stat-label">Applications</div>
                    <div className="dash-stat-value">{kpis.apps}</div>
                  </div>
                  <div className="dash-stat">
                    <div className="dash-stat-label">Top match jobs</div>
                    <div className="dash-stat-value">{MOCK_JOBS.filter((j) => (j.match || 0) >= 80).length}</div>
                  </div>
                </div>
              </div>

              <div className="dash-divider" />

              <div className="dash-minirows" aria-label="Insight breakdown">
                <div className="dash-minirow">
                  <span>Profile completeness</span>
                  <span className="dash-minirow-val">{Math.min(100, 40 + kpis.skillsCount * 8)}%</span>
                </div>
                <div className="dash-minirow">
                  <span>Recommended actions</span>
                  <span className="dash-minirow-val">3</span>
                </div>
                <div className="dash-minirow">
                  <span>Avg match score</span>
                  <span className="dash-minirow-val">
                    {Math.round(
                      (MOCK_JOBS.reduce((sum, j) => sum + (j.match || 0), 0) / Math.max(1, MOCK_JOBS.length)) * 1
                    )}
                    %
                  </span>
                </div>
              </div>
            </section>
          </aside>

          {/* Right column - Application Tracker + extra panels */}
          <aside className="dash-side" aria-label="Application Tracker and Actions">
            <section className="dash-card">
              <div className="dash-card-head">
                <h2 className="dash-card-title">Application Tracker</h2>
                <Badge variant="secondary">{kpis.apps} total</Badge>
              </div>

              <div className="dash-tracker">
                <div className="dash-trackrow">
                  <div className="dash-tracklabel">Applications Sent</div>
                  <div className="dash-trackval">{kpis.apps}</div>
                </div>
                <div className="dash-trackbar">
                  <span className="dash-trackbar-fill" style={{ width: `${Math.min(100, kpis.apps * 18)}%` }} />
                </div>

                <div className="dash-trackrow">
                  <div className="dash-tracklabel">In Review</div>
                  <div className="dash-trackval">{kpis.inReview}</div>
                </div>
                <div className="dash-trackbar">
                  <span className="dash-trackbar-fill" style={{ width: `${Math.min(100, kpis.inReview * 22)}%` }} />
                </div>

                <div className="dash-trackrow">
                  <div className="dash-tracklabel">Interviews</div>
                  <div className="dash-trackval">{kpis.interviews}</div>
                </div>
                <div className="dash-trackbar">
                  <span className="dash-trackbar-fill" style={{ width: `${Math.min(100, kpis.interviews * 30)}%` }} />
                </div>
              </div>

              <div className="dash-divider" />

              <div className="dash-cta-row">
                <Link to="/applications">
                  <Button type="button">View Pipeline</Button>
                </Link>
                <Link to="/jobs">
                  <Button type="button" className="dash-applybtn">
                    Track New
                  </Button>
                </Link>
              </div>
            </section>

            <section className="dash-card">
              <div className="dash-card-head">
                <h2 className="dash-card-title">Recommended Actions</h2>
              </div>

              <div className="dash-actionlist" role="list" aria-label="Recommended actions">
                <div className="dash-action" role="listitem">
                  <div className="dash-action-left">
                    <div className="dash-action-icon" aria-hidden="true">
                      ✓
                    </div>
                    <div>
                      <div className="dash-action-title">Add 2–3 more skills</div>
                      <div className="dash-action-sub">Improve job matching accuracy</div>
                    </div>
                  </div>
                  <Link to="/profile">
                    <Button size="sm" type="button">
                      Review
                    </Button>
                  </Link>
                </div>

                <div className="dash-action" role="listitem">
                  <div className="dash-action-left">
                    <div className="dash-action-icon" aria-hidden="true">
                      ⏱
                    </div>
                    <div>
                      <div className="dash-action-title">Take a mock test</div>
                      <div className="dash-action-sub">Get targeted recommendations</div>
                    </div>
                  </div>
                  <Link to="/mock-tests">
                    <Button size="sm" type="button" className="dash-applybtn">
                      Start
                    </Button>
                  </Link>
                </div>

                <div className="dash-action" role="listitem">
                  <div className="dash-action-left">
                    <div className="dash-action-icon" aria-hidden="true">
                      ★
                    </div>
                    <div>
                      <div className="dash-action-title">Complete a challenge</div>
                      <div className="dash-action-sub">Earn XP and show evidence</div>
                    </div>
                  </div>
                  <Link to="/challenges">
                    <Button size="sm" type="button">
                      Complete
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            <section className="dash-card">
              <div className="dash-card-head">
                <h2 className="dash-card-title">Messages</h2>
              </div>

              <div className="dash-msglist" role="list" aria-label="Messages and next steps">
                <div className="dash-msg" role="listitem">
                  <div>
                    <div className="dash-msg-title">Application viewed</div>
                    <div className="dash-msg-sub">A recruiter viewed your recent application.</div>
                  </div>
                  <span className="dash-msg-time">2h</span>
                </div>
                <div className="dash-divider light" />
                <div className="dash-msg" role="listitem">
                  <div>
                    <div className="dash-msg-title">New jobs matched</div>
                    <div className="dash-msg-sub">3 new roles match your skills.</div>
                  </div>
                  <span className="dash-msg-time">1d</span>
                </div>
                <div className="dash-divider light" />
                <div className="dash-msg" role="listitem">
                  <div>
                    <div className="dash-msg-title">Challenge unlocked</div>
                    <div className="dash-msg-sub">A new challenge is available.</div>
                  </div>
                  <span className="dash-msg-time">2d</span>
                </div>
              </div>

              <div className="dash-card-foot">
                <Link className="dash-viewlink" to="/notifications">
                  View all messages
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
