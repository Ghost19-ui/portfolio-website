import React, { useState, useRef } from 'react';
import HoloCard from '../components/HoloCard';
import emailjs from '@emailjs/browser';
import API from '../api/axiosConfig'; // Assuming your axios instance is here

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [status, setStatus] = useState('IDLE');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SENDING');

    try {
      // 1. SAVE TO DATABASE
      await API.post('/admin/messages', {
        name: formData.user_name,
        email: formData.user_email,
        content: formData.message
      });

      // 2. LOG THE EVENT
      await API.post('/admin/logs', {
        event: 'UPLINK_ESTABLISHED',
        details: `Payload received from ${formData.user_name}`,
        level: 'INFO'
      });

      // 3. SEND EMAIL (EMAILJS)
      emailjs.init("65Ue8NN3c1qoElj2b");
      await emailjs.sendForm('service_e90837s', 'template_pakz0ci', form.current);

      setStatus('SENT');
      setFormData({ user_name: '', user_email: '', message: '' });
      setTimeout(() => setStatus('IDLE'), 4000);
    } catch (error) {
      console.error('SYSTEM_CRITICAL_ERROR:', error);
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 bg-black font-mono">
      <div className="w-full max-w-2xl">
        <HoloCard title="ENCRYPTED_CHANNEL_V4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tighter uppercase">
                    Establish <span className="text-red-600">Uplink</span>
                </h1>
                <p className="text-slate-400 text-sm">// All communications are logged and secured.</p>
            </div>

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs text-red-500 uppercase tracking-widest font-bold">Agent Identity</label>
                    <input type="text" name="user_name" required value={formData.user_name} onChange={handleChange} 
                           className="w-full bg-black/80 border border-red-900/50 text-slate-200 p-3 outline-none focus:border-red-500 transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-red-500 uppercase tracking-widest font-bold">Return Frequency</label>
                    <input type="email" name="user_email" required value={formData.user_email} onChange={handleChange}
                           className="w-full bg-black/80 border border-red-900/50 text-slate-200 p-3 outline-none focus:border-red-500 transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-red-500 uppercase tracking-widest font-bold">Payload</label>
                    <textarea name="message" required rows="5" value={formData.message} onChange={handleChange}
                              className="w-full bg-black/80 border border-red-900/50 text-slate-200 p-3 outline-none focus:border-red-500 transition-all"></textarea>
                </div>
                <button type="submit" disabled={status === 'SENDING' || status === 'SENT'}
                        className={`w-full py-4 font-bold uppercase tracking-widest transition-all 
                        ${status === 'SENT' ? 'bg-green-600 text-black' : status === 'ERROR' ? 'bg-yellow-600 text-black' : 'bg-red-600 text-black hover:bg-white hover:text-red-600'}`}>
                    {status === 'IDLE' && 'Initialize Transmission'}
                    {status === 'SENDING' && 'Encrypting Packets...'}
                    {status === 'SENT' && 'Transmission Complete'}
                    {status === 'ERROR' && 'Connection Failed'}
                </button>
            </form>
        </HoloCard>
      </div>
    </div>
  );
};

export default Contact;