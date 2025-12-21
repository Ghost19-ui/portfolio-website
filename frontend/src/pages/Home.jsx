import React, { useEffect, useState } from "react";
import NeuralBackground from "../components/NeuralBackground"; // Use new background
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
    <main className="relative min-h-screen text-slate-100 font-mono">
      
      {/* 2. The New Neural Background */}
      <NeuralBackground />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 lg:py-12 flex flex-col justify-center min-h-[80vh]">
        
        <section id="home" className="grid gap-6 lg:grid-cols-2 items-center">
          {/* Hero card */}
          <div className="relative animate-slide-up">
            <div className="border-l-4 border-red-600 bg-black/70 backdrop-blur-sm p-8 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/30 border border-red-600/30 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                Red Team Active
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Tushar Saini
              </h1>
              <h2 className="text-xl text-red-500 mb-6 font-mono">
                &gt; Offensive Security Engineer
              </h2>
              
              <p className="text-sm md:text-base leading-relaxed text-gray-400 mb-8 max-w-xl font-mono">
                Specializing in <span className="text-red-400">Vulnerability Assessment</span>, <span className="text-red-400">Penetration Testing</span>, and Network Intrusion.
                I simulate advanced cyber attacks to secure critical infrastructure.
              </p>

              <div className="flex flex-wrap gap-4 text-sm font-bold">
                <a href="/projects" className="bg-red-600 hover:bg-red-700 text-black px-6 py-3 transition-all uppercase tracking-wider">
                  View Operations
                </a>
                
                <a href="/resume.pdf" download="Tushar_Saini_Resume.pdf" className="border border-gray-600 hover:border-red-500 text-white px-6 py-3 transition-all">
                  Download Resume
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap gap-6 text-xs font-mono text-gray-500 uppercase">
                <span>:: Network Security</span>
                <span>:: VAPT</span>
                <span>:: Red Teaming</span>
              </div>
            </div>
          </div>

          {/* Recent Focus Section */}
          <div className="relative mt-2 lg:mt-0">
            <div className="border border-gray-800 bg-black/80 p-6 shadow-2xl relative overflow-hidden">
              {/* Scanline effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 blur-sm animate-[scan_3s_linear_infinite]"></div>
              
              <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-red-500 border-b border-gray-800 pb-2">
                Recent Payloads
              </h2>
              
              {featuredProjects.length > 0 ? (
                <ul className="space-y-4">
                  {featuredProjects.map((project) => (
                    <li key={project._id} className="group cursor-pointer p-3 hover:bg-red-950/10 transition-all border-l-2 border-transparent hover:border-red-600">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-white group-hover:text-red-400 transition-colors font-mono text-sm">
                          {project.title}
                        </p>
                        <span className="text-[10px] text-gray-600 font-mono">TOOL</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 text-sm italic py-8 text-center">
                  <p>System initializing... <a href="/projects" className="text-red-500 hover:underline">Access All Tools</a></p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;