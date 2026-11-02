'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, motionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { projects } from '@/content/projects';
import { MaskHeading } from '@/components/MaskHeading';
import { reveal } from '@/lib/motion';

const STICKY_TOP_REM = 6.5;
const STACK_STEP_REM = 1;
const MIN_SCALE = 0.94;

export function Projects() {
  const t = useTranslations('Projects');
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [scales] = useState(() => projects.map(() => motionValue(1)));
  const { scrollY } = useScroll();

  const updateScales = useCallback(() => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const peek = STACK_STEP_REM * rootFontSize;

    for (let index = 1; index < projects.length; index++) {
      const previous = itemRefs.current[index - 1];
      const current = itemRefs.current[index];
      if (!previous || !current) continue;

      const previousBottom = previous.getBoundingClientRect().top + previous.offsetHeight;
      const covered = (previousBottom - current.getBoundingClientRect().top) / (previous.offsetHeight - peek);
      const progress = Math.min(1, Math.max(0, covered));
      scales[index - 1].set(1 - (1 - MIN_SCALE) * progress);
    }
  }, [scales]);

  useMotionValueEvent(scrollY, 'change', updateScales);

  useEffect(() => {
    updateScales();
    window.addEventListener('resize', updateScales);
    return () => window.removeEventListener('resize', updateScales);
  }, [updateScales]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="px-8 md:px-16 py-24 md:py-32 border-t border-border"
    >
      <MaskHeading
        id="projects-heading"
        text={t('heading')}
        className="mx-auto mb-16 max-w-4xl text-center font-display text-3xl font-bold text-accent md:text-5xl"
      />

      <ul className="mx-auto max-w-4xl">
        {projects.map((project, index) => (
          <motion.li
            key={project.id}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            style={{
              scale: scales[index],
              originY: 0,
              top: `${STICKY_TOP_REM + index * STACK_STEP_REM}rem`,
            }}
            className="sticky mb-8"
          >
            <motion.article
              {...reveal()}
              whileHover={{ y: -4 }}
              className="grid gap-6 border border-border bg-surface p-8 hover:border-border-strong md:grid-cols-[6rem_1fr] md:gap-10 md:p-10"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl font-bold leading-none text-muted md:text-6xl"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex flex-col items-start">
                <h3 className="font-display text-2xl font-bold md:text-3xl">
                  {t(`items.${project.id}.title`)}
                </h3>
                <p className="mb-6 mt-3 max-w-xl text-lg text-muted">
                  {t(`items.${project.id}.description`)}
                </p>
                <ul className="mb-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-border px-2 py-1 text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('viewRepoLabel', {
                      title: t(`items.${project.id}.title`),
                    })}
                    className="group inline-flex min-h-11 items-center text-sm text-accent hover:underline"
                  >
                    {t('viewRepo')}
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center text-sm italic text-muted">
                    {t('private')}
                  </span>
                )}
              </div>
            </motion.article>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
