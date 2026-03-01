// components/sections/TestimonialsSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rahul K.',   stars: 5, text: 'Success Education ne preparation ko clear direction di. Ab study random nahi hoti. Har session structured hai aur faculty genuinely helpful hai.' },
  { name: 'Anjali S.',  stars: 4, text: "Faculty ka approach practical hai. Concepts easily samajh aa jate hain. I've tried other coaching but the depth here is different." },
  { name: 'Nitin R.',   stars: 5, text: 'Answer writing practice se confidence kaafi improve hua. RE-RAW program is a game changer for Mains preparation.' },
  { name: 'Poonam D.',  stars: 4, text: 'Beginners ke liye best environment hai. Never felt lost. The UDAY NCERT program set the perfect foundation for me.' },
  { name: 'Akshay M.',  stars: 5, text: 'Prelims strategy sessions bahut helpful rahe. ENDURANCE test series ka level exactly UPSC ke close hai.' },
  { name: 'Ritu A.',    stars: 4, text: 'Mocks ke baad analysis session sabse useful laga. Pata chalta hai exactly kahan galti ho rahi hai and how to fix it.' },
  { name: 'Sandeep J.', stars: 5, text: 'Success Education ne consistency maintain karna sikha diya. The daily schedule and accountability is what made the difference.' },
  { name: 'Kavita N.',  stars: 4, text: 'Faculty approachable hai, doubt poochna easy lagta hai. Never felt hesitant to ask "basic" questions.' },
  { name: 'Rohini P.',  stars: 5, text: 'Mains answer structure ab clearly samajh aata hai. The evaluation feedback is detailed and genuinely useful.' },
  { name: 'Aman V.',    stars: 4, text: 'Content concise hai, unnecessary material nahi. Everything is mapped to the syllabus — nothing extra, nothing missing.' },
  { name: 'Kunal S.',   stars: 5, text: 'GS subjects ka flow kaafi smooth laga. The integration of current affairs into static topics is excellent.' },
  { name: 'Harsh G.',   stars: 4, text: 'Interview guidance se confidence boost mila. ANUBHAVI mock boards feel exactly like the real UPSC board.' },
];

// ── Shared star rating ────────────────────────────────────────────────────
function StarRating({ count, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < count ? '#fcc419' : 'transparent'}
          className={i < count ? 'text-[#fcc419]' : 'text-white/20'}
        />
      ))}
    </div>
  );
}

// ── Desktop: infinite marquee card ───────────────────────────────────────
function MarqueeCard({ t }) {
  return (
    <div className="glass-card rounded-2xl p-5 w-72 flex-shrink-0 relative group hover:border-white/20 transition-all duration-300">
      <Quote size={24} className="absolute top-4 right-4 text-white/8 group-hover:text-white/15 transition-colors" />
      <StarRating count={t.stars} />
      <p className="text-white/65 text-sm leading-relaxed mt-3 mb-4">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fcc419]/60 to-[#f59f00]/60 flex items-center justify-center flex-shrink-0">
          <span className="text-[#0d1330] font-black text-xs">{t.name[0]}</span>
        </div>
        <p className="text-white font-semibold text-sm">— {t.name}</p>
      </div>
    </div>
  );
}

