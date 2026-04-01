'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Card } from '@/components/ui/card';
import { blogPostsData } from '@/lib/constants';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/motion-variants';

export function BlogSection() {
  return (
    <SectionWrapper id="blog">
      <h2 className="text-3xl md:text-4xl mb-4 text-center">Blog</h2>
      <p className="text-text-muted mb-8 text-center">
        Thoughts on engineering, architecture, and craft.
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {blogPostsData.map((post) => (
          <motion.div key={post.slug} variants={staggerItemVariants}>
            <Link href={`/blog/${post.slug}`}>
              <Card className="cursor-pointer">
                <span className="text-sm text-text-muted">
                  {post.date} &middot; {post.readTime}
                </span>
                <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                <p className="text-text-muted text-sm mt-2">{post.excerpt}</p>
                <span className="text-primary text-sm mt-3 inline-block">Read more &rarr;</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
