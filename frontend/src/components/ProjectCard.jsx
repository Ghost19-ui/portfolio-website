// src/components/ProjectCard.jsx
import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 group flex flex-col h-full">
      
      {/* Project Header / Image Placeholder */}
      <div className="h-48 bg-slate-800 relative overflow-hidden">
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
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}