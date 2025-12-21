import React, { useEffect, useState } from "react";
// 1. Import your new Cyber Grid Background
import CyberGridBackground from "../components/CyberGridBackground";
import API from "../api/axiosConfig"; 

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await API.get('/projects');
        // Filter for featured projects and take the top 3
        const featured = response.data.filter(p => p.isFeatured).slice(0, 3);
        setFeaturedProjects(featured);
      } catch (error) {
        console.error("Failed to load featured projects", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main className="relative min-h-screen text-slate-100 overflow-hidden font-sans">
      
      {/* 2. The New 3D Cyber Background */}
      <CyberGridBackground />
      
      {/* Optional: subtle overlay to ensure text is always readable on top of the grid */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/80" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 lg:py-12 flex flex-col justify-center min-h-[80vh]">
        
        <section
          id="home"
          className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] items-center"
        >
          {/* Hero card */}
          <div className="relative animate-slide-up">
            {/* Glow Effect behind the card */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-50 blur-xl" />
            
            {/* 3. Applied 'glass-card' class here for the blurry tech look */}
            <div className="glass-card relative rounded-3xl px-6 py-8 shadow-2xl lg:px-10 lg:py-10">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                System Online
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tushar Saini</span>
              </h1>
              
              <p className="text-sm md:text-base leading-relaxed text-slate-300 mb-8 max-w-xl border-l-2 border-slate-700 pl-4">
                Building secure, interactive web applications and offensive
                security tools. Passionate about <span className="text-cyan-300">penetration testing</span>, <span className="text-cyan-300">ethical hacking</span>, and web security.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href="/projects"
                  className="inline-flex items-center rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5"
                >
                  View my work
                </a>
                
                <a
                  href="/resume.pdf" 
                  download="Tushar_Saini_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 font-medium transition-all duration-200 hover:border-slate-400"
                >
                  <span>📄</span> Resume
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center rounded-lg border border-cyan-500/30 text-cyan-400 px-6 py-3 font-medium hover:bg-cyan-950/30 transition-all duration-200"
                >
                  Get in touch
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-wrap gap-6 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="text-emerald-400">●</span> Available for hire
                </span>
                <span>:: Web Security</span>
                <span>:: VAPT</span>
                <span>:: MERN Stack</span>
              </div>
            </div>
          </div>

          {/* Recent Focus Section */}
          <div id="experience" className="relative mt-2 lg:mt-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
             {/* 4. Applied 'glass-card' here too */}
            <div className="glass-card relative h-full rounded-3xl px-6 py-6 shadow-2xl">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-slate-600"></span>
                Recent Focus
              </h2>
              
              {featuredProjects.length > 0 ? (
                <ul className="space-y-4">
                  {featuredProjects.map((project) => (
                    <li key={project._id} className="group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors font-mono text-sm">
                          {project.title}
                        </p>
                        <span className="text-[10px] text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">PROJECT</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-slate-500 text-sm italic py-8 text-center bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                  <p>Check out my <a href="/projects" className="text-cyan-400 hover:underline">Projects</a> page for more!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <section
          className="mt-16 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500 border-t border-slate-800/50 pt-8"
        >
          <div className="flex gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Instagram</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
          </div>
          <p>
            System.status: <span className="text-emerald-500">Operational</span> © {new Date().getFullYear()}
          </p>
        </section>
      </div>
    </main>
  );
};

export default Home;