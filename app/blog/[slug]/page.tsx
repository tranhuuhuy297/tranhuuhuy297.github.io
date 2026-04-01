import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogPostsData } from '@/lib/constants';
import { blogContentRegistry } from '@/lib/blog-posts/blog-content-registry';
import { BlogPostLayout } from '@/components/blog/blog-post-layout';
import { notFound } from 'next/navigation';

/** Generate static paths for all blog posts (required for static export) */
export function generateStaticParams() {
  return blogPostsData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Huy Tran`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);
  const Content = blogContentRegistry[slug];

  if (!post || !Content) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-20">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>
        <p className="text-text-muted mt-3">
          {post.date} &middot; {post.readTime}
        </p>
      </header>

      <BlogPostLayout slug={slug}>
        <Content />
      </BlogPostLayout>
    </article>
  );
}
