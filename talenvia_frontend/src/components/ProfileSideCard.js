import React, { useMemo, useRef, useState } from "react";
import { Button } from "./ui";

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

// PUBLIC_INTERFACE
export default function ProfileSideCard({ profile }) {
  /**
   * Right-side profile card: rounded white background, subtle shadow, avatar,
   * name/role, resume upload, light dividers, and blue icons for info sections.
   */
  const fileInputRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);

  const name = profile?.name || "User";
  const role = profile?.role || "Candidate";
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

  function onPickResumeClick() {
    fileInputRef.current?.click();
  }

  function onResumeSelected(e) {
    const f = e.target.files?.[0] || null;
    setResumeFile(f);
  }

  return (
    <section className="dash-profilecard" aria-label="Profile summary">
      <header className="dash-profilecard-head">
        <div className="dash-profilecard-avatar" aria-hidden="true">
          {initialsFromName(name)}
        </div>

        <div className="dash-profilecard-meta">
          <div className="dash-profilecard-name">{name}</div>
          <div className="dash-profilecard-role">{role}</div>
          <div className="dash-profilecard-headline">{headline}</div>
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
            <span className="dash-profilecard-row-label">Phone</span>
            <span className="dash-profilecard-row-value">{phone}</span>
          </li>

          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="mail" />
            </span>
            <span className="dash-profilecard-row-label">Email</span>
            <span className="dash-profilecard-row-value">{email}</span>
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
            <span className="dash-profilecard-row-label">Portfolio</span>
            <span className="dash-profilecard-row-value">{web.portfolio}</span>
          </li>

          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="link" />
            </span>
            <span className="dash-profilecard-row-label">LinkedIn</span>
            <span className="dash-profilecard-row-value">{web.linkedin}</span>
          </li>

          <li className="dash-profilecard-row">
            <span className="dash-profilecard-row-icon" aria-hidden="true">
              <ProfileIcon name="link" />
            </span>
            <span className="dash-profilecard-row-label">GitHub</span>
            <span className="dash-profilecard-row-value">{web.github}</span>
          </li>
        </ul>
      </section>
    </section>
  );
}
