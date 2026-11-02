'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      anchors: { duration: 1.4, easing: easeOutQuart },
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
