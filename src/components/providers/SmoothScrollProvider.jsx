// components/providers/SmoothScrollProvider.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;

    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}