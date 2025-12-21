import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/axiosConfig';
import { LogOut, Plus, Trash2, Loader2, X } from 'lucide-react';
import NeuralBackground from '../../components/NeuralBackground'; // Import the new background

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '', githubLink: '', technologies: '' });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get('/projects');
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const techArray = newProject.technologies.split(',').map(t => t.trim());
      const { data } = await API.post('/projects', { ...newProject, technologies: techArray });
      setProjects([data, ...projects]);
      setShowModal(false);
      setNewProject({ title: '', description: '', image: '', githubLink: '', technologies: '' });
    } catch (error) { alert('Failed'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      await API.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden">
      {/* BACKGROUND LAYER */}
      <NeuralBackground />

      {/* CONTENT LAYER (z-10 ensures it sits ON TOP of the background) */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-8 border-b border-red-600 pb-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-red-500 tracking-widest">RED_TEAM_CONTROL</h1>
          <button onClick={() => { logout(); navigate('/admin'); }} className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700 text-black">Disconnect</button>
        </div>

        <button onClick={() => setShowModal(true)} className="mb-6 bg-gray-900 border border-red-500 text-red-400 px-4 py-2 rounded hover:bg-red-900/20 flex items-center gap-2 transition-all">
          <Plus size={16} /> Inject New Payload (Project)
        </button>

        {loading ? <Loader2 className="animate-spin text-red-600 mx-auto" size={40} /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p._id} className="bg-black/80 border border-gray-800 p-4 rounded hover:border-red-500 transition-colors shadow-lg hover:shadow-red-900/20">
                <h3 className="font-bold text-lg mb-2 text-white">{p.title}</h3>
                <p className="text-gray-400 text-xs mb-4 h-10 overflow-hidden">{p.description}</p>
                <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                  <span className="text-xs text-red-900 uppercase font-bold">Target ID: {p._id.slice(-4)}</span>
                  <button onClick={() => handleDelete(p._id)} className="text-gray-500 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-red-600 p-6 rounded w-full max-w-lg shadow-[0_0_50px_rgba(220,38,38,0.5)] relative">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold text-red-500">Deploy New Tool</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              {['title', 'image', 'githubLink', 'technologies'].map((field) => (
                <input key={field} placeholder={field.toUpperCase()} className="w-full bg-black border border-gray-700 p-3 text-red-400 focus:border-red-500 outline-none font-mono text-sm" value={newProject[field]} onChange={e => setNewProject({...newProject, [field]: e.target.value})} />
              ))}
              <textarea placeholder="DESCRIPTION" rows="3" className="w-full bg-black border border-gray-700 p-3 text-red-400 focus:border-red-500 outline-none font-mono text-sm" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-black font-bold py-3 uppercase tracking-widest">Execute</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}