'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Card } from '@/components/ui/card';
import { projectsData } from '@/lib/constants';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/motion-variants';

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-3xl md:text-4xl mb-8 text-center">Projects</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projectsData.map((project) => (
          <motion.div key={project.title} variants={staggerItemVariants}>
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
                {project.highlights.map((point, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="text-primary mt-0.5 shrink-0 text-xs">&#9670;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
