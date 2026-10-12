'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const SCROLL_RANGE = 600;
const FADE_END = SCROLL_RANGE * 0.8;

type ParallaxLayerProps = {
  speed: number;
  className?: string;
  children: ReactNode;
};

export function ParallaxLayer({ speed, className, children }: ParallaxLayerProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, SCROLL_RANGE], [0, reduceMotion ? 0 : SCROLL_RANGE * speed]);
  const opacity = useTransform(scrollY, [0, FADE_END], [1, reduceMotion ? 1 : 0]);

  return (
    <motion.div style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
