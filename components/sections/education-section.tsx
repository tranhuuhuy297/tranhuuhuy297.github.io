'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { educationData } from '@/lib/constants';

export function EducationSection() {
  const [active, setActive] = useState(0);
  const item = educationData[active];

  return (
    <SectionWrapper id="education">
      <h2 className="text-3xl md:text-4xl mb-10 text-center">Education</h2>

      {/* Horizontal tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {educationData.map((edu, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border-none ${
              i === active
                ? 'bg-primary text-background'
                : 'bg-card border border-border text-text-muted hover:text-text hover:border-primary/50'
            }`}
          >
            {edu.degree}
            {i === active && (
              <motion.div
                layoutId="edu-indicator"
                className="absolute inset-0 rounded-lg bg-primary -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Detail card */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-4">
              <div>
                <h3 className="text-xl font-bold">{item.degree}</h3>
                <p className="text-primary font-medium text-sm">{item.school}</p>
              </div>
              <span className="text-text-muted text-sm shrink-0">{item.period}</span>
            </div>

            <ul className="space-y-2 text-text-muted text-sm">
              {item.highlights.map((point, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + j * 0.07 }}
                  className="flex gap-2"
                >
                  <span className="text-primary mt-1 shrink-0">&#9656;</span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
