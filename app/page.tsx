import { HeroSection } from '@/components/sections/hero-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { EducationSection } from '@/components/sections/education-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { BlogSection } from '@/components/sections/blog-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <BlogSection />
    </>
  );
}
