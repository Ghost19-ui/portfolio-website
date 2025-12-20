import React, { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    isFeatured: false // NEW STATE
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await API.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    
    try {
      const data = {
        ...formData,
        techStack: formData.techStack.split(',').map((t) => t.trim()),
      };

      if (editingId) {
        await API.put(`/projects/${editingId}`, data);
        setSuccessMsg('Project updated successfully!');
        setEditingId(null);
      } else {
        await API.post('/projects', data);
        setSuccessMsg('Project added successfully!');
      }

      setFormData({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        isFeatured: false
      });
      fetchProjects();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      isFeatured: project.isFeatured || false // Load existing value
    });
    setEditingId(project._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await API.delete(`/projects/${id}`);
        fetchProjects();
        setSuccessMsg('Project deleted successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (error) {
        alert('Error: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  if (loading) return <div className="text-center py-8 text-slate-600">Loading projects...</div>;

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
          {successMsg}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., AI Security System"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Describe your project..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tech Stack (comma-separated)</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Live Demo URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* NEW CHECKBOX FOR FEATURED */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="isFeatured" className="text-sm font-semibold text-slate-700 cursor-pointer select-none">
              Feature this project on Home Page
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {editingId ? 'Update Project' : 'Add Project'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', isFeatured: false });
                }}
                className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Your Projects ({projects.length})</h2>
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project._id} className={`bg-slate-50 rounded-lg p-4 border ${project.isFeatured ? 'border-blue-400 ring-1 ring-blue-400' : 'border-slate-200'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                    {project.isFeatured && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">FEATURED</span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm mt-1">{project.description.substring(0, 100)}...</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(project)} className="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
                  <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:underline text-sm font-semibold">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}