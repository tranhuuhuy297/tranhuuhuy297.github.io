'use client';

import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Badge } from '@/components/ui/badge';
import { aboutData } from '@/lib/constants';

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <h2 className="text-3xl md:text-4xl mb-6 text-center">About Me</h2>
      <p className="text-text-muted text-center max-w-2xl mx-auto mb-6">{aboutData.bio}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {aboutData.skillCategories.flatMap((cat) => cat.items).map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </SectionWrapper>
  );
}
