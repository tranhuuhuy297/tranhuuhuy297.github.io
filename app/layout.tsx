import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/navbar';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/seo/json-ld-structured-data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Huy Tran', 'Huy Trần', 'Trần Hữu Huy', 'Tran Huu Huy', 'tranhuuhuy297',
    'Software Engineer', 'Full Stack Engineer', 'Backend Engineer',
    'Software Engineer Vietnam',
    'TypeScript', 'Python', 'React', 'Node.js', 'Vue.js', 'Next.js',
    'GraphQL', 'PostgreSQL', 'MongoDB',
    'GCP', 'AWS', 'Kubernetes', 'Serverless', 'Terraform',
    'Geniee', 'MBBank', 'VinBigData',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className=""
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <JsonLd />
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
