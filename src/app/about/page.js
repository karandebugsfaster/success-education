// app/about/page.js
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutPageContent from '@/components/pages/AboutPageContent';

export const metadata = {
  title: 'About Us | Success Education — UPSC Coaching Gandhinagar',
  description: 'Learn about Success Education — our mission, vision, values, and the team that has powered 500+ UPSC selections since 2009.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main><AboutPageContent /></main>
      <Footer />
    </>
  );
}