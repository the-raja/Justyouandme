'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioController from '../../components/AudioController';
import shayari from '../../data/shayari.json';

// --- USER CONFIGURATION ---
const audio = {
  src: '/audio/comfort.mp3',
  play: false,
};
// --------------------------

export default function MissMePage() {
  const [isRevealed, setRevealed] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  const lines = useMemo(() => {
    if (!shayari || shayari.length === 0) return ["I'm here."];
    const index = Math.floor(Math.random() * shayari.length);
    return shayari[index];
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    setPlayAudio(true);
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-center items-center text-center p-4 bg-gradient-to-br from-secondary-bg via-primary-bg to-[#6b3844]">
      <AudioController src={audio.src} play={playAudio} />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <button
            key="button"
            onClick={handleReveal}
            className="bg-accent-red hover:bg-accent-red/80 transition-all duration-300 ease-in-out px-10 py-4 rounded-full shadow-2xl text-text-primary font-serif text-lg hover:shadow-[0_0_25px_5px_rgba(166,60,79,0.3)]"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              For when you miss me
            </motion.span>
          </button>
        ) : (
          <div key="lines" className="flex flex-col items-center justify-center space-y-6">
            <motion.div initial="hidden" animate="visible">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 1.6,
                    ease: 'easeOut',
                    delay: i * 2.0 + 0.8,
                  }}
                >
                  <p className="font-serif text-xl md:text-2xl text-text-primary/90 leading-relaxed">
                    {line}
                  </p>
                </motion.div>
              ))}

              {/* FINAL LINE — ALWAYS LAST */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.8,
                  ease: 'easeOut',
                  delay: lines.length * 2.0 + 1.2,
                }}
              >
                <p className="font-serif text-2xl md:text-3xl text-accent-red mt-6 tracking-wide">
                  I miss you more baby.
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
