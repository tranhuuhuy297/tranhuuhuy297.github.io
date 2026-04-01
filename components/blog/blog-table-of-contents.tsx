'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  label: string;
}

/** Sticky table of contents with active section highlighting via IntersectionObserver */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hidden xl:block fixed right-[max(1rem,calc((100vw-48rem)/2-16rem))] top-32 w-56">
      <div className="flex items-center gap-2 mb-3 text-text-muted">
        <List size={14} />
        <span className="text-xs font-semibold uppercase tracking-wider">On this page</span>
      </div>
      <ul className="space-y-1.5 text-sm border-l border-border pl-3">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block py-0.5 transition-colors ${
                activeId === id
                  ? 'text-primary font-medium border-l-2 border-primary -ml-[calc(0.75rem+1px)] pl-[calc(0.75rem-1px)]'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
