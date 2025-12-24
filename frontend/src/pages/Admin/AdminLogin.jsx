import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Shield, Lock, ChevronRight, AlertTriangle } from 'lucide-react';
import API from '../../api/axiosConfig';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data.token); 
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Access Denied');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono relative">
      <div className="w-full max-w-md bg-black border border-red-900/50 p-8 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.15)] relative z-10">
        <div className="flex justify-center mb-6">
          <Shield className="w-12 h-12 text-red-600 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-8 uppercase tracking-widest">Restricted Access</h2>
        {error && <div className="mb-6 bg-red-950/30 text-red-400 px-4 py-3 rounded text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" required className="w-full bg-zinc-900/50 border border-zinc-800 text-white px-4 py-3 rounded" placeholder="Operator ID" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required className="w-full bg-zinc-900/50 border border-zinc-800 text-white px-4 py-3 rounded" placeholder="Security Token" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded uppercase tracking-widest">{loading ? 'Verifying...' : 'Authenticate'}</button>
        </form>
      </div>
    </div>
  );
}