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
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 group flex flex-col h-full">
      
      {/* Project Header / Image Placeholder */}
      <div className="h-48 bg-slate-800 relative overflow-hidden">
        {/* If you add images later, they go here. For now, a gradient placeholder: */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
           <span className="text-4xl">🚀</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          {/* Status Badge (Optional) */}
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800">
            Active
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded border border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-800">
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🌐</span> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}