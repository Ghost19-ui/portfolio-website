import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/axiosConfig';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // Controls the Eye button
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log("Attempting login with:", formData.email); // Debugging log
      
      // 1. Send Login Request
      const { data } = await API.post('/auth/login', formData);
      
      // 2. Store Token
      console.log("Login successful, token received.");
      login(data.token);
      
      // 3. Redirect
      navigate('/admin/dashboard');
      
    } catch (err) {
      console.error("Login Failed:", err);
      // Detailed error message for debugging
      const errorMessage = err.response?.data?.error || err.message || 'Connection to server failed.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-mono">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"></div>
      
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-white/5 rounded-full mb-4 border border-white/10">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-zinc-500 text-sm mt-2">Enter your credentials to access the terminal.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-800 text-white px-11 py-3.5 rounded-lg focus:outline-none focus:border-white/40 transition-all placeholder:text-zinc-700"
                placeholder="name@example.com"
              />
              <Mail className="absolute left-3.5 top-3.5 text-zinc-500 w-5 h-5 group-focus-within:text-white transition-colors" />
            </div>
          </div>

          {/* Password Input with Eye Button */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"} // Toggles between text and password
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-800 text-white px-11 py-3.5 rounded-lg focus:outline-none focus:border-white/40 transition-all placeholder:text-zinc-700"
                placeholder="••••••••••••"
              />
              <Lock className="absolute left-3.5 top-3.5 text-zinc-500 w-5 h-5 group-focus-within:text-white transition-colors" />
              
              {/* THE EYE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3.5 rounded-lg hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}