'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const DRIFT_TOP = -160;
const DRIFT_BOTTOM = 140;

export function Backdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const topY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : DRIFT_TOP]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : DRIFT_BOTTOM]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: topY }}
        className="absolute -right-[28vmax] -top-[32vmax] size-[84vmax] will-change-transform"
      >
        <div className="glow absolute inset-0" />
        <div className="absolute inset-0 rounded-full border border-accent/[0.12]" />
        <div className="absolute inset-[12%] rounded-full border border-accent/[0.08]" />
        <div className="absolute inset-[26%] rounded-full border border-accent/[0.06]" />
      </motion.div>

      <motion.div
        style={{ y: bottomY }}
        className="absolute -bottom-[34vmax] -left-[26vmax] size-[72vmax] will-change-transform"
      >
        <div className="glow absolute inset-0 opacity-60" />
        <div className="absolute inset-0 rounded-full border border-accent/[0.09]" />
        <div className="absolute inset-[16%] rounded-full border border-accent/[0.06]" />
      </motion.div>
    </div>
  );
}
