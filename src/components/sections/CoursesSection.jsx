// components/sections/CoursesSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { COURSES } from '@/lib/courses-data';

function CourseCard({ course }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 48 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.25, 0.8, 0.25, 1] } },
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(13,19,48,0.07)] hover:shadow-[0_20px_50px_rgba(13,19,48,0.15)] transition-all duration-400 flex flex-col border border-slate-100"
      style={{ willChange: 'transform' }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-106"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1330]/70 via-[#0d1330]/10 to-transparent" />

        {/* Badge */}
        <div
          className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={{ background: `${course.badgeColor}22`, color: course.badgeColor, border: `1px solid ${course.badgeColor}44` }}
        >
          {course.badge}
        </div>

        {/* Category tag */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white/90 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/15">
          {course.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: course.badgeColor }}>
          {course.tagline}
        </p>
        <h3 className="font-display font-bold text-[#0d1330] text-xl mb-3 leading-snug">{course.name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{course.shortDesc}</p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3.5 mb-4">
          <span className="flex items-center gap-1.5"><Clock size={11} /> {course.duration}</span>
          <span className="flex items-center gap-1.5"><Users size={11} /> {course.students}</span>
          <span className="flex items-center gap-1">
            <Star size={11} fill="#fcc419" className="text-[#fcc419]" />
            <strong className="text-slate-600 text-xs">{course.rating}</strong>
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-[#0d1330] text-lg">{course.price}</span>
          <Link href={`/courses/${course.slug}`} className="flex-1">
            <motion.span
              className="btn-primary text-xs py-2.5 w-full justify-center cursor-pointer inline-flex items-center gap-1.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              View Course
              <ArrowRight size={13} />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoursesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="courses" className="section-padding bg-[#f8fafc]">
      <div className="container-custom px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p className="section-label justify-center">
            <span className="w-8 h-px bg-[#fcc419]" />
            Popular Courses
            <span className="w-8 h-px bg-[#fcc419]" />
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d1330] mb-4">
            Choose Our <span className="text-gradient-gold">Top Courses</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Each program is meticulously designed by UPSC experts and career civil servants to maximise your chance of selection.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {COURSES.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </motion.div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/courses">
            <motion.span
              className="inline-flex items-center gap-2 text-[#0d1330] font-bold text-sm border-2 border-[#0d1330]/20 px-7 py-3.5 rounded-xl hover:bg-[#0d1330] hover:text-white hover:border-[#0d1330] transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              View All Courses
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}