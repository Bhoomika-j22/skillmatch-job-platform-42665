import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar";
import MainSearchBar from "./components/MainSearchBar";
import ProfileMenu from "./components/ProfileMenu";
import ToastProvider from "./components/ToastProvider";
import DashboardPage from "./pages/DashboardPage";
import JobsPage from "./pages/JobsPage";
import ProfilePage from "./pages/ProfilePage";
import ChallengesPage from "./pages/ChallengesPage";
import MockTestsPage from "./pages/MockTestsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import NotificationsPage, { getInitialNotifications } from "./pages/NotificationsPage";
import NotFoundPage from "./pages/NotFoundPage";

import { useLocalStorage } from "./hooks/useLocalStorage";

/**
 * PUBLIC_INTERFACE
 * Root application component for Talenvia frontend.
 * Provides app shell, navigation, routing, and local demo state.
 */
function App() {
  const [profile, setProfile] = useLocalStorage("talenvia.profile", {
    name: "",
    targetRole: "Frontend Engineer",
    level: "Mid",
    preference: "Remote",
    skills: ["React", "CSS", "REST APIs"],
  });

  const [applications, setApplications] = useLocalStorage("talenvia.applications", []);
  const [completedChallenges, setCompletedChallenges] = useLocalStorage("talenvia.challenges.completed", []);
  const [testHistory, setTestHistory] = useLocalStorage("talenvia.tests.history", []);
  const [notifications, setNotifications] = useLocalStorage("talenvia.notifications", getInitialNotifications());

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const handleApply = (job, opts = {}) => {
    const id = `app_${job.id}_${Date.now()}`;
    const next = {
      id,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      status: opts.auto ? "Applied" : "Saved",
      trackedAt: new Date().toISOString(),
      trackedAtLabel: "just now",
      notes: [],
    };

    setApplications((prev) => [next, ...(prev || [])]);

    // add a notification
    setNotifications((prev) => [
      { id: `n_${Date.now()}`, type: "application", title: "Application tracked", body: `Added ${job.title} at ${job.company}.`, time: "now", read: false },
      ...(prev || []),
    ]);
  };

  // Keep the "trackedAtLabel" human-friendly (demo only)
  const applicationsWithLabels = useMemo(() => {
    return (applications || []).map((a) => {
      const dt = a.trackedAt ? new Date(a.trackedAt) : null;
      const mins = dt ? Math.round((Date.now() - dt.getTime()) / 60000) : null;
      let label = a.trackedAtLabel || "recently";
      if (mins !== null && mins < 60) label = `${mins}m ago`;
      else if (mins !== null) label = `${Math.max(1, Math.round(mins / 60))}h ago`;
      return { ...a, trackedAtLabel: label };
    });
  }, [applications]);

  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="app-shell app-shell--sidebar">
          <Sidebar notificationCount={unreadCount} />

          <main className="app-main" aria-label="Main content">
            <div className="app-main-inner">
              <div className="app-tools" aria-label="Global controls">
                <div className="app-tools-right">
                  <ProfileMenu profileName={profile?.name} />
                </div>
              </div>

              <MainSearchBar
                placeholder="Search jobs, skills, companies…"
                onSearch={() => {
                  // Intentionally non-destructive for now: per existing app behavior, there is no global search page yet.
                  // This is the new placement for the search affordance, ready to be wired to filters/results later.
                }}
              />

              <div className="app-content">
                <Routes>
                  <Route path="/" element={<DashboardPage profile={profile} applications={applicationsWithLabels} />} />
                  <Route path="/jobs" element={<JobsPage profile={profile} onApply={handleApply} />} />
                  <Route path="/profile" element={<ProfilePage profile={profile} setProfile={setProfile} />} />
                  <Route
                    path="/challenges"
                    element={
                      <ChallengesPage
                        completedChallenges={completedChallenges}
                        setCompletedChallenges={setCompletedChallenges}
                      />
                    }
                  />
                  <Route
                    path="/mock-tests"
                    element={<MockTestsPage testHistory={testHistory} setTestHistory={setTestHistory} />}
                  />
                  <Route
                    path="/applications"
                    element={<ApplicationsPage applications={applicationsWithLabels} setApplications={setApplications} />}
                  />
                  <Route
                    path="/notifications"
                    element={<NotificationsPage notifications={notifications} setNotifications={setNotifications} />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
