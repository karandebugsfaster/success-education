// components/layout/Header.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, Instagram, ChevronDown, Menu, X,
} from 'lucide-react';
import Link from 'next/link';

// 🔧 Replace with real numbers
const PHONES  = ['+91 9427961335', '+91 94279613351', '+91 9427961335'];
const EMAIL   = 'info@successeducation.in';
const WA_LINK = 'https://wa.me/9427961335';

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Interview', href: '/interview' },
  {
    label: 'Courses', href: '/courses',
    dropdown: [
      { label: 'SAMADHI — Foundation',       href: '/courses/foundation' },
      { label: 'ASPIRE — Prelims',            href: '/courses/prelims' },
      { label: 'RE-RAW — Answer Writing',     href: '/courses/mains-answer-writing' },
      { label: 'ENDURANCE — Test Series',     href: '/courses/test-series' },
      { label: 'ANUBHAVI — Interview',        href: '/courses/interview' },
      { label: 'SAHAYAK — Mentorship',        href: '/courses/mentorship' },
      { label: 'LAW — Law Optional',          href: '/courses/law-answer-writing' },
      { label: 'UDAY — NCERT Foundation',     href: '/courses/ncert-foundation' },
    ],
  },
  {
    label: 'About UPSC', href: '/about-upsc',
    dropdown: [
      { label: 'Introduction to CSE',   href: '/about-upsc' },
      { label: 'Prelims Strategy',      href: '/about-upsc#prelims' },
      { label: 'Mains Strategy',        href: '/about-upsc#mains' },
      { label: 'Personality Test',      href: '/about-upsc#interview' },
      { label: 'Syllabus',              href: '/about-upsc#syllabus' },
      { label: 'FAQs',                  href: '/about-upsc#faqs' },
    ],
  },
  {
    label: 'Who We are', href: '/about',
    dropdown: [
      { label: 'About Us',         href: '/about' },
      { label: 'Mission & Vision', href: '/about#mission' },
      { label: "Director's Desk",  href: '/about#director' },
      { label: 'Meet Our Team',    href: '/team' },
    ],
  },
];

function Dropdown({ items, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 py-1"
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.18 }}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1464] hover:bg-[#FFF3CC] hover:text-[#FFB800] font-medium transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] flex-shrink-0 opacity-60" />
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeDD,    setActiveDD]    = useState(null);
  const [mobileExp,   setMobileExp]   = useState(null);
  const timeout = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const over  = (label) => { clearTimeout(timeout.current); setActiveDD(label); };
  const leave = ()      => { timeout.current = setTimeout(() => setActiveDD(null), 140); };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
{/* ── TOP UTILITY BAR ── */}
<div className="hidden md:block bg-[#FFB800] py-2 px-4">
  <div className="container-custom flex items-center justify-between flex-wrap gap-2">
    
    {/* Phone numbers */}
    <div className="flex items-center gap-3 flex-wrap">
      <Phone size={13} className="text-[#1A1464]" />
      {PHONES.map((p, i) => (
        <span key={i} className="flex items-center">
          <a
            href={`tel:${p.replace(/\s/g, "")}`}
            className="text-[#1A1464] text-xs font-bold hover:underline"
          >
            {p}
          </a>
          {i < PHONES.length - 1 && (
            <span className="text-[#1A1464]/40 mx-2">|</span>
          )}
        </span>
      ))}
    </div>

    {/* Right: email + socials */}
    <div className="flex items-center gap-3">
      <a
        href={`mailto:${EMAIL}`}
        className="flex items-center gap-1.5 text-[#1A1464] text-xs font-bold hover:underline"
      >
        <Mail size={13} />
        {EMAIL}
      </a>

      <div className="flex items-center gap-2 ml-2">
        {[
          { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
          { Icon: TelegramIcon, href: "https://t.me", label: "Telegram" },
          { Icon: WhatsAppIcon, href: WA_LINK, label: "WhatsApp" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 bg-[#1A1464]/10 hover:bg-[#1A1464]/20 rounded-full flex items-center justify-center text-[#1A1464] transition-colors"
            aria-label={label}
          >
            <Icon size={13} />
          </a>
        ))}
      </div>
    </div>
  </div>
</div>
      {/* ── MAIN NAV ── */}
      <div className={`bg-white transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.1)]' : 'border-b border-gray-100'}`}>
        <div className="container-custom px-4 md:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-[#1A1464] rounded-lg flex items-center justify-center">
              <span className="text-[#FFB800] font-display font-black text-lg leading-none">S</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-[#1A1464] text-base leading-tight">Success Education</div>
              <div className="text-[#FFB800] text-[9px] font-bold tracking-[0.2em] uppercase">UPSC Coaching</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && over(item.label)}
                onMouseLeave={() => item.dropdown && leave()}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-[#1A1464] hover:text-[#FFB800] transition-colors rounded-lg hover:bg-[#FFF9E6]"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDD === item.label ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                {item.dropdown && <Dropdown items={item.dropdown} visible={activeDD === item.label} />}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/contact">
              <motion.span
                className="hidden md:inline-flex btn-yellow text-sm py-2.5 px-6 cursor-pointer rounded-lg"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Register
              </motion.span>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-[#1A1464] hover:bg-[#FFF9E6] transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 h-full w-[82vw] max-w-xs bg-white flex flex-col pt-4 pb-8 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-100">
                <span className="font-display font-bold text-[#1A1464]">Success Education</span>
                <button onClick={() => setMobileOpen(false)} className="text-gray-400"><X size={20} /></button>
              </div>

              <nav className="flex flex-col px-4 mt-3">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between">
                      <Link href={item.href} onClick={() => setMobileOpen(false)}
                        className="flex-1 text-[#1A1464] font-semibold text-sm py-3.5 border-b border-gray-100 hover:text-[#FFB800] transition-colors">
                        {item.label}
                      </Link>
                      {item.dropdown && (
                        <button onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)}
                          className="px-3 py-3.5 border-b border-gray-100 text-gray-400">
                          <ChevronDown size={15} className={`transition-transform ${mobileExp === item.label ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.dropdown && mobileExp === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-[#FFF9E6] rounded-xl mx-0 my-1"
                        >
                          {item.dropdown.map((sub) => (
                            <Link key={sub.href} href={sub.href} onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2.5 text-sm text-[#1A1464] hover:text-[#FFB800] border-b border-[#FFB800]/10 last:border-0 font-medium">
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              <div className="mt-auto px-4 pt-6 flex flex-col gap-3">
                <a href={`tel:+917827901493`} className="flex items-center gap-2 text-[#1A1464] font-bold text-sm">
                  <Phone size={15} className="text-[#FFB800]" /> +91 90168 67001
                </a>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-yellow text-center text-sm py-3 rounded-lg">
                  Register Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}