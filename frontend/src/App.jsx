// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function Layout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="fixed top-0 left-0 right-0 z-20 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Tushar Saini
          </Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link to="/" className="text-slate-300 hover:text-white">
              Home
            </Link>
            <Link to="/projects" className="text-slate-300 hover:text-white">
              Projects
            </Link>
            <Link to="/contact" className="text-slate-300 hover:text-white">
              Contact
            </Link>
            <Link
              to={user ? '/admin' : '/admin'}
              className="text-blue-400 hover:text-blue-300"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}
