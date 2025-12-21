import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { AuthContext, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // <--- IMPORT THE BOUNCER

function Layout({ children }) {
  const { user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 text-slate-100 bg-slate-950">
      
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'h-16 bg-slate-950/80 backdrop-blur-md border-slate-800 shadow-cyan-500/5 shadow-lg' 
            : 'h-24 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className={`text-2xl transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                🚀
              </span>
              <div className="flex flex-col">
                <span className={`font-bold text-white tracking-tight transition-all duration-300 ${
                  scrolled ? 'text-lg' : 'text-xl'
                }`}>
                  Tushar Saini
                </span>
                <span className={`text-[10px] text-cyan-400 font-mono uppercase tracking-widest transition-all duration-300 ${
                   scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
                }`}>
                  Cybersecurity
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 items-center">
              {['Home', 'Projects', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="relative text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors group py-2"
                >
                  {item}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Link>
              ))}
              
              {user ? (
                <Link to="/admin/dashboard" className="px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-cyan-400 hover:bg-slate-700 transition-all">
                  Dashboard
                </Link>
              ) : (
                <Link to="/admin" className="px-4 py-1.5 rounded-full border border-slate-700 text-sm font-medium text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                  Admin
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 md:hidden animate-slide-up">
           <div className="px-4 py-6 space-y-4">
              <Link to="/" className="block text-lg font-medium text-slate-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/projects" className="block text-lg font-medium text-slate-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link to="/contact" className="block text-lg font-medium text-slate-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/admin" className="block text-lg font-medium text-cyan-400" onClick={() => setIsMobileMenuOpen(false)}>Admin Portal</Link>
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24 w-full relative z-10">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Public Login Route */}
            <Route path="/admin" element={<AdminLogin />} />
            
            {/* --- SECURE ZONE START --- */}
            {/* Only logged-in users can pass this point */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
            {/* --- SECURE ZONE END --- */}
            
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}