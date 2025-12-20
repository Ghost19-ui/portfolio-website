// inside frontend/src/App.jsx

function Layout({ children }) {
  const { user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/30">
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-b-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-mono font-bold shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                TS
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Tushar Saini
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 items-center">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/projects" className="nav-link">Projects</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              
              {user ? (
                <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 hover:border-blue-500 hover:bg-slate-800/80 transition-all group">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">Dashboard</span>
                </Link>
              ) : (
                <Link to="/admin" className="text-sm font-medium text-slate-500 hover:text-white transition-colors">
                  Admin
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 animate-fade-in">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-20 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Tushar Saini. Built with React & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
}