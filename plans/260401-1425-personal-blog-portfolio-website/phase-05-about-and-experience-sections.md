# Phase 05: About & Experience Sections

## Context Links
- [Phase 02: UI Components](./phase-02-shared-ui-components.md) (SectionWrapper, Badge)
- [Research: Timeline patterns](./research/researcher-02-design-patterns-portfolio.md)

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** About section with 2-col layout, photo placeholder, skill pills. Experience timeline with gold accent line and stagger animations.

## Key Insights
- About: 2-col on desktop (photo left, text right), stacked on mobile
- Photo placeholder: div with gold border + rounded, aspect-square
- Skills: Badge components in flex-wrap grid
- Timeline: vertical line centered (desktop) or left-aligned (mobile)
- Stagger children pattern for timeline items

## Requirements

### Functional
- **About:** Bio text, photo placeholder (gold border), skill tags
- **Experience:** Vertical timeline with 3-4 entries, gold accent line, date/title/company/description per entry
- Both sections use SectionWrapper for scroll animation
- Sections have `id` attributes for nav anchors

### Non-functional
- Responsive: 2-col -> 1-col at `md` breakpoint
- Timeline items animate on scroll (stagger 0.15s)
- Photo placeholder ready for `next/image` swap later

## Architecture

```
components/sections/
├── about.tsx        # 'use client' - 2-col about section
└── experience.tsx   # 'use client' - vertical timeline
```

## Related Code Files
- **Create:** `components/sections/about.tsx`
- **Create:** `components/sections/experience.tsx`
- **Modify:** `lib/constants.ts` (add aboutData, experienceData, skills array)

## Implementation Steps

### 1. Add Data to constants.ts
```ts
export const aboutData = {
  bio: [
    'I am a Staff Engineer with passion for building scalable, user-centric products...',
    'With experience across full-stack development...',
  ],
  skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Docker', 'GraphQL', 'System Design'],
};

export const experienceData = [
  {
    title: 'Staff Engineer',
    company: 'Company Name',
    period: '2024 - Present',
    description: 'Leading architecture decisions and mentoring engineering teams...',
  },
  {
    title: 'Senior Software Engineer',
    company: 'Company Name',
    period: '2022 - 2024',
    description: 'Built scalable microservices and improved system reliability...',
  },
  {
    title: 'Software Engineer',
    company: 'Company Name',
    period: '2020 - 2022',
    description: 'Developed full-stack features and optimized performance...',
  },
];
```

### 2. About Section (`'use client'`)
```
<SectionWrapper id="about">
  <h2>About Me</h2>
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Photo placeholder */}
    <motion.div className="aspect-square rounded-2xl border-2 border-primary bg-surface flex items-center justify-center">
      <span className="text-text-muted">Photo</span>
    </motion.div>

    {/* Bio + Skills */}
    <div>
      {bio paragraphs with fade-up animation}
      <div className="flex flex-wrap gap-2 mt-6">
        {skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
      </div>
    </div>
  </div>
</SectionWrapper>
```

### 3. Experience Timeline (`'use client'`)
**Timeline structure:**
- Container: relative, with vertical gold line (absolute positioned `div` with `bg-primary/30 w-0.5`)
- Desktop: line centered, items alternate left/right
- Mobile: line on left, all items right-aligned

**Each timeline item:**
- Gold dot on the line (`w-3 h-3 rounded-full bg-primary`)
- Card-like container with period, title, company, description
- Stagger animation: container variants + item variants

```
<SectionWrapper id="experience">
  <h2>Experience</h2>
  <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
    {experienceData.map((item, i) => (
      <motion.div key={i} variants={itemVariants} className="relative pl-8 md:pl-0 ...">
        {/* Gold dot */}
        <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary" />
        {/* Content */}
        <div>
          <span className="text-primary font-medium">{item.period}</span>
          <h3>{item.title}</h3>
          <p className="text-text-muted">{item.company}</p>
          <p>{item.description}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</SectionWrapper>
```

**Variants:**
```ts
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
```

### 4. Responsive Timeline CSS
- Mobile: `pl-8`, line at `left-0`
- Desktop: alternating `md:text-right` / `md:text-left` with `md:grid-cols-2`
- Simpler approach: always left-aligned (skip alternating complexity -- KISS)

## Todo List
- [ ] Add aboutData, experienceData, skills to constants.ts
- [ ] Create about.tsx with 2-col layout
- [ ] Add photo placeholder with gold border
- [ ] Add skill pills using Badge component
- [ ] Create experience.tsx with vertical timeline
- [ ] Add gold accent line + dots
- [ ] Implement stagger animation for timeline items
- [ ] Test responsive layout (desktop 2-col, mobile stacked)
- [ ] Test dark mode rendering

## Success Criteria
- About section shows photo placeholder + bio + skill pills
- Experience timeline renders 3-4 entries with gold line
- Timeline items stagger-animate on scroll
- Both sections responsive (clean on mobile)
- Section IDs work for nav anchor scrolling

## Risk Assessment
- **Timeline alignment complexity:** Start with left-aligned only (KISS); alternate layout is a nice-to-have
- **Photo placeholder swap:** Structured so `next/image` can replace div later without layout changes

## Security Considerations
- None (static placeholder content)

## Next Steps
- Phase 06: Projects & Blog Sections
