import React, { useState } from 'react';
import API from '../api/axiosConfig';
import HoloCard from '../components/HoloCard';
import { Send, Loader2, CheckCircle, AlertTriangle, WifiOff } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [debugError, setDebugError] = useState(''); // Stores the real error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setDebugError('');

    try {
      // Trying the standard /contact endpoint
      await API.post('/contact', formData);
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error("Message Transmission Failed:", error);
      setStatus('error');
      
      // CAPTURE THE EXACT ERROR
      if (error.response) {
        // Server responded with a status code (404, 500, 400)
        setDebugError(`Server Error (${error.response.status}): ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request made but no response (Network Error)
        setDebugError('Network Error: No response from server. Check backend URL.');
      } else {
        // Something else happened
        setDebugError(`Client Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-2xl">
        <HoloCard title="ENCRYPTED_CHANNEL_V4">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-mono text-white mb-2 uppercase tracking-tighter">
              Establish <span className="text-red-600">Uplink</span>
            </h2>
            <p className="text-xs font-mono text-slate-400 tracking-widest">
              // All communications are logged and secured.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-green-900/20 border border-green-500/50 p-8 rounded text-center animate-in fade-in zoom-in">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-xl text-green-400 font-mono font-bold mb-2">TRANSMISSION COMPLETE</h3>
              <p className="text-slate-400 text-sm">Your intel has been securely received.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-xs uppercase tracking-widest text-green-500 hover:text-white underline"
              >
                Send Another Packet
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-[10px] text-red-500 uppercase tracking-widest font-bold font-mono">Agent Identity</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your alias" className="w-full bg-black/80 border border-red-900/50 text-white p-4 rounded focus:border-red-500 focus:outline-none font-mono text-sm transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-red-500 uppercase tracking-widest font-bold font-mono">Return Frequency</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="secure@frequency.com" className="w-full bg-black/80 border border-red-900/50 text-white p-4 rounded focus:border-red-500 focus:outline-none font-mono text-sm transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-red-500 uppercase tracking-widest font-bold font-mono">Payload</label>
                <textarea name="message" required rows="5" value={formData.message} onChange={handleChange} placeholder="Enter encrypted message packet..." className="w-full bg-black/80 border border-red-900/50 text-white p-4 rounded focus:border-red-500 focus:outline-none font-mono text-sm transition-all resize-none"></textarea>
              </div>

              {/* DEBUG ERROR MESSAGE DISPLAY */}
              {status === 'error' && (
                <div className="flex flex-col gap-1 text-red-400 bg-red-950/30 p-4 rounded border-l-4 border-red-600 text-xs font-mono animate-pulse">
                  <div className="flex items-center gap-2 font-bold uppercase">
                     <AlertTriangle size={14} /> TRANSMISSION FAILURE
                  </div>
                  <div className="opacity-80">
                    &gt; {debugError}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-red-600 hover:bg-white hover:text-red-900 text-black font-bold py-4 uppercase tracking-[0.2em] transition-all clip-path-polygon flex items-center justify-center gap-2 mt-2 group"
              >
                {status === 'loading' ? (
                  <><Loader2 size={18} className="animate-spin" /> ENCRYPTING...</>
                ) : (
                  <><Send size={16} className="group-hover:translate-x-1 transition-transform" /> TRANSMIT DATA</>
                )}
              </button>

            </form>
          )}
        </HoloCard>
      </div>
    </div>
  );
};

export default Contact;