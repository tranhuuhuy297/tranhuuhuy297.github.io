'use client';

import { Mail } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { GithubIcon, LinkedinIcon } from '@/components/ui/social-icons';
import { socialLinks } from '@/lib/constants';

const iconMap = { Github: GithubIcon, Linkedin: LinkedinIcon, Mail } as const;

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-3">Get in Touch</h2>
        <p className="text-text-muted mb-6">
          Feel free to reach out for collaboration or just a friendly chat.
        </p>
        <div className="flex justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-sm font-medium text-text-muted hover:text-primary hover:border-primary/40 transition-all"
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
