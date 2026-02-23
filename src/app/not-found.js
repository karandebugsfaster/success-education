// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1330] flex items-center justify-center text-center px-4">
      <div>
        <p className="font-display font-black text-[#fcc419] text-8xl md:text-9xl mb-4">404</p>
        <h1 className="font-display font-bold text-white text-3xl mb-4">Page Not Found</h1>
        <p className="text-white/45 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn-primary inline-flex">Go Back Home</Link>
      </div>
    </div>
  );
}