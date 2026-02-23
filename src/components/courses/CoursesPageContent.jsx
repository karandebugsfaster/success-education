// components/courses/CoursesPageContent.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { COURSES } from '@/lib/courses-data';

const CATEGORIES = ['All', 'Foundation', 'Prelims', 'Mains', 'Test Series', 'Interview', 'Mentorship'];

export default function CoursesPageContent() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? COURSES : COURSES.filter((c) => c.category === active);

  return (
    <>
      {/* Page Hero */}
      <div
        className="relative bg-[#0d1330] pt-36 pb-20 text-center overflow-hidden"
        style={{ paddingTop: '9rem' }}
      >
        <div className="orb orb-gold w-96 h-96 -top-20 -right-20 opacity-15" />
        <div className="orb orb-blue w-64 h-64 bottom-0 left-0 opacity-10" />
        <div className="relative z-10 container-custom px-4 md:px-6">
          <p className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-[#fcc419]" />Popular Courses<span className="w-8 h-px bg-[#fcc419]" />
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Our <span className="text-gradient-gold">Top Courses</span>
          </h1>
          <p className="text-white/55 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Each program is meticulously designed by UPSC experts. Find the one that fits your stage and start your journey today.
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="container-custom px-4 md:px-6 py-4 flex gap-2.5 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                active === cat
                  ? 'bg-[#0d1330] text-[#fcc419] border-[#0d1330]'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses grid */}
      <section className="section-padding bg-[#f8fafc]">
        <div className="container-custom px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            key={active}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {filtered.map((course) => (
              <motion.div
                key={course.slug}
                variants={{
                  hidden: { opacity: 0, y: 36 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] } },
                }}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(13,19,48,0.07)] hover:shadow-[0_16px_48px_rgba(13,19,48,0.14)] transition-all duration-400 flex flex-col border border-slate-100"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1330]/60 to-transparent" />
                  <div
                    className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: `${course.badgeColor}22`, color: course.badgeColor, border: `1px solid ${course.badgeColor}44` }}
                  >
                    {course.badge}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: course.badgeColor }}>{course.tagline}</p>
                  <h3 className="font-display font-bold text-[#0d1330] text-xl mb-2">{course.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{course.shortDesc}</p>

                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3 mb-4">
                    <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {course.students}</span>
                    <span className="flex items-center gap-1"><Star size={11} fill="#fcc419" className="text-[#fcc419]" /><strong className="text-slate-600">{course.rating}</strong></span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display font-black text-[#0d1330] text-lg">{course.price}</span>
                    <Link href={`/courses/${course.slug}`} className="flex-1">
                      <span className="btn-primary text-xs py-2.5 w-full justify-center cursor-pointer inline-flex items-center gap-1.5">
                        View Course <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">No courses found in this category.</div>
          )}
        </div>
      </section>
    </>
  );
}