"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Threads from '../../../components/animations/Threads';
import { getContact } from '../controllers/ContactControllers';
import SvgRenderer from '@/app/util/svgRendered';



interface Narasi {
  id: number;
  title: string;
  body: string;
  icon: string;
}

interface ContactType {
  id: number;
  icon: string;
  title: string;
  body: string;
}

export interface ContactData {
  id: number;
  narasi: Narasi;
  contact_type: ContactType[];
}

const ContactView: React.FC = () => {
const [contact, setContact] = useState<ContactData | null>(null);

useEffect(() => {
  async function fetchData() {
    const data = await getContact();
    setContact(data); // ✅ langsung object
  }
  fetchData();
}, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ ok: false, message: 'Semua field wajib diisi.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data?.ok) {
        setStatus({ ok: true, message: 'Terima kasih! Pesan Anda sudah terkirim.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ ok: false, message: data?.error || 'Gagal mengirim pesan.' });
      }
    } catch {
      setStatus({ ok: false, message: 'Terjadi kesalahan jaringan.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black" style={{ width: '100vw' }}>
      {/* Threads Background - Section Only */}
      <div className="absolute inset-0 w-full h-full" style={{ width: '100vw' }}>
        <Threads
          color={[1, 0.42, 0.21]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-20 mx-auto w-[90%] pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
        {/* Contact Information Panel - Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
            {contact?.narasi.title}
          </h2>
          
          <p className="text-slate-300 text-sm xs:text-base sm:text-lg leading-relaxed mb-6">
            {contact?.narasi.body}
          </p>

          <div className="space-y-4">
            {/* Email */}
            {/* <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Email</h3>
                <p className="text-slate-300">contact@vortiqx.com</p>
              </div>
            </div> */}

            {/* Phone */}
            {/* <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg ">Phone</h3>
                <p className="text-slate-300 ">+60-123 563 137</p>
              </div>
            </div> */}

            {/* Office */}
            {/* <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">image.png
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg ">Office</h3>
                <p className="text-slate-300 ">
                  C4-3-5 Solaris Dutamas No. 1 Jalan Dutamas 50480, Kuala Lumpur
                </p>
              </div>
            </div> */}

            {
              contact?.contact_type.map((val, i) => {
                return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <SvgRenderer svgString={val.icon}/>
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg ">{val.title}</h3>
                        <p className="text-slate-300 ">
                          {val.body}
                        </p>
                      </div>
                    </div>
                )
              })
            }
          </div>
        </motion.div>

        {/* Contact Form Panel - Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 ">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-2 ">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-highlight1 focus:border-transparent transition-all duration-200 "
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2 ">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-highlight1 focus:border-transparent transition-all duration-200 "
                placeholder="Your email"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-white font-medium mb-2 ">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-highlight1 focus:border-transparent transition-all duration-200 resize-none "
                placeholder="Tell us about your project..."
              />
            </div>

            {status && (
              <div className={`text-sm ${status.ok ? 'text-green-400' : 'text-red-400'}`}>{status.message}</div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ 
                scale: submitting ? 1 : 1.05,
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: submitting ? 1 : 0.95 }}
              disabled={submitting}
              type="submit"
              className="w-full px-6 py-3 border border-orange-500 text-orange-500 font-semibold rounded-xl transition-all duration-200 shadow-lg cursor-pointer relative overflow-hidden group flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-orange-500 hover:text-white"
            >
              <span className="relative z-10">{submitting ? 'Sending...' : 'Send Message'}</span>
              {!submitting && (
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-400/20"
                initial={{ x: "100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </form>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactView;
