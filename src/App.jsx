import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects";
import "./App.css";

export default function App() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <span className="header-logo">GY</span>
          <nav className="header-nav">
            <a href="https://github.com/gyates01" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Projects</h1>
          <p className="hero-sub">Personal tools and side projects.</p>
        </section>

        <section className="grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>Garrett Yates · <a href="mailto:yates.garrett2020@gmail.com">yates.garrett2020@gmail.com</a></p>
      </footer>
    </div>
  );
}
