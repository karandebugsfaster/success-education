// components/ui/WhatsAppFloat.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

// 🔧 Replace with your actual WhatsApp number (country code + number, no + or spaces)
const WA_NUMBER = '919016867001';
const WA_MESSAGE = encodeURIComponent(
  'Hi! I want to know more about UPSC courses at Success Education.'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed bottom-24 right-5 z-[9998]"
            initial={{ opacity: 0, scale: 0.85, x: 12 }}
            animate={{ opacity: 1, scale: 1,   x: 0  }}
            exit={{   opacity: 0, scale: 0.85, x: 12 }}
            transition={{ duration: 0.22, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] px-4 py-3 max-w-[200px] relative">
              {/* Arrow pointing down-right */}
              <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white rotate-45 shadow-[2px_2px_4px_rgba(0,0,0,0.06)]" />
              {/* Close */}
              <button
                onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={10} className="text-gray-600" />
              </button>
              <p className="text-[#1a1464] font-bold text-sm leading-tight mb-0.5">
                Chat with us! 👋
              </p>
              <p className="text-gray-500 text-xs leading-snug">
                Ask anything about UPSC courses
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-5 z-[9999] flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.5)] cursor-pointer select-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30" />
        <WhatsAppIcon />
      </motion.a>
    </>
  );
}