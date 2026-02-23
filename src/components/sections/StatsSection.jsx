// // components/sections/StatsSection.jsx
// 'use client';

// import { useInView } from 'react-intersection-observer';
// import CountUp from 'react-countup';
// import { motion } from 'framer-motion';
// import { Smile, BookOpen, Trophy, GraduationCap } from 'lucide-react';

// const stats = [
//   { icon: Smile,          value: 500,   suffix: '+',  label: 'Enrolled Students',   color: '#fcc419' },
//   { icon: BookOpen,       value: 8,     suffix: '+',  label: 'Academic Programs',    color: '#748ffc' },
//   { icon: Trophy,         value: 12,    suffix: '',   label: 'Winning Awards',       color: '#51cf66' },
//   { icon: GraduationCap,  value: 450,   suffix: '+',  label: 'Certified Students',   color: '#ff6b6b' },
// ];

// export default function StatsSection() {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

//   return (
//     <section className="relative py-14 md:py-20 bg-[#0d1330] overflow-hidden">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

//       <div className="container-custom px-4 md:px-6" ref={ref}>
//         <div className="text-center mb-10">
//           <p className="section-label justify-center">
//             <span className="w-8 h-px bg-[#fcc419]" />
//             Some Fun Facts
//             <span className="w-8 h-px bg-[#fcc419]" />
//           </p>
//           <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
//             Our Great <span className="text-gradient-gold">Achievement</span>
//           </h2>
//         </div>

//         <motion.div
//           className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
//           initial="hidden"
//           animate={inView ? 'visible' : 'hidden'}
//           variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
//         >
//           {stats.map((s) => {
//             const Icon = s.icon;
//             return (
//               <motion.div
//                 key={s.label}
//                 variants={{
//                   hidden: { opacity: 0, y: 40 },
//                   visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.8, 0.25, 1] } },
//                 }}
//                 className="glass-card rounded-2xl p-6 md:p-8 text-center hover:border-white/20 transition-all duration-300"
//               >
//                 <div
//                   className="text-4xl mb-3"
//                   role="img"
//                 >
//                   {s.label === 'Enrolled Students' ? '😊'
//                     : s.label === 'Academic Programs' ? '📘'
//                     : s.label === 'Winning Awards' ? '🏆'
//                     : '🎓'}
//                 </div>

//                 <div className="font-display font-black text-3xl md:text-4xl text-white leading-tight">
//                   {inView ? (
//                     <CountUp end={s.value} duration={2.5} delay={0.2} suffix={s.suffix} />
//                   ) : `0${s.suffix}`}
//                 </div>

//                 <p className="text-white/55 text-sm mt-2 font-medium">{s.label}</p>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
// components/sections/StatsSection.jsx
'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const stats = [
  { emoji: '😊', value: 500,  suffix: '+', label: 'Enrolled Students'  },
  { emoji: '📘', value: 8,    suffix: '+', label: 'Academic Programs'   },
  { emoji: '🏆', value: 12,   suffix: '',  label: 'Winning Awards'      },
  { emoji: '🎓', value: 450,  suffix: '+', label: 'Certified Students'  },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-white section-padding border-t border-gray-100">
      <div className="container-custom px-4 md:px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label justify-center">
            <span className="w-8 h-px bg-[#FFB800]" />
            Some Fun Facts
            <span className="w-8 h-px bg-[#FFB800]" />
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1464]">
            Our Great <span className="text-[#FFB800]">Achievement</span>
          </h2>
        </div>

        {/* 4-column grid — proper layout */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden:   { opacity: 0, y: 30, scale: 0.95 },
                visible:  { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] } },
              }}
              className="text-center p-6 rounded-2xl bg-[#FFFBEE] border border-[#FFB800]/20 hover:border-[#FFB800]/50 hover:shadow-[0_8px_32px_rgba(255,184,0,0.12)] transition-all duration-300"
            >
              <div className="text-4xl mb-3">{s.emoji}</div>

              <div className="font-display font-black text-4xl text-[#1A1464] leading-none">
                {inView
                  ? <CountUp end={s.value} duration={2.2} delay={0.2} suffix={s.suffix} />
                  : `0${s.suffix}`}
              </div>

              <p className="text-gray-500 text-sm font-medium mt-2">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}