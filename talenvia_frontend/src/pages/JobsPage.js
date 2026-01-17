import React, { useMemo, useState } from "react";
import { Card, Badge, Button, Input, Select } from "../components/ui";
import { MOCK_JOBS } from "../data/mockData";

// PUBLIC_INTERFACE
export default function JobsPage({ profile, onApply }) {
  /** Job listings with filters (search, location, type, match). */
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Any");
  const [jobType, setJobType] = useState("Any");
  const [minMatch, setMinMatch] = useState(60);

  const locations = useMemo(() => ["Any", ...Array.from(new Set(MOCK_JOBS.map((j) => j.location)))], []);
  const types = useMemo(() => ["Any", ...Array.from(new Set(MOCK_JOBS.map((j) => j.type)))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_JOBS.filter((j) => {
      if (location !== "Any" && j.location !== location) return false;
      if (jobType !== "Any" && j.type !== jobType) return false;
      if (j.match < minMatch) return false;
      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.tags.join(" ").toLowerCase().includes(q)
      );
    });
  }, [query, location, jobType, minMatch]);

  const inferredSkills = (profile?.skills || []).slice(0, 6);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Job Listings</h1>
          <p className="page-subtitle">Search jobs and filter by match score, location, and type.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Badge variant="primary">{filtered.length} results</Badge>
          <Badge variant="secondary">API: {process.env.REACT_APP_API_BASE || "not configured"}</Badge>
        </div>
      </div>

      <div className="split">
        <Card title="Filters">
          <label className="mini" htmlFor="job-search">
            Search
          </label>
          <Input
            id="job-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Role, company, skill…"
          />

          <div style={{ height: 10 }} />

          <label className="mini" htmlFor="job-location">
            Location
          </label>
          <Select id="job-location" value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>

          <div style={{ height: 10 }} />

          <label className="mini" htmlFor="job-type">
            Type
          </label>
          <Select id="job-type" value={jobType} onChange={(e) => setJobType(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>

          <div style={{ height: 10 }} />

          <label className="mini" htmlFor="job-match">
            Minimum match ({minMatch}%)
          </label>
          <Input
            id="job-match"
            type="range"
            min="0"
            max="100"
            value={minMatch}
            onChange={(e) => setMinMatch(Number(e.target.value))}
          />

          <div className="hr" />
          <div className="mini">Your top skills:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {inferredSkills.length ? (
              inferredSkills.map((s) => (
                <Badge key={s} variant="primary">
                  {s}
                </Badge>
              ))
            ) : (
              <span className="mini">Add skills in Profile to improve matching.</span>
            )}
          </div>
        </Card>

        <div className="grid" style={{ alignContent: "start" }}>
          {filtered.map((job) => (
            <Card key={job.id} className="">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, letterSpacing: "-0.01em" }}>{job.title}</h3>
                  <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 13 }}>
                    {job.company} • {job.location} • {job.type} • {job.level}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Badge variant={job.match >= 80 ? "primary" : "secondary"}>{job.match}% match</Badge>
                  <span className="mini">{job.postedDaysAgo}d ago</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {job.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                <div className="mini">Salary: {job.salary}</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Button type="button" onClick={() => onApply(job)}>
                    Track Application
                  </Button>
                  <Button variant="primary" type="button" onClick={() => onApply(job, { auto: true })}>
                    Quick Apply
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filtered.length === 0 ? (
            <Card title="No results">
              <p style={{ margin: 0, color: "var(--muted)" }}>Try widening your filters or adding more skills.</p>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
