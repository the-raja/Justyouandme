'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AutoFadeText from '../components/FadeText';
import openingLines from '../data/openingLines.json';

export default function Home() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#14070b]"
      style={{
        animation: 'breathe 8s ease-in-out infinite',
      }}
    >
      {/* ───── SOFT LIGHT CEILING / SPOTLIGHT ───── */}
      <div
        className="absolute top-0 left-0 right-0 h-[40vh] pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 0%,
              rgba(255, 220, 220, 0.14),
              rgba(166, 60, 79, 0.09),
              rgba(58, 20, 28, 0.03),
              transparent 72%
            )
          `,
        }}
      />

      {/* ───── AMBIENT PARTICLES ───── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[2]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `rgba(166, 60, 79, ${Math.random() * 0.25 + 0.08})`,
              animation: `shimmer ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* ───── MAIN CONTENT ───── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="relative z-[5] text-center px-6"
      >
        {/* Auto-fading Opening Line */}
        <div className="mb-8">
          <h1
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary leading-relaxed tracking-wide"
            style={{
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}
          >
            <AutoFadeText lines={openingLines} duration={4500} />
          </h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.6 }}
          className="mx-auto h-[1px] bg-gradient-to-r from-transparent via-accent-red to-transparent"
        />

        {/* Welcome Back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 1.5 }}
          className="mt-12"
        >
          <p className="font-serif text-sm md:text-base text-text-secondary/70 tracking-widest uppercase">
            This place is just for us !!
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 2.5 }}
        className="absolute bottom-8 left-0 right-0 text-center z-[5]"
      >
        <p className="text-xs text-text-secondary/40">{/* scroll or navigate above */}</p>
      </motion.div>
    </div>
  );
}
