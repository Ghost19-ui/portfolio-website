// src/pages/Projects.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import ProjectCard from '../components/ProjectCard'; // Ensure this path matches

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // API Call to backend
        const response = await API.get('/projects');
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setError("Could not load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">My Projects</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A showcase of my work in Cybersecurity, Full Stack Development, and Software Engineering.
        </p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-300 p-4 rounded-lg text-center mb-8">
          {error}
        </div>
      )}

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        !error && (
          <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
            <p className="text-slate-500 text-lg">No projects added yet.</p>
          </div>
        )
      )}
    </div>
  );
}