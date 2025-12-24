import React, { useState, useRef } from 'react';
import HoloCard from '../components/HoloCard';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  
  const [formData, setFormData] = useState({
    user_name: '', // Updated to match input names
    user_email: '',
    message: ''
  });
  const [status, setStatus] = useState('IDLE');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('SENDING');

    // --- YOUR VERIFIED CONFIGURATION ---
    emailjs.sendForm(
      'service_e90837s',     // Your Service ID
      'template_pakz0ci',    // Your Template ID
      form.current,
      '65Ue8NN3c1qoElj2b'    // Your Public Key
    )
    .then((result) => {
        console.log('SUCCESS!', result.text);
        setStatus('SENT');
        // Reset local state
        setFormData({ user_name: '', user_email: '', message: '' }); 
        setTimeout(() => setStatus('IDLE'), 4000);
    }, (error) => {
        console.log('FAILED...', error.text);
        setStatus('ERROR');
        setTimeout(() => setStatus('IDLE'), 3000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-2xl">
        <HoloCard title="ENCRYPTED_CHANNEL_V4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2 tracking-tighter">
                    ESTABLISH <span className="text-red-600">UPLINK</span>
                </h1>
                <p className="text-slate-400 font-mono text-sm">
                    // Send encrypted transmission to operator.<br/>
                    // All communications are logged and secured.
                </p>
            </div>

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-mono text-red-400 uppercase tracking-widest ml-1">
                        Agent Identity / Name
                    </label>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-sm opacity-20 group-hover:opacity-50 transition duration-500"></div>
                        <input
                            type="text"
                            name="user_name"
                            required
                            value={formData.user_name}
                            onChange={handleChange}
                            className="relative w-full bg-black/80 border border-red-900/50 text-slate-200 p-3 font-mono focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all placeholder-slate-700"
                            placeholder="ENTER_CODENAME..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-red-400 uppercase tracking-widest ml-1">
                        Return Frequency / Email
                    </label>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-sm opacity-20 group-hover:opacity-50 transition duration-500"></div>
                        <input
                            type="email"
                            name="user_email"
                            required
                            value={formData.user_email}
                            onChange={handleChange}
                            className="relative w-full bg-black/80 border border-red-900/50 text-slate-200 p-3 font-mono focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all placeholder-slate-700"
                            placeholder="SECURE@DOMAIN.COM..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-red-400 uppercase tracking-widest ml-1">
                        Payload / Message
                    </label>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-sm opacity-20 group-hover:opacity-50 transition duration-500"></div>
                        <textarea
                            name="message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="relative w-full bg-black/80 border border-red-900/50 text-slate-200 p-3 font-mono focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all placeholder-slate-700"
                            placeholder="INPUT_DATA_STREAM..."
                        ></textarea>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === 'SENDING' || status === 'SENT'}
                    className={`
                        w-full py-4 font-bold font-mono uppercase tracking-[0.2em] clip-path-polygon transition-all duration-300
                        ${status === 'SENT' 
                            ? 'bg-green-600 text-black cursor-default' 
                            : status === 'ERROR'
                            ? 'bg-yellow-600 text-black cursor-default'
                            : 'bg-red-600 hover:bg-white hover:text-red-600 text-black shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]'
                        }
                    `}
                >
                    {status === 'IDLE' && 'INITIALIZE_TRANSMISSION'}
                    {status === 'SENDING' && 'ENCRYPTING_PACKETS...'}
                    {status === 'SENT' && 'TRANSMISSION_COMPLETE'}
                    {status === 'ERROR' && 'CONNECTION_FAILED'}
                </button>
            </form>
        </HoloCard>
      </div>
    </div>
  );
};

export default Contact;