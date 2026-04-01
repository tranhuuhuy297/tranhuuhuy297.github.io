'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/** Justice League heroes with themed ability particles */
const heroes = [
  { src: '/icon.png', name: 'Batman', particles: '🦇', color: '#4a3f6b', glow: '#7c6faa' },
  { src: '/heroes/superman.png', name: 'Superman', particles: '💥', color: '#dc2626', glow: '#ef4444' },
  { src: '/heroes/wonder-woman.png', name: 'Wonder Woman', particles: '⭐', color: '#ca8a04', glow: '#eab308' },
  { src: '/heroes/flash.png', name: 'Flash', particles: '⚡', color: '#dc2626', glow: '#fbbf24' },
  { src: '/heroes/aquaman.png', name: 'Aquaman', particles: '🌊', color: '#0369a1', glow: '#38bdf8' },
  { src: '/heroes/cyborg.png', name: 'Cyborg', particles: '⚙️', color: '#6b7280', glow: '#ef4444' },
];

/** Generate randomized burst particles for natural spread */
function useBurstParticles(count: number) {
  return useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const baseAngle = (i * (360 / count)) + (Math.random() * 20 - 10);
      const rad = baseAngle * (Math.PI / 180);
      const dist = 60 + Math.random() * 50;
      return {
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        rotate: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.8,
        delay: Math.random() * 0.1,
      };
    }), [count]);
}

/** Particle burst effect with ring shockwave */
function AbilityBurst({ heroIndex }: { heroIndex: number }) {
  const hero = heroes[heroIndex];
  const particles = useBurstParticles(10);

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Expanding ring shockwave */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ width: 40, height: 40, opacity: 0.8, borderWidth: 3 }}
        animate={{ width: 200, height: 200, opacity: 0, borderWidth: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ borderColor: hero.glow, borderStyle: 'solid' }}
      />

      {/* Second ring, delayed */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ width: 30, height: 30, opacity: 0.5, borderWidth: 2 }}
        animate={{ width: 160, height: 160, opacity: 0, borderWidth: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
        style={{ borderColor: hero.glow, borderStyle: 'solid' }}
      />

      {/* Emoji particles bursting outward */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{ x: 0, y: 0, opacity: 1, scale: p.scale, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: p.scale * 0.2,
            rotate: p.rotate,
          }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: p.delay }}
          style={{ fontSize: 14 + p.scale * 6 }}
        >
          {hero.particles}
        </motion.span>
      ))}

      {/* Central flash */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full"
        initial={{ opacity: 0.6, scale: 0.8 }}
        animate={{ opacity: 0, scale: 1.8 }}
        transition={{ duration: 0.35 }}
        style={{ background: `radial-gradient(circle, ${hero.glow}50, ${hero.color}20, transparent 70%)` }}
      />
    </div>
  );
}

export function HeroCoinFlip() {
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [burstHero, setBurstHero] = useState<number | null>(null);

  const triggerSwitch = useCallback((nextIndex: number) => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setIndex(nextIndex);
      setBurstHero(nextIndex);
      setBurstKey((k) => k + 1);
    }, 150);
    setTimeout(() => setFlipping(false), 350);
  }, [flipping]);

  const flip = useCallback(() => {
    triggerSwitch((index + 1) % heroes.length);
  }, [index, triggerSwitch]);

  const selectHero = useCallback((i: number) => {
    if (i === index) return;
    triggerSwitch(i);
  }, [index, triggerSwitch]);

  const hero = heroes[index];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Main coin area */}
      <div
        onClick={flip}
        className="relative w-[120px] h-[120px] cursor-pointer select-none"
        style={{ perspective: 600 }}
        title={`Click to flip — ${hero.name}`}
      >
        {/* Ambient glow behind coin in hero color */}
        <motion.div
          className="absolute inset-[-12px] rounded-full blur-xl"
          animate={{ backgroundColor: `${hero.glow}25` }}
          transition={{ duration: 0.5 }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="relative w-full h-full rounded-full border-[3px] border-yellow-400 overflow-hidden ring-2 ring-black/60 bg-yellow-400"
            initial={{ rotateY: 90, scale: 0.8 }}
            animate={{ rotateY: 0, scale: 1 }}
            exit={{ rotateY: -90, scale: 0.8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: `0 0 20px ${hero.glow}40, 0 0 40px ${hero.glow}15`,
            }}
          >
            <Image
              src={hero.src}
              alt={hero.name}
              width={120}
              height={120}
              className="w-full h-full object-cover scale-110"
              priority={index === 0}
            />
            {/* Subtle shine overlay */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Ability burst particles */}
        <AnimatePresence>
          {burstHero !== null && (
            <AbilityBurst key={burstKey} heroIndex={burstHero} />
          )}
        </AnimatePresence>
      </div>

      {/* Hero name with themed color */}
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="text-xs font-semibold tracking-wide"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          style={{ color: hero.glow }}
        >
          {hero.name}
        </motion.span>
      </AnimatePresence>

      {/* Hero roster */}
      <div className="flex items-center gap-2">
        {heroes.map((h, i) => (
          <motion.button
            key={h.name}
            onClick={() => selectHero(i)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-none cursor-pointer p-0"
            title={h.name}
          >
            <motion.div
              animate={{
                borderColor: i === index ? hero.glow : 'var(--color-border)',
                opacity: i === index ? 1 : 0.5,
                scale: i === index ? 1.15 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full overflow-hidden border-2 bg-yellow-400"
              style={i === index ? { boxShadow: `0 0 8px ${hero.glow}60` } : undefined}
            >
              <Image
                src={h.src}
                alt={h.name}
                width={32}
                height={32}
                className="w-full h-full object-cover scale-110"
              />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
