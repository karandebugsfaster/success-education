// components/sections/WhyUsSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Users, BarChart3, Clock, Shield, HeartHandshake } from 'lucide-react';

const pillars = [
  {
    icon: Globe,
    title: 'Learn Anywhere',
    desc: 'Anytime, anywhere access to all study materials, recorded lectures, and resources on our platform.',
    color: '#fcc419',
  },
  {
    icon: Users,
    title: 'Expert Faculty',
    desc: 'Concepts explained simply by ex-IAS officers, top rankers, and subject matter specialists.',
    color: '#748ffc',
  },
  {
    icon: HeartHandshake,
    title: 'Team Support',
    desc: 'Personalized guidance and a support team available 6 days a week for every query.',
    color: '#51cf66',
  },
  {
    icon: BarChart3,
    title: 'Course Planning',
    desc: 'A structured, time-bound roadmap so you always know what to study and when.',
    color: '#ff6b6b',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    desc: 'Every resource is reviewed, updated, and mapped to the current UPSC syllabus and trends.',
    color: '#fcc419',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    desc: 'Doubt resolution, study groups, and peer community always active — never study alone.',
    color: '#748ffc',
  },
];

export default function WhyUsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-us" className="section-padding bg-white">
      <div className="container-custom px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT — text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="section-label">
              <div className="w-6 h-px bg-[#fcc419]" />
              Why Choose Us
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d1330] mb-5 leading-tight">
              Learn New Skills To Go{' '}
              <span className="text-gradient-gold">Ahead In Your</span> Career
            </h2>

            <p className="text-slate-500 leading-relaxed mb-8 text-base">
              At <strong className="text-[#0d1330]">Success Education</strong>, we are committed to empowering aspiring civil servants by providing high-quality guidance and resources for the UPSC Civil Services Examination. With 15+ years in competitive exam preparation, we help you navigate one of India's toughest exams through expert faculty, structured study materials, and a holistic learning approach.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#fef9c3] border border-[#fde047]/50">
                <span className="text-2xl flex-shrink-0">🎯</span>
                <div>
                  <p className="font-bold text-[#0d1330] text-sm mb-0.5">Our Mission</p>
                  <p className="text-slate-600 text-sm leading-relaxed">To deliver comprehensive, tailored, and up-to-date educational support that equips candidates with skills, knowledge, and confidence.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f0f4ff] border border-[#bac8ff]/50">
                <span className="text-2xl flex-shrink-0">👁️</span>
                <div>
                  <p className="font-bold text-[#0d1330] text-sm mb-0.5">Our Vision</p>
                  <p className="text-slate-600 text-sm leading-relaxed">To inspire and empower future civil servants by providing the highest quality UPSC education and mentorship in India.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — pillars grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          >
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] } },
                  }}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-[0_8px_30px_rgba(13,19,48,0.06)] transition-all duration-300 group card-hover"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${p.color}18` }}
                  >
                    <Icon size={20} style={{ color: p.color }} />
                  </div>
                  <h3 className="font-display font-bold text-[#0d1330] text-base mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}