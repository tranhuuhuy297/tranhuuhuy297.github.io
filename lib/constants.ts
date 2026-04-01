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
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/tranhuuhuy297', icon: 'Github' as const, external: true },
  { label: 'LinkedIn', href: '#', icon: 'Linkedin' as const, external: true },
  { label: 'Email', href: 'mailto:contact@example.com', icon: 'Mail' as const, external: false },
];

export const heroData = {
  name: '',
  subtitle: '',
  tagline: '',
  cta: [
    { label: 'View Projects', href: '#projects', variant: 'primary' as const },
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
    title: 'Staff Engineer',
    company: 'Company Name',
    period: '2024 - Present',
    description:
      'Leading architecture decisions and mentoring engineering teams across multiple product lines.',
  },
  {
    title: 'Senior Software Engineer',
    company: 'Company Name',
    period: '2022 - 2024',
    description:
      'Built scalable microservices and improved system reliability to 99.9% uptime.',
  },
  {
    title: 'Software Engineer',
    company: 'Company Name',
    period: '2020 - 2022',
    description:
      'Developed full-stack features and optimized performance across web applications.',
  },
];

export const educationData = [
  {
    degree: 'Bachelor of Computer Science',
    school: 'University Name',
    period: '2016 - 2020',
    description: 'Focus on software engineering, algorithms, and distributed systems.',
  },
  {
    degree: 'High School Diploma',
    school: 'High School Name',
    period: '2013 - 2016',
    description: 'Specialized in mathematics and natural sciences.',
  },
];

export const projectsData = [
  {
    title: 'Project Alpha',
    description: 'A scalable microservices platform for real-time data processing.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/tranhuuhuy297/project-alpha',
    demo: '#',
    featured: true,
  },
  {
    title: 'Project Beta',
    description: 'ML-powered recommendation engine with REST API.',
    tech: ['Python', 'FastAPI', 'TensorFlow', 'Redis'],
    github: 'https://github.com/tranhuuhuy297/project-beta',
    demo: null,
    featured: false,
  },
  {
    title: 'Project Gamma',
    description: 'Modern dashboard UI with real-time charts and analytics.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'D3.js'],
    github: 'https://github.com/tranhuuhuy297/project-gamma',
    demo: '#',
    featured: false,
  },
];

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
