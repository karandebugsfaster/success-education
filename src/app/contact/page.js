// app/contact/page.js
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';

export const metadata = {
  title: 'Contact Us | Success Education UPSC Coaching',
  description: 'Get in touch with Success Education. Book a free counselling session, visit our Gandhinagar centre, or enroll online.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-[#0d1330] text-center" style={{ paddingTop: '9rem', paddingBottom: '3rem' }}>
          <div className="container-custom px-4">
            <p className="section-label justify-center"><span className="w-8 h-px bg-[#fcc419]" />Get In Touch<span className="w-8 h-px bg-[#fcc419]" /></p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Start Your <span className="text-gradient-gold">UPSC Journey</span> Today
            </h1>
            <p className="text-white/55 max-w-xl mx-auto">Fill the form or call us directly. Free counselling, free demo class — no commitment required.</p>
          </div>
        </div>
        <ContactSection source="contact" />
      </main>
      <Footer />
    </>
  );
}