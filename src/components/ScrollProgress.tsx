'use client';

import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress, originX: 0 }}
      className="fixed inset-x-0 top-0 z-[55] h-[3px] bg-accent"
    />
  );
}
