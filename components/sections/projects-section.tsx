'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Card } from '@/components/ui/card';
import { projectsData } from '@/lib/constants';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/motion-variants';

const VISIBLE_HIGHLIGHTS = 3;

function ProjectCard({ project }: { project: (typeof projectsData)[number] }) {
  const hasMore = project.highlights.length > VISIBLE_HIGHLIGHTS;
  const [expanded, setExpanded] = useState(false);
  const visibleHighlights = expanded
    ? project.highlights
    : project.highlights.slice(0, VISIBLE_HIGHLIGHTS);

  return (
    <Card>
      <div className="flex items-center gap-3 min-w-0">
        {'logo' in project && project.logo && (
          <a href={project.demo || '#'} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img
              src={project.logo}
              alt={`${project.title} logo`}
              className="w-8 h-8 object-contain"
            />
          </a>
        )}
        <div className="min-w-0">
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-text hover:underline block">
              {project.title}
            </a>
          ) : (
            <h3 className="text-lg font-bold">{project.title}</h3>
          )}
          {project.company && (
            <p className="text-primary text-xs font-medium mt-0.5">@ {project.company}</p>
          )}
        </div>
      </div>

      {'overview' in project && project.overview && (
        <p className="text-text-muted text-sm mt-2">{project.overview}</p>
      )}

      <ul className="mt-3 space-y-2 text-text-muted text-sm">
        <AnimatePresence initial={false}>
          {visibleHighlights.map((point, j) => (
            <motion.li
              key={point}
              className="flex gap-2.5"
              initial={j >= VISIBLE_HIGHLIGHTS ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-primary mt-0.5 shrink-0 text-xs">&#9670;</span>
              <span>{point}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-primary hover:text-primary-hover transition-colors cursor-pointer"
        >
          {expanded
            ? '← Show less'
            : `Show ${project.highlights.length - VISIBLE_HIGHLIGHTS} more →`}
        </button>
      )}
    </Card>
  );
}

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-3xl md:text-4xl mb-8 text-center">Projects</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projectsData.map((project) => (
          <motion.div key={project.title} variants={staggerItemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
