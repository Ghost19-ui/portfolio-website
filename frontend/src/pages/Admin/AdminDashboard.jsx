import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/axiosConfig';
import { LogOut, Plus, Trash2, Terminal, Cpu, FileText, X, Loader2 } from 'lucide-react';
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
        setProjects(data);
      } else if (activeTab === 'skills') {
        const { data } = await API.get('/content/skills');
        setSkills(data);
      } else if (activeTab === 'blogs') {
        const { data } = await API.get('/content/blogs');
        setBlogs(data);
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  // Create Handler
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
    } catch (error) { alert("Operation failed"); }
  };

  // Delete Handler
  const handleDelete = async (id, type, subId = null) => {
    if (!window.confirm("Confirm deletion?")) return;
    try {
      if (type === 'project') await API.delete(`/projects/${id}`);
      if (type === 'skillGroup') await API.delete(`/content/skills/${id}`);
      if (type === 'skillItem') await API.delete(`/content/skills/${id}/${subId}`);
      if (type === 'blog') await API.delete(`/content/blogs/${id}`);
      fetchData();
    } catch (e) { alert("Delete failed"); }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative">
      <NeuralBackground />
      
      {/* Z-Index 10 ensures content is above the background */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-black/80 border border-red-900 p-4 rounded backdrop-blur-md">
          <div className="flex items-center gap-3">
             <Terminal className="text-red-500" />
             <div>
               <h1 className="text-xl font-bold tracking-widest text-white">COMMAND_CENTER</h1>
               <p className="text-[10px] text-red-500 uppercase">:: User: {user?.name || 'Admin'} ::</p>
             </div>
          </div>
          <button onClick={() => { logout(); navigate('/admin'); }} className="text-xs bg-red-900/20 hover:bg-red-600 border border-red-600 px-4 py-2 rounded text-red-200 hover:text-white transition-all">
            LOGOUT
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'projects', label: 'PAYLOADS', icon: <Terminal size={14} /> },
            { id: 'skills', label: 'CAPABILITIES', icon: <Cpu size={14} /> },
            { id: 'blogs', label: 'INTEL REPORTS', icon: <FileText size={14} /> }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded border text-sm font-bold tracking-wider transition-all ${
                activeTab === tab.id 
                  ? 'bg-red-900/40 border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                  : 'bg-black/60 border-gray-800 text-gray-500 hover:text-white hover:border-gray-600'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button onClick={() => setShowModal(true)} className="w-full mb-8 py-4 border border-dashed border-red-800 text-red-600 hover:bg-red-950/20 hover:border-red-500 hover:text-red-400 rounded flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all">
          <Plus size={18} /> Initialize New {activeTab.slice(0, -1)}
        </button>

        {/* Content Views */}
        {loading ? <div className="flex justify-center p-12"><Loader2 className="animate-spin text-red-600" size={48}/></div> : (
          <>
            {/* PROJECTS VIEW */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                  <div key={p._id} className="bg-black/80 border border-gray-800 p-5 rounded hover:border-red-600 transition-all group">
                    <h3 className="font-bold text-lg text-white group-hover:text-red-500">{p.title}</h3>
                    <div className="flex justify-between mt-4 pt-4 border-t border-gray-900">
                      <span className="text-xs text-gray-600 font-mono">ID: {p._id.slice(-4)}</span>
                      <button onClick={() => handleDelete(p._id, 'project')} className="text-gray-600 hover:text-red-500"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SKILLS VIEW */}
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(group => (
                  <div key={group._id} className="bg-black/80 border border-gray-800 p-5 rounded hover:border-red-600 transition-all">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-900">
                      <h3 className="font-bold text-red-500 uppercase">{group.category}</h3>
                      <button onClick={() => handleDelete(group._id, 'skillGroup')} className="text-gray-700 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                    <div className="space-y-2">
                      {group.skills.map(skill => (
                        <div key={skill._id} className="flex justify-between items-center text-sm bg-gray-900/50 p-2 rounded">
                          <span className="text-gray-300">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-500">{skill.level}%</span>
                            <button onClick={() => handleDelete(group._id, 'skillItem', skill._id)} className="text-gray-600 hover:text-red-400"><X size={12}/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BLOGS VIEW */}
            {activeTab === 'blogs' && (
              <div className="space-y-4">
                {blogs.map(b => (
                  <div key={b._id} className="bg-black/80 border border-gray-800 p-6 rounded flex justify-between items-start hover:border-red-600 transition-all">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{b.title}</h3>
                      <div className="flex gap-2 mb-2">
                        {b.tags.map((t, i) => <span key={i} className="text-[10px] bg-red-950 text-red-400 px-1 rounded">{t}</span>)}
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2">{b.summary}</p>
                    </div>
                    <button onClick={() => handleDelete(b._id, 'blog')} className="text-gray-600 hover:text-red-500 ml-4"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-black border border-red-600 w-full max-w-lg p-6 rounded shadow-[0_0_50px_rgba(220,38,38,0.3)]">
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
              <h2 className="text-lg font-bold text-red-500 uppercase">New {activeTab.slice(0, -1)} Entry</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              {/* Projects Form */}
              {activeTab === 'projects' && (
                <>
                  <input placeholder="Title" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
                  <input placeholder="GitHub URL" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newProject.githubLink} onChange={e => setNewProject({...newProject, githubLink: e.target.value})} required />
                  <input placeholder="Image URL" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} required />
                  <input placeholder="Tech Stack (comma separated)" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newProject.technologies} onChange={e => setNewProject({...newProject, technologies: e.target.value})} required />
                  <textarea placeholder="Description" rows="3" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
                </>
              )}

              {/* Skills Form */}
              {activeTab === 'skills' && (
                <>
                  <select className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})}>
                    <option>Cybersecurity</option>
                    <option>Programming Languages</option>
                    <option>Web Development</option>
                    <option>Tools</option>
                    <option>Other</option>
                  </select>
                  <input placeholder="Skill Name" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} required />
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">Level: {newSkill.level}%</span>
                    <input type="range" className="flex-1 accent-red-600" min="0" max="100" value={newSkill.level} onChange={e => setNewSkill({...newSkill, level: parseInt(e.target.value)})} />
                  </div>
                </>
              )}

              {/* Blogs Form */}
              {activeTab === 'blogs' && (
                <>
                  <input placeholder="Report Title" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} required />
                  <input placeholder="Summary" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newBlog.summary} onChange={e => setNewBlog({...newBlog, summary: e.target.value})} required />
                  <input placeholder="Tags (comma separated)" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newBlog.tags} onChange={e => setNewBlog({...newBlog, tags: e.target.value})} required />
                  <textarea placeholder="Content" rows="6" className="w-full bg-gray-900 border border-gray-700 p-3 text-white" value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} required />
                </>
              )}

              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-black font-bold py-3 uppercase tracking-widest mt-4">DEPLOY</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}