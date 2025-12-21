import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/axiosConfig';
import { motion } from 'framer-motion'; 
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
// 1. Import the new background component
import CyberGridBackground from '../../components/CyberGridBackground';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/admin/dashboard');
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await API.post('/auth/login', formData);
      login(response.data.token, response.data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 2. Main Container: Transparent so the grid shows through
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* 3. The 3D Moving Grid Background */}
      <CyberGridBackground />

      {/* The Floating Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full max-w-md px-8 relative z-10"
      >
        {/* 4. Applied 'glass-card' for the tech look */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Header Section */}
          <div className="p-8 pb-0 text-center">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/50 mb-6"
            >
              <ShieldCheck className="text-white w-8 h-8" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white tracking-tight">System Access</h1>
            <p className="text-slate-400 mt-2 text-sm font-mono">Identify yourself, Admin.</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-xl mb-6 text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-1"
              >
                <label className="text-[10px] font-bold text-cyan-500 ml-1 tracking-widest uppercase">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="admin@example.com"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-1"
              >
                <label className="text-[10px] font-bold text-cyan-500 ml-1 tracking-widest uppercase">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl py-3.5 pl-12 pr-12 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-6 border border-white/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

            </form>
          </div>
          
          {/* Footer Decoration */}
          <div className="bg-slate-950/40 p-4 text-center border-t border-slate-800/50">
             <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Restricted Area • 256-Bit Encrypted</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}