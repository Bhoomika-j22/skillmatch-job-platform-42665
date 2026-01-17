/**
 * Mock data for initial scaffolding. Replace with backend API integration when available.
 */

export const MOCK_JOBS = [
  {
    id: "job_1",
    title: "Frontend Engineer (React)",
    company: "Nebula Systems",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    salary: "$90k–$130k",
    tags: ["React", "TypeScript", "UI"],
    postedDaysAgo: 2,
    match: 86,
  },
  {
    id: "job_2",
    title: "Backend Engineer (Node)",
    company: "Quasar Labs",
    location: "New York, NY",
    type: "Full-time",
    level: "Senior",
    salary: "$140k–$180k",
    tags: ["Node.js", "Postgres", "APIs"],
    postedDaysAgo: 5,
    match: 72,
  },
  {
    id: "job_3",
    title: "Data Analyst",
    company: "Cosmic Retail",
    location: "Austin, TX",
    type: "Contract",
    level: "Junior",
    salary: "$45/hr",
    tags: ["SQL", "Dashboards", "Python"],
    postedDaysAgo: 1,
    match: 64,
  },
];

export const MOCK_CHALLENGES = [
  {
    id: "c1",
    title: "React Component Sprint",
    description: "Build an accessible modal with focus-trap and keyboard navigation.",
    reward: "250 XP",
    difficulty: "Medium",
  },
  {
    id: "c2",
    title: "SQL Query Quest",
    description: "Optimize a slow query and explain the index strategy.",
    reward: "180 XP",
    difficulty: "Easy",
  },
  {
    id: "c3",
    title: "API Design Duel",
    description: "Design REST endpoints for application tracking with pagination.",
    reward: "320 XP",
    difficulty: "Hard",
  },
];

export const MOCK_TESTS = [
  { id: "t1", title: "Frontend Fundamentals", durationMin: 25, questions: 20, focus: "React + CSS" },
  { id: "t2", title: "Backend Basics", durationMin: 30, questions: 25, focus: "Node + APIs" },
  { id: "t3", title: "Data Skills", durationMin: 20, questions: 15, focus: "SQL + analytics" },
];

export const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "application", title: "Application viewed", body: "Nebula Systems viewed your application.", time: "2h" },
  { id: "n2", type: "challenge", title: "Challenge unlocked", body: "New 'API Design Duel' challenge is available.", time: "1d" },
  { id: "n3", type: "job", title: "New jobs matched", body: "3 new jobs match your React + UI skills.", time: "2d" },
];