// ── Desktop: infinite scrolling row ──────────────────────────────────────
function InfiniteRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((t, i) => (
          <MarqueeCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

// ── Mobile: snap-scroll card (larger, touch-friendly) ────────────────────
function MobileCard({ t, index }) {
  return (
    <motion.div
      // snap-center makes each card snap to centre when swiping
      className="snap-center flex-shrink-0 w-[82vw] max-w-[320px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <div className="glass-card rounded-2xl p-5 h-full relative overflow-hidden">
        {/* Decorative quote mark */}
        <div
          className="absolute -top-2 -right-2 text-[80px] leading-none font-serif text-white/5 select-none pointer-events-none"
          aria-hidden
        >
          "
        </div>

        {/* Star rating */}
        <StarRating count={t.stars} size={14} />

        {/* Review text */}
        <p className="text-white/75 text-[15px] leading-relaxed mt-3 mb-5">
          "{t.text}"
        </p>

        {/* Bottom divider + author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          {/* Avatar circle */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fcc419]/70 to-[#f59f00]/70 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(252,196,25,0.3)]">
            <span className="text-[#0d1330] font-black text-sm">{t.name[0]}</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">{t.name}</p>
            <p className="text-[#fcc419]/70 text-xs font-medium">UPSC Aspirant</p>
          </div>
          {/* Verified badge */}
          <div className="ml-auto flex items-center gap-1 bg-white/5 rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#51cf66]" />
            <span className="text-white/50 text-[10px] font-semibold">Verified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Mobile: horizontal snap scroll strip ─────────────────────────────────
function MobileScrollStrip({ items }) {
  return (
    <div
      // overflow-x-auto + snap-x + no-scrollbar = native swipe with snapping
      className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-4 px-4"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Left spacer so first card peeks nicely */}
      <div className="flex-shrink-0 w-1" />
      {items.map((t, i) => (
        <MobileCard key={i} t={t} index={i} />
      ))}
      {/* Right spacer */}
      <div className="flex-shrink-0 w-1" />
    </div>
  );
}

// ── Dot indicators for mobile ─────────────────────────────────────────────
function DotRow({ total, active = 0 }) {
  return (
    <div className="flex justify-center gap-1.5 mt-1">
      {[...Array(total)].map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? 'w-5 h-1.5 bg-[#fcc419]'
              : 'w-1.5 h-1.5 bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════
export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const row1 = testimonials.slice(0, 6);
  const row2 = testimonials.slice(6, 12);

  return (
    <section
      id="testimonials"
      className="py-12 md:py-16 bg-[#0d1330] relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="orb orb-blue w-96 h-96 top-0 right-0 opacity-10" />
      <div className="orb orb-gold w-64 h-64 bottom-0 left-10 opacity-8" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div className="container-custom px-4 md:px-6 relative z-10 mb-8 md:mb-12" ref={ref}>
        <div className="text-center">
          <p className="section-label justify-center">
            <span className="w-8 h-px bg-[#fcc419]" />
            What Our Students Say
            <span className="w-8 h-px bg-[#fcc419]" />
          </p>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Real Stories,{' '}
            <span className="text-gradient-gold">Real Results</span>
          </h2>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-2.5 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#fcc419" className="text-[#fcc419]" />
              ))}
            </div>
            <span className="font-display text-white font-black text-xl">4.7</span>
            <span className="text-white/35 text-sm">/ 5.0 from 500+ reviews</span>
          </div>

          {/* Mobile swipe hint — only visible on mobile */}
          <p className="md:hidden text-white/30 text-xs mt-4 flex items-center justify-center gap-1.5">
            <span>←</span>
            <span>Swipe to read more</span>
            <span>→</span>
          </p>
        </div>
      </div>

      {/* ── MOBILE: snap-scroll strips (hidden on md+) ───────────────────── */}
      <motion.div
        className="md:hidden flex flex-col gap-3 relative z-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* First strip: first 6 reviews */}
        <MobileScrollStrip items={testimonials.slice(0, 6)} />

        {/* Dots for first strip */}
        <DotRow total={6} active={0} />

        {/* Second strip: last 6 reviews */}
        <div className="mt-4">
          <MobileScrollStrip items={testimonials.slice(6, 12)} />
          <DotRow total={6} active={0} />
        </div>
      </motion.div>

      {/* ── DESKTOP: infinite marquee (hidden on mobile) ─────────────────── */}
      <motion.div
        className="hidden md:flex flex-col gap-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="px-4">
          <InfiniteRow items={row1} reverse={false} />
        </div>
        <div className="px-4">
          <InfiniteRow items={row2} reverse={true} />
        </div>
      </motion.div>

      {/* ── BOTTOM CTA strip ─────────────────────────────────────────────── */}
      <motion.div
        className="container-custom px-4 md:px-6 relative z-10 mt-10 md:mt-12"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Google reviews badge */}
          <a
            href="https://g.page/r/successeducation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/6 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-5 py-3 transition-all duration-300 group"
          >
            {/* Google G */}
            <svg width="20" height="20" viewBox="0 0 48 48" className="flex-shrink-0">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.9 32.5 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.4 16 18.9 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.1l-6.2-5.2C29.4 35.3 26.8 36 24 36c-5.4 0-9.9-3.5-11.3-8.3L6.1 33c3.3 6.3 10 10.7 17.9 10.7z" />
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.6 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#fcc419" className="text-[#fcc419]" />
                ))}
              </div>
              <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">
                Read 500+ reviews on Google
              </p>
            </div>
          </a>

          {/* Divider — only on desktop */}
          <div className="hidden sm:block h-8 w-px bg-white/10" />

          {/* Student count badge */}
          <div className="flex items-center gap-3 bg-white/6 border border-white/10 rounded-xl px-5 py-3">
            <div className="flex -space-x-2">
              {['R','A','N','P'].map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-[#fcc419]/60 to-[#f59f00]/60 border-2 border-[#0d1330] flex items-center justify-center"
                >
                  <span className="text-[#0d1330] font-black text-[10px]">{initial}</span>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-xs">
              <strong className="text-white">500+</strong> aspirants trust us
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}