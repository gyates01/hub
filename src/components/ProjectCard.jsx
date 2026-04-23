export default function ProjectCard({ project }) {
  const { name, description, command, tags, liveUrl, githubUrl, protected: isProtected, accent } = project;

  return (
    <div className="card">
      <div className="card-accent" style={{ background: accent }} />
      <div className="card-body">
        <div className="card-header">
          <h2 className="card-title">{name}</h2>
          {isProtected && <span className="badge-lock">🔒 Private</span>}
        </div>
        <p className="card-description">{description}</p>
        {command && (
          <div className="card-command">
            <code>{command}</code>
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
          ) : (
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
