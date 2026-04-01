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
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tranhuuhuy297', icon: 'Linkedin' as const, external: true },
  { label: 'Email', href: 'mailto:tranhuuhuy297@gmail.com', icon: 'Mail' as const, external: false },
];

export const heroData = {
  name: '',
  subtitle: '',
  tagline: '',
  cta: [
    { label: 'Read Blog', href: '#blog', variant: 'primary' as const },
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
    title: 'Software Engineer Intern',
    company: 'VinBigData Joint Stock Company',
    logo: '/icons/vinbigdata-logo.png',
    link: 'https://vinbigdata.com/',
    period: '08/2021 - 12/2021',
    highlights: [
      'Trained ML/DL models using PyTorch on crawled data via Selenium',
      'Built demo APIs with Flask for model inference',
    ],
  },
  {
    title: 'Full Stack Engineer',
    company: 'VinBigData Joint Stock Company',
    logo: '/icons/vinbigdata-logo.png',
    link: 'https://vinbigdata.com/',
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
    title: 'Backend Engineer',
    company: 'MBBank - Military Commercial Joint Stock Bank',
    logo: '/icons/mbbank-logo.svg',
    link: 'https://www.mbbank.com.vn/',
    period: '06/2023 - 04/2024',
    highlights: [
      'Built data sync service (Oracle to MongoDB) using Spring Boot and Kafka CDC to reduce Core system load',
      'Developed runtime Kafka consumption control — pause, stop, and reset commit offsets on the fly',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Geniee International Group',
    logo: '/icons/geniee-logo.svg',
    link: 'https://geniee.co.jp/en/',
    period: '08/2024 - Present',
    highlights: [
      'Built enterprise features for Mizuho — multi-session auth, customer hierarchy sync, IP restrictions, and MFA',
      'Designed event management system with QR codes, matching logic, and multi-step forms',
      'Built bi-directional SFA-CRM data sync pipeline with GraphQL, deduplication, and retry mechanisms',
      'Reduced CI build time by 60% (35m → 14m) via Docker image cache and secret mount optimization',
      'Reduced CI lint time by 69% (32m → 10m) via ESLint 8 → 9 migration with zero bugs',
      'Optimized Kubernetes — PodDisruptionBudget, readiness probes, graceful shutdown, and connection pool tuning',
      'Established E2E testing with Playwright and unit testing with Vitest + React Testing Library',
    ],
  },
];

export const educationData = [
  {
    degree: 'Bachelor of Computer Science',
    school: 'Hanoi University of Science and Technology',
    logo: '/icons/hust-logo.png',
    link: 'https://hust.edu.vn/en/',
    period: '2018 - 2023',
    highlights: [
      'CPA: 3.48 / 4.0',
      'IEEE published paper [→ View](https://ieeexplore.ieee.org/abstract/document/10339689)',
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

export const projectsData = [
  {
    title: 'ARCH Platform',
    company: 'Geniee International Group',
    logo: '/icons/arch-logo.svg',
    overview: 'Enterprise platform serving Mizuho (Japan\'s 3rd largest bank), Fujikyu Group (tourism conglomerate, 40 subsidiaries), and other major Japanese corporations.',
    highlights: [
      'React + TypeScript frontend built with Vite, MUI components, and React Query for server state management',
      'GraphQL API on Node.js/Express with PostgreSQL, TimescaleDB for analytics, and Firebase auth',
      'Kubernetes on GKE with blue-green deployments (prod01/prod02), Tanka configs, and Terraform-managed GCP infra',
      'Background processing via graphile-worker, Postmark for transactional emails, Slack SDK for notifications',
      'Bi-directional sync with Salesforce and CHIKYU SFA via dedicated GraphQL integrations',
      'Vitest + React Testing Library for unit tests, Playwright for E2E, ESLint + Prettier for code quality',
    ],
    github: '',
    demo: 'https://app.arch-hc.com/',
    featured: true,
  },
  {
    title: 'CHIKYU (SFA-CRM)',
    company: 'Geniee International Group',
    logo: '/icons/chikyu-logo.png',
    overview: 'SFA/CRM platform serving 6,300+ companies across Japan with 99% retention rate — SIers, manufacturing, trading, HR, and real estate industries.',
    highlights: [
      'Python 3.9 backend on AWS Lambda (Serverless Framework) with API Gateway, SQS, and EventBridge for async workflows',
      'MongoDB for multi-tenant business data, MySQL for auth/config, Redis for caching, Elasticsearch for full-text search',
      'BigQuery analytics pipeline and DynamoDB for operational key-value storage',
      'PHP + Vue.js frontend on ECS Fargate with CloudFront CDN, deployed via CodeBuild',
      'CI/CD: GitHub Actions orchestrating AWS CodeBuild — manual deploys with confirmation, 8+ parallel dev stages',
    ],
    github: '',
    demo: 'http://app.chikyu.net/',
    featured: true,
  },
  {
    title: 'Vinbase',
    company: 'VinBigData Joint Stock Company',
    logo: '/icons/vinbase-logo.png',
    overview: 'AI-powered virtual assistant platform serving major Vietnamese enterprises including Vinhomes, Vinpearl, VinFast, and ACB — automating customer interactions across 100+ languages.',
    highlights: [
      'Nuxt + Vuetify frontend for Bot Studio — the drag-and-drop chatbot builder interface',
      'Flask and FastAPI backend serving training data APIs with MongoDB for versioned bot configs',
      'SQS-based import/export pipeline with S3 storage — cut training data creation time by 50%',
      'Amazon EKS for container orchestration and continuous deployment',
    ],
    github: '',
    demo: 'https://vinbase.ai/en/',
    featured: true,
  },
];

export const blogPostsData = [
  {
    slug: 'kafka-streams-basics',
    title: 'Kafka Streams Basics: Real-Time Data Processing Made Simple',
    date: '2026-04-01',
    excerpt:
      'A practical guide to Kafka Streams — what it is, how it works under the hood, and when you should (or shouldn\'t) use it.',
    readTime: '12 min read',
  },
];
