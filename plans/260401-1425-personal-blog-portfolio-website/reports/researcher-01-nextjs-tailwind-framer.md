# Research Report: Next.js 14+ / Tailwind CSS v4 / Framer Motion Stack
**Date:** 2026-04-01 | **For:** Personal Blog/Portfolio Site

---

## 1. Next.js 14+ App Router Best Practices

### Layout & Structure
- **Root layout** in `app/layout.tsx` applies globally to all routes; use for metadata, providers, fonts
- **Segment-specific layouts** inherit & override parent layouts automatically
- **Layout nesting** is inherited—children components receive parent context without re-renders
- **Metadata API**: Use `generateMetadata()` or static `metadata` export instead of next-seo
  - Supports `openGraph`, `twitter`, `alternates` for SEO
  - Works in both Server & Client Components (as of Next.js 14+)

### Font Optimization (next/font)
- **Import model**: `next/font/google` or `next/font/local`—both self-host to prevent external requests
- **Variable fonts**: Preferred for best perf; include all weights in single file
- **Scoped to component**: Apply to `<html>` in root layout via `className={font.className}`
- **Subsetting**: Auto-subsets for specified `subsets: ['latin']` to reduce bundle
- **No layout shift**: Built-in font preloading prevents CLS (Cumulative Layout Shift)
- **Local fonts**: Store in `app/fonts/` or `public/`; use array syntax for multi-file families

### Image Optimization
- **next/image** Component: Lazy loads, responsive srcset, WebP/AVIF formats auto-selected
- **Avoid `fill` prop on `<Image>`**: Use explicit width/height or `sizes` prop for responsive images
- **Priority rendering**: Use `priority` for above-fold images (LCP optimization)
- **`sizes` attribute**: Critical for responsive perf—defaults to 100vw if omitted (suboptimal)

---

## 2. Tailwind CSS v4 Migration & Setup

### Breaking Changes from v3 → v4
- **Import syntax**: Replace `@tailwind directives` with single `@import "tailwindcss"` in CSS
- **Browser support**: Requires Safari 16.4+, Chrome 111+, Firefox 128+
- **Utility renames**: `shadow-sm` → `shadow-xs`, `blur-sm` → `blur-xs`, `rounded-sm` → `rounded-xs`, `ring` → `ring-3`, `outline-none` → `outline-hidden`
- **Important modifier**: `!flex` → `flex!` (modifier on right, not left)
- **Arbitrary values**: `bg-[--var]` → `bg-(--var)` (parentheses instead of brackets)
- **Variant stacking**: Left-to-right now (was right-to-left): `*:first:pt-0` instead of `first:*:pt-0`

### CSS-First Configuration
- **No `tailwind.config.ts` needed** by default in v4; use `@theme` CSS directive instead
  ```css
  @theme {
    --color-brand: #your-color;
    --font-sans: system-ui, sans-serif;
  }
  ```
- **PostCSS setup** (if needed):
  ```js
  // postcss.config.js
  export default {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  };
  ```
- **Vite integration** (modern approach):
  ```ts
  import tailwindcss from "@tailwindcss/vite";
  export default defineConfig({
    plugins: [tailwindcss()],
  });
  ```

### Default Color Changes
- **Border**: Now `currentColor` (was `gray-200`)—explicitly set if needed
- **Ring**: Now `currentColor` (was `blue-500`)
- **Placeholder**: Text color at 50% opacity (was `gray-400`)

---

## 3. next-themes + Tailwind CSS v4 Dark Mode

### Setup Strategy
1. **Install**: `npm install next-themes`
2. **Wrap app**: Add `<ThemeProvider>` in `app/layout.tsx` (top-level)
   ```tsx
   import { ThemeProvider } from 'next-themes'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <ThemeProvider attribute="class" defaultTheme="light">
             {children}
           </ThemeProvider>
         </body>
       </html>
     )
   }
   ```
3. **Tailwind dark mode**: Set `darkMode: 'class'` in config (v3) or use `@theme` in CSS (v4)

### CSS Variable Approach (Recommended for v4)
- Define base colors in `:root` and `[data-theme="dark"]` or `html.dark`
  ```css
  @theme {
    --color-background: rgb(255 255 255);
    --color-foreground: rgb(0 0 0);
  }
  
  @dark {
    --color-background: rgb(10 10 10);
    --color-foreground: rgb(255 255 255);
  }
  ```
- **Gotcha**: `next-themes` uses `class` attribute by default; ensure Tailwind targets `.dark html` selector
- **Hydration safety**: `next-themes` prevents flash of unstyled content on hydration via server-side detection

### Theme Toggle Component
- Use `useTheme()` hook (must be `'use client'`)
  ```tsx
  'use client'
  import { useTheme } from 'next-themes'
  
  export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return (
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle
      </button>
    )
  }
  ```
- **Mount check**: Wrap in `useEffect` to avoid hydration mismatch

---

## 4. Framer Motion with Next.js App Router

### Client Component Requirement
- **All Framer Motion code must be in `'use client'` components**—motion components are client-only
- Wrap motion components in client boundary; parent layout can remain server
  ```tsx
  // app/layout.tsx (Server Component - OK)
  import { MotionWrapper } from './motion-wrapper' // 'use client' internally
  
  export default function RootLayout({ children }) {
    return <html><body><MotionWrapper>{children}</MotionWrapper></body></html>
  }
  ```

### whileInView Best Practices
- **Triggers on scroll into view**: `whileInView={{ opacity: 1, y: 0 }}`
- **Set `initial` state**: Without it, element starts at animation end (bad UX)
  ```tsx
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
  />
  ```
- **`viewport` options**:
  - `once: true` — animates only once (perf boost)
  - `amount: 0.3` — trigger when 30% in view
  - `margin: "100px"` — trigger 100px before entering

### Stagger Animations
- **Container + child pattern** (cleaner than manual delays):
  ```tsx
  <motion.div variants={containerVariants}>
    {items.map(item => (
      <motion.div key={item.id} variants={itemVariants}>
        {item.label}
      </motion.div>
    ))}
  </motion.div>
  ```
- **Define variants**:
  ```ts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }
  ```

### Accessibility: prefers-reduced-motion
- **Always respect user preference**:
  ```tsx
  const prefersReducedMotion = useMotionTemplate ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  
  <motion.div
    animate={prefersReducedMotion ? {} : { opacity: 1 }}
    transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
  />
  ```
- **Alternative**: Use `AnimatePresence` with conditional `motion.div` rendering
- **No performant hook in v10+**—check media query manually or use library like `framer-motion/dom-max`

---

## Setup Checklist (Single-Page Portfolio)

- [ ] Install: `next@latest tailwindcss next-themes framer-motion`
- [ ] Run `npx @tailwindcss/upgrade` to migrate from v3 (if applicable)
- [ ] Create root layout with font imports (`next/font/google`)
- [ ] Add metadata export for SEO (title, description, OG tags)
- [ ] Setup `next/image` for portfolio images with `sizes` prop
- [ ] Configure `@import "tailwindcss"` in CSS; skip `tailwind.config.ts` (use `@theme` directives)
- [ ] Wrap app in `<ThemeProvider>` for dark mode
- [ ] Create theme toggle component (`'use client'`)
- [ ] Wrap motion components in `'use client'` boundary
- [ ] Test `whileInView` with `once: true` and `amount` option
- [ ] Verify `prefers-reduced-motion` is respected in animations
- [ ] Test dark mode toggle; ensure no hydration flashes

---

## Unresolved Questions

1. Should custom theme colors be defined in `@theme` CSS or via `content-layer` in tailwind config for v4?
2. How does `next-themes` interact with automatic dark mode detection if user has system preference set?
3. Does Framer Motion's `useScroll()` work reliably in Next.js RSC layout for scroll-triggered animations across page?
