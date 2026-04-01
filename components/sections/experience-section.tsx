'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { experienceData } from '@/lib/constants';

/** Calculate human-readable duration between MM/YYYY periods */
function calcDuration(period: string): string {
  const parts = period.split(' - ');
  const [startM, startY] = parts[0].split('/').map(Number);
  let endM: number, endY: number;
  if (parts[1] === 'Present') {
    const now = new Date();
    endM = now.getMonth() + 1;
    endY = now.getFullYear();
  } else {
    [endM, endY] = parts[1].split('/').map(Number);
  }
  const months = (endY - startY) * 12 + (endM - startM);
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y > 0 && m > 0) return `${y}y ${m}m`;
  if (y > 0) return `${y}y`;
  return `${m}m`;
}

export function ExperienceSection() {
  const [active, setActive] = useState(experienceData.length - 1);
  const item = experienceData[active];
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progressStyle, setProgressStyle] = useState({ left: 0, width: 0 });

  const updateProgress = useCallback((index: number) => {
    const track = trackRef.current;
    const firstDot = dotRefs.current[0];
    const activeDot = dotRefs.current[index];
    if (!track || !firstDot || !activeDot) return;
    const trackRect = track.getBoundingClientRect();
    const activeCenter = activeDot.getBoundingClientRect().left + activeDot.getBoundingClientRect().width / 2 - trackRect.left;
    setProgressStyle({ left: 0, width: activeCenter });
  }, []);

  useEffect(() => { updateProgress(active); }, [active, updateProgress]);
  useEffect(() => {
    const onResize = () => updateProgress(active);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active, updateProgress]);

  return (
    <SectionWrapper id="experience">
      <h2 className="text-3xl md:text-4xl mb-10 text-center">Experience</h2>

      {/* Timeline bar */}
      <div ref={trackRef} className="relative max-w-3xl mx-auto mb-10">
        {/* Track line between first and last dot — rendered via JS for accuracy */}
        <div className="absolute top-[7px] left-0 right-0 h-0.5 bg-border" />
        {/* Animated progress fill with glow */}
        <motion.div
          className="absolute top-[7px] h-0.5 bg-primary"
          style={{ boxShadow: '0 0 8px var(--color-primary)' }}
          initial={false}
          animate={{ left: progressStyle.left, width: progressStyle.width }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Favicon runner — slides along the progress bar */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{ top: -10 }}
          initial={false}
          animate={{ left: progressStyle.left + progressStyle.width }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <img
            src="/icon.png"
            alt=""
            width={28}
            height={28}
            className="relative -translate-x-1/2 rounded-full drop-shadow-[0_0_6px_var(--color-primary)]"
          />
        </motion.div>

        {/* Timeline nodes */}
        <div className="relative flex justify-between">
          {experienceData.map((exp, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
            >
              {/* Dot */}
              <div className="relative" ref={(el) => { dotRefs.current[i] = el; }}>
                <motion.div
                  className="relative z-10 w-4 h-4 rounded-full border-2"
                  animate={{
                    borderColor: i <= active ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: i <= active ? 'var(--color-primary)' : 'var(--color-card)',
                    scale: i === active ? 1.3 : 1,
                  }}
                  whileHover={{ scale: 1.4 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {/* Role title + period */}
              <div className="flex flex-col items-center">
                <span className={`text-[11px] md:text-xs font-semibold whitespace-nowrap max-w-[90px] md:max-w-none truncate md:overflow-visible ${i === active ? 'text-primary' : 'text-text-muted'}`}>
                  {exp.title}
                </span>
                <span className="text-[10px] md:text-[11px] text-text-muted whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail card */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative rounded-xl p-6 md:p-8 bg-card border border-border overflow-hidden"
            style={{ boxShadow: '0 0 20px oklch(from var(--color-primary) l c h / 0.08)' }}
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-4">
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-primary font-medium text-sm">{item.company}</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Duration badge */}
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {calcDuration(item.period)}
                </span>
                <span className="text-text-muted text-sm shrink-0">{item.period}</span>
              </div>
            </div>

            {item.highlights.length > 0 ? (
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
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-text-muted text-sm italic">Details coming soon...</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
