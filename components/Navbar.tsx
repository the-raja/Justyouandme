'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'You' },
  { href: '/letters', label: 'Words' },
  { href: '/memories', label: 'Moments' },
  { href: '/us', label: 'Us' },
  { href: '/miss-me', label: 'Here' },
];

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === '/only-you') {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
      className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50"
    >
      <div className="pointer-events-auto bg-primary-bg/70 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg ring-1 ring-black ring-opacity-10">
        <ul className="flex items-center gap-x-6 text-sm text-text-secondary">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative transition-colors duration-300 ${
                  pathname === item.href
                    ? 'text-text-primary font-medium'
                    : 'hover:text-text-primary'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-accent-red"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
