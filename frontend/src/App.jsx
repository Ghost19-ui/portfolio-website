// src/App.jsx
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
// FIX 1: Import AuthProvider along with AuthContext
import { AuthContext, AuthProvider } from './context/AuthContext';

function Layout({ children }) {
  // This line caused the crash because AuthProvider was missing in the tree above
  const { user } = useContext(AuthContext); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          
          <Link to="/" className="text-xl font-bold tracking-tight text-blue-500 hover:text-blue-400 transition-colors">
            Tushar Saini
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
            <Link to="/projects" className="text-slate-300 hover:text-white transition-colors">Projects</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
            <Link
              to={user ? '/admin/dashboard' : '/admin'}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {user ? 'Dashboard' : 'Admin Login'}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-4 py-2 flex flex-col space-y-3 pb-4">
              <Link to="/" className="text-slate-300 block hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/projects" className="text-slate-300 block hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link to="/contact" className="text-slate-300 block hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/admin" className="text-blue-400 block hover:text-blue-300" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-24 px-4 max-w-6xl mx-auto w-full">
        {children}
      </main>
      
      <footer className="border-t border-slate-800 py-6 mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Tushar Saini. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    // FIX 2: WRAP EVERYTHING IN AuthProvider so useContext works
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}