// components/sections/HeroSection.jsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Play, CheckCircle2, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, delay, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

const TRUST_BADGES = [
  '15+ Years Experience',
  '500+ Selections',
  'Ex-IAS Faculty',
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1330] noise-texture"
      // Extra top padding to account for notice bar + header
      style={{ paddingTop: '112px' }}
    >
      {/* Ambient gradient orbs */}
      <div className="orb orb-gold w-[500px] h-[500px] -top-32 -right-32 opacity-15" />
      <div className="orb orb-blue w-72 h-72 bottom-20 -left-16 opacity-12" style={{ animationDelay: '3s' }} />
      <div className="orb orb-gold w-40 h-40 top-1/2 left-1/4 opacity-8" style={{ animationDelay: '5s' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />

      <div className="container-custom px-4 md:px-6 py-16 md:py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Content */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-[#fcc419]/12 border border-[#fcc419]/28 text-[#fcc419] text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full mb-7"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              <Star size={11} fill="#fcc419" />
              Rated 4.7 · India's Premier UPSC Coaching
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-[2.6rem] sm:text-5xl md:text-[3.4rem] font-bold leading-[1.08] text-white mb-5"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              Dive Into The
              <br />
              <span className="text-gradient-gold">Madness</span> of
              <br />
              <span className="relative">
                Success!
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#fcc419] to-[#f59f00] rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-white/58 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              Your ultimate hub for <strong className="text-white/90">UPSC Civil Services</strong> preparation. 
              Expert faculty, structured programs, and a proven track record of 
              <strong className="text-[#fcc419]"> 500+ IAS/IPS selections</strong>.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-9"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.38}
            >
              {TRUST_BADGES.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 text-xs text-white/68 bg-white/6 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 size={12} className="text-[#fcc419]" />
                  {b}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.48}
            >
              <Link href="/courses">
                <motion.span
                  className="btn-primary text-sm cursor-pointer inline-flex items-center gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Courses
                  <ArrowRight size={15} />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  className="btn-outline text-sm cursor-pointer inline-flex items-center gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Free Demo
                </motion.span>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-4 mt-10 justify-center lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.62}
            >
              <div className="flex -space-x-2.5">
                {[32, 44, 56, 11].map((n) => (
                  <div key={n} className="w-9 h-9 rounded-full border-2 border-[#0d1330] overflow-hidden">
                    {/* 🔧 Replace with real student photos */}
                    <Image
                      src={`https://randomuser.me/api/portraits/${n % 2 === 0 ? 'men' : 'women'}/${n}.jpg`}
                      alt="Student"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#fcc419" className="text-[#fcc419]" />
                  ))}
                  <span className="text-white font-bold text-sm ml-1">4.7</span>
                </div>
                <p className="text-white/45 text-xs mt-0.5">Trusted by <strong className="text-white/75">500+ aspirants</strong></p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Visual */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="relative w-full max-w-[460px] mx-auto">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#fcc419]/18 to-[#4c6ef5]/18 blur-3xl scale-110" />

              {/* Main card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.55)] aspect-[4/5]">
                {/* 🔧 Replace with actual institute/UPSC themed photo */}
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=80"
                  alt="Success Education UPSC Coaching"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1330]/80 via-[#0d1330]/20 to-transparent" />
              </div>

              {/* Floating card 1 */}
              <motion.div
                className="absolute -left-10 top-10 glass-card rounded-2xl px-4 py-3.5 shadow-xl min-w-[140px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-[#fcc419]" />
                  <p className="text-white/55 text-[11px] font-medium">IAS Selections</p>
                </div>
                <p className="font-display text-white font-black text-2xl">500+</p>
                <p className="text-[#fcc419] text-[10px] font-bold mt-0.5">All Time</p>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                className="absolute -right-8 bottom-24 glass-card rounded-2xl px-4 py-3.5 shadow-xl min-w-[140px]"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <p className="text-white/55 text-[11px] font-medium mb-1">Google Rating</p>
                <div className="flex items-center gap-1.5">
                  <p className="font-display text-white font-black text-2xl">4.7</p>
                  <Star size={16} fill="#fcc419" className="text-[#fcc419]" />
                </div>
                <p className="text-[#fcc419] text-[10px] font-bold mt-0.5">500+ reviews</p>
              </motion.div>

              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-[#fcc419] rounded-xl px-4 py-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-[#0d1330] font-bold text-xs">OGP Batch 2027</p>
                    <p className="text-[#0d1330]/70 text-[10px]">Starts January 9, 2026</p>
                  </div>
                  <Link href="/contact">
                    <span className="bg-[#0d1330] text-[#fcc419] text-[10px] font-black px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#1a2456] transition-colors">
                      Enroll →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-white/25 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
// components/sections/HeroSection.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Star, ChevronLeft, ChevronRight, GraduationCap, Phone } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

// // 🔧 Replace these with your actual course banner images
// const SLIDES = [
//   {
//     src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=85',
//     alt: 'SAMADHI — UPSC Foundation Course',
//     href: '/courses/foundation',
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&q=85',
//     alt: 'ASPIRE — Prelims Preparation',
//     href: '/courses/prelims',
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=85',
//     alt: 'RE-RAW — Mains Answer Writing',
//     href: '/courses/mains-answer-writing',
//   },
// ];

// const TICKER_ITEMS = [
//   { icon: '📅', text: 'Starts on', highlight: '9th January 2026' },
//   { icon: '🎯', text: 'Integrated GS + CSAT Program', highlight: null },
//   { icon: '⭐', text: 'Rated 4.7 on Google', highlight: null },
//   { icon: '🔥', text: 'Limited Seats Available', highlight: null },
//   { icon: '📞', text: 'Call Now:', highlight: '+91 90168 67001' },
//   { icon: '📢', text: 'Admissions Open — OGP Batch 2027', highlight: null },
// ];

// function HeroCarousel() {
//   const [current, setCurrent] = useState(0);
//   const [dir, setDir] = useState(1);

//   useEffect(() => {
//     const t = setInterval(() => { setDir(1); setCurrent((c) => (c + 1) % SLIDES.length); }, 4500);
//     return () => clearInterval(t);
//   }, []);

//   const go = (i) => { setDir(i > current ? 1 : -1); setCurrent(i); };
//   const prev = () => { setDir(-1); setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length); };
//   const next = () => { setDir(1);  setCurrent((c) => (c + 1) % SLIDES.length); };

//   return (
//     <div className="relative w-full overflow-hidden bg-[#1A1464]" style={{ aspectRatio: '16/7' }}>
//       <AnimatePresence initial={false} custom={dir}>
//         <motion.div
//           key={current}
//           custom={dir}
//           initial={{ x: dir * 100 + '%', opacity: 0.6 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: dir * -100 + '%', opacity: 0.6 }}
//           transition={{ duration: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
//           className="absolute inset-0"
//         >
//           <Link href={SLIDES[current].href}>
//             {/* 🔧 Replace src with actual course banner poster images */}
//             <Image
//               src={SLIDES[current].src}
//               alt={SLIDES[current].alt}
//               fill
//               className="object-cover"
//               priority={current === 0}
//               sizes="100vw"
//             />
//           </Link>
//         </motion.div>
//       </AnimatePresence>

//       {/* Prev/Next */}
//       <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all z-10">
//         <ChevronLeft size={18} className="text-[#1A1464]" />
//       </button>
//       <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all z-10">
//         <ChevronRight size={18} className="text-[#1A1464]" />
//       </button>

//       {/* Dots */}
//       <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//         {SLIDES.map((_, i) => (
//           <button key={i} onClick={() => go(i)}
//             className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#FFB800]' : 'w-2 h-2 bg-white/60'}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // YouTube-style announcement bar (below carousel)
// function AnnouncementBar() {
//   const [visible, setVisible] = useState(true);
//   if (!visible) return null;
//   return (
//     <div className="bg-white border-b border-gray-100 py-2.5 px-4">
//       <div className="container-custom flex items-center gap-3 flex-wrap">
//         {/* YouTube icon */}
//         <div className="flex items-center gap-2 flex-shrink-0">
//           <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
//             <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
//               <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-2.75 12.56 12.56 0 0 0-9.64 0A4.83 4.83 0 0 1 2.41 6.69 46.54 46.54 0 0 0 2 12a46.54 46.54 0 0 0 .41 5.31 4.83 4.83 0 0 1 3.77 2.75 12.56 12.56 0 0 0 9.64 0 4.83 4.83 0 0 1 3.77-2.75A46.54 46.54 0 0 0 22 12a46.54 46.54 0 0 0-.41-5.31zM10 15V9l5 3z"/>
//             </svg>
//           </div>
//           <p className="text-[#1A1464] font-semibold text-sm">
//             <strong>UPSC Mains 2025 Question Papers & Analysis:</strong>{' '}
//             <span className="text-gray-500">Strategy & discussion videos are now live!</span>
//           </p>
//         </div>
//         <a
//           href="https://youtube.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors flex-shrink-0"
//         >
//           ▶ Watch Now
//         </a>
//         <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
//           <span className="text-lg leading-none">×</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// // Main hero content — light yellow gradient background (matches selectionmania)
// function HeroContent() {
//   return (
//     <div
//       className="relative overflow-hidden text-center py-14 md:py-20 px-4"
//       style={{
//         background: 'linear-gradient(160deg, #FFFBEE 0%, #FFF3CC 40%, #FFFBEE 100%)',
//       }}
//     >
//       {/* Subtle decorative blobs */}
//       <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#FFB800]/10 -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#1A1464]/5 translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

//       <div className="relative z-10 container-custom">
//         <motion.h1
//           className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1464] mb-4 leading-tight"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           Dive Into The <span className="text-[#FFB800]">Madness</span> of Success!!
//         </motion.h1>

//         <motion.p
//           className="text-[#1A1464]/60 text-base md:text-lg mb-3 font-medium"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//         >
//           Your Ultimate Hub for Success
//         </motion.p>

//         <motion.div
//           className="flex items-center justify-center gap-1.5 mb-8"
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//         >
//           <Star size={16} fill="#FFB800" className="text-[#FFB800]" />
//           <span className="text-[#1A1464] font-bold text-sm">Rated 4.7 By Enrolled Students On Google</span>
//         </motion.div>

//         <motion.div
//           className="flex flex-col sm:flex-row gap-4 justify-center"
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//         >
//           <Link href="/courses">
//             <motion.span
//               className="btn-yellow text-sm py-3 px-8 rounded-lg cursor-pointer inline-flex items-center gap-2"
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <GraduationCap size={17} />
//               Checkout our Courses
//             </motion.span>
//           </Link>
//           <a href="tel:+919016867001">
//             <motion.span
//               className="btn-navy text-sm py-3 px-8 rounded-lg cursor-pointer inline-flex items-center gap-2"
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <Phone size={15} />
//               +91 90168 67001
//             </motion.span>
//           </a>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// // Scrolling stats ticker (dark bar at bottom of hero)
// function StatsTicker() {
//   const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
//   return (
//     <div className="bg-[#1A1464] py-2.5 overflow-hidden">
//       <div className="flex w-max" style={{ animation: 'marquee 25s linear infinite' }}>
//         {doubled.map((item, i) => (
//           <div key={i} className="flex items-center gap-2 px-6 border-r border-white/10 flex-shrink-0">
//             <span className="text-sm">{item.icon}</span>
//             <span className="text-white/75 text-xs font-medium whitespace-nowrap">
//               {item.text}{' '}
//               {item.highlight && (
//                 <strong className="text-[#FFB800]">{item.highlight}</strong>
//               )}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function HeroSection() {
//   return (
//     // Extra top padding for notice bar (yellow, ~36px) + main nav (~64px) = ~100px
//     <div style={{ paddingTop: '100px' }} id="home">
//       <HeroCarousel />
//       <AnnouncementBar />
//       <HeroContent />
//       <StatsTicker />
//     </div>
//   );
// }