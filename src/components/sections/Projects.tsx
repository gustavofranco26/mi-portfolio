'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { projects } from '@/content/projects';

export function Projects() {
  const t = useTranslations('Projects');

  return (
    <section id="projects" className="min-h-screen px-8 md:px-16 py-32 border-t border-border">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-3xl md:text-5xl font-display font-bold text-accent mb-16"
      >
        {t('heading')}
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="border border-border bg-surface p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-display font-bold mb-3">
                {t(`items.${project.id}.title`)}
              </h3>
              <p className="text-muted mb-6">
                {t(`items.${project.id}.description`)}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs border border-border px-2 py-1 text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-sm hover:underline"
              >
                {t('viewRepo')} →
              </a>
            ) : (
              <span className="text-muted text-sm italic">
                {t('private')}
              </span>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}