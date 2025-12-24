import React, { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get('/admin/logs');
        setLogs(res.data);
      } catch (err) { console.error("Log fetch failed", err); }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen font-mono text-sm">
      <div className="border border-red-900/50 bg-black/80 p-6 rounded shadow-[0_0_40px_rgba(220,38,38,0.1)]">
        <h2 className="text-red-600 mb-6 flex items-center gap-2 border-b border-red-900/30 pb-2 uppercase font-bold">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
          System_Log_Stream_V4.0
        </h2>
        <div className="space-y-1 h-[500px] overflow-y-auto scrollbar-hide">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 py-1 hover:bg-red-950/10 transition-colors">
              <span className="text-zinc-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className={log.level === 'ERROR' ? 'text-red-600 font-bold' : 'text-green-600'}>{log.level}</span>
              <span className="text-red-400 font-bold uppercase">{log.event}:</span>
              <span className="text-zinc-400">{log.details}</span>
            </div>
          ))}
          <div className="text-red-500 animate-pulse mt-2">_</div>
        </div>
      </div>
    </div>
  );
}