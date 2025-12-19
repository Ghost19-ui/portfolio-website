// src/components/ProjectCard.jsx
import React from 'react';

function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <div className="project-card">
      <h3 className="project-title">{project.title}</h3>
      {project.subtitle && (
        <p className="project-subtitle">{project.subtitle}</p>
      )}
      {project.description && (
        <p className="project-description">{project.description}</p>
      )}

      {project.tags && project.tags.length > 0 && (
        <ul className="project-tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      {project.link && (
        <a
          href={project.link}
          className="project-link"
          target="_blank"
          rel="noreferrer"
        >
          View project
        </a>
      )}
    </div>
  );
}

export default ProjectCard;
