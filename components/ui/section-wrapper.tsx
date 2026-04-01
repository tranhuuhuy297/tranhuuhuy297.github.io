'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  /** Adds a subtle surface background for alternating visual rhythm */
  alternate?: boolean;
}

export function SectionWrapper({ children, className, id, delay = 0, alternate = false }: SectionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  if (alternate) {
    return (
      <div className="bg-surface/50 border-y border-border/30">
        <motion.section
          id={id}
          className={cn('py-20 px-4 md:px-8 max-w-6xl mx-auto', className)}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay }}
        >
          {children}
        </motion.section>
      </div>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn('py-20 px-4 md:px-8 max-w-6xl mx-auto', className)}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay }}
    >
      {children}
    </motion.section>
  );
}
