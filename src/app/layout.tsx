import CyberMesh from '@/components/CyberMesh';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import { DM_Mono, Syne } from 'next/font/google';

import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VulnLabJS — Interactive Web Security Learning Lab',
  description:
    'An interactive local playground to learn and understand common web security vulnerabilities. Master the theory, execute the exploits, and apply the remediation strategies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} h-full`}>
      <body className="relative min-h-full flex flex-col bg-[#080808] text-[#e8e8e8] selection:bg-[#c0392b]/40 selection:text-white antialiased">
        <div className="pointer-events-none fixed inset-0 z-0 noise-overlay" />
        <div className="pointer-events-none fixed inset-0 z-0 cyber-blueprint-grid" />
        <CyberMesh />
        <div className="relative z-10 flex min-h-full flex-col">
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
