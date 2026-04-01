# Phase 02: Shared UI Components

## Context Links
- [Phase 01: Setup](./phase-01-project-setup-and-design-system.md)
- [Research: Framer Motion patterns](./reports/researcher-01-nextjs-tailwind-framer.md)

## Overview
- **Priority:** P1 (blocking sections)
- **Status:** pending
- **Description:** Build reusable UI primitives: SectionWrapper, Button, Card, Badge, ThemeToggle, TextReveal animation.

## Key Insights
- All Framer Motion components need `'use client'` directive
- `whileInView` with `once: true` + `amount: 0.3` for scroll triggers
- Stagger pattern: container variants + child variants (cleaner than manual delays)
- `prefers-reduced-motion` must be respected in all animations
- Gold glow: `shadow-lg shadow-primary/30` for hover states

## Requirements

### Functional
- SectionWrapper: reusable scroll-animation container for all 7 sections
- Button: primary (gold filled) + outline variants, gold glow hover
- Card: hover lift (y: -4) + gold border glow, responsive
- Badge: pill-shaped tech tag, subtle bg
- ThemeToggle: sun/moon icons with rotation animation
- TextReveal: character-by-character stagger animation

### Non-functional
- All components accept className prop for composition
- prefers-reduced-motion disables/simplifies animations
- Components under 80 lines each

## Architecture

```
components/
├── ui/
│   ├── section-wrapper.tsx   # Framer whileInView wrapper
│   ├── button.tsx            # Gold CTA button
│   ├── card.tsx              # Hover-lift project card
│   ├── badge.tsx             # Tech tag pill
│   └── theme-toggle.tsx      # Sun/moon toggle
└── animations/
    └── text-reveal.tsx       # Character stagger reveal
```

## Related Code Files
- **Create:** `components/ui/section-wrapper.tsx`
- **Create:** `components/ui/button.tsx`
- **Create:** `components/ui/card.tsx`
- **Create:** `components/ui/badge.tsx`
- **Create:** `components/ui/theme-toggle.tsx`
- **Create:** `components/animations/text-reveal.tsx`

## Implementation Steps

### 1. SectionWrapper (`'use client'`)
- Props: `children`, `className`, `id` (for nav anchors), `delay` (optional)
- Wrap content in `motion.section`
- `initial={{ opacity: 0, y: 40 }}`
- `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true, amount: 0.2 }}`
- `transition={{ duration: 0.5, delay }}`
- Add `prefers-reduced-motion` check: if reduced, skip y transform, use instant opacity

### 2. Button (`'use client'`)
- Props: `children`, `variant` ('primary' | 'outline'), `href` (optional), `className`, standard button props
- Primary: `bg-primary text-background hover:bg-primary-hover` + gold glow shadow on hover
- Outline: `border-2 border-primary text-primary hover:bg-primary/10`
- Render as `<a>` if href provided, `<button>` otherwise
- Framer Motion: `whileHover={{ scale: 1.03 }}` `whileTap={{ scale: 0.98 }}`
- Gold glow: `hover:shadow-[0_0_20px_rgba(212,160,18,0.3)]` (light) / `hover:shadow-[0_0_20px_rgba(245,197,24,0.3)]` (dark)

### 3. Card (`'use client'`)
- Props: `children`, `className`
- `bg-card border border-border rounded-xl p-6`
- Framer Motion: `whileHover={{ y: -4 }}` + `transition={{ duration: 0.2 }}`
- Hover: gold border glow `hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10`

### 4. Badge
- Props: `children`, `className`
- Simple styled span: `bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium`
- No animation needed (static component, can be server component)

### 5. ThemeToggle (`'use client'`)
- Use `useTheme()` from next-themes
- Lucide icons: `Sun`, `Moon`
- Rotation animation on toggle: `motion.div` with `animate={{ rotate: theme === 'dark' ? 180 : 0 }}`
- Mount check via `useEffect` + `mounted` state to avoid hydration mismatch
- Accessible: `aria-label="Toggle theme"`

### 6. TextReveal (`'use client'`)
- Props: `text: string`, `className`, `delay` (optional)
- Split text into characters, wrap each in `motion.span`
- Container variants: `{ hidden: {}, visible: { transition: { staggerChildren: 0.03 } } }`
- Child variants: `{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }`
- Trigger: `whileInView="visible"` with `viewport={{ once: true }}`
- Preserve spaces: render `&nbsp;` for space characters

## Todo List
- [ ] Create SectionWrapper with whileInView animation
- [ ] Create Button with primary/outline variants + gold glow
- [ ] Create Card with hover lift + border glow
- [ ] Create Badge pill component
- [ ] Create ThemeToggle with sun/moon rotation
- [ ] Create TextReveal character stagger animation
- [ ] Add prefers-reduced-motion support to all animated components
- [ ] Verify all components render in both light/dark themes
- [ ] Test TypeScript types (no `any`)

## Success Criteria
- All components render without errors in dev mode
- ThemeToggle switches themes without hydration flash
- SectionWrapper animates on scroll in/out of viewport
- TextReveal staggers characters smoothly
- All components work in both light and dark mode
- prefers-reduced-motion respected

## Risk Assessment
- **Hydration mismatch on ThemeToggle:** Use `mounted` state pattern from next-themes docs
- **Animation jank on low-end devices:** `once: true` limits re-triggers; GPU-composited transforms only (opacity, transform)

## Security Considerations
- None for this phase (pure UI components)

## Next Steps
- Phase 03: Navigation & Layout (uses ThemeToggle, Button)
- Phase 04: Hero (uses TextReveal, Button, SectionWrapper)
