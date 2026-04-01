import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Huy Tran',
  description:
    'Personal portfolio and blog of Huy Tran.',
  openGraph: {
    title: 'Huy Tran',
    description: 'Personal portfolio and blog.',
    url: 'https://huytran.dev',
    siteName: 'Huy Tran',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huy Tran',
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
