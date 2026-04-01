# Phase 06: Projects & Blog Sections

## Context Links
- [Phase 02: UI Components](./phase-02-shared-ui-components.md) (Card, Badge, SectionWrapper)
- [Research: Grid patterns + hover effects](./research/researcher-02-design-patterns-portfolio.md)

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** Project cards grid with hover effects and tech tags. Blog section as placeholder grid for future MDX integration.

## Key Insights
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Card hover: lift (y: -4) + gold glow shadow
- Tech tags: Badge component from Phase 02
- Project images: placeholder divs with `aspect-video`, ready for `next/image`
- Blog: structured data even for placeholders, easing future MDX migration

## Requirements

### Functional
- **Projects:** Responsive grid, 3-5 project cards, each with: image placeholder, title, description, tech tags, GitHub link, demo link (optional)
- **Blog:** 2-col grid, 2-3 placeholder blog post cards with: title, date, excerpt, read time, "Coming soon" state
- Both sections use SectionWrapper

### Non-functional
- Project cards use Card component with hover effects
- Links open in new tab with `rel="noopener noreferrer"`
- Blog cards hint at future functionality without dead links

## Architecture

```
components/sections/
├── projects.tsx   # 'use client' - project grid
└── blog.tsx       # 'use client' - blog placeholder grid
```

## Related Code Files
- **Create:** `components/sections/projects.tsx`
- **Create:** `components/sections/blog.tsx`
- **Modify:** `lib/constants.ts` (add projectsData, blogPostsData)

## Implementation Steps

### 1. Add Data to constants.ts
```ts
export const projectsData = [
  {
    title: 'Project Alpha',
    description: 'A scalable microservices platform for real-time data processing.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/tranhuuhuy297/project-alpha',
    demo: '#',
    featured: true,
  },
  {
    title: 'Project Beta',
    description: 'ML-powered recommendation engine with REST API.',
    tech: ['Python', 'FastAPI', 'TensorFlow', 'Redis'],
    github: 'https://github.com/tranhuuhuy297/project-beta',
    demo: null,
    featured: false,
  },
  {
    title: 'Project Gamma',
    description: 'Modern dashboard UI with real-time charts and analytics.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'D3.js'],
    github: 'https://github.com/tranhuuhuy297/project-gamma',
    demo: '#',
    featured: false,
  },
];

export const blogPostsData = [
  {
    title: 'Building Scalable Systems: Lessons Learned',
    date: '2026-03-15',
    excerpt: 'Key architectural patterns that helped our team scale from 1K to 1M users.',
    readTime: '8 min read',
  },
  {
    title: 'The Art of Code Review',
    date: '2026-02-28',
    excerpt: 'How to give and receive code reviews that actually improve code quality.',
    readTime: '5 min read',
  },
];
```

### 2. Projects Section (`'use client'`)
```
<SectionWrapper id="projects">
  <h2>Projects</h2>
  <p className="text-text-muted mb-8">A selection of things I've built.</p>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projectsData.map(project => (
      <Card key={project.title}>
        {/* Image placeholder */}
        <div className="aspect-video rounded-lg bg-surface mb-4" />

        <h3>{project.title}</h3>
        <p className="text-text-muted text-sm">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tech.map(t => <Badge key={t}>{t}</Badge>)}
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 hover:text-primary transition-colors" />
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5 hover:text-primary transition-colors" />
            </a>
          )}
        </div>
      </Card>
    ))}
  </div>
</SectionWrapper>
```

### 3. Blog Section (`'use client'`)
```
<SectionWrapper id="blog">
  <h2>Blog</h2>
  <p className="text-text-muted mb-8">Thoughts on engineering, architecture, and craft.</p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {blogPostsData.map(post => (
      <Card key={post.title} className="cursor-default">
        <span className="text-sm text-text-muted">{post.date} · {post.readTime}</span>
        <h3 className="mt-2">{post.title}</h3>
        <p className="text-text-muted text-sm mt-2">{post.excerpt}</p>
        <span className="text-primary text-sm mt-3 inline-block">Coming soon</span>
      </Card>
    ))}
  </div>
</SectionWrapper>
```

### 4. Stagger Animation for Grid Items
- Wrap grid in `motion.div` with container variants
- Each Card wrapped in `motion.div` with item variants
- `staggerChildren: 0.1` for progressive reveal

## Todo List
- [ ] Add projectsData and blogPostsData to constants.ts
- [ ] Create projects.tsx with responsive grid
- [ ] Add project cards with image placeholder, tech tags, links
- [ ] Create blog.tsx with 2-col placeholder grid
- [ ] Add stagger animation to grid items
- [ ] Test hover effects on project cards (lift + gold glow)
- [ ] Test responsive grid breakpoints (1/2/3 cols)
- [ ] Verify external links have rel="noopener noreferrer"
- [ ] Test dark mode rendering

## Success Criteria
- Projects grid shows 3+ cards with proper responsive layout
- Cards lift + glow on hover
- Tech tags render as pills
- GitHub/demo links work and open in new tabs
- Blog shows placeholder cards with "Coming soon"
- Stagger animation on scroll

## Risk Assessment
- **Dead links:** Use `#` placeholder for demo links; clearly mark as placeholder
- **Image placeholder layout shift:** Fixed `aspect-video` prevents CLS

## Security Considerations
- External links: `rel="noopener noreferrer"` on all `target="_blank"` links
- No user-generated content in this phase

## Next Steps
- Phase 07: Contact & Final Assembly
