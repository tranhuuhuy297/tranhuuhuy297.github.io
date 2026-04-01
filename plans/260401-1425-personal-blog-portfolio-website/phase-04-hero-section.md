# Phase 04: Hero Section

## Context Links
- [Phase 02: UI Components](./phase-02-shared-ui-components.md) (TextReveal, Button)
- [Research: Hero animations](./research/researcher-02-design-patterns-portfolio.md)

## Overview
- **Priority:** P1 (first impression)
- **Status:** pending
- **Description:** Full-viewport hero with text reveal animation, typing subtitle, CTA buttons, gradient mesh background, and scroll indicator.

## Key Insights
- CSS animated gradient mesh is lighter than canvas/WebGL
- TextReveal from Phase 02 handles character stagger
- CTA buttons use Button component with gold glow
- Scroll indicator: simple bouncing chevron (CSS animation or Framer Motion)
- Keep hero content minimal: name, role, tagline, 2 CTAs

## Requirements

### Functional
- Full viewport height (`min-h-screen`)
- Centered content vertically and horizontally
- Name rendered with TextReveal stagger animation
- "Staff Engineer" subtitle fades in after name completes (1s delay)
- Optional tagline line below subtitle
- 2 CTA buttons: "View Projects" (primary, scrolls to #projects) + "Get In Touch" (outline, scrolls to #contact)
- Gradient mesh background (animated, subtle)
- Scroll indicator at bottom center with bounce animation

### Non-functional
- No layout shift during animation
- Background animation uses only CSS (no JS for perf)
- Content readable in both light/dark themes
- Accessible: CTAs are proper links/buttons

## Architecture

```
components/sections/
└── hero.tsx    # 'use client' - full hero section
```

Hero uses: TextReveal, Button from Phase 02.

## Related Code Files
- **Create:** `components/sections/hero.tsx`
- **Modify:** `lib/constants.ts` (add hero content data)

## Implementation Steps

### 1. Add Hero Data to constants.ts
```ts
export const heroData = {
  name: 'Tran Huu Huy',
  subtitle: 'Staff Engineer',
  tagline: 'Building elegant solutions to complex problems.',
  cta: [
    { label: 'View Projects', href: '#projects', variant: 'primary' },
    { label: 'Get In Touch', href: '#contact', variant: 'outline' },
  ],
};
```

### 2. Create Gradient Mesh Background
CSS-only animated gradient in globals.css or inline:
```css
.hero-gradient {
  background: 
    radial-gradient(ellipse at 20% 50%, var(--color-primary)/0.08 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, var(--color-accent)/0.06 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, var(--color-primary)/0.04 0%, transparent 50%);
  animation: gradient-shift 15s ease-in-out infinite alternate;
}

@keyframes gradient-shift {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}
```

### 3. Hero Component Structure (`'use client'`)
```
<section id="home" className="min-h-screen relative flex items-center justify-center">
  {/* Gradient mesh bg (absolute, behind content) */}
  <div className="hero-gradient absolute inset-0 -z-10" />

  {/* Content container */}
  <div className="text-center max-w-3xl mx-auto px-4">
    {/* Name with TextReveal */}
    <TextReveal text="Tran Huu Huy" className="text-5xl md:text-7xl font-heading font-800" />

    {/* Subtitle with delayed fade-in */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="text-xl md:text-2xl text-text-muted mt-4"
    >
      Staff Engineer
    </motion.p>

    {/* Tagline */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="text-lg text-text-muted mt-2"
    >
      {tagline}
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.5 }}
      className="flex gap-4 justify-center mt-8"
    >
      <Button variant="primary" href="#projects">View Projects</Button>
      <Button variant="outline" href="#contact">Get In Touch</Button>
    </motion.div>
  </div>

  {/* Scroll indicator */}
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
  >
    <ChevronDown className="w-6 h-6 text-text-muted" />
  </motion.div>
</section>
```

### 4. Reduced Motion Support
- Wrap stagger animations in reduced-motion check
- If reduced: show all text immediately, skip delays

## Todo List
- [ ] Add hero content data to constants.ts
- [ ] Create gradient mesh CSS animation in globals.css
- [ ] Build hero.tsx with TextReveal for name
- [ ] Add delayed subtitle + tagline fade-in
- [ ] Add CTA buttons with gold glow
- [ ] Add scroll indicator with bounce animation
- [ ] Test light/dark theme rendering
- [ ] Test mobile layout (responsive text sizes)
- [ ] Verify prefers-reduced-motion behavior

## Success Criteria
- Hero fills full viewport on all screen sizes
- Name reveals character by character
- Subtitle appears after name animation
- CTA buttons have gold glow on hover
- Gradient mesh animates subtly
- Scroll indicator bounces
- Clean layout on mobile (no overflow)

## Risk Assessment
- **Text overflow on mobile:** Use responsive text sizes (`text-5xl md:text-7xl`)
- **Gradient mesh perf:** CSS-only, no JS recalculation; safe on all devices
- **Animation delay timing:** May need adjustment; keep delays configurable

## Security Considerations
- None (static content)

## Next Steps
- Phase 05: About & Experience (next sections below hero)
