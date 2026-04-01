'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { experienceData } from '@/lib/constants';

export function ExperienceSection() {
  const [active, setActive] = useState(0);
  const item = experienceData[active];

  return (
    <SectionWrapper id="experience">
      <h2 className="text-3xl md:text-4xl mb-10 text-center">Experience</h2>

      {/* Timeline bar */}
      <div className="relative max-w-3xl mx-auto mb-10">
        {/* Track line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
        {/* Animated progress fill */}
        <motion.div
          className="absolute top-4 left-0 h-0.5 bg-primary"
          initial={false}
          animate={{
            width: `${(active / (experienceData.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Timeline nodes */}
        <div className="relative flex justify-between">
          {experienceData.map((exp, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
            >
              {/* Dot */}
              <motion.div
                className="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors"
                animate={{
                  borderColor: i <= active ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: i <= active ? 'var(--color-primary)' : 'var(--color-background)',
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                {i <= active && (
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-background"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                )}
              </motion.div>
              {/* Label */}
              <span className="text-[11px] md:text-xs text-text-muted font-medium whitespace-nowrap max-w-[80px] md:max-w-none truncate md:overflow-visible">
                {exp.period}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail card with animated swap */}
      <div className="max-w-3xl mx-auto">
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
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-primary font-medium text-sm">{item.company}</p>
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
