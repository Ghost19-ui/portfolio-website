// src/pages/Admin/AdminLogs.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig'; // Use the configured instance

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/admin/logs'); // Fetches from /api/v1/admin/logs
        setLogs(res.data);
      } catch (err) {
        console.error("Log fetch failed. Check token or backend URL.");
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-black p-6 font-mono text-green-500">
      <h2>> SYSTEM_LOG_STREAM_V4.0</h2>
      <div className="mt-4">
        {logs.map((log, i) => (
          <div key={i}>[{new Date(log.timestamp).toLocaleTimeString()}] {log.event}: {log.details}</div>
        ))}
      </div>
    </div>
  );
};