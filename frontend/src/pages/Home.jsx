import React from 'react';
import HoloCard from '../components/HoloCard';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: The Terminal / Bio */}
        <div className="space-y-6">
          <HoloCard title="ROOT_ACCESS_GRANTED">
             <div className="font-mono text-sm text-red-400 mb-4 opacity-70">
                > Initializing Red Team Protocols...<br/>
                > Decrypting User Identity...<br/>
                > Target: Secure Infrastructure<br/>
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
                <button className="bg-red-600 text-black font-bold py-3 px-6 uppercase tracking-widest hover:bg-white transition-colors clip-path-polygon">
                   Initiate
                </button>
                <button className="border border-red-500 text-red-500 font-bold py-3 px-6 uppercase tracking-widest hover:bg-red-900/20 transition-colors">
                   Download Intel
                </button>
             </div>
          </HoloCard>
        </div>

        {/* RIGHT COLUMN: Floating Icons (Matches Reference) */}
        <div className="hidden lg:flex flex-col gap-6 items-end pointer-events-none">
           
           {/* ICON 1: LOCK */}
           <div className="w-24 h-24 bg-red-900/10 backdrop-blur-sm border border-red-500/30 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '0s'}}>
              <i className="fas fa-lock text-4xl text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]"></i>
           </div>

           {/* ICON 2: SHIELD */}
           <div className="w-24 h-24 bg-red-900/10 backdrop-blur-sm border border-red-500/30 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1s', marginRight: '40px'}}>
              <i className="fas fa-shield-alt text-4xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"></i>
           </div>

           {/* ICON 3: BUG */}
           <div className="w-24 h-24 bg-red-900/10 backdrop-blur-sm border border-red-500/30 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '2s'}}>
              <i className="fas fa-spider text-4xl text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]"></i>
           </div>

        </div>

      </div>
    </div>
  );
};

export default Home;