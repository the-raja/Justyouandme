'use client';

import React from 'react';
import Image from 'next/image';
import FadeText from '../../components/FadeText';
import AudioController from '../../components/AudioController';

// ─── USER CONFIGURATION ───
const backgroundMedia = {
  src: '/images/placeholder-1.svg',
  alt: 'A soft, abstract background representing our shared space.',
};

const audio = {
  src: '/audio/placeholder.mp3',
  play: false,
};

const usLines = [
  'This place is ours — quietly present, always.',
  'Nothing else is needed here.',
  'You are Mine and I am Yours,',
  'In this space, just you and me.',
];
// ─────────────────────────

export default function UsPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#14070b] text-[#f5eaea]">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a141c] via-[#2a0f16] to-[#14070b]" />

      {/* Soft Light Ceiling */}
      <div
        className="absolute top-0 left-0 right-0 h-[40vh] pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 0%,
              rgba(255, 220, 220, 0.12),
              rgba(166, 60, 79, 0.08),
              rgba(58, 20, 28, 0.03),
              transparent 72%
            )
          `,
        }}
      />

      {/* Background Media */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Image
          src={backgroundMedia.src}
          alt={backgroundMedia.alt}
          fill
          className="object-cover opacity-[0.04]"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.6)_100%)]" />

      {/* Audio */}
      <AudioController src={audio.src} play={audio.play} />

      {/* Content */}
      <div className="relative z-[5] flex items-center justify-center h-full px-6 text-center translate-y-[6vh]">
        <div className="font-serif text-2xl md:text-3xl leading-relaxed tracking-wide max-w-[720px] mx-auto text-[#f5eaea]/90">
          <FadeText lines={usLines} duration={5000} />
        </div>
      </div>
    </div>
  );
}
