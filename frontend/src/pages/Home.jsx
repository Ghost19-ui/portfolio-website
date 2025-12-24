import React, { useEffect, useState } from "react";
import CyberGlobe from "../components/CyberGlobe";
import HoloCard from "../components/HoloCard";
import TerminalWindow from "../components/TerminalWindow";
import API from "../api/axiosConfig"; 
import { Target, Cpu, Download, ArrowRight, ShieldAlert } from 'lucide-react';

const Home = () => {
  const [skillGroups, setSkillGroups] = useState([]);

  useEffect(() => {
    // Fetch skills from your backend
    API.get('/content/skills')
       .then(res => setSkillGroups(res.data))
       .catch(e => console.error("Error loading skills:", e));
  }, []);

  return (
    <main className="relative min-h-screen text-slate-100 font-mono selection:bg-red-500/30 overflow-x-hidden">
      
      {/* 1. The 3D Wireframe Globe Background */}
      <CyberGlobe />

      {/* Main Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-24">
        
        {/* HERO SECTION: The Draggable Terminal */}
        <section className="pt-8 md:pt-20">
           <TerminalWindow>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-white">
                Tushar Saini
              </h1>
              <h2 className="text-xl md:text-2xl text-red-500 mb-6 font-bold tracking-[0.2em] animate-pulse">
                OFFENSIVE SECURITY ENGINEER
              </h2>
              
              <p className="mb-8 text-sm md:text-base text-gray-400 max-w-2xl">
                Specializing in <span className="text-red-400">Vulnerability Assessment</span>, <span className="text-red-400">Penetration Testing</span>, and <span className="text-red-400">Network Intrusion</span>. 
                I simulate advanced cyber attacks to identify weaknesses and secure critical infrastructure before adversaries can exploit them.
              </p>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="/projects" 
                  className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-black px-6 py-3 font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
                >
                  View Operations <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a 
                  href="/resume.pdf" 
                  download="Tushar_Saini_Resume.pdf" 
                  className="flex items-center gap-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black px-6 py-3 font-bold uppercase tracking-widest transition-all"
                >
                  <Download size={18} /> Download Intel
                </a>
              </div>
           </TerminalWindow>
        </section>

        {/* SKILLS SECTION: Holographic Cards Grid */}
        <section>
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-gradient-to-r from-transparent to-red-900 flex-grow"></div>
            <h2 className="text-2xl font-bold text-white tracking-[0.3em] uppercase flex items-center gap-3">
              <span className="p-2 border border-red-600 rounded bg-red-950/30">
                <Cpu size={20} className="text-red-500 animate-spin-slow" />
              </span>
              Operational Capabilities
            </h2>
            <div className="h-px bg-gradient-to-l from-transparent to-red-900 flex-grow"></div>
          </div>
          
          {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {skillGroups.length > 0 ? (
              skillGroups.map((group) => (
                <HoloCard key={group._id} className="h-full">
                  <h3 className="text-white font-bold mb-6 border-b border-red-900/30 pb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Target size={16} className="text-red-500" /> 
                    {group.category}
                  </h3>
                  
                  <div className="space-y-5">
                    {group.skills.map((skill) => (
                      <div key={skill._id} className="group/skill">
                        <div className="flex justify-between text-xs text-gray-400 mb-1 font-mono">
                          <span className="group-hover/skill:text-red-400 transition-colors">
                             {">"} {skill.name}
                          </span>
                          <span className="text-red-500">{skill.level}%</span>
                        </div>
                        {/* Skill Bar */}
                        <div className="h-1.5 w-full bg-black/80 rounded-full overflow-hidden border border-gray-800">
                          <div 
                            className="h-full bg-gradient-to-r from-red-900 via-red-600 to-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)] relative" 
                            style={{ width: `${skill.level}%` }}
                          >
                             {/* Moving shine effect on bar */}
                             <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </HoloCard>
              ))
            ) : (
              // Loading State (Skeleton)
              [1, 2, 3].map((i) => (
                <div key={i} className="min-h-[250px] border border-red-900/20 bg-black/40 rounded-xl animate-pulse flex items-center justify-center">
                   <div className="flex flex-col items-center gap-2 text-red-900">
                      <ShieldAlert size={32} />
                      <span className="text-xs uppercase tracking-widest">Decrypting Database...</span>
                   </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </main>
  );
};

export default Home;