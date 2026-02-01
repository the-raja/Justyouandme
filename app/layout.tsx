import '../styles/globals.css';
import React from 'react';
import { Inter, Lora } from 'next/font/google';
import Navbar from '../components/Navbar';
import GlobalHearts from '../components/GlobalHearts';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata = {
  title: 'JUST YOU & ME',
  description: 'A private space for us.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="relative bg-primary-bg text-text-primary overflow-hidden">
        {/* 🌹 Global Hearts (visible on all pages) */}
        <GlobalHearts />

        <div className="relative z-[5] w-full h-full flex flex-col">
          <main className="flex-1 flex flex-col items-center justify-center">{children}</main>
          <Navbar />
        </div>
      </body>
    </html>
  );
}
