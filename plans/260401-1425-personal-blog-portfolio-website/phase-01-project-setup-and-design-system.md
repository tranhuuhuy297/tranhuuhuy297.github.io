# Phase 01: Project Setup & Design System

## Context Links
- [Research: Next.js/Tailwind/Framer](./reports/researcher-01-nextjs-tailwind-framer.md)
- [Research: Design patterns](./research/researcher-02-design-patterns-portfolio.md)

## Overview
- **Priority:** P1 (blocking all other phases)
- **Status:** pending
- **Description:** Scaffold Next.js 14+ project with TypeScript strict, configure Tailwind v4 CSS-first theme, setup fonts, providers, and base styles.

## Key Insights
- Tailwind v4: no `tailwind.config.ts` needed; use `@theme` CSS directive + `@import "tailwindcss"`
- Utility renames from v3: `shadow-sm` -> `shadow-xs`, `ring` -> `ring-3`, etc.
- next-themes: wrap in ThemeProvider with `attribute="class"`, `defaultTheme="light"`
- Fonts: `next/font/google` auto-self-hosts, use `display: 'swap'` for LCP

## Requirements

### Functional
- Next.js 14+ App Router project with TypeScript strict mode
- Tailwind v4 with complete light/dark color tokens
- Inter (body) + Space Grotesk (headings) fonts loaded
- Dark mode toggle infrastructure via next-themes
- Base global styles with typography scale

### Non-functional
- Zero layout shift from fonts (next/font handles)
- No external font requests at runtime
- TypeScript strict: no `any` types

## Architecture
```
personal-blog/
├── app/
│   ├── layout.tsx          # Root layout: metadata, fonts, providers
│   ├── page.tsx            # Empty placeholder (assembled in phase 7)
│   ├── globals.css         # @import tailwindcss, @theme, base styles
│   └── providers.tsx       # ThemeProvider wrapper (client component)
├── lib/
│   ├── constants.ts        # Site metadata, nav links, color tokens ref
│   └── utils.ts            # cn() helper (clsx + twMerge)
├── public/
│   └── images/             # Empty dir for future assets
├── next.config.js
├── tsconfig.json
├── package.json
└── postcss.config.js       # @tailwindcss/postcss plugin
```

## Related Code Files
- **Create:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/providers.tsx`
- **Create:** `lib/constants.ts`, `lib/utils.ts`
- **Create:** `next.config.js`, `tsconfig.json`, `postcss.config.js`, `package.json`
- **Create:** `public/images/.gitkeep`

## Implementation Steps

### 1. Initialize Project
```bash
cd personal-blog/
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

### 2. Install Dependencies
```bash
npm install framer-motion lucide-react next-themes clsx tailwind-merge
npm install -D @tailwindcss/postcss
```

### 3. Configure TypeScript Strict
In `tsconfig.json`, ensure:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 4. Configure PostCSS
`postcss.config.js`:
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 5. Setup globals.css with Tailwind v4 Theme
```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-heading: 'Space Grotesk', system-ui, sans-serif;

  /* === LIGHT THEME (default) === */
  --color-background: #FFFDF7;
  --color-surface: #FFF8E7;

  /* Primary: bold gold — signature brand */
  --color-primary: #D4A012;
  --color-primary-hover: #B8860B;
  --color-primary-light: #FFF3CD;

  /* Secondary: black — high contrast counterpart */
  --color-secondary: #1A1A1A;
  --color-secondary-hover: #000000;
  --color-secondary-light: #E5E5E5;

  /* Tertiary: dark gold — muted gold variant */
  --color-tertiary: #8B6914;
  --color-tertiary-hover: #6B5010;
  --color-tertiary-light: #F5E6B8;

  /* Accent: bright yellow — CTA, highlights, brushstroke energy */
  --color-accent: #F5C518;
  --color-accent-hover: #FFD700;

  /* Semantic: feedback states */
  --color-error: #DC3545;
  --color-error-light: #F8D7DA;
  --color-success: #28A745;
  --color-success-light: #D4EDDA;
  --color-warning: #F5C518;
  --color-warning-light: #FFF3CD;
  --color-info: #6C757D;
  --color-info-light: #E2E3E5;

  /* Text & UI */
  --color-text: #1A1A1A;
  --color-text-muted: #5C5C5C;
  --color-border: #E8DCC8;
  --color-card: #FFFFFF;
}

/* === DARK THEME (class toggle via next-themes) === */
/* Aesthetic: bold black + yellow/gold — high contrast, graphic, edgy */
.dark {
  --color-background: #0A0A0A;
  --color-surface: #141414;

  --color-primary: #F5C518;
  --color-primary-hover: #FFD700;
  --color-primary-light: #2A2200;

  --color-secondary: #F5F0E8;
  --color-secondary-hover: #FFFFFF;
  --color-secondary-light: #1A1A1A;

  --color-tertiary: #D4A012;
  --color-tertiary-hover: #B8860B;
  --color-tertiary-light: #1E1800;

  --color-accent: #FFD700;
  --color-accent-hover: #FFEA00;

  --color-error: #F87171;
  --color-error-light: #2D1515;
  --color-success: #4ADE80;
  --color-success-light: #0D2818;
  --color-warning: #FBBF24;
  --color-warning-light: #2A2000;
  --color-info: #9CA3AF;
  --color-info-light: #1F2937;

  --color-text: #F5F0E8;
  --color-text-muted: #A89F91;
  --color-border: #2A2520;
  --color-card: #141414;
}
```

Add base body styles:
```css
body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-sans);
  line-height: 1.7;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
```

### 6. Setup Fonts in layout.tsx
```tsx
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-heading' });
```
Apply both variables to `<html>` className.

### 7. Create providers.tsx
```tsx
'use client';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

### 8. Create lib/utils.ts
```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 9. Create lib/constants.ts
Define: `siteConfig` (name, title, description, url), `navLinks` array, color token reference comments.

### 10. Create Root layout.tsx
Combine fonts, providers, metadata export (title, description, OG), wrap children.

### 11. Create Placeholder page.tsx
Simple server component with "Coming soon" text for build verification.

## Todo List
- [ ] Scaffold Next.js project
- [ ] Install all dependencies
- [ ] Configure TypeScript strict
- [ ] Setup PostCSS for Tailwind v4
- [ ] Create globals.css with @theme tokens (light + dark)
- [ ] Setup Inter + Space Grotesk fonts
- [ ] Create providers.tsx with ThemeProvider
- [ ] Create lib/utils.ts (cn helper)
- [ ] Create lib/constants.ts (site config, nav links)
- [ ] Create root layout.tsx with metadata + fonts
- [ ] Create placeholder page.tsx
- [ ] Verify `npm run dev` builds without errors
- [ ] Verify dark/light theme tokens apply correctly

## Success Criteria
- `npm run build` passes with zero errors
- Both light and dark themes render correct colors
- Fonts load without layout shift
- TypeScript strict mode active, no `any` types
- Lighthouse audit shows no font-related CLS issues

## Risk Assessment
- **Tailwind v4 breaking changes:** Utility renames may cause confusion; keep research report handy
- **next-themes hydration flash:** Mitigated by ThemeProvider's built-in server detection
- **PostCSS config conflicts:** create-next-app may generate v3 config; remove tailwind.config.ts if created

## Security Considerations
- No secrets in this phase
- Ensure no API keys committed

## Next Steps
- Phase 02: Shared UI Components (depends on theme tokens being ready)
