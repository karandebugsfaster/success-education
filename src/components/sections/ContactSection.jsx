// components/sections/ContactSection.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { Send, Phone, MapPin, Mail, Clock, ChevronDown } from 'lucide-react';
import { COURSES } from '@/lib/courses-data';

const FORM_SOURCES = { contact: 'contact' };

const contactInfo = [
  { icon: Phone, label: 'Phone Numbers', value: '+91 78279 01493 | 90168 67001 | 76019 90994', href: 'tel:+917827901493', color: '#fcc419' },
  { icon: Mail, label: 'Email Address', value: 'info@successeducation.in', href: 'mailto:info@successeducation.in', color: '#748ffc' },
  { icon: MapPin, label: 'Our Location', value: 'W-207 Siddhraj Z Square (72) Kudasan, Gandhinagar, Gujarat', href: 'https://maps.google.com', color: '#51cf66' },
  { icon: Clock, label: 'Office Hours', value: 'Monday – Saturday: 8:00 AM – 8:00 PM', href: null, color: '#ff6b6b' },
];

const CITIES = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Rajkot', 'Other'];

const initial = { name: '', email: '', phone: '', city: '', course: '', description: '' };

export default function ContactSection({ source = 'contact', compact = false }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) return toast.error('Please enter your full name.');
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) return toast.error('Enter a valid 10-digit mobile number.');
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return toast.error('Enter a valid email address.');
    if (!form.course) return toast.error('Please select a course.');

    setLoading(true);
    const id = toast.loading('Submitting your request...');

    try {
      const res = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message, { id, duration: 6000 });
        setForm(initial);
      } else {
        toast.error(data.error || 'Something went wrong.', { id });
      }
    } catch {
      toast.error('Network error. Please try again.', { id });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`${compact ? 'py-12' : 'section-padding'} bg-[#0d1330] relative overflow-hidden`}>
      <div className="orb orb-gold w-96 h-96 -top-20 -left-20 opacity-10" />
      <div className="orb orb-blue w-72 h-72 bottom-0 right-0 opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-custom px-4 md:px-6 relative z-10" ref={ref}>
        {!compact && (
          <div className="text-center mb-12 md:mb-14">
            <p className="section-label justify-center">
              <span className="w-8 h-px bg-[#fcc419]" />
              Get In Touch
              <span className="w-8 h-px bg-[#fcc419]" />
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Begin Your <span className="text-gradient-gold">UPSC Journey</span>
            </h2>
            <p className="text-white/55 text-base md:text-lg max-w-xl mx-auto">
              Book a free demo class. No commitment — just experience the Success Education difference.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          {!compact && (
            <motion.div
              className="lg:col-span-2 flex flex-col gap-5"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-bold text-white text-lg mb-6">Contact Details</h3>
                <div className="flex flex-col gap-5">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    const inner = (
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}18`, border: `1px solid ${item.color}28` }}>
                          <Icon size={16} style={{ color: item.color }} />
                        </div>
                        <div>
                          <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-white/80 text-sm font-medium leading-snug">{item.value}</p>
                        </div>
                      </div>
                    );
                    return item.href
                      ? <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">{inner}</a>
                      : <div key={item.label}>{inner}</div>;
                  })}
                </div>
              </div>

              {/* Map */}
              <div className="glass-card rounded-2xl overflow-hidden h-52">
                {/* 🔧 Replace with your actual Google Maps embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.5!2d72.65!3d23.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzM2IiBOIDcywrAzOSc0OCIgRQ!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(85%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  title="Success Education Location"
                />
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.div
            className={compact ? 'col-span-full' : 'lg:col-span-3'}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h3 className="font-display font-bold text-white text-xl mb-1.5">Get Enrolled For Course</h3>
              <p className="text-white/40 text-sm mb-7">Our counsellor will call you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/45 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="form-input" required />
                  </div>
                  <div>
                    <label className="text-white/45 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/45 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Phone *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile" className="form-input" maxLength={10} required />
                  </div>
                  <div>
                    <label className="text-white/45 text-[10px] font-bold uppercase tracking-widest block mb-1.5">City *</label>
                    <div className="relative">
                      <select name="city" value={form.city} onChange={handleChange} className="form-input appearance-none pr-9">
                        <option value="">Select city</option>
                        {CITIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white/45 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Course *</label>
                  <div className="relative">
                    <select name="course" value={form.course} onChange={handleChange} className="form-input appearance-none pr-9" required>
                      <option value="">Select a course</option>
                      {COURSES.map((c) => <option key={c.slug} value={c.name}>{c.name} — {c.tagline}</option>)}
                    </select>
                    <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-white/45 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Message / Descriptions</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Tell us about your preparation stage, goals, or any queries..." rows={3} className="form-input resize-none" maxLength={500} />
                </div>

                <p className="text-white/25 text-xs">🔒 Your details are 100% secure and never shared with third parties.</p>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn-primary justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-[#0d1330]/30 border-t-[#0d1330] rounded-full animate-spin" /> Submitting...</>
                    : <><Send size={15} /> Submit</>
                  }
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}