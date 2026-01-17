import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Button } from "../components/ui";
import { MOCK_JOBS, MOCK_CHALLENGES, MOCK_TESTS } from "../data/mockData";

// PUBLIC_INTERFACE
export default function DashboardPage({ profile, applications }) {
  /** Dashboard landing page with KPIs and quick actions. */
  const kpis = useMemo(() => {
    const skillsCount = (profile?.skills || []).length;
    const apps = applications?.length || 0;
    const activeChallenges = MOCK_CHALLENGES.length;
    const jobMatches = MOCK_JOBS.filter((j) => j.match >= 70).length;
    return { skillsCount, apps, activeChallenges, jobMatches };
  }, [profile, applications]);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Track your progress across jobs, applications, challenges, and mock tests.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/jobs">
            <Button variant="primary" type="button">
              Explore Jobs
            </Button>
          </Link>
          <Link to="/profile">
            <Button type="button">Update Skills</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-3">
        <Card title="Skills">
          <div className="kpi">
            <strong>{kpis.skillsCount}</strong>
            <span>skills added</span>
          </div>
          <div className="hr" />
          <span className="mini">Add skills to improve match scoring and unlock challenges.</span>
        </Card>

        <Card title="Job Matches">
          <div className="kpi">
            <strong>{kpis.jobMatches}</strong>
            <span>strong matches</span>
          </div>
          <div className="hr" />
          <span className="mini">Matches are calculated from your selected skills and preferences.</span>
        </Card>

        <Card title="Applications">
          <div className="kpi">
            <strong>{kpis.apps}</strong>
            <span>tracked</span>
          </div>
          <div className="hr" />
          <span className="mini">Keep statuses up to date to monitor your pipeline.</span>
        </Card>
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <Card title="Recommended Next Steps">
          <div className="list">
            <div className="list-item">
              <div>
                <h4>
                  Take a mock test <Badge variant="primary">{MOCK_TESTS[0].durationMin} min</Badge>
                </h4>
                <p>Validate your strengths and get targeted recommendations.</p>
              </div>
              <Link to="/mock-tests">
                <Button type="button">Start</Button>
              </Link>
            </div>

            <div className="list-item">
              <div>
                <h4>
                  Try a challenge <Badge variant="secondary">{MOCK_CHALLENGES[0].reward}</Badge>
                </h4>
                <p>Earn XP and demonstrate skills with practical tasks.</p>
              </div>
              <Link to="/challenges">
                <Button type="button">Open</Button>
              </Link>
            </div>

            <div className="list-item">
              <div>
                <h4>Track an application</h4>
                <p>Add a job to your pipeline and keep the status updated.</p>
              </div>
              <Link to="/applications">
                <Button type="button">Manage</Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card title="Profile Snapshot">
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
            {profile?.name ? `Signed in as ${profile.name}.` : "Set up your profile to personalize results."}
          </p>
          <div className="hr" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(profile?.skills || []).slice(0, 10).map((s) => (
              <Badge key={s} variant="primary">
                {s}
              </Badge>
            ))}
            {(!profile?.skills || profile.skills.length === 0) ? (
              <span className="mini">No skills yet — add a few to see personalized matches.</span>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
