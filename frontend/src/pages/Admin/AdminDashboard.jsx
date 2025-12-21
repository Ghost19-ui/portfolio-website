import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/axiosConfig';
import { LogOut, Plus, Trash2, Terminal, Cpu, FileText, X, Loader2, RefreshCw } from 'lucide-react';
import NeuralBackground from '../../components/NeuralBackground';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects'); 
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Data States
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Form States
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '', githubLink: '', technologies: '' });
  const [newSkill, setNewSkill] = useState({ category: 'Cybersecurity', name: '', level: 50 });
  const [newBlog, setNewBlog] = useState({ title: '', content: '', summary: '', tags: '' });

  // Fetch Logic
  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const { data } = await API.get('/projects');
        setProjects(Array.isArray(data) ? data : []);
      } else if (activeTab === 'skills') {
        const { data } = await API.get('/content/skills');
        setSkills(Array.isArray(data) ? data : []);
      } else if (activeTab === 'blogs') {
        const { data } = await API.get('/content/blogs');
        setBlogs(Array.isArray(data) ? data : []);
      }
    } catch (e) { console.error("Fetch Error:", e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  // Create Handlers
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'projects') {
        const tech = newProject.technologies.split(',').map(t => t.trim());
        await API.post('/projects', { ...newProject, technologies: tech });
      } else if (activeTab === 'skills') {
        await API.post('/content/skills', newSkill);
      } else if (activeTab === 'blogs') {
        const tags = newBlog.tags.split(',').map(t => t.trim());
        await API.post('/content/blogs', { ...newBlog, tags });
      }
      setShowModal(false);
      fetchData();
    } catch (error) { alert("Operation failed. Check console."); }
  };

  const handleDelete = async (id, type, subId = null) => {
    if (!window.confirm("Confirm deletion?")) return;
    try {
      let endpoint = '';
      if (type === 'project') endpoint = `/projects/${id}`;
      if (type === 'skillGroup') endpoint = `/content/skills/${id}`;
      if (type === 'skillItem') endpoint = `/content/skills/${id}/${subId}`;
      if (type === 'blog') endpoint = `/content/blogs/${id}`;
      
      await API.delete(endpoint);
      fetchData();
    } catch (e) { alert("Delete failed"); }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative">
      {/* Background forced to back */}
      <div className="fixed inset-0 z-0">
        <NeuralBackground />
      </div>
      
      {/* Content forced to front */}
      <div className="relative z-50 max-w-7xl mx-auto p-6 pt-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-black/90 border border-red-900 p-6 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.2)]">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
             <div className="p-3 bg-red-900/20 rounded-full border border-red-500/50">
               <Terminal className="text-red-500 w-8 h-8" />
             </div>
             <div>
               <h1 className="text-2xl font-bold tracking-widest text-white uppercase">Command Center</h1>
               <p className="text-xs text-red-500 uppercase tracking-widest mt-1">:: Authenticated as {user?.name || 'Admin'} ::</p>
             </div>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-4 py-2 rounded text-gray-300 hover:text-white hover:border-white transition-all text-xs font-bold">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> REFRESH
            </button>
            <button onClick={() => { logout(); navigate('/admin'); }} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-black px-6 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all">
              <LogOut size={14} /> Abort Session
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-800 pb-6">
          {[
            { id: 'projects', label: 'PAYLOADS', icon: <Terminal size={14} /> },
            { id: 'skills', label: 'CAPABILITIES', icon: <Cpu size={14} /> },
            { id: 'blogs', label: 'INTEL REPORTS', icon: <FileText size={14} /> }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded text-sm font-bold tracking-wider transition-all ${
                activeTab === tab.id 
                  ? 'bg-red-900/20 border border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                  : 'bg-gray-900/50 border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button onClick={() => setShowModal(true)} className="w-full mb-10 py-5 border border-dashed border-red-900/50 hover:border-red-500 text-red-700 hover:text-red-400 rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest transition-all bg-red-950/5 hover:bg-red-950/10">
          <Plus size={20} /> Initialize New {activeTab.slice(0, -1)} Entry
        </button>

        {/* Content Views */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-500">
            <Loader2 className="animate-spin mb-4" size={48}/>
            <span className="text-xs uppercase tracking-widest animate-pulse">Establishing Uplink...</span>
          </div>
        ) : (
          <>
            {/* EMPTY STATE */}
            {((activeTab === 'projects' && projects.length === 0) || 
              (activeTab === 'skills' && skills.length === 0) || 
              (activeTab === 'blogs' && blogs.length === 0)) && (
                <div className="text-center py-20 border border-gray-800 rounded-lg bg-gray-900/50">
                  <p className="text-gray-500 font-mono">No data found in this sector.</p>
                </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                  <div key={p._id} className="bg-black/90 border border-gray-800 p-6 rounded-xl hover:border-red-600 transition-all group hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] relative">
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-red-500 transition-colors">{p.title}</h3>
                    <p className="text-xs text-gray-500 mb-4 font-sans line-clamp-2">{p.description}</p>
                    <div className="flex justify-between mt-auto pt-4 border-t border-gray-900 items-center">
                      <span className="text-[10px] text-gray-600 font-mono uppercase">ID: {p._id.slice(-6)}</span>
                      <button onClick={() => handleDelete(p._id, 'project')} className="text-gray-600 hover:text-red-500 transition-colors p-2 hover:bg-red-950/30 rounded"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SKILLS */}
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(group => (
                  <div key={group._id} className="bg-black/90 border border-gray-800 p-5 rounded-xl hover:border-red-600 transition-all">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-900">
                      <h3 className="font-bold text-red-500 uppercase tracking-wider text-sm">{group.category}</h3>
                      <button onClick={() => handleDelete(group._id, 'skillGroup')} className="text-gray-700 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                    <div className="space-y-2">
                      {group.skills.map(skill => (
                        <div key={skill._id} className="flex justify-between items-center text-sm bg-gray-900/40 p-2 rounded hover:bg-red-900/10 transition-colors">
                          <span className="text-gray-300">{skill.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-gray-500 font-mono">{skill.level}%</span>
                            <button onClick={() => handleDelete(group._id, 'skillItem', skill._id)} className="text-gray-600 hover:text-red-400"><X size={12}/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BLOGS */}
            {activeTab === 'blogs' && (
              <div className="space-y-4">
                {blogs.map(b => (
                  <div key={b._id} className="bg-black/90 border border-gray-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center hover:border-red-600 transition-all group">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-bold text-xl text-white mb-2 group-hover:text-red-500 transition-colors">{b.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {b.tags.map((t, i) => <span key={i} className="text-[10px] bg-red-950/40 text-red-400 px-2 py-1 rounded border border-red-900/30 uppercase tracking-wide">{t}</span>)}
                      </div>
                    </div>
                    <button onClick={() => handleDelete(b._id, 'blog')} className="text-gray-600 hover:text-red-500 p-3 hover:bg-red-950/30 rounded-lg transition-all"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-gray-950 border border-red-600 w-full max-w-lg p-8 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.3)]">
            <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-6 bg-red-600 block"></span>
                New {activeTab.slice(0, -1)}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-5">
              {/* Projects Form */}
              {activeTab === 'projects' && (
                <>
                  <input placeholder="Project Title" className="admin-input" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="GitHub URL" className="admin-input" value={newProject.githubLink} onChange={e => setNewProject({...newProject, githubLink: e.target.value})} required />
                    <input placeholder="Image URL" className="admin-input" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} required />
                  </div>
                  <input placeholder="Tech Stack (e.g. React, Node, Python)" className="admin-input" value={newProject.technologies} onChange={e => setNewProject({...newProject, technologies: e.target.value})} required />
                  <textarea placeholder="Brief Description..." rows="4" className="admin-input resize-none" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
                </>
              )}

              {/* Skills Form */}
              {activeTab === 'skills' && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Category</label>
                    <select className="admin-input cursor-pointer" value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})}>
                      <option>Cybersecurity</option>
                      <option>Programming Languages</option>
                      <option>Web Development</option>
                      <option>Tools</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Skill Name</label>
                    <input placeholder="e.g. Metasploit" className="admin-input" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Proficiency: <span className="text-red-500">{newSkill.level}%</span></label>
                    <input type="range" className="w-full accent-red-600 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer" min="0" max="100" value={newSkill.level} onChange={e => setNewSkill({...newSkill, level: parseInt(e.target.value)})} />
                  </div>
                </>
              )}

              {/* Blogs Form */}
              {activeTab === 'blogs' && (
                <>
                  <input placeholder="Report Title" className="admin-input font-bold" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} required />
                  <input placeholder="Summary / Abstract" className="admin-input" value={newBlog.summary} onChange={e => setNewBlog({...newBlog, summary: e.target.value})} required />
                  <input placeholder="Tags (e.g. VAPT, CTF)" className="admin-input" value={newBlog.tags} onChange={e => setNewBlog({...newBlog, tags: e.target.value})} required />
                  <textarea placeholder="Report Content..." rows="8" className="admin-input font-mono text-sm" value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} required />
                </>
              )}

              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-black font-bold py-4 uppercase tracking-widest mt-6 rounded-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                DEPLOY TO DATABASE
              </button>
            </form>
          </div>
        </div>
      )}
      
      <style>{`
        .admin-input {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #333;
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
        }
        .admin-input:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
        }
      `}</style>
    </div>
  );
}