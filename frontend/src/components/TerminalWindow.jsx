import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Minus, Square, X } from 'lucide-react';

const TerminalWindow = ({ children }) => {
  return (
    <motion.div 
      drag 
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-3xl mx-auto bg-black/90 border border-gray-800 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-sm backdrop-blur-xl"
    >
      {/* Terminal Header Bar */}
      <div className="bg-gray-900/80 px-4 py-2 flex items-center justify-between border-b border-gray-800 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2 text-gray-400">
          <Terminal size={14} className="text-red-500" />
          <span className="text-xs tracking-wider">root@red-team:~/operations</span>
        </div>
        <div className="flex items-center gap-2">
          <Minus size={12} className="text-gray-500 hover:text-white cursor-pointer" />
          <Square size={10} className="text-gray-500 hover:text-white cursor-pointer" />
          <X size={12} className="text-red-500 hover:text-red-400 cursor-pointer" />
        </div>
      </div>
      
      {/* Terminal Body Content */}
      <div className="p-6 md:p-8">
        <div className="mb-6 font-mono text-xs md:text-sm">
          <div className="flex gap-2">
            <span className="text-green-500">➜</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-300">./initialize_profile.sh --force</span>
          </div>
          <div className="text-gray-500 mt-1">
            [+] Loading modules... <span className="text-green-500">DONE</span><br/>
            [+] Establishing secure connection... <span className="text-green-500">CONNECTED</span><br/>
            [+] Decrypting bio... <span className="text-green-500">SUCCESS</span>
          </div>
        </div>

        {/* The Actual Bio Content */}
        <div className="text-gray-200 leading-relaxed border-l-2 border-red-500/30 pl-4">
          {children}
        </div>

        {/* Blinking Cursor at bottom */}
        <div className="mt-6 flex items-center gap-2 animate-pulse">
          <span className="text-green-500">➜</span>
          <span className="text-blue-400">~</span>
          <span className="w-2.5 h-4 bg-red-500 block"></span>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalWindow;