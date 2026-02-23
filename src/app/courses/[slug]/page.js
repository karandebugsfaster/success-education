// app/courses/[slug]/page.js
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseDetailContent from '@/components/courses/CourseDetailContent';
import { COURSES, getCourseBySlug } from '@/lib/courses-data';

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.name} — ${course.tagline} | Success Education`,
    description: course.shortDesc,
  };
}

export default function CourseDetailPage({ params }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  return (
    <>
      <Header />
      <main>
        <CourseDetailContent course={course} />
      </main>
      <Footer />
    </>
  );
}