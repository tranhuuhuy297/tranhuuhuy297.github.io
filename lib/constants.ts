export const siteConfig = {
  name: 'Huy Tran',
  title: 'Huy Tran',
  description:
    'Personal portfolio and blog of Huy Tran.',
  url: 'https://huytran.dev',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Blog', href: '#blog' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/tranhuuhuy297', icon: 'Github' as const, external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tranhuuhuy297', icon: 'Linkedin' as const, external: true },
  { label: 'Email', href: 'mailto:tranhuuhuy297@gmail.com', icon: 'Mail' as const, external: false },
];

export const heroData = {
  name: '',
  subtitle: '',
  tagline: '',
  cta: [
    { label: 'View Blog', href: '#blog', variant: 'primary' as const },
    { label: 'Read Blog', href: '#blog', variant: 'outline' as const },
  ],
};

export const aboutData = {
  bio: 'A software engineer who enjoys building products.',
  skillCategories: [
    { label: 'Languages', items: ['TypeScript', 'Python'] },
    { label: 'Frontend', items: ['React', 'Vue'] },
    { label: 'Databases', items: ['PostgreSQL', 'MongoDB'] },
    { label: 'Cloud', items: ['GCP'] },
    { label: 'APIs', items: ['REST', 'GraphQL', 'gRPC'] },
    { label: 'Infra', items: ['Docker', 'Kubernetes'] },
    { label: 'Tools', items: ['Vim', 'Claude'] },
  ],
};

export const experienceData = [
  {
    title: 'Backend Engineer',
    company: 'MBBank - Military Commercial Joint Stock Bank',
    period: '06/2023 - 04/2024',
    highlights: [
      'Built data sync service (Oracle to MongoDB) using Spring Boot and Kafka CDC to reduce Core system load',
      'Developed runtime Kafka consumption control — pause, stop, and reset commit offsets on the fly',
    ],
  },
  {
    title: 'Full Stack Engineer',
    company: 'VinBigData Joint Stock Company',
    period: '01/2022 - 05/2023',
    highlights: [
      'Developed core modules for Vinbase — an AI chatbot management platform — across 2 versions',
      'Built APIs for chatbot training data and versioning with Flask, FastAPI, and MongoDB',
      'Cut training data creation time by 50% via SQS-based import/export service with S3 storage',
      'Implemented frontend features and UX improvements with Nuxt and Vuetify',
      'Reviewed code, migrated databases, and refactored legacy modules',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'VinBigData Joint Stock Company',
    period: '08/2021 - 12/2021',
    highlights: [
      'Trained ML/DL models using PyTorch on crawled data via Selenium',
      'Built demo APIs with Flask for model inference',
    ],
  },
];

export const educationData = [
  {
    degree: 'Bachelor of Computer Science',
    school: 'Hanoi University of Science and Technology',
    period: '2018 - 2023',
    highlights: [
      'CPA: 3.48 / 4.0',
      '1st prize — HUST-IBM Hackathon 2021',
      'Deep Learning Specialization (Coursera)',
    ],
  },
  {
    degree: 'Mathematics',
    school: 'Ha Long High School for Gifted Students',
    period: '2015 - 2018',
    highlights: [
      '1st prize — Quang Ninh Provincial Mathematics Competition 2018',
      'Bronze medal — Vietnam Violympic Online Mathematics Contest 2015',
    ],
  },
];

export const projectsData: {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  featured: boolean;
}[] = [];

export const blogPostsData = [
  {
    title: 'Building Scalable Systems: Lessons Learned',
    date: '2026-03-15',
    excerpt:
      'Key architectural patterns that helped our team scale from 1K to 1M users.',
    readTime: '8 min read',
  },
  {
    title: 'The Art of Code Review',
    date: '2026-02-28',
    excerpt:
      'How to give and receive code reviews that actually improve code quality.',
    readTime: '5 min read',
  },
];
