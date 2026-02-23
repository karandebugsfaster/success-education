// components/sections/VideoSection.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, X } from 'lucide-react';

// 🔧 Replace with your actual YouTube video ID
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';

export default function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="video" className="section-padding bg-[#f8fafc]">
      <div className="container-custom px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-label justify-center">
            <div className="w-8 h-px bg-[#fcc419]" />
            Success Stories in Motion
            <div className="w-8 h-px bg-[#fcc419]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0d1330] mb-3">
            See What Makes Us{' '}
            <span className="text-gradient-gold">Different</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-base">
            Watch our institute tour, student testimonials, and faculty interviews — all in one place.
          </p>
        </div>

        {/* Thumbnail */}
        <motion.div
          ref={ref}
          className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(13,19,48,0.15)] cursor-pointer group"
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Thumbnail image — 🔧 Replace with your actual thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
            alt="Success Education Video"
            className="w-full aspect-video object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#0d1330]/50 group-hover:bg-[#0d1330]/40 transition-colors duration-300" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 bg-[#fcc419] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(252,196,25,0.6)] group-hover:scale-110 transition-transform duration-300"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Play size={28} fill="#0d1330" className="text-[#0d1330] ml-1.5" />
            </motion.div>
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-display font-bold text-lg">Success Education — Our Story</p>
            <p className="text-white/60 text-sm">15 years • 2000+ students • Countless dreams fulfilled</p>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1.5 text-sm transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} /> Close
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
              title="Success Education"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}