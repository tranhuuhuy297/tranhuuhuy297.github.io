# Exploration Report: Next.js Blog Project Structure

**Date:** April 1, 2026
**Project:** Personal Blog Portfolio Site
**Status:** Early stage - primarily static portfolio site with blog placeholder

---

## 1. Blog Post Files & Content Storage

### Current State
**NO DEDICATED BLOG CONTENT DIRECTORY EXISTS YET**

Blog posts are currently stored as **hardcoded data in TypeScript**:
- **Location:** `/Users/huyth/Projects/personal/blog/lib/constants.ts`
- **Format:** JavaScript/TypeScript object literals
- **Structure:** Array of blog post metadata objects

### Blog Posts Data (Current)
Two placeholder blog posts defined:
1. **"Building Scalable Systems: Lessons Learned"** (2026-03-15)
   - Excerpt: "Key architectural patterns that helped our team scale from 1K to 1M users."
   - Read time: 8 min
   - Status: Not a draft (published metadata)

2. **"The Art of Code Review"** (2026-02-28)
   - Excerpt: "How to give and receive code reviews that actually improve code quality."
   - Read time: 5 min
   - Status: Not a draft (published metadata)

### Draft Status
**NO DRAFTS CURRENTLY MARKED** - Both blog posts are treated as published, though the UI displays "Coming soon" to indicate future functionality.

---

## 2. Blog Content Structure & Format

### Content Architecture
```
Current Structure:
├── lib/constants.ts          # Blog metadata storage
└── components/sections/
    └── blog-section.tsx      # Blog grid renderer

No file-based content system (MDX/MD) yet
```

### Data Schema
```typescript
export const blogPostsData = [
  {
    title: string;           // Post title
    date: string;            // ISO date (YYYY-MM-DD)
    excerpt: string;         // Short description
    readTime: string;        // "X min read"
  }
];
```

### Format Assessment
- **Current Format:** JSON-like TypeScript objects
- **No MDX Support:** Not configured (no `next-mdx-remote` or similar in package.json)
- **No Markdown Support:** No MD file parsing
- **No File-Based Posts:** Posts aren't stored in directories like `/content/posts/`
- **Planned Future:** Phase 06 planning docs mention "future MDX integration"

---

## 3. Blog Configuration & Content Management

### Current Setup
- **CMS:** None - fully static/hardcoded
- **Config Files:** 
  - `/Users/huyth/Projects/personal/blog/next.config.ts` - Basic export output
  - No content configuration

### next.config.ts
```typescript
const nextConfig: NextConfig = {
  output: 'export',          // Static site generation
  images: {
    unoptimized: true,       // For static export
  },
};
```

### Package Dependencies (Relevant)
No content management packages installed:
- ✓ `next@16.2.2`
- ✓ `react@19.2.4`
- ✓ `framer-motion@12.38.0` (animations)
- ✓ `tailwindcss@4` (styling)
- ✗ No `next-mdx-remote`, `contentlayer`, `gray-matter`, etc.

### Content Management Approach
**Completely Data-Driven**
- Blog posts are managed in TypeScript constants
- No database connection
- No CMS integration (Sanity, Contentful, etc.)
- No file system scanning for MD/MDX
- Requires code changes to add/update posts

---

## 4. Blog Rendering & Components

### Blog Display Component
**File:** `/Users/huyth/Projects/personal/blog/components/sections/blog-section.tsx`

```typescript
export function BlogSection() {
  // Maps over blogPostsData from constants
  // Renders Card component for each post
  // Shows "Coming soon" placeholder link
  // Uses Framer Motion stagger animation
}
```

### Rendering Pipeline
1. **Home Page** (`app/page.tsx`)
   ```tsx
   export default function Home() {
     return (
       <>
         <HeroSection />
         <ExperienceSection />
         <EducationSection />
         <BlogSection />  // ← Blog grid
       </>
     );
   }
   ```

2. **BlogSection Component** (`components/sections/blog-section.tsx`)
   - Imports `blogPostsData` from constants
   - Maps over array, renders Card for each
   - No routing/individual post pages
   - States: "Coming soon" - no click handlers

3. **Card Component** (`components/ui/card.tsx`)
   - Framer Motion wrapper with hover animation
   - Generic container with `className` prop
   - Lift effect on hover (y: -4)
   - Shadow glow effect

### Layout Components
- **Navbar** (`components/layout/navbar.tsx`) - Navigation with scroll tracking
- **Footer** (`components/layout/footer.tsx`) - Social links
- **RootLayout** (`app/layout.tsx`) - Next.js metadata, Navbar integration

### Animations
**File:** `/Users/huyth/Projects/personal/blog/lib/motion-variants.ts`
```typescript
staggerContainerVariants  // For grid container
staggerItemVariants       // For individual cards
```

---

## 5. Related Blog Infrastructure

### Project Data (Similar Structure)
**File:** `lib/constants.ts` (projectsData)
```typescript
export const projectsData: {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  featured: boolean;
}[] = [];  // Currently empty array
```

**Rendered by:** `components/sections/projects-section.tsx`
- Same pattern as BlogSection
- Grid layout with tech badges
- GitHub/demo links

### Navigation Links
```typescript
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Blog', href: '#blog' },
];
```
- Single-page navigation via hash links
- No dedicated `/blog` route

### Other Sections
- **Hero Section** - Bio, tech stack display
- **Experience Section** - Interactive timeline
- **Education Section** - Degree/school switcher
- **About Section** - Stub (not on home page)
- **Contact Section** - "Coming soon" placeholder

---

## 6. Project File Structure

```
/Users/huyth/Projects/personal/blog/
├── app/                           # Next.js App Router
│   ├── page.tsx                   # Home page (all sections)
│   ├── layout.tsx                 # Root layout + Navbar
│   ├── providers.tsx              # Tailwind/theme providers
│   ├── globals.css                # Global styles
│   └── icon.png                   # App icon
│
├── components/
│   ├── sections/                  # Page sections
│   │   ├── blog-section.tsx       # ← Blog grid
│   │   ├── hero-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── education-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── about-section.tsx
│   │   └── contact-section.tsx
│   │
│   ├── layout/
│   │   ├── navbar.tsx             # Navigation
│   │   └── footer.tsx             # Footer
│   │
│   ├── ui/                        # Reusable components
│   │   ├── card.tsx               # Blog post card
│   │   ├── badge.tsx              # Tech tags
│   │   ├── button.tsx
│   │   ├── section-wrapper.tsx
│   │   ├── social-icons.tsx
│   │   └── theme-toggle.tsx
│   │
│   └── animations/
│       └── text-reveal.tsx        # Animation helper
│
├── lib/
│   ├── constants.ts               # ← Blog data & config
│   ├── motion-variants.ts         # Framer Motion configs
│   ├── tech-icons.ts              # Tech icon mappings
│   └── utils.ts                   # Utility functions
│
├── public/
│   ├── icon.png
│   ├── icons/
│   │   ├── python.png
│   │   └── postgresql.png
│   └── [other assets]
│
├── package.json                   # Dependencies
├── next.config.ts                 # Next.js config
├── tsconfig.json                  # TypeScript config
├── tailwind.config.js             # Tailwind config
└── [other config files]
```

---

## 7. Static Export Configuration

**Key Setting:** `output: 'export'` in `next.config.ts`
- Generates static HTML (no server-side rendering)
- Output directory: `out/` folder
- Images: `unoptimized: true` for static compatibility

---

## 8. Build & Deployment

### Build Process
- Standard Next.js build: `npm run build`
- Outputs static site to `out/` directory
- Deployed via GitHub Pages (CI/CD: `.github/workflows/deploy-github-pages.yml`)

### Development
- Dev server: `npm run dev` → `http://localhost:3000`
- TypeScript strict mode enabled

---

## 9. Future Expansion Points (from Phase 06 plan)

The Phase 06 planning document (`plans/260401-1425.../phase-06...`) shows intended architecture:

1. **Planned MDX Integration**
   - "Placeholder grid for future MDX integration"
   - Individual blog post pages (not currently implemented)
   - File-based content system (TBD - no directory created yet)

2. **Structured for Content Addition**
   ```typescript
   // Current schema can support
   {
     title, date, excerpt, readTime
     // Could expand to:
     // slug, author, tags, featured, draft
   }
   ```

3. **Missing for Full Blog**
   - Post routing (`/blog/[slug]`)
   - MDX/Markdown parsing
   - Draft status flag
   - Tag/category system
   - Search functionality

---

## 10. Summary & Key Findings

### Blog Setup Status
| Feature | Status | Notes |
|---------|--------|-------|
| Blog grid display | ✓ Complete | Data-driven, no posts clickable yet |
| Blog data storage | ✓ Basic | TypeScript constants only |
| MDX/Markdown support | ✗ Not implemented | No packages or configuration |
| File-based posts | ✗ No directory | No `/content`, `/posts`, `/blog` folder |
| Individual post pages | ✗ No routing | Single-page app, no [slug] routes |
| Draft support | ✗ Not implemented | No draft field in schema |
| CMS integration | ✗ None | Fully static, code-based |
| Content version control | ✓ Git | Posts tracked in constants.ts |

### Current Blog Posts (2 total)
- No drafts marked
- Both have "Coming soon" UI state
- Metadata only - no body content stored

### Recommended Next Steps (to create working blog)
1. Choose content format (MDX recommended for React blog)
2. Create `/content/posts/` directory
3. Add `contentlayer` or `next-mdx-remote` dependency
4. Create `[slug]` route for individual posts
5. Add draft status to frontmatter/schema
6. Implement blog listing with filters/search
7. Add back-to-blog navigation

---

**Report Generated:** 2026-04-01 at 16:35 UTC
**Explored by:** Claude Code Explore Agent
