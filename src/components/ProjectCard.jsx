import { useState } from "react";

function getStatus({ liveUrl, protected: isProtected }) {
  if (liveUrl && liveUrl.includes("localhost")) return { label: "Local", modifier: "status-local" };
  if (isProtected) return { label: "Private", modifier: "status-private" };
  if (liveUrl) return { label: "Live", modifier: "status-live" };
  return null;
}

export default function ProjectCard({ project, index = 0 }) {
  const { name, description, command, tags, liveUrl, githubUrl, accent } = project;
  const status = getStatus(project);
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div
      className="card"
      style={{ animationDelay: `${index * 0.07}s`, "--card-accent": accent }}
      onMouseMove={handleMouseMove}
    >
      <div className="card-accent" />
      <div className="card-body">
        <div className="card-header">
          <h2 className="card-title">{name}</h2>
          {status && (
            <span className={`status ${status.modifier}`}>
              <span className="status-dot" aria-hidden="true" />
              {status.label}
            </span>
          )}
        </div>
        <p className="card-description">{description}</p>
        {command && (
          <div className="card-command">
            <code>{command}</code>
            <button
              type="button"
              className={`copy-btn${copied ? " copied" : ""}`}
              onClick={handleCopy}
              aria-label={`Copy command: ${command}`}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        )}
        <div className="card-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="card-links">
          {liveUrl ? (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open App ↗
            </a>
          ) : !command && (
            <span className="btn btn-disabled">No live demo</span>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
