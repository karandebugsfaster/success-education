// app/interview/page.js
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ContactSection from '@/components/sections/ContactSection';

export const metadata = {
  title: 'UPSC Interview Preparation | ANUBHAVI | Success Education',
  description: 'Crack the UPSC Personality Test with ANUBHAVI — our dedicated IAS interview preparation program with mock boards, DAF analysis, and retired IAS panelists.',
};

const steps = [
  { step: '01', title: 'DAF Deep Dive', desc: 'We analyse your Detailed Application Form line-by-line to anticipate and prepare for every possible question.' },
  { step: '02', title: 'Current Affairs Grilling', desc: 'Intensive CA sessions covering national, international, economic, and social issues with opinion formation.' },
  { step: '03', title: 'Mock Board Panels', desc: '5 mock interviews with retired IAS/IPS panelists under real exam conditions — recorded for review.' },
  { step: '04', title: 'Video Analysis', desc: 'Watch yourself back. Body language, tone, pause usage, and confidence — all reviewed and refined.' },
  { step: '05', title: 'Final Confidence Build', desc: 'Last-mile psychological coaching, breathing techniques, and board-day protocol preparation.' },
];

export default function InterviewPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative bg-[#0d1330] overflow-hidden" style={{ paddingTop: '9rem', paddingBottom: '5rem' }}>
          <div className="orb orb-gold w-96 h-96 top-0 right-0 opacity-12" />
          <div className="container-custom px-4 md:px-6 relative z-10 text-center">
            <p className="section-label justify-center"><span className="w-8 h-px bg-[#fcc419]" />ANUBHAVI Program<span className="w-8 h-px bg-[#fcc419]" /></p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              UPSC Interview <span className="text-gradient-gold">Mastery</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
              The interview is 275 marks. It can change your rank by hundreds of positions. Our ANUBHAVI program has guided 120+ aspirants through successful UPSC Personality Tests.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/courses/interview">
                <span className="btn-primary text-sm cursor-pointer">View ANUBHAVI Program</span>
              </Link>
              <a href="#interview-contact" className="btn-outline text-sm">Book Mock Interview</a>
            </div>
          </div>
        </div>

        {/* 5-step process */}
        <section className="section-padding bg-white">
          <div className="container-custom px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0d1330] mb-3">
                Our Proven <span className="text-gradient-gold">5-Step Process</span>
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">Systematically designed to take you from anxiety to board-day confidence.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {steps.map((s, i) => (
                <div key={s.step} className="flex gap-5 items-start p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-[#0d1330] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-black text-[#fcc419] text-sm">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#0d1330] text-lg mb-1">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="interview-contact">
          <ContactSection source="interview" compact />
        </div>
      </main>
      <Footer />
    </>
  );
}