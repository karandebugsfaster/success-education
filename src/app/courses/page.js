// app/courses/page.js
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CoursesPageContent from '@/components/courses/CoursesPageContent';

export const metadata = {
  title: 'All UPSC Courses | Success Education',
  description: 'Browse all UPSC courses at Success Education — Foundation, Prelims, Mains, Test Series, Interview, Mentorship, and more.',
};

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main>
        <CoursesPageContent />
      </main>
      <Footer />
    </>
  );
}