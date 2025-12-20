import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ManageProjects from './ManageProjects';
import ViewMessages from './ViewMessages';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-slate-800 rounded-lg p-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-gray-300">
              Welcome, {user?.name || 'Admin'}! Manage your portfolio content.
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold transition"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2 font-bold transition ${
              activeTab === 'projects'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-2 font-bold transition ${
              activeTab === 'messages'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Contact Messages
          </button>
        </div>

        <div>
          {activeTab === 'projects' && <ManageProjects />}
          {activeTab === 'messages' && <ViewMessages />}
        </div>
      </div>
    </div>
  );
}
