// components/layout/NoticeBar.jsx
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const notices = [
  '📢 Admissions Open — SAMADHI Foundation Batch 2026 | Starts January 9',
  '🎯 ASPIRE Prelims Batch — Limited 30 Seats | Enroll Now',
  '⭐ Rated 4.7 on Google by 500+ students',
  '🔥 ENDURANCE Test Series — Every Sunday starting January 5',
  '📞 Free Counselling: +91 98765 43210',
];

export default function NoticeBar() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#fcc419] overflow-hidden relative z-50"
        >
          <div className="flex items-center">
            {/* Scrolling ticker */}
            <div className="flex-1 overflow-hidden py-2 px-4">
              <div className="flex gap-0 whitespace-nowrap">
                <motion.div
                  className="flex gap-12 items-center"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {/* Duplicate for seamless loop */}
                  {[...notices, ...notices].map((notice, i) => (
                    <span
                      key={i}
                      className="text-[#0d1330] text-xs font-bold tracking-wide flex-shrink-0"
                    >
                      {notice}
                      <span className="mx-6 text-[#0d1330]/40">◆</span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setVisible(false)}
              className="flex-shrink-0 px-3 py-2 text-[#0d1330]/60 hover:text-[#0d1330] transition-colors"
              aria-label="Close notice bar"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}