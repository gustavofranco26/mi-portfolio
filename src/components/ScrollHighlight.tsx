'use client';

import { useRef } from 'react';
import { motion, useScroll, type MotionStyle } from 'framer-motion';

type ScrollHighlightProps = {
  paragraphs: string[];
  className?: string;
};

export function ScrollHighlight({ paragraphs, className }: ScrollHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.55'],
  });

  const words = paragraphs.map((paragraph) => paragraph.split(' '));
  const total = words.reduce((sum, list) => sum + list.length, 0);
  let index = 0;

  return (
    <motion.div
      ref={ref}
      style={{ '--progress': scrollYProgress, '--n': total } as MotionStyle}
      className={className}
    >
      {words.map((list, paragraphIndex) => (
        <p key={paragraphIndex}>
          {list.map((word) => {
            const wordIndex = index++;
            return (
              <span
                key={wordIndex}
                className="highlight-word"
                style={{ '--i': wordIndex } as React.CSSProperties}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      ))}
    </motion.div>
  );
}
