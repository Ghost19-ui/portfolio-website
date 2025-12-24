import React from 'react';
import { Tilt } from 'react-tilt';

const defaultOptions = {
  reverse:        false,
  max:            15,     // Max tilt rotation
  perspective:    1000,   
  scale:          1.02,   // Slight zoom on hover
  speed:          1000,   
  transition:     true,   
  axis:           null,   
  reset:          true,   
  easing:         "cubic-bezier(.03,.98,.52,.99)",    
};

const HoloCard = ({ children, className = "" }) => {
  return (
    <Tilt 
      options={defaultOptions} 
      className={`relative group w-full h-full min-h-[250px] ${className}`} 
    >
      {/* Glass Background Layer */}
      <div className="absolute inset-0 bg-red-950/5 backdrop-blur-sm rounded-xl border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.05)] group-hover:border-red-500/50 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all duration-300"></div>
      
      {/* Scanline texture on card */}
      <div className="absolute inset-0 rounded-xl opacity-5 bg-[linear-gradient(0deg,transparent_24%,rgba(255,0,0,.3)_25%,rgba(255,0,0,.3)_26%,transparent_27%,transparent_74%,rgba(255,0,0,.3)_75%,rgba(255,0,0,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,0,0,.3)_25%,rgba(255,0,0,.3)_26%,transparent_27%,transparent_74%,rgba(255,0,0,.3)_75%,rgba(255,0,0,.3)_76%,transparent_77%,transparent)] bg-[length:4px_4px]"></div>

      {/* Content Container */}
      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        {children}
      </div>

      {/* Tactical Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500 rounded-tl transition-all group-hover:w-4 group-hover:h-4"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500 rounded-tr transition-all group-hover:w-4 group-hover:h-4"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500 rounded-bl transition-all group-hover:w-4 group-hover:h-4"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500 rounded-br transition-all group-hover:w-4 group-hover:h-4"></div>
    </Tilt>
  );
};

export default HoloCard;