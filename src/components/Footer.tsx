'use client';

import { motion } from 'framer-motion';

const GITHUB_URL = 'https://github.com/gustavofranco26';
const LINKEDIN_URL = 'https://www.linkedin.com/in/francocardenas/';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="border-t border-border px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted"
    >
      <p>© {year} Franco Cardenas</p>

      <div className="flex items-center gap-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </motion.footer>
  );
}
