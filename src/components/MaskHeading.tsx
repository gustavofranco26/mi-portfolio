'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { EASE_SOFT } from '@/lib/motion';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const word = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 0.8, ease: EASE_SOFT } },
};

type MaskHeadingProps = {
  id: string;
  text: string;
  className?: string;
};

export function MaskHeading({ id, text, className }: MaskHeadingProps) {
  const words = text.split(' ');

  return (
    <motion.h2
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {words.map((value, index) => (
        <Fragment key={`${value}-${index}`}>
          <span className="-mb-[0.2em] -mt-[0.15em] inline-block overflow-hidden pb-[0.2em] pt-[0.15em] align-bottom">
            <motion.span variants={word} className="inline-block">
              {value}
            </motion.span>
          </span>
          {index < words.length - 1 && ' '}
        </Fragment>
      ))}
    </motion.h2>
  );
}
