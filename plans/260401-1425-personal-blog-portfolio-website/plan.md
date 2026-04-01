---
title: "Personal Blog Portfolio Website"
description: "Warm Luxe Minimal portfolio for Tran Huu Huy with Next.js 14, Tailwind v4, Framer Motion"
status: pending
priority: P2
effort: "8h"
branch: "main"
tags: [nextjs, tailwind-v4, framer-motion, portfolio, blog]
created: 2026-04-01
---

# Personal Blog / Portfolio Website

**Owner:** Tran Huu Huy | Staff Engineer
**Stack:** Next.js 14+ (App Router), Tailwind CSS v4, Framer Motion, next-themes, Lucide React
**Design:** "Warm Luxe Minimal" -- gold accents, cream/dark backgrounds, Inter + Space Grotesk
**Deploy:** Vercel

## Research

- [Next.js/Tailwind/Framer setup](./reports/researcher-01-nextjs-tailwind-framer.md)
- [Design patterns & portfolio animations](./research/researcher-02-design-patterns-portfolio.md)

## Phases

| # | Phase | Effort | Status | File |
|---|-------|--------|--------|------|
| 1 | Project Setup & Design System | 1.5h | pending | [phase-01](./phase-01-project-setup-and-design-system.md) |
| 2 | Shared UI Components | 1h | pending | [phase-02](./phase-02-shared-ui-components.md) |
| 3 | Navigation & Layout | 1h | pending | [phase-03](./phase-03-navigation-layout.md) |
| 4 | Hero Section | 1h | pending | [phase-04](./phase-04-hero-section.md) |
| 5 | About & Experience Sections | 1h | pending | [phase-05](./phase-05-about-and-experience-sections.md) |
| 6 | Projects & Blog Sections | 1h | pending | [phase-06](./phase-06-projects-and-blog-sections.md) |
| 7 | Contact & Final Assembly | 1.5h | pending | [phase-07](./phase-07-contact-and-final-assembly.md) |

## Key Dependencies

- Tailwind v4 uses `@import "tailwindcss"` + `@theme` CSS (no tailwind.config.ts)
- All Framer Motion components must be `'use client'`
- next-themes ThemeProvider wraps app with `attribute="class"`
- Fonts self-hosted via `next/font/google` (Inter body, Space Grotesk headings)

## Key Decisions

- CSS animated gradient for hero bg (no canvas/WebGL)
- Web3Forms for contact (unlimited free, placeholder for now)
- Single-page SPA with section anchors
- `whileInView` with `once: true` for all scroll animations
- Mobile-first responsive: 1/2/3 col grids
