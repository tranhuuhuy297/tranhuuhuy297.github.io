# Phase 03: Navigation & Layout

## Context Links
- [Phase 02: UI Components](./phase-02-shared-ui-components.md)
- [Research: Framer scroll hooks](./reports/researcher-01-nextjs-tailwind-framer.md)

## Overview
- **Priority:** P1 (visible on all viewport states)
- **Status:** pending
- **Description:** Sticky navbar with scroll-aware visibility, mobile hamburger menu, theme toggle, and minimal footer.

## Key Insights
- `useScroll()` + `useMotionValueEvent` for scroll direction detection
- Navbar: transparent initially -> `backdrop-blur-md bg-background/80` on scroll
- Hide on scroll down, show on scroll up (common UX pattern)
- Mobile menu: slide-in from right with `AnimatePresence`
- Active section detection: IntersectionObserver on section IDs

## Requirements

### Functional
- Sticky navbar fixed to top
- Transparent bg initially, blur bg after scroll > 50px
- Hide navbar on scroll down, reveal on scroll up
- Desktop: logo/name left, nav links right, theme toggle
- Mobile: hamburger icon, slide-in menu panel
- Nav links: Home, About, Experience, Projects, Blog, Contact (smooth scroll to anchors)
- Active link has gold underline/indicator
- Footer: copyright, social links (GitHub, LinkedIn, Email), "Built with Next.js"

### Non-functional
- Smooth scroll behavior via CSS `scroll-behavior: smooth`
- Accessible: keyboard navigation, proper ARIA labels
- z-index management: navbar z-50, mobile menu z-40

## Architecture

```
components/layout/
├── navbar.tsx    # Sticky nav, scroll logic, mobile menu
└── footer.tsx    # Minimal copyright + socials
```

Navbar is `'use client'` (scroll hooks, state). Footer can be server component.

## Related Code Files
- **Create:** `components/layout/navbar.tsx`
- **Create:** `components/layout/footer.tsx`
- **Modify:** `lib/constants.ts` (add navLinks, socialLinks arrays)
- **Modify:** `app/layout.tsx` (add Navbar + Footer around children)

## Implementation Steps

### 1. Define Navigation Data in constants.ts
```ts
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/tranhuuhuy297', icon: 'Github' },
  { label: 'LinkedIn', href: '#', icon: 'Linkedin' },
  { label: 'Email', href: 'mailto:contact@example.com', icon: 'Mail' },
];
```

### 2. Navbar Component (`'use client'`)
**Scroll behavior:**
- Track `scrollY` with Framer Motion `useScroll()`
- Use `useMotionValueEvent(scrollY, 'change', callback)` to detect direction
- State: `isScrolled` (boolean, > 50px), `isVisible` (show/hide based on direction)
- Apply classes: `isScrolled ? 'backdrop-blur-md bg-background/80 border-b border-border' : 'bg-transparent'`
- Animate visibility: `motion.nav` with `animate={{ y: isVisible ? 0 : -100 }}`

**Desktop layout:**
- Flex container: name/logo left, nav links center/right, ThemeToggle rightmost
- Nav links: `hover:text-primary` transition, active link has `border-b-2 border-primary`

**Active link detection:**
- Use IntersectionObserver on mount to watch section IDs
- Store `activeSection` in state, highlight matching nav link

**Mobile menu:**
- State: `isMobileMenuOpen`
- Hamburger button: Lucide `Menu` / `X` icons
- Slide-in panel: `AnimatePresence` + `motion.div` from right
- `initial={{ x: '100%' }}` -> `animate={{ x: 0 }}` -> `exit={{ x: '100%' }}`
- Overlay backdrop with `bg-black/50`
- Close on link click + close on outside click

### 3. Footer Component
- Simple `<footer>` with max-width container
- 3-col flex on desktop: copyright left, nav links center, social icons right
- Mobile: stacked center-aligned
- Social icons: Lucide icons (Github, Linkedin, Mail) with `hover:text-primary` transition
- Text: "(c) 2026 Tran Huu Huy. Built with Next.js"

### 4. Integrate in layout.tsx
- Add `<Navbar />` before `{children}`
- Add `<Footer />` after `{children}`
- Add `scroll-behavior: smooth` to `<html>` or globals.css

## Todo List
- [ ] Add navLinks and socialLinks to constants.ts
- [ ] Create navbar.tsx with scroll detection
- [ ] Implement transparent -> blur background transition
- [ ] Implement hide-on-scroll-down / show-on-scroll-up
- [ ] Add desktop nav links with active indicator
- [ ] Add mobile hamburger menu with slide-in animation
- [ ] Integrate ThemeToggle in navbar
- [ ] Create footer.tsx with copyright + social links
- [ ] Add Navbar + Footer to layout.tsx
- [ ] Add scroll-behavior: smooth to globals.css
- [ ] Test keyboard navigation (Tab through links)
- [ ] Test mobile menu open/close

## Success Criteria
- Navbar sticks to top, transitions from transparent to blur on scroll
- Hides on scroll down, shows on scroll up
- Mobile menu slides in/out smoothly
- Active section highlighted with gold indicator
- Footer renders correctly on all breakpoints
- All links have proper `aria-label`

## Risk Assessment
- **Scroll jitter on iOS Safari:** Use `will-change: transform` on navbar; test on real device
- **Active link flicker:** Debounce IntersectionObserver callback, use threshold array

## Security Considerations
- Social links open in new tab: add `rel="noopener noreferrer"` to external links

## Next Steps
- Phase 04: Hero Section (first visible section below navbar)
