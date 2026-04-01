'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/social-icons';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projectsData } from '@/lib/constants';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/motion-variants';

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-3xl md:text-4xl mb-8 text-center">Projects</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projectsData.map((project) => (
          <motion.div key={project.title} variants={staggerItemVariants}>
            <Card>
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-text-muted text-sm mt-1">{project.description}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub`}
                >
                  <GithubIcon className="w-5 h-5 hover:text-primary transition-colors" />
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} demo`}
                  >
                    <ExternalLink className="w-5 h-5 hover:text-primary transition-colors" />
                  </a>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
