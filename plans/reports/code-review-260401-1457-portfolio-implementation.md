# Code Review: Personal Blog/Portfolio Website

**Date:** 2026-04-01  
**Reviewer:** code-reviewer agent

---

## Scope

- Files reviewed: 18 (app/layout.tsx, app/page.tsx, app/globals.css, app/providers.tsx, lib/constants.ts, lib/utils.ts, all components/ui/, components/animations/text-reveal.tsx, components/layout/navbar.tsx, components/layout/footer.tsx, all components/sections/)
- Lines of code analyzed: ~600
- Review focus: Full implementation review per user request

---

## Overall Assessment

Solid, clean implementation. Architecture is well-structured, design system is consistent, and Framer Motion usage is generally sound. Several medium/low issues noted — no critical or blocking bugs. Build passes.

---

## Critical Issues

None.

---

## High Priority Findings

**1. Contact form inputs missing `id`/`htmlFor` — broken label association**  
`/Users/huyth/Projects/personal/blog/components/sections/contact-section.tsx` lines 43–57: `<label>` elements have no `htmlFor`, and `<input>`/`<textarea>` have no matching `id`. Screen readers cannot associate labels with fields.

Fix:
```tsx
<label htmlFor="contact-name" className="text-sm text-text-muted">Name</label>
<input id="contact-name" ... />
```

**2. `mailto:` link in `socialLinks` uses `target="_blank"` with `rel="noopener noreferrer"`**  
`/Users/huyth/Projects/personal/blog/lib/constants.ts` line 21 + footer/contact rendering: `mailto:` should not open in `_blank`. It triggers a new mail client window rather than a tab — `target="_blank"` is a no-op on most clients but semantically wrong. Both `footer.tsx` and `contact-section.tsx` apply `target="_blank"` unconditionally to all social links.

**3. Hero scroll indicator animates regardless of `prefers-reduced-motion`**  
`/Users/huyth/Projects/personal/blog/components/sections/hero-section.tsx` lines 58–64: The bouncing `ChevronDown` uses `animate={{ y: [0, 10, 0] }}` with `repeat: Infinity` but no reduced-motion guard. `useReducedMotion` is imported but not applied here.

---

## Medium Priority Improvements

**4. `TextReveal` uses array index as `key`**  
`/Users/huyth/Projects/personal/blog/components/animations/text-reveal.tsx` line 40: `key={i}` for character spans is acceptable here (static text, never reordered) but if `text` prop ever changes, React reconciles poorly. Low risk currently.

**5. `ExperienceSection` / `BlogSection` also use index as key**  
`experience-section.tsx` line 34: `key={i}`. Data has no unique id field. Medium — fine for static data, but fragile if data becomes dynamic.

**6. `Button` component: external `href` links missing `rel="noopener noreferrer"`**  
`/Users/huyth/Projects/personal/blog/components/ui/button.tsx` lines 29–37: The `<motion.a>` renders without `rel` or `target`. If any CTA or project link is external (e.g., `#projects` CTA is internal, but future external hrefs would be unsafe). Consider adding `target` and `rel` props or auto-detecting external URLs.

**7. `ThemeToggle` placeholder div has no `aria-hidden`**  
`/Users/huyth/Projects/personal/blog/components/ui/theme-toggle.tsx` line 15: `<div className="w-9 h-9" />` SSR placeholder is visible to screen readers as an empty interactive region. Add `aria-hidden="true"`.

**8. `oklch(from ...)` relative color syntax in `globals.css`**  
Line 97–99: `oklch(from var(--color-primary) l c h / 0.08)` is CSS Color Level 5 relative color syntax. Browser support is ~92% (Safari 16.4+, Chrome 119+, Firefox 128+). No fallback provided. Will silently fail in older browsers — gradient just disappears, not broken, but worth noting.

**9. LinkedIn `href` is `#` in constants**  
`/Users/huyth/Projects/personal/blog/lib/constants.ts` line 20: Placeholder `href: '#'` for LinkedIn. `target="_blank"` on a `#` link scrolls to top — harmless but sloppy. Remove `target="_blank"` until a real URL is filled in, or guard the render.

---

## Low Priority Suggestions

**10. `contact-section.tsx` form has no `name` attributes on inputs** — will prevent native form submission if the `onSubmit` handler is ever replaced with a real POST.

**11. `containerVariants` defined identically in 3 section files** — `projects-section.tsx`, `blog-section.tsx`, `experience-section.tsx` all define the same `containerVariants`/`itemVariants` objects inline. Extract to a shared `lib/motion-variants.ts` (DRY).

**12. `providers.tsx` has `enableSystem` but `defaultTheme="light"`** — system preference is enabled but overridden by `defaultTheme`. This means a user with OS dark mode set will see light on first load, then flicker on hydration if they have a stored preference. Either remove `enableSystem` or set `defaultTheme="system"`.

---

## Positive Observations

- `useReducedMotion` correctly used in `SectionWrapper` and `TextReveal` — good pattern.
- `viewport={{ once: true }}` used consistently — no re-triggering on scroll.
- `suppressHydrationWarning` on `<html>` is correct for theme toggling.
- `rel="noopener noreferrer"` present on all project/footer/contact external links.
- `aria-label` on icon-only buttons (navbar hamburger, theme toggle, social icons) is thorough.
- CSS custom properties scoped cleanly to `@theme` and `.dark` — no leakage.
- `ThemeToggle` correctly guards against hydration mismatch with `mounted` state.
- Font loading with `display: 'swap'` and CSS variable assignment is correct.
- `iconMap` pattern in footer/contact avoids dynamic `require()` — clean.

---

## Recommended Actions

1. **[High]** Fix label/input association in contact form — add `id` + `htmlFor`.
2. **[High]** Guard scroll indicator animation with `prefersReducedMotion` check.
3. **[High]** Remove `target="_blank"` from `mailto:` links (or conditionally apply).
4. **[Medium]** Add `aria-hidden="true"` to ThemeToggle SSR placeholder.
5. **[Medium]** Extract shared `containerVariants`/`itemVariants` to `lib/motion-variants.ts`.
6. **[Medium]** Resolve `defaultTheme`/`enableSystem` conflict in `providers.tsx`.
7. **[Low]** Add `name` attributes to contact form inputs.
8. **[Low]** Replace placeholder LinkedIn `href: '#'` with real URL or remove `target="_blank"`.

---

## Metrics

- Type Coverage: High — strict mode on, no `any` types found, all props typed
- Test Coverage: 0% — no tests present (expected for portfolio MVP)
- Linting Issues: 0 compile errors; ~3 accessibility warnings (label association, aria-hidden)
- Build: Passes (per user report, unverified locally)

---

## Unresolved Questions

- Is the contact form intended to be functional? If so, what backend/service (Resend, Formspree)?
- Will blog posts have actual routes (`/blog/[slug]`) or remain static cards?
- Is `huytran.dev` the real deployment URL (used in OG metadata)?
