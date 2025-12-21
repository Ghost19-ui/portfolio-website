import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/axiosConfig';
import CyberGridBackground from '../../components/CyberGridBackground';
import { LogOut, Plus, Trash2, Layout, MessageSquare, Loader2, X } from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'messages'
  
  // State for adding new project
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    githubLink: '',
    technologies: '' // We will split this string into an array later
  });

  // 1. Fetch Projects on Load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get('/projects');
        setProjects(Array.isArray(data) ? data : []); // Safety check
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 2. Handle Logout
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await API.delete(`/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  // 4. Handle Create Project
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Convert "React, Node" string into ["React", "Node"] array
      const techArray = newProject.technologies.split(',').map(t => t.trim());
      
      const payload = { ...newProject, technologies: techArray };
      const { data } = await API.post('/projects', payload);
      
      setProjects([data, ...projects]); // Add new project to top of list
      setShowModal(false); // Close modal
      setNewProject({ title: '', description: '', image: '', githubLink: '', technologies: '' }); // Reset form
    } catch (error) {
      alert('Failed to create project');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-200">
      <CyberGridBackground />
      
      {/* Navbar */}
      <nav className="glass-panel border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
                A
              </div>
              <span className="font-bold text-lg tracking-tight text-white">Admin<span className="text-cyan-400">Panel</span></span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400 hidden sm:block">Welcome, {user?.name || 'Admin'}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab Controls */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'projects' 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layout size={18} />
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'messages' 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare size={18} />
            Messages
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'projects' ? (
          <div className="space-y-6 animate-slide-up">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Project List</h2>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
              >
                <Plus size={18} />
                Add Project
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-cyan-400" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="glass-card rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-white text-sm underline decoration-cyan-400 underline-offset-4">View Code</a>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white text-lg line-clamp-1">{project.title}</h3>
                        <button 
                          onClick={() => handleDelete(project._id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center animate-slide-up">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Message Center</h3>
            <p className="text-slate-400">Contact form submissions will appear here.</p>
          </div>
        )}
      </main>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="glass-card w-full max-w-lg rounded-2xl relative z-10 p-6 animate-fade-in border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add New Project</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Image URL</label>
                <input 
                  type="text" 
                  required
                  placeholder="https://..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  value={newProject.image}
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">GitHub Link</label>
                <input 
                  type="text" 
                  required
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  value={newProject.githubLink}
                  onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Tech Stack (Comma separated)</label>
                <input 
                  type="text" 
                  required
                  placeholder="React, Node.js, MongoDB"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
                <textarea 
                  required
                  rows="3"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors mt-2">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}