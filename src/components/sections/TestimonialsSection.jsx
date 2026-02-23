// components/sections/TestimonialsSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

// Matches the testimonials style from selectionmania (Hinglish + English mix is authentic)
const testimonials = [
  { name: 'Rahul K.', stars: 5, text: 'Success Education ne preparation ko clear direction di. Ab study random nahi hoti. Har session structured hai aur faculty genuinely helpful hai.' },
  { name: 'Anjali S.', stars: 4, text: "Faculty ka approach practical hai. Concepts easily samajh aa jate hain. I've tried other coaching but the depth here is different." },
  { name: 'Nitin R.',  stars: 5, text: 'Answer writing practice se confidence kaafi improve hua. RE-RAW program is a game changer for Mains preparation.' },
  { name: 'Poonam D.', stars: 4, text: 'Beginners ke liye best environment hai. Never felt lost. The UDAY NCERT program set the perfect foundation for me.' },
  { name: 'Akshay M.', stars: 5, text: 'Prelims strategy sessions bahut helpful rahe. ENDURANCE test series ka level exactly UPSC ke close hai.' },
  { name: 'Ritu A.',   stars: 4, text: 'Mocks ke baad analysis session sabse useful laga. Pata chalta hai exactly kahan galti ho rahi hai and how to fix it.' },
  { name: 'Sandeep J.', stars: 5, text: 'Success Education ne consistency maintain karna sikha diya. The daily schedule and accountability is what made the difference.' },
  { name: 'Kavita N.', stars: 4, text: 'Faculty approachable hai, doubt poochna easy lagta hai. Never felt hesitant to ask "basic" questions.' },
  { name: 'Rohini P.', stars: 5, text: 'Mains answer structure ab clearly samajh aata hai. The evaluation feedback is detailed and genuinely useful.' },
  { name: 'Aman V.',   stars: 4, text: 'Content concise hai, unnecessary material nahi. Everything is mapped to the syllabus — nothing extra, nothing missing.' },
  { name: 'Kunal S.',  stars: 5, text: 'GS subjects ka flow kaafi smooth laga. The integration of current affairs into static topics is excellent.' },
  { name: 'Harsh G.',  stars: 4, text: 'Interview guidance se confidence boost mila. ANUBHAVI mock boards feel exactly like the real UPSC board.' },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={12} fill={i < count ? '#fcc419' : 'transparent'} className={i < count ? 'text-[#fcc419]' : 'text-white/20'} />
      ))}
    </div>
  );
}

// Infinite scrolling row
function TestimonialRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-5 w-72 flex-shrink-0 relative group hover:border-white/20 transition-all duration-300"
          >
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
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const row1 = testimonials.slice(0, 6);
  const row2 = testimonials.slice(6, 12);

  return (
    <section id="testimonials" className="section-padding bg-[#0d1330] relative overflow-hidden">
      <div className="orb orb-blue w-96 h-96 top-0 right-0 opacity-10" />
      <div className="orb orb-gold w-64 h-64 bottom-0 left-10 opacity-8" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-custom px-4 md:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label justify-center">
            <span className="w-8 h-px bg-[#fcc419]" />
            What Our Students Say
            <span className="w-8 h-px bg-[#fcc419]" />
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Real Stories, <span className="text-gradient-gold">Real Results</span>
          </h2>
          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#fcc419" className="text-[#fcc419]" />)}
            </div>
            <span className="font-display text-white font-black text-2xl">4.7</span>
            <span className="text-white/35 text-sm">/ 5.0 from 500+ reviews</span>
          </div>
        </div>
      </div>

      {/* Scrolling rows — full bleed */}
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="px-4">
          <TestimonialRow items={row1} reverse={false} />
        </div>
        <div className="px-4">
          <TestimonialRow items={row2} reverse={true} />
        </div>
      </motion.div>
    </section>
  );
}