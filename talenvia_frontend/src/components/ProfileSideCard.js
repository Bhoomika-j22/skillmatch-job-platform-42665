import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input } from "./ui";
import { useToast } from "./ToastProvider";

/**
 * Inline SVG icon set for the profile side card (no external deps).
 * Uses currentColor so CSS can control the "blue icon" look.
 */
function ProfileIcon({ name, size = 18, className = "" }) {
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
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M7.5 3.5h3l1.2 5-2 1.1c1.2 2.5 3.3 4.6 5.8 5.8l1.1-2 5 1.2v3c0 1.1-.9 2-2 2C10 21.6 2.4 14 2.5 4.3c0-1.1.9-2 2-2h3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <path
            d="M4 6h16v12H4V6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M4 7l8 6 8-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "location":
      return (
        <svg {...common}>
          <path
            d="M12 22s7-4.5 7-12a7 7 0 1 0-14 0c0 7.5 7 12 7 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <path
            d="M9 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M4 12h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path
            d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M5 14l.6 2.6L8 17l-2.4.9L5 20l-.6-2.1L2 17l2.4-.4L5 14Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path
            d="M10 13a5 5 0 0 0 7.1 0l1.4-1.4a5 5 0 0 0-7.1-7.1L10 4.9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14 11a5 5 0 0 0-7.1 0L5.5 12.4a5 5 0 1 0 7.1 7.1L14 18.1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path
            d="M12 16V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 9l5-5 5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function initialsFromName(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] || "U";
  const second = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + second).toUpperCase();
}

function normalizeUrl(val) {
  const v = String(val || "").trim();
  if (!v) return "";
  // Allow users to type "linkedin.com/in/..." without scheme; normalize to https.
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

function isValidEmail(val) {
  const v = String(val || "").trim();
  if (!v) return true; // optional
  // Basic front-end validation (not RFC-perfect, but sufficient for UI).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValidMobile(val) {
  const v = String(val || "").trim();
  if (!v) return true; // optional
  // Digits only with sensible length range.
  return /^\d{7,15}$/.test(v);
}

function isValidUrl(val) {
  const v = String(val || "").trim();
  if (!v) return true; // optional
  try {
    // Accept without scheme by normalizing first.
    // eslint-disable-next-line no-new
    new URL(normalizeUrl(v));
    return true;
  } catch {
    return false;
  }
}

// PUBLIC_INTERFACE
export default function ProfileSideCard({ profile, setProfile }) {
  /**
   * Right-side profile card: rounded white background, subtle shadow, avatar,
   * name/role, resume upload, light dividers, and blue icons for info sections.
   *
   * Editing behavior (demo):
   * - Inline edit for: full name, job title/role, email, mobile, LinkedIn, GitHub, personal website.
   * - Save persists to App profile state (App uses useLocalStorage => localStorage persistence).
   */
  const { toast } = useToast();

  const fileInputRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    links: { linkedin: "", github: "", portfolio: "" },
  });
  const [errors, setErrors] = useState({});

  const name = profile?.name || "User";
  const role = profile?.role || profile?.targetRole || "Candidate";
  const headline = profile?.headline || "Open to opportunities";
  const location = profile?.location || "—";
  const phone = profile?.phone || "—";
  const email = profile?.email || "—";

  const skills = useMemo(() => {
    const arr = Array.isArray(profile?.skills) ? profile.skills : [];
    return arr.slice(0, 8);
  }, [profile]);

  const web = useMemo(() => {
    const links = profile?.links || {};
    return {
      portfolio: links.portfolio || "—",
      linkedin: links.linkedin || "—",
      github: links.github || "—",
    };
  }, [profile]);

  useEffect(() => {
    // When starting to edit, keep draft synced with current profile.
    if (!isEditing) return;
    const links = profile?.links || {};
    setDraft({
      name: String(profile?.name || ""),
      role: String(profile?.role || profile?.targetRole || ""),
      email: String(profile?.email || ""),
      phone: String(profile?.phone || ""),
      links: {
        linkedin: String(links.linkedin || ""),
        github: String(links.github || ""),
        portfolio: String(links.portfolio || ""),
      },
    });
    setErrors({});
  }, [isEditing, profile]);

  function validate(nextDraft) {
    const nextErrors = {};
    const fullName = String(nextDraft?.name || "").trim();
    if (!fullName) nextErrors.name = "Full name is required.";

    if (!isValidEmail(nextDraft?.email)) nextErrors.email = "Enter a valid email (e.g., name@domain.com).";
    if (!isValidMobile(nextDraft?.phone)) nextErrors.phone = "Mobile must be digits only (7–15 digits).";

    if (!isValidUrl(nextDraft?.links?.linkedin)) nextErrors.linkedin = "Enter a valid URL.";
    if (!isValidUrl(nextDraft?.links?.github)) nextErrors.github = "Enter a valid URL.";
    if (!isValidUrl(nextDraft?.links?.portfolio)) nextErrors.portfolio = "Enter a valid URL.";

    return nextErrors;
  }

  function onPickResumeClick() {
    fileInputRef.current?.click();
  }

  function onResumeSelected(e) {
    const f = e.target.files?.[0] || null;
    setResumeFile(f);
  }

  function startEditing() {
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    setErrors({});
  }

  function saveEdits() {
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast({ title: "Fix validation errors", message: "Please review the highlighted fields.", variant: "error" });
      return;
    }

    if (typeof setProfile !== "function") {
      // Component can still render read-only if setProfile is not provided.
      toast({ title: "Cannot save", message: "Profile update handler not connected.", variant: "error" });
      return;
    }

    const nextProfile = {
      ...(profile || {}),
      name: String(draft.name || "").trim(),
      role: String(draft.role || "").trim(),
      email: String(draft.email || "").trim(),
      phone: String(draft.phone || "").trim(),
      links: {
        ...(profile?.links || {}),
        linkedin: String(draft.links.linkedin || "").trim() ? normalizeUrl(draft.links.linkedin) : "",
        github: String(draft.links.github || "").trim() ? normalizeUrl(draft.links.github) : "",
        portfolio: String(draft.links.portfolio || "").trim() ? normalizeUrl(draft.links.portfolio) : "",
      },
    };

    // Persist via App's useLocalStorage state.
    setProfile(nextProfile);

    setIsEditing(false);
    toast({ title: "Profile updated", message: "Saved locally (demo).", variant: "success" });
  }

  return (
    <section className="dash-profilecard" aria-label="Profile summary">
      <header className="dash-profilecard-head">
        <div className="dash-profilecard-avatar" aria-hidden="true">
          {initialsFromName(isEditing ? draft.name || name : name)}
        </div>

        <div className="dash-profilecard-meta">
          <div className="dash-profilecard-name">{isEditing ? draft.name || "—" : name}</div>
          <div className="dash-profilecard-role">{isEditing ? draft.role || "—" : role}</div>
          <div className="dash-profilecard-headline">{headline}</div>

          <div className="dash-profilecard-editbar">
            {!isEditing ? (
              <Button type="button" size="sm" variant="secondary" className="dash-profilecard-editbtn" onClick={startEditing}>
                Edit
              </Button>
            ) : (
              <div className="dash-profilecard-editactions" role="group" aria-label="Profile edit actions">
                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  className="dash-profilecard-editbtn"
                  onClick={saveEdits}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="dash-profilecard-editbtn"
                  onClick={cancelEditing}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dash-profilecard-divider" role="separator" />

      <section className="dash-profilecard-section" aria-label="Resume upload">
        <div className="dash-profilecard-section-title">
          <span className="dash-profilecard-section-icon" aria-hidden="true">
            <ProfileIcon name="upload" />
          </span>
          Resume
        </div>

        <div className="dash-profilecard-upload">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onResumeSelected}
            className="dash-profilecard-file"
            aria-label="Upload resume file"
          />

          <div className="dash-profilecard-upload-row">
            <div className="dash-profilecard-upload-text">
              <div className="dash-profilecard-upload-label">
                {resumeFile ? resumeFile.name : "Upload your resume"}
              </div>
              <div className="dash-profilecard-upload-sub">
                PDF/DOC/DOCX • max size depends on server
              </div>
            </div>

            <Button type="button" className="dash-applybtn" onClick={onPickResumeClick}>
              Upload
            </Button>
          </div>
        </div>
      </section>

      <div className="dash-profilecard-divider light" role="separator" />

      <section className="dash-profilecard-section" aria-label="Contact information">
        <div className="dash-profilecard-section-title">
          <span className="dash-profilecard-section-icon" aria-hidden="true">
            <ProfileIcon name="mail" />
          </span>
          Contact
        </div>

        <ul className="dash-profilecard-list" aria-label="Contact details">
          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="phone" />
            </span>
            <span className="dash-profilecard-row-label">Mobile</span>
            <span className="dash-profilecard-row-value">
              {isEditing ? (
                <Input
                  value={draft.phone}
                  onChange={(e) => {
                    const next = { ...draft, phone: e.target.value };
                    setDraft(next);
                    setErrors((prev) => ({ ...(prev || {}), phone: undefined }));
                  }}
                  placeholder="Digits only"
                  inputMode="numeric"
                  aria-label="Mobile number"
                  error={errors.phone}
                />
              ) : (
                phone
              )}
            </span>
          </li>

          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="mail" />
            </span>
            <span className="dash-profilecard-row-label">Email</span>
            <span className="dash-profilecard-row-value">
              {isEditing ? (
                <Input
                  value={draft.email}
                  onChange={(e) => {
                    const next = { ...draft, email: e.target.value };
                    setDraft(next);
                    setErrors((prev) => ({ ...(prev || {}), email: undefined }));
                  }}
                  placeholder="name@domain.com"
                  inputMode="email"
                  aria-label="Email address"
                  error={errors.email}
                />
              ) : (
                email
              )}
            </span>
          </li>

          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="location" />
            </span>
            <span className="dash-profilecard-row-label">Location</span>
            <span className="dash-profilecard-row-value">{location}</span>
          </li>
        </ul>
      </section>

      <div className="dash-profilecard-divider light" role="separator" />

      <section className="dash-profilecard-section" aria-label="Skills">
        <div className="dash-profilecard-section-title">
          <span className="dash-profilecard-section-icon" aria-hidden="true">
            <ProfileIcon name="spark" />
          </span>
          Skills
        </div>

        <div className="dash-profilecard-skills" aria-label="Skill tags">
          {skills.length ? (
            skills.map((s) => (
              <span key={s} className="dash-profilecard-skill">
                {s}
              </span>
            ))
          ) : (
            <span className="dash-profilecard-muted">No skills added yet</span>
          )}
        </div>
      </section>

      <div className="dash-profilecard-divider light" role="separator" />

      <section className="dash-profilecard-section" aria-label="Web profiles">
        <div className="dash-profilecard-section-title">
          <span className="dash-profilecard-section-icon" aria-hidden="true">
            <ProfileIcon name="link" />
          </span>
          Web Profiles
        </div>

        <ul className="dash-profilecard-list" aria-label="Web profile links">
          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="briefcase" />
            </span>
            <span className="dash-profilecard-row-label">Website</span>
            <span className="dash-profilecard-row-value">
              {isEditing ? (
                <Input
                  value={draft.links.portfolio}
                  onChange={(e) => {
                    const next = { ...draft, links: { ...draft.links, portfolio: e.target.value } };
                    setDraft(next);
                    setErrors((prev) => ({ ...(prev || {}), portfolio: undefined }));
                  }}
                  placeholder="https://your-site.com"
                  aria-label="Personal website"
                  error={errors.portfolio}
                />
              ) : web.portfolio && web.portfolio !== "—" ? (
                <a href={normalizeUrl(web.portfolio)} target="_blank" rel="noreferrer">
                  {web.portfolio}
                </a>
              ) : (
                "—"
              )}
            </span>
          </li>

          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="link" />
            </span>
            <span className="dash-profilecard-row-label">LinkedIn</span>
            <span className="dash-profilecard-row-value">
              {isEditing ? (
                <Input
                  value={draft.links.linkedin}
                  onChange={(e) => {
                    const next = { ...draft, links: { ...draft.links, linkedin: e.target.value } };
                    setDraft(next);
                    setErrors((prev) => ({ ...(prev || {}), linkedin: undefined }));
                  }}
                  placeholder="https://linkedin.com/in/…"
                  aria-label="LinkedIn profile"
                  error={errors.linkedin}
                />
              ) : web.linkedin && web.linkedin !== "—" ? (
                <a href={normalizeUrl(web.linkedin)} target="_blank" rel="noreferrer">
                  {web.linkedin}
                </a>
              ) : (
                "—"
              )}
            </span>
          </li>

          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="link" />
            </span>
            <span className="dash-profilecard-row-label">GitHub</span>
            <span className="dash-profilecard-row-value">
              {isEditing ? (
                <Input
                  value={draft.links.github}
                  onChange={(e) => {
                    const next = { ...draft, links: { ...draft.links, github: e.target.value } };
                    setDraft(next);
                    setErrors((prev) => ({ ...(prev || {}), github: undefined }));
                  }}
                  placeholder="https://github.com/…"
                  aria-label="GitHub profile"
                  error={errors.github}
                />
              ) : web.github && web.github !== "—" ? (
                <a href={normalizeUrl(web.github)} target="_blank" rel="noreferrer">
                  {web.github}
                </a>
              ) : (
                "—"
              )}
            </span>
          </li>
        </ul>
      </section>
    </section>
  );
}
