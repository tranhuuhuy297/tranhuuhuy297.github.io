'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { heroData, aboutData } from '@/lib/constants';
import { techIcons } from '@/lib/tech-icons';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center">
      <div className="hero-gradient absolute inset-0 -z-10" />

      <div className="text-center max-w-3xl mx-auto px-4">
        {/* Avatar / Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: d ?? 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <Image
            src="/icon.png"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-full mx-auto border-2 border-primary"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d ?? 1, duration: 0.6 }}
          className="text-lg text-text-muted mt-4 max-w-xl mx-auto"
        >
          {aboutData.bio}
        </motion.p>

        {/* Tech stack grouped by category */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d ?? 1.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {aboutData.skillCategories.map((cat) => (
            <div
              key={cat.label}
              className="flex items-center gap-2 rounded-full bg-surface-elevated px-4 py-2"
            >
              <span className="text-xs font-medium text-text-muted/70 uppercase tracking-wider">
                {cat.label}
              </span>
              <span className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                {cat.items.map((skill) => {
                  const icon = techIcons[skill];
                  return icon ? (
                    <span
                      key={skill}
                      className="w-6 h-6 flex items-center justify-center hover:scale-125 transition-transform"
                      title={skill}
                    >
                      <svg viewBox="0 0 128 128" className="w-5 h-5" dangerouslySetInnerHTML={{ __html: icon }} />
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d ?? 1.8, duration: 0.5 }}
          className="flex gap-4 justify-center mt-8"
        >
          {heroData.cta.map((cta) => (
            <Button key={cta.label} variant={cta.variant} href={cta.href}>
              {cta.label}
            </Button>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </motion.div>
    </section>
  );
}
