import React, { useEffect, useState } from "react";
import NeuralBackground from "../components/NeuralBackground";
import API from "../api/axiosConfig"; 
import { FileText, Terminal } from 'lucide-react';

const Home = () => {
  const [skillGroups, setSkillGroups] = useState([]);

  useEffect(() => {
    API.get('/content/skills')
       .then(res => setSkillGroups(res.data))
       .catch(e => console.error(e));
  }, []);

  return (
    <main className="relative min-h-screen text-slate-100 font-mono selection:bg-red-500/30">
      <NeuralBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 lg:py-12 flex flex-col justify-center min-h-[80vh]">
        
        {/* HERO SECTION */}
        <section className="grid gap-6 lg:grid-cols-2 items-center mb-20">
           <div className="relative animate-slide-up">
              <div className="border-l-4 border-red-600 bg-black/80 backdrop-blur-md p-8 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/40 border border-red-600/50 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_red]"></span>
                  System: Red Team Active
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tighter text-white">
                  Tushar Saini
                </h1>
                <h2 className="text-xl text-red-500 mb-6 font-mono flex items-center gap-2">
                  <Terminal size={20} /> Offensive Security Engineer
                </h2>
                
                <p className="text-sm md:text-base leading-relaxed text-gray-400 mb-8 max-w-xl font-sans border-l-2 border-red-900/30 pl-4">
                  Specializing in <strong className="text-red-400">Vulnerability Assessment</strong>, <strong className="text-red-400">Penetration Testing</strong>, and <strong className="text-red-400">Network Intrusion</strong>.
                  I simulate advanced cyber attacks to secure critical infrastructure.
                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-4">
                  <a href="/projects" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-black px-6 py-3 font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                    <Terminal size={18} /> View Operations
                  </a>
                  
                  <a 
                    href="/resume.pdf" 
                    download="Tushar_Saini_Resume.pdf" 
                    className="flex items-center gap-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black px-6 py-3 font-bold uppercase tracking-widest transition-all cursor-pointer z-50"
                  >
                    <FileText size={18} /> Download Resume
                  </a>
                </div>

              </div>
           </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="mb-16 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="border border-red-900/30 bg-black/60 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-sm font-bold text-red-500 tracking-[0.3em] uppercase mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Operational Capabilities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillGroups.length > 0 ? (
                skillGroups.map((group) => (
                  <div key={group._id}>
                    <h3 className="text-white font-bold mb-3 border-b border-gray-800 pb-1 flex items-center gap-2 text-sm uppercase">
                      <span className="text-red-600">></span> {group.category}
                    </h3>
                    <div className="space-y-3">
                      {group.skills.map((skill) => (
                        <div key={skill._id}>
                          <div className="flex justify-between text-xs text-gray-400 mb-1 font-mono">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="h-1 w-full bg-gray-900 overflow-hidden">
                            <div className="h-full bg-red-600 shadow-[0_0_10px_red]" style={{ width: `${skill.level}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm font-mono col-span-full text-center py-10">
                  Loading capabilities database...
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