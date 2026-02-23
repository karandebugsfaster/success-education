// components/pages/AboutPageContent.jsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Target, Eye, Heart, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const team = [
  { name: 'Pankaj Dhuppar', role: 'Founder & Director', subject: 'GS & Strategy', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { name: 'Ranjana Singh', role: 'Senior Faculty', subject: 'Polity & Governance', image: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { name: 'Arvind Nair', role: 'Faculty — GS 3', subject: 'Economy & Environment', image: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { name: 'Priya Mehta', role: 'Interview Coach', subject: 'Personality Test', image: 'https://randomuser.me/api/portraits/women/43.jpg' },
];

const pillars = [
  {
    icon: Target,
    label: "Our Mission",
    text: "To deliver comprehensive, tailored, and up-to-date educational support that equips candidates with skills, knowledge, and confidence for UPSC CSE.",
    color: "#fcc419",
  },
  {
    icon: Eye,
    label: "Our Vision",
    text: "To inspire and empower future civil servants by providing the highest quality UPSC education and mentorship available anywhere in India.",
    color: "#748ffc",
  },
  {
    icon: Heart,
    label: "Our Values",
    text: "Integrity, transparency, student-first approach, and celebrating every aspirant's progress — big or small — on the long road to success.",
    color: "#51cf66",
  },
  {
    icon: ShieldCheck,
    label: "Our Promise",
    text: "Personalised attention, honest guidance, result-oriented teaching, and transparent communication with every student and their family.",
    color: "#ff6b6b",
  },
];

export default function AboutPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* Hero */}
      <div className="relative bg-[#0d1330] text-center overflow-hidden" style={{ paddingTop: '9rem', paddingBottom: '5rem' }}>
        <div className="orb orb-gold w-96 h-96 top-0 right-0 opacity-12" />
        <div className="orb orb-blue w-64 h-64 bottom-0 left-0 opacity-10" />
        <div className="container-custom px-4 relative z-10">
          <p className="section-label justify-center mb-3"><span className="w-8 h-px bg-[#fcc419]" />Who We Are<span className="w-8 h-px bg-[#fcc419]" /></p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            15+ Years of Shaping <span className="text-gradient-gold">Civil Servants</span>
          </h1>
          <p className="text-white/55 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Founded in 2009, Success Education has been at the forefront of UPSC coaching with a track record of 500+ selections across IAS, IPS, IFS and Allied Services.
          </p>
        </div>
      </div>

      {/* Story + Image */}
      <section className="section-padding bg-white" ref={ref}>
        <div className="container-custom px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_60px_rgba(13,19,48,0.12)]">
                {/* 🔧 Replace with actual classroom/institute photo */}
                <Image src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=80" alt="Success Education Classroom" fill className="object-cover" />
              </div>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 bg-[#fcc419] rounded-2xl p-4 text-center">
                  <p className="font-display font-black text-[#0d1330] text-3xl">2009</p>
                  <p className="text-[#0d1330]/70 text-xs font-semibold">Established</p>
                </div>
                <div className="flex-1 bg-[#0d1330] rounded-2xl p-4 text-center">
                  <p className="font-display font-black text-[#fcc419] text-3xl">500+</p>
                  <p className="text-white/60 text-xs font-semibold">Selections</p>
                </div>
                <div className="flex-1 bg-slate-100 rounded-2xl p-4 text-center">
                  <p className="font-display font-black text-[#0d1330] text-3xl">4.7★</p>
                  <p className="text-slate-500 text-xs font-semibold">Google Rating</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, delay: 0.15 }}>
              <p className="section-label"><span className="w-6 h-px bg-[#fcc419]" />Our Story</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0d1330] mb-5 leading-tight">
                Built From A Belief That <span className="text-gradient-gold">Every Aspirant Deserves</span> Expert Guidance
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Success Education was founded in 2009 with a simple but powerful belief — that quality UPSC coaching should not be limited to Delhi. Our founder, a passionate educator and UPSC expert, established the institute in Gandhinagar to serve aspirants across Gujarat and beyond.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Over 15 years, we have grown from a single classroom to a full-fledged coaching institute with 8+ programs, 50+ faculty members, and a community of 500+ selected civil servants who started their journey right here. We don't just teach for exams — we build thinkers and future administrators.
              </p>
              <Link href="/contact">
                <motion.span className="btn-primary text-sm cursor-pointer inline-flex" whileHover={{ scale: 1.03 }}>
                  Book Free Counselling
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section id="mission" className="section-padding bg-[#f8fafc]">
        <div className="container-custom px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="section-label justify-center"><span className="w-8 h-px bg-[#fcc419]" />Our Foundation<span className="w-8 h-px bg-[#fcc419]" /></p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0d1330]">
              Mission, Vision & <span className="text-gradient-gold">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(13,19,48,0.05)]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${p.color}15` }}>
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <h3 className="font-display font-bold text-[#0d1330] text-xl mb-2">{p.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding bg-white">
        <div className="container-custom px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="section-label justify-center"><span className="w-8 h-px bg-[#fcc419]" />Meet Our Team<span className="w-8 h-px bg-[#fcc419]" /></p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0d1330]">
              The Experts <span className="text-gradient-gold">Behind Your Success</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100 hover:shadow-[0_8px_30px_rgba(13,19,48,0.1)] transition-all duration-300 card-hover">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  {/* 🔧 Replace with actual faculty photos */}
                  <Image src={member.image} alt={member.name} fill className="rounded-full object-cover border-3 border-[#fcc419]/30" />
                </div>
                <h3 className="font-display font-bold text-[#0d1330] text-base leading-tight">{member.name}</h3>
                <p className="text-[#fcc419] text-xs font-bold mt-1">{member.role}</p>
                <p className="text-slate-400 text-xs mt-0.5">{member.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}