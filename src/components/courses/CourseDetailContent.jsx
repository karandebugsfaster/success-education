// components/courses/CourseDetailContent.jsx
'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Star, CheckCircle2, BookOpen, ArrowRight, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { COURSES } from '@/lib/courses-data';
import { ChevronDown, Send } from 'lucide-react';

const CITIES = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Rajkot', 'Other'];
const initial = { name: '', email: '', phone: '', city: '', course: '', description: '' };

export default function CourseDetailContent({ course }) {
  const [form, setForm] = useState({ ...initial, course: course.name });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) return toast.error('Please enter your full name.');
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) return toast.error('Enter a valid 10-digit mobile number.');
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return toast.error('Enter a valid email address.');

    setLoading(true);
    const id = toast.loading('Submitting...');
    try {
      const res = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'courses' }),
      });
      const data = await res.json();
      data.success
        ? toast.success(data.message, { id, duration: 6000 })
        : toast.error(data.error, { id });
      if (data.success) setForm({ ...initial, course: course.name });
    } catch {
      toast.error('Network error.', { id });
    } finally {
      setLoading(false);
    }
  };

  // Related courses (excluding current)
  const related = COURSES.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <>
      {/* Hero banner */}
      <div className="relative bg-[#0d1330] overflow-hidden" style={{ paddingTop: '9rem', paddingBottom: '4rem' }}>
        <div className="orb orb-gold w-96 h-96 -top-20 right-0 opacity-12" />
        <div className="orb orb-blue w-64 h-64 bottom-0 left-0 opacity-10" />

        <div className="container-custom px-4 md:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-[#fcc419] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#fcc419] transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-[#fcc419]">{course.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
              <div
                className="inline-flex text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full mb-5"
                style={{ background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}35` }}
              >
                {course.category}
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                {course.name}
              </h1>
              <p className="text-[#fcc419] font-semibold text-lg mb-5">{course.tagline}</p>
              <p className="text-white/60 leading-relaxed mb-8 text-base">{course.fullDesc}</p>

              {/* Quick meta */}
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: Clock, label: course.duration },
                  { icon: Users, label: course.batchSize },
                  { icon: BookOpen, label: course.mode },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-white/65 text-sm">
                    <Icon size={15} className="text-[#fcc419]" />
                    {label}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <span className="font-display font-black text-white text-3xl">{course.price}</span>
                  <p className="text-white/40 text-xs mt-0.5">Full program fee</p>
                </div>
                <a href="#enroll" className="btn-primary text-sm">
                  Enroll Now <ArrowRight size={15} />
                </a>
                <a href="tel:+917827901493" className="btn-outline text-sm">
                  <Phone size={14} /> Call Us
                </a>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] aspect-video lg:aspect-[4/3]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              {/* 🔧 Replace with course-specific image */}
              <Image src={course.image} alt={course.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1330]/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star size={14} fill="#fcc419" className="text-[#fcc419]" />
                  <span className="text-white font-bold text-sm">{course.rating}</span>
                  <span className="text-white/50 text-xs">({course.students} enrolled)</span>
                </div>
                <div className="bg-[#fcc419] text-[#0d1330] text-xs font-black px-3 py-1.5 rounded-lg">
                  {course.badge}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main body */}
      <section className="section-padding bg-[#f8fafc]">
        <div className="container-custom px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* LEFT — Highlights + Syllabus */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(13,19,48,0.06)] border border-slate-100">
                <h2 className="font-display font-bold text-[#0d1330] text-2xl mb-6">What You'll Get</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#fcc419] flex-shrink-0 mt-0.5" />
                      <p className="text-slate-600 text-sm leading-snug">{h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(13,19,48,0.06)] border border-slate-100">
                <h2 className="font-display font-bold text-[#0d1330] text-2xl mb-6">Course Syllabus</h2>
                <div className="flex flex-col gap-3">
                  {course.syllabus.map((s, i) => (
                    <div key={s.title} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ background: `${course.color}18`, color: course.color }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0d1330] text-sm mb-0.5">{s.title}</p>
                        <p className="text-slate-500 text-xs leading-relaxed">{s.topics}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Batch info */}
              <div className="bg-[#0d1330] rounded-2xl p-6 md:p-8 text-white">
                <h2 className="font-display font-bold text-[#fcc419] text-xl mb-4">Batch Information</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Start Date', value: course.startDate },
                    { label: 'Duration', value: course.duration },
                    { label: 'Batch Size', value: course.batchSize },
                    { label: 'Mode', value: course.mode },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-white font-semibold text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Enrollment form (sticky) */}
            <div id="enroll">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl p-6 shadow-[0_8px_40px_rgba(13,19,48,0.12)] border border-slate-100">
                  <h3 className="font-display font-bold text-[#0d1330] text-xl mb-1">Enroll for {course.name}</h3>
                  <p className="text-slate-400 text-sm mb-5">Fill in your details and we'll call you within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
                    {[
                      { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name' },
                      { name: 'email', label: 'Email *', type: 'email', placeholder: 'your@email.com' },
                      { name: 'phone', label: 'Phone *', type: 'tel', placeholder: '10-digit mobile', max: 10 },
                    ].map(({ name, label, type, placeholder, max }) => (
                      <div key={name}>
                        <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-1">{label}</label>
                        <input
                          type={type}
                          name={name}
                          value={form[name]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="form-input"
                          maxLength={max}
                          required
                        />
                      </div>
                    ))}

                    <div>
                      <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-1">City</label>
                      <div className="relative">
                        <select name="city" value={form.city} onChange={handleChange} className="form-input appearance-none pr-8">
                          <option value="">Select city</option>
                          {CITIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Message</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Any queries or your current preparation stage..."
                        rows={2}
                        className="form-input resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="btn-primary justify-center py-3.5 text-sm w-full disabled:opacity-60"
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                      {loading
                        ? <><div className="w-4 h-4 border-2 border-[#0d1330]/30 border-t-[#0d1330] rounded-full animate-spin" />Submitting...</>
                        : <><Send size={14} /> Enroll Now</>}
                    </motion.button>
                  </form>

                  <p className="text-slate-400 text-xs text-center mt-4">🔒 Secure · No spam · Call within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related courses */}
          <div className="mt-16">
            <h2 className="font-display font-bold text-[#0d1330] text-2xl mb-7">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((c) => (
                <Link key={c.slug} href={`/courses/${c.slug}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-[0_12px_40px_rgba(13,19,48,0.12)] transition-all duration-300 flex gap-4 p-4 items-center">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-[#0d1330] text-base leading-tight truncate">{c.name}</p>
                      <p className="text-slate-400 text-xs mt-0.5 truncate">{c.tagline}</p>
                      <p className="font-bold text-[#fcc419] text-sm mt-1.5">{c.price}</p>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-[#0d1330] flex-shrink-0 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}