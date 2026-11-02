'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const SECTION_IDS = ['top', 'about', 'projects', 'stack', 'contact'] as const;

const DRIFT_TOP = -160;
const DRIFT_BOTTOM = 140;

const TOP = {
  x: [0, -9, 7, -5, 3],
  scale: [1, 1.1, 0.94, 1.12, 1],
  opacity: [1, 0.75, 1, 0.85, 0.7],
};
const BOTTOM = {
  x: [0, 10, -7, 9, -3],
  scale: [1, 0.92, 1.08, 0.96, 1.06],
  opacity: [1, 1, 0.8, 1, 0.9],
};

function sample(progress: number, stops: number[], values: number[]) {
  if (progress <= stops[0]) return values[0];
  for (let i = 1; i < stops.length; i++) {
    if (progress <= stops[i]) {
      const span = stops[i] - stops[i - 1] || 1;
      const t = (progress - stops[i - 1]) / span;
      return values[i - 1] + (values[i] - values[i - 1]) * t;
    }
  }
  return values[values.length - 1];
}

export function Backdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const stops = useRef<number[]>([0, 0.25, 0.5, 0.75, 1]);

  useEffect(() => {
    function measure() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const next = SECTION_IDS.map((id) => {
        const element = document.getElementById(id);
        if (!element) return 0;
        const top = element.getBoundingClientRect().top + window.scrollY;
        return Math.min(1, Math.max(0, top / maxScroll));
      });
      stops.current = next.map((value, i) => (i === 0 ? 0 : Math.max(value, next[i - 1])));
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const byScroll = (values: number[], fallback: number) => (progress: number) =>
    reduceMotion ? fallback : sample(progress, stops.current, values);

  const topY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : DRIFT_TOP]);
  const topX = useTransform(scrollYProgress, (p) => `${byScroll(TOP.x, 0)(p)}vmax`);
  const topScale = useTransform(scrollYProgress, byScroll(TOP.scale, 1));
  const topOpacity = useTransform(scrollYProgress, byScroll(TOP.opacity, 1));

  const bottomY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : DRIFT_BOTTOM]);
  const bottomX = useTransform(scrollYProgress, (p) => `${byScroll(BOTTOM.x, 0)(p)}vmax`);
  const bottomScale = useTransform(scrollYProgress, byScroll(BOTTOM.scale, 1));
  const bottomOpacity = useTransform(scrollYProgress, byScroll(BOTTOM.opacity, 1));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: topY, x: topX, scale: topScale, opacity: topOpacity }}
        className="absolute -right-[28vmax] -top-[32vmax] size-[84vmax] will-change-transform"
      >
        <div className="glow absolute inset-0" />
        <div className="absolute inset-0 rounded-full border border-accent/[0.12]" />
        <div className="absolute inset-[12%] rounded-full border border-accent/[0.08]" />
        <div className="absolute inset-[26%] rounded-full border border-accent/[0.06]" />
      </motion.div>

      <motion.div
        style={{ y: bottomY, x: bottomX, scale: bottomScale, opacity: bottomOpacity }}
        className="absolute -bottom-[34vmax] -left-[26vmax] size-[72vmax] will-change-transform"
      >
        <div className="glow absolute inset-0 opacity-60" />
        <div className="absolute inset-0 rounded-full border border-accent/[0.09]" />
        <div className="absolute inset-[16%] rounded-full border border-accent/[0.06]" />
      </motion.div>
    </div>
  );
}
