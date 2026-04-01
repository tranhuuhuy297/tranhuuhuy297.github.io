import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tran Huu Huy | Staff Engineer',
  description:
    'Personal portfolio and blog of Tran Huu Huy — Staff Engineer building elegant solutions to complex problems.',
  openGraph: {
    title: 'Tran Huu Huy | Staff Engineer',
    description: 'Personal portfolio and blog.',
    url: 'https://huytran.dev',
    siteName: 'Tran Huu Huy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tran Huu Huy | Staff Engineer',
    description: 'Personal portfolio and blog.',
  },
  robots: {
    index: true,
    follow: true,
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
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
