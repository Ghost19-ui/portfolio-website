import React from 'react';
import HoloCard from '../components/HoloCard';
import { Shield, Lock, Bug, Terminal } from 'lucide-react'; // Using Lucide icons to match your theme

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: The Terminal / Bio */}
        <div className="space-y-6">
          <HoloCard title="ROOT_ACCESS_GRANTED">
             <div className="font-mono text-sm text-red-400 mb-4 opacity-70">
                &gt; Initializing Red Team Protocols...<br/>
                &gt; Decrypting User Identity...<br/>
                &gt; Target: Secure Infrastructure<br/>
             </div>
             
             <h1 className="text-6xl font-bold font-mono text-white mb-2 tracking-tighter">
                TUSHAR <span className="text-red-600">SAINI</span>
             </h1>
             <h2 className="text-2xl text-slate-300 font-mono mb-6 tracking-widest uppercase border-b border-red-900/50 pb-4">
                Offensive Security Engineer
             </h2>

             <p className="text-slate-400 mb-8 font-mono text-sm leading-6 border-l-2 border-red-500 pl-4">
                Specializing in <span className="text-white">Network Intrusion</span>, 
                <span className="text-white">Web App Security</span>, and 
                <span className="text-white">Exploit Development</span>. 
                I don't just find bugs; I demonstrate the risk.
             </p>

             <div className="flex gap-4">
                <button className="bg-red-600 text-black font-bold py-3 px-6 uppercase tracking-widest hover:bg-white transition-colors clip-path-polygon cursor-pointer flex items-center gap-2">
                    <Terminal size={18} /> Initiate
                </button>
                
                {/* --- FIXED DOWNLOAD BUTTON --- */}
                {/* 1. Changed to <a> tag */}
                {/* 2. Added href="/resume.pdf" */}
                {/* 3. Added download attribute to force file save */}
                <a 
                  href="/resume.pdf" 
                  download="Tushar_Saini_Resume.pdf"
                  className="border border-red-500 text-red-500 font-bold py-3 px-6 uppercase tracking-widest hover:bg-red-900/20 transition-colors cursor-pointer text-center flex items-center gap-2"
                >
                    Download Intel
                </a>
             </div>
          </HoloCard>
        </div>

        {/* RIGHT COLUMN: Floating Icons (Updated to use Lucide React) */}
        <div className="hidden lg:flex flex-col gap-6 items-end pointer-events-none">
           
           {/* ICON 1: LOCK */}
           <div className="w-24 h-24 bg-red-900/10 backdrop-blur-sm border border-red-500/30 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '0s'}}>
              <Lock size={40} className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
           </div>

           {/* ICON 2: SHIELD */}
           <div className="w-24 h-24 bg-red-900/10 backdrop-blur-sm border border-red-500/30 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1s', marginRight: '40px'}}>
              <Shield size={40} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
           </div>

           {/* ICON 3: BUG */}
           <div className="w-24 h-24 bg-red-900/10 backdrop-blur-sm border border-red-500/30 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '2s'}}>
              <Bug size={40} className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
           </div>

        </div>

      </div>
    </div>
  );
};

export default Home;