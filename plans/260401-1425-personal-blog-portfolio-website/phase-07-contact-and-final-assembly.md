# Phase 07: Contact & Final Assembly

## Context Links
- [Phase 01-06 plans](./plan.md)
- [Research: Contact form solutions](./research/researcher-02-design-patterns-portfolio.md)

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** Contact section with social links and form placeholder. Final assembly of all sections in page.tsx. SEO metadata. Responsive testing.

## Key Insights
- Web3Forms recommended for future form integration (unlimited free tier)
- Start with placeholder form (no backend needed for MVP)
- Social icons: Lucide React (Github, Linkedin, Mail, Twitter)
- SEO: Next.js Metadata API for title, description, OG tags
- Assembly order: Hero -> About -> Experience -> Projects -> Blog -> Contact

## Requirements

### Functional
- **Contact:** "Let's Connect" headline, descriptive text, social icon buttons (GitHub, LinkedIn, Email), contact form placeholder (name, email, message fields + submit button)
- **Assembly:** All 7 sections composed in `app/page.tsx`
- **SEO:** Complete metadata (title, description, OpenGraph, Twitter cards)
- **Performance:** All images lazy-loaded, no unnecessary JS bundles

### Non-functional
- Form placeholder is non-functional (styled only, no submit handler)
- Lighthouse score target: 90+ across all categories
- Mobile-first responsive across all sections

## Architecture

```
components/sections/
└── contact.tsx    # 'use client' - contact section

app/
├── page.tsx       # Final assembly of all sections
└── layout.tsx     # (already has metadata, navbar, footer)
```

## Related Code Files
- **Create:** `components/sections/contact.tsx`
- **Modify:** `app/page.tsx` (compose all sections)
- **Modify:** `app/layout.tsx` (finalize SEO metadata)

## Implementation Steps

### 1. Contact Section (`'use client'`)
```
<SectionWrapper id="contact">
  <div className="max-w-2xl mx-auto text-center">
    <h2>Let's Connect</h2>
    <p className="text-text-muted mt-4">
      I'm always open to discussing new opportunities, interesting projects, or just having a chat.
    </p>

    {/* Social Icons */}
    <div className="flex justify-center gap-4 mt-8">
      {socialLinks.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all hover:shadow-[0_0_15px_rgba(212,160,18,0.2)]"
        >
          <Icon name={link.icon} className="w-5 h-5" />
        </a>
      ))}
    </div>

    {/* Contact Form Placeholder */}
    <form className="mt-12 space-y-4 text-left" onSubmit={e => e.preventDefault()}>
      <div>
        <label className="text-sm text-text-muted">Name</label>
        <input className="w-full mt-1 px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors" />
      </div>
      <div>
        <label className="text-sm text-text-muted">Email</label>
        <input type="email" className="w-full mt-1 px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors" />
      </div>
      <div>
        <label className="text-sm text-text-muted">Message</label>
        <textarea rows={4} className="w-full mt-1 px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors resize-none" />
      </div>
      <Button variant="primary" className="w-full">
        Send Message
      </Button>
      <p className="text-xs text-text-muted text-center">Form coming soon. Use the links above to reach me.</p>
    </form>
  </div>
</SectionWrapper>
```

### 2. Assemble page.tsx
```tsx
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Blog } from '@/components/sections/blog';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
```

### 3. Finalize SEO Metadata in layout.tsx
```tsx
export const metadata: Metadata = {
  title: 'Tran Huu Huy | Staff Engineer',
  description: 'Personal portfolio and blog of Tran Huu Huy — Staff Engineer building elegant solutions to complex problems.',
  openGraph: {
    title: 'Tran Huu Huy | Staff Engineer',
    description: 'Personal portfolio and blog.',
    url: 'https://huytran.dev',
    siteName: 'Tran Huu Huy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tran Huu Huy | Staff Engineer',
    description: 'Personal portfolio and blog.',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 4. Final Responsive Testing Checklist
- [ ] Desktop (1440px): all grids at max columns, timeline centered
- [ ] Tablet (768px): 2-col grids, stacked about section
- [ ] Mobile (375px): single column, hamburger menu, readable text
- [ ] Dark mode: all sections, nav, footer correct colors
- [ ] Light mode: all sections, nav, footer correct colors
- [ ] Animations: smooth, no jank, respect reduced-motion
- [ ] Scroll: smooth scroll to anchors, active link updates
- [ ] `npm run build` passes with zero errors/warnings

### 5. Lighthouse Audit
- Run `npx lighthouse http://localhost:3000 --output=html`
- Target: Performance 90+, Accessibility 95+, Best Practices 90+, SEO 95+
- Fix any flagged issues

## Todo List
- [ ] Create contact.tsx with social links + form placeholder
- [ ] Assemble all sections in page.tsx
- [ ] Finalize SEO metadata in layout.tsx
- [ ] Run `npm run build` -- zero errors
- [ ] Test responsive layout at 375px, 768px, 1440px
- [ ] Test dark/light mode across all sections
- [ ] Test smooth scroll to anchors
- [ ] Test nav active link tracking
- [ ] Run Lighthouse audit, fix issues
- [ ] Verify prefers-reduced-motion works globally

## Success Criteria
- All 7 sections render correctly in sequence
- Page builds without errors
- SEO metadata appears in page source
- Responsive at all breakpoints
- Lighthouse 90+ all categories
- Dark/light theme works end-to-end
- Smooth scroll + active nav link tracking

## Risk Assessment
- **Form placeholder confusion:** Clear "coming soon" text prevents user frustration
- **Bundle size:** All sections on one page; monitor with `next/bundle-analyzer` if needed
- **OG image missing:** No OG image yet; add in future iteration

## Security Considerations
- Form `onSubmit` prevented (no backend call)
- External links have `rel="noopener noreferrer"`
- No sensitive data in metadata

## Next Steps (Post-MVP)
- Integrate Web3Forms for contact form
- Add MDX blog with content layer
- Add real project images via next/image
- Add OG image generation
- Deploy to Vercel
- Add analytics (Vercel Analytics or Plausible)
