import React from 'react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        About Me
      </h1>
      
      {/* Intro Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-white mb-8 shadow-lg hover:border-blue-500/50 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2">
          👨‍💻 Who Am I?
        </h2>
        <p className="text-gray-300 mb-4 text-lg leading-relaxed">
          I'm a passionate 3rd-year B.Tech CSE student specializing in <span className="text-blue-300 font-semibold">Cybersecurity</span> at Parul University. 
          My journey in tech started with curiosity about how systems work and how to secure them against modern threats.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          I specialize in penetration testing, vulnerability assessment, ethical hacking, and building secure web applications. 
          I believe in <span className="italic text-blue-200">"learning by doing"</span> and constantly pushing my boundaries.
        </p>
      </div>

      {/* Skills Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-white mb-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2">
          ⚡ Technical Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Python', 'JavaScript', 'React', 'Node.js', 
            'MongoDB', 'Penetration Testing', 'Kali Linux', 
            'Ethical Hacking', 'Web Security', 'SQL', 'Bash', 'Git'
          ].map((skill) => (
            <div 
              key={skill} 
              className="bg-slate-700 hover:bg-blue-600 p-3 rounded-lg text-center font-semibold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-blue-500/20 shadow-md cursor-default select-none"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2">
          🎓 Education
        </h2>
        <div className="border-l-4 border-blue-500 pl-6 py-2 ml-2">
          <h3 className="text-xl font-bold text-white">B.Tech CSE (Cybersecurity)</h3>
          <p className="text-blue-200 mt-1">Parul University, Vadodara</p>
          <div className="flex justify-between items-center mt-2 max-w-xs">
            <span className="text-gray-400 text-sm">3rd Year Student</span>
            <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-xs border border-blue-500/30">
              2026 Grad
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}