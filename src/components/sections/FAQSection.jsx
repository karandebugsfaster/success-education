// components/sections/FAQSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What courses do you offer for UPSC?',
    a: 'We offer complete UPSC preparation — Foundation (SAMADHI), Prelims (ASPIRE), Mains Answer Writing (RE-RAW), Test Series (ENDURANCE), Interview Prep (ANUBHAVI), Mentorship (SAHAYAK), Law Optional (LAW), and NCERT Foundation (UDAY).',
  },
  {
    q: 'Do you provide one-to-one mentorship?',
    a: 'Yes. Our SAHAYAK program is a personalised one-to-one mentorship with a dedicated mentor — a cleared IAS/IPS or top-ranked aspirant. You get weekly calls, unlimited WhatsApp support, and personalised study plans.',
  },
  {
    q: 'Are test series included in the foundation course?',
    a: 'Yes. SAMADHI includes weekly Prelims and Mains tests. Additionally, ENDURANCE is our standalone comprehensive test series with 20 full-length Prelims mocks and all-India rankings.',
  },
  {
    q: 'Is the coaching available online or only offline?',
    a: 'Most programs are offered in both Online and Offline modes. Offline sessions happen at our Gandhinagar centre. Online access includes recorded lectures, study material, and live doubt sessions.',
  },
  {
    q: 'What is the batch size?',
    a: 'We deliberately keep batch sizes small — typically 20–30 students per batch — to ensure personalised attention. SAHAYAK is strictly individual (1-on-1).',
  },
  {
    q: 'How do I enroll? What is the process?',
    a: 'Simply fill out the enrollment form on our website or call us directly. Our counsellor will call you within 24 hours, understand your stage and goals, and recommend the right program. You can then attend a free demo class before committing.',
  },
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'border-[#fcc419]/40 bg-[#fef9c3]/30' : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={onClick}
      >
        <span className="font-semibold text-[#0d1330] text-sm md:text-base leading-snug pr-4">{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className={isOpen ? 'text-[#fcc419]' : 'text-slate-400'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <p className="px-5 pb-5 text-slate-500 text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="section-padding bg-[#f8fafc]">
      <div className="container-custom px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">
              <span className="w-6 h-px bg-[#fcc419]" />
              FAQ
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0d1330] mb-5 leading-tight">
              General <span className="text-gradient-gold">Questions</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Have a question we haven't answered here? Call us or drop a message — our counsellors are available Mon–Sat, 8 AM to 8 PM.
            </p>

            {/* Certificate */}
            <div className="bg-[#0d1330] rounded-2xl p-6 text-white">
              <h3 className="font-display font-bold text-[#fcc419] mb-2">Certified & Recognised</h3>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                Trusted institute with verified recognition & proven credibility. 15+ years, 500+ selections.
              </p>
              {/* 🔧 Replace with actual certificate image */}
              <div className="w-full aspect-[4/3] bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-white/40 text-xs">Certificate Image</p>
                  <p className="text-white/25 text-[10px] mt-1">Replace with /images/certificate.jpg</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — FAQ accordion */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}