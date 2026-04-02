import { siteConfig } from '@/lib/constants';

/** Person + WebSite structured data for Google Knowledge Panel and rich results */
export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    alternateName: [siteConfig.fullName, 'Huy Trần', 'tranhuuhuy297', 'Tran Huu Huy'],
    url: siteConfig.url,
    jobTitle: 'Software Engineer',
    sameAs: [siteConfig.github, siteConfig.linkedin],
    email: siteConfig.email,
    knowsAbout: [
      'TypeScript', 'Python', 'React', 'GraphQL',
      'Node.js', 'PostgreSQL', 'MongoDB',
      'Google Cloud Platform', 'AWS', 'Kubernetes', 'Docker',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: { '@type': 'Person', name: siteConfig.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
