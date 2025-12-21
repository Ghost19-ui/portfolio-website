import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/axiosConfig';
import { Lock, User, ArrowRight, AlertTriangle, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import NeuralBackground from '../../components/NeuralBackground';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Use the login function from your Context (Best Practice)
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => { 
    if (user) navigate('/admin/dashboard'); 
  }, [user, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);
    try {
      const response = await API.post('/auth/login', formData);
      // Use the context login function to handle state update
      login(response.data.token, response.data.user);
      navigate('/admin/dashboard');
    } catch (err) { 
      setError(err.response?.data?.error || 'Access Denied'); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black font-mono relative overflow-hidden">
      {/* BACKGROUND FORCED TO BACK */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralBackground />
      </div>
      
      {/* CONTENT FORCED TO FRONT */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-black/90 backdrop-blur-xl border border-red-600/50 p-8 shadow-[0_0_60px_rgba(220,38,38,0.15)] rounded-2xl">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-950/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-600 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              <ShieldAlert className="text-red-500" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Restricted Access</h1>
            <p className="text-red-500 text-xs mt-2 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
          </div>

          {error && (
            <div className="bg-red-950/80 border border-red-500 text-red-200 text-xs p-3 mb-6 flex items-center gap-2 rounded">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] text-red-500 uppercase font-bold block mb-1 tracking-wider">Operator ID</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full bg-black/50 border border-gray-800 py-3 pl-10 text-white focus:border-red-600 outline-none transition-all focus:shadow-[0_0_15px_rgba(220,38,38,0.3)] rounded" 
                  placeholder="admin@sys.local" 
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-red-500 uppercase font-bold block mb-1 tracking-wider">Security Token</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="w-full bg-black/50 border border-gray-800 py-3 pl-10 pr-10 text-white focus:border-red-600 outline-none transition-all focus:shadow-[0_0_15px_rgba(220,38,38,0.3)] rounded" 
                  placeholder="••••••••" 
                />
                {/* EYE BUTTON FIX: Added z-20 and proper positioning */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors z-20 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-black font-bold py-4 uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] rounded mt-4">
              {loading ? 'Verifying...' : <>Authenticate <ArrowRight size={18} /></>}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6">
           <p className="text-[10px] text-gray-600 font-mono">SECURE CONNECTION ESTABLISHED // TLS 1.3</p>
        </div>
      </div>
    </div>
  );
}