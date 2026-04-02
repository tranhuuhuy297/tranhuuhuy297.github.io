export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { siteConfig, blogPostsData } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = blogPostsData.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7 as const,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      priority: 1.0,
    },
    ...blogEntries,
  ];
}
