// components/sections/ResultsSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const toppers = [
  {
    name: 'Arjun Sharma',
    rank: 'AIR 1247',
    exam: 'IIT-JEE Advanced 2024',
    college: 'IIT Bombay — CS',
    // 🔧 Replace with actual topper photo
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    score: '285/360',
  },
  {
    name: 'Priya Patel',
    rank: '720/720',
    exam: 'NEET 2024',
    college: 'AIIMS Delhi',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    score: 'Perfect Score',
  },
  {
    name: 'Vikram Singh',
    rank: 'AIR 432',
    exam: 'IIT-JEE Advanced 2023',
    college: 'IIT Delhi — EE',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
    score: '296/360',
  },
  {
    name: 'Ananya Desai',
    rank: 'AIR 890',
    exam: 'IIT-JEE Mains 2024',
    college: 'NIT Surathkal',
    image: 'https://randomuser.me/api/portraits/women/62.jpg',
    score: '99.2%ile',
  },
  {
    name: 'Rohan Mehta',
    rank: '99.8%ile',
    exam: 'MHT-CET 2023',
    college: 'COEP Pune',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    score: '196/200',
  },
  {
    name: 'Sneha Kulkarni',
    rank: '97.6%',
    exam: 'CBSE Class 12 2024',
    college: 'Merit List — State',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    score: '97.6%',
  },
];

export default function ResultsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="results" className="section-padding bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="container-custom px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="section-label justify-center">
            <div className="w-8 h-px bg-[#fcc419]" />
            Hall of Fame
            <div className="w-8 h-px bg-[#fcc419]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d1330] mb-4">
            Our <span className="text-gradient-gold">Star Performers</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
            Meet the brilliant minds who made their dreams a reality with Success Education.
          </p>
        </div>

        {/* Toppers Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {toppers.map((t, i) => (
            <motion.div
              key={t.name}
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] } },
              }}
              className="bg-white rounded-2xl p-4 text-center shadow-[0_4px_20px_rgba(13,19,48,0.07)] border border-slate-100 card-hover"
            >
              <div className="relative w-16 h-16 mx-auto mb-3">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="w-full h-full rounded-full object-cover border-3 border-[#fcc419]/30"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#fcc419] rounded-full flex items-center justify-center text-[8px] font-black text-[#0d1330]">
                  ★
                </div>
              </div>
              <div className="text-[#fcc419] font-display font-black text-lg leading-tight">{t.rank}</div>
              <p className="text-[#0d1330] font-semibold text-xs mt-0.5 leading-tight">{t.name}</p>
              <p className="text-slate-400 text-[10px] mt-1 leading-tight">{t.exam}</p>
              <div className="mt-2 bg-[#0d1330]/5 rounded-lg px-2 py-1">
                <p className="text-[#0d1330] text-[10px] font-bold">{t.college}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          className="mt-12 rounded-3xl bg-[#0d1330] p-8 md:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="orb orb-gold w-64 h-64 -top-20 -right-20 opacity-15" />
          <div className="orb orb-blue w-48 h-48 bottom-0 left-0 opacity-10" />
          <div className="relative z-10">
            <h3 className="font-display text-white text-2xl md:text-3xl font-bold mb-3">
              Your Name Could Be Here Next Year!
            </h3>
            <p className="text-white/60 text-sm md:text-base mb-7 max-w-lg mx-auto">
              Join thousands of students who trusted Success Education and achieved their dream rank. The journey starts with one step.
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Your Journey Today
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}