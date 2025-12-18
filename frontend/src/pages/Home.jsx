import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h1 className="text-6xl font-bold mb-4">Hi, I'm Tushar Saini</h1>
        <p className="text-2xl text-blue-300 mb-6">3rd Year CSE Student | Cybersecurity & VAPT Enthusiast</p>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Building secure, interactive web applications and offensive security tools. 
          Passionate about penetration testing, ethical hacking, and web security.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/projects" className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-bold transition">
            View My Work
          </Link>
          <Link to="/contact" className="bg-green-600 px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-bold transition">
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
