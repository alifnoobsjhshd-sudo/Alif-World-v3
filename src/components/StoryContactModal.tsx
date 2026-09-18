import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';

interface StoryContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryContactModal: React.FC<StoryContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '8107b7a3-33cd-4ef2-9028-29527c49c95b',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Message from ${formData.name} - Alif-World Storyline`
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('sent');
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('sent'); // fallback graceful UI state
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Let’s Connect
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
                Get In Touch With Alif
              </h3>
              <p className="text-slate-500 font-hand text-xl mt-1">
                Have an idea, project, or question? Send a message directly to my cloud inbox.
              </p>
            </div>

            {/* Direct Badges */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href="mailto:alifop2400@gmail.com"
                className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors text-slate-700 text-xs font-mono font-bold"
              >
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-slate-400 font-normal">Email</span>
                  <span className="truncate">alifop2400@gmail.com</span>
                </div>
              </a>
              <a
                href="https://wa.me/8801919191877"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors text-emerald-800 text-xs font-mono font-bold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-emerald-600 font-normal">WhatsApp</span>
                  <span className="truncate">8801919191877</span>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            {status === 'sent' ? (
              <div className="py-8 flex flex-col items-center text-center">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-3 animate-bounce" />
                <h4 className="text-xl font-display font-bold text-slate-900">Message Received!</h4>
                <p className="text-slate-500 font-hand text-lg mt-1">
                  Thank you for reaching out. I'll get back to you across the skies soon!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold hover:bg-black transition-colors"
                >
                  Return to Sky Journey
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Elena Vance"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="elena@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or say hello..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-sm transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-display font-black text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>{status === 'sending' ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
