'use client';

import { TableOfContents } from '@/components/blog/blog-table-of-contents';
import { blogTocRegistry } from '@/lib/blog-posts/blog-toc-registry';

interface BlogPostLayoutProps {
  slug: string;
  children: React.ReactNode;
}

/** Wraps blog content with a sticky table of contents sidebar */
export function BlogPostLayout({ slug, children }: BlogPostLayoutProps) {
  const tocItems = blogTocRegistry[slug] ?? [];

  return (
    <div className="relative">
      {tocItems.length > 0 && <TableOfContents items={tocItems} />}
      <div className="prose-blog">{children}</div>
    </div>
  );
}
