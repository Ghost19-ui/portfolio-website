import React, { useEffect, useState } from "react";
import GalaxyBackground from "../components/GalaxyBackground";
import ParticlesBackground from "../components/ParticlesBackground";
import API from "../api/axiosConfig"; // Import API to fetch data

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
    <main className="relative min-h-screen text-slate-100 overflow-hidden">
      
      {/* Background layers */}
      <GalaxyBackground />
      <ParticlesBackground />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/80 via-slate-950/60 to-slate-950/95" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 lg:py-12 flex flex-col justify-center min-h-[80vh]">
        
        <section
          id="home"
          className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] items-center"
        >
          {/* Hero card */}
          <div className="relative animate-slide-up">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-transparent opacity-60 blur-xl" />
            <div className="relative rounded-3xl border border-slate-700/70 bg-slate-900/70 px-6 py-6 shadow-2xl backdrop-blur-xl lg:px-8 lg:py-8">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300 mb-3">
                3rd Year CSE • Cybersecurity &amp; VAPT
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Hi, <span className="text-sky-300">I&apos;m Tushar</span> Saini
              </h1>
              <p className="text-sm md:text-base leading-relaxed text-slate-200 mb-5 max-w-xl">
                Building secure, interactive web applications and offensive
                security tools. Passionate about penetration testing, ethical
                hacking, and web security.
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="/projects"
                  className="inline-flex items-center rounded-full bg-cyan-400 px-4 py-2 font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition-transform duration-150 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,211,238,0.9)]"
                >
                  View my work
                </a>
                
                {/* --- NEW RESUME BUTTON --- */}
                {/* Make sure to place a 'resume.pdf' file inside your 'frontend/public' folder! */}
                <a
                  href="/resume.pdf" 
                  download="Tushar_Saini_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-900 shadow-lg hover:bg-white transition-transform duration-150 hover:scale-[1.03]"
                >
                  <span>📄</span> Resume
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-cyan-400/70 px-4 py-2 font-medium text-cyan-300 transition-all duration-150 hover:bg-cyan-500/10 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(56,189,248,0.7)]"
                >
                  Get in touch
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available for internships &amp; freelance
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="text-cyan-300">🛡️</span>
                  Web security • VAPT • MERN
                </span>
              </div>
            </div>
          </div>

          {/* DYNAMIC RECENT FOCUS SECTION */}
          <div id="experience" className="relative mt-2 lg:mt-0 animate-fade-in delay-100">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-sky-500/40 via-violet-500/40 to-transparent opacity-60 blur-xl" />
            <div className="relative h-full rounded-3xl border border-slate-700/70 bg-slate-900/80 px-5 py-5 shadow-2xl backdrop-blur-2xl lg:px-6 lg:py-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                Recent focus
              </h2>
              
              {featuredProjects.length > 0 ? (
                <ul className="space-y-4 text-xs md:text-sm text-slate-200">
                  {featuredProjects.map((project) => (
                    <li key={project._id} className="group cursor-default">
                      <p className="font-semibold text-sky-300 group-hover:text-cyan-200 transition-colors">
                        {project.title}
                      </p>
                      <p className="text-slate-300 line-clamp-2">
                        {project.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-slate-400 text-sm italic py-4">
                  {/* Fallback if no projects are featured yet */}
                  <p>Check out my <a href="/projects" className="text-cyan-400 underline">Projects</a> page to see what I'm working on!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Social + footer row */}
        <section
          id="contact"
          className="mt-16 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm text-slate-300 border-t border-slate-800 pt-8"
        >
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
              LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
              Instagram
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
              GitHub
            </a>
          </div>
          <p className="text-slate-500">
            © {new Date().getFullYear()} Tushar Saini. All rights reserved.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Home;