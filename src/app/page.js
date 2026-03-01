// app/page.js
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import CoursesSection from '@/components/sections/CoursesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
// import WhatsAppFloat from '@/components/ui/WhatsAppFloat';

export const metadata = {
  title: 'Success Education | Premier UPSC Coaching — Gandhinagar, Gujarat',
  description:
    'Success Education is a premier UPSC Civil Services coaching institute in Gandhinagar. Expert faculty, structured programs, 500+ selections. Enroll for free demo today.',
  keywords: 'UPSC coaching Gandhinagar, IAS coaching Gujarat, UPSC preparation, Success Education, civil services',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <CoursesSection />
        <WhyUsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection source="contact" />
        {/* <WhatsAppFloat /> */}
      </main>
      <Footer />
    </>
  );
}