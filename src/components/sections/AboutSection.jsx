// components/sections/AboutSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Heart, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const pillars = [
  {
    icon: Target,
    title: 'Mission',
    text: 'To make quality education accessible and transform every student into a confident, capable achiever.',
    color: '#fcc419',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'To be the most trusted coaching institute where every student reaches their fullest academic potential.',
    color: '#748ffc',
  },
  {
    icon: Heart,
    title: 'Values',
    text: 'Integrity, dedication, and student-first approach. We celebrate every small win on the path to big dreams.',
    color: '#ff6b6b',
  },
  {
    icon: ShieldCheck,
    title: 'Promise',
    text: 'We guarantee personalised attention, transparent communication with parents, and result-oriented teaching.',
    color: '#51cf66',
  },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image + floating cards */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
            ref={ref}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(13,19,48,0.15)] aspect-[4/3]">
              {/* 🔧 Replace with actual institute photo */}
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=80"
                alt="Success Education Classroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1330]/40 to-transparent" />
            </div>

            {/* Floating badge — established */}
            <motion.div
              className="absolute -top-5 -right-5 bg-[#0d1330] text-white rounded-2xl px-5 py-4 shadow-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-display font-bold text-3xl text-[#fcc419]">2009</p>
              <p className="text-white/60 text-xs">Established</p>
            </motion.div>

            {/* Floating badge — awards */}
            <motion.div
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-slate-100"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <p className="font-display font-bold text-2xl text-[#0d1330]">12 🏆</p>
              <p className="text-slate-500 text-xs">Awards Won</p>
            </motion.div>

            {/* Gold line accent */}
            <div className="absolute -bottom-3 right-10 w-24 h-1.5 bg-gradient-to-r from-[#fcc419] to-[#f59f00] rounded-full" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="section-label">
              <div className="w-6 h-px bg-[#fcc419]" />
              Who We Are
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0d1330] mb-5 leading-tight">
              15+ Years of Shaping{' '}
              <span className="text-gradient-gold">Brilliant Careers</span>
            </h2>

            <p className="text-slate-500 leading-relaxed mb-5">
              Success Education was founded in 2009 with a single mission — to give every student in India access to the same quality of coaching that leads to IITs, AIIMSes, and top engineering colleges.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              Over the years, we have grown from a single classroom to a full-fledged institute with 50+ faculty members, 2000+ selections, and a reputation built entirely on results. We don't just prepare students for exams — we build thinkers, problem-solvers, and future leaders.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${p.color}18` }}
                    >
                      <Icon size={17} style={{ color: p.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0d1330] text-sm">{p.title}</p>
                      <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{p.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}