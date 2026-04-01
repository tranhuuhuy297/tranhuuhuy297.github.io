'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { educationData } from '@/lib/constants';
import { renderHighlight } from '@/lib/render-highlight';

export function EducationSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const item = educationData[active];

  const handleSwitch = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <SectionWrapper id="education">
      <h2 className="text-3xl md:text-4xl mb-10 text-center">Education</h2>

      {/* Horizontal tabs with animated indicator */}
      <div className="flex justify-center gap-3 mb-8">
        {educationData.map((edu, i) => (
          <button
            key={i}
            onClick={() => handleSwitch(i)}
            className="relative px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer border-none bg-transparent"
          >
            {/* Animated background */}
            {i === active && (
              <motion.div
                layoutId="edu-tab-bg"
                className="absolute inset-0 rounded-lg bg-primary"
                style={{ boxShadow: '0 0 12px oklch(from var(--color-primary) l c h / 0.3)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${i === active ? 'text-background font-semibold' : 'text-text-muted hover:text-text'}`}>
              {edu.degree}
            </span>
          </button>
        ))}
      </div>

      {/* Detail card */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative rounded-xl p-6 md:p-8 bg-card border border-border overflow-hidden"
            style={{ boxShadow: '0 0 20px oklch(from var(--color-primary) l c h / 0.08)' }}
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-5">
              <div>
                <h3 className="text-xl font-bold">{item.degree}</h3>
                <p className="text-primary font-medium text-sm">{item.school}</p>
              </div>
              <span className="text-text-muted text-sm shrink-0">{item.period}</span>
            </div>

            <ul className="space-y-2.5 text-text-muted text-sm">
              {item.highlights.map((point, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + j * 0.07 }}
                  className="flex gap-2.5"
                >
                  <span className="text-primary mt-0.5 shrink-0 text-xs">&#9670;</span>
                  <span>{renderHighlight(point)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
