'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import letters from '../../data/letters.json';

type Letter = {
  title?: string;
  body: string;
  date?: string;
};

export default function LettersPage() {
  const [currentLetter, setCurrentLetter] = useState<Letter | null>(null);
  const [key, setKey] = useState(0);

  const getNextLetter = useCallback(() => {
    if (!letters || letters.length === 0) return;

    let nextLetter = currentLetter;
    if (letters.length > 1) {
      while (nextLetter === currentLetter) {
        const index = Math.floor(Math.random() * letters.length);
        nextLetter = letters[index];
      }
    } else {
      nextLetter = letters[0];
    }

    setCurrentLetter(nextLetter);
    setKey((prevKey) => prevKey + 1);
  }, [currentLetter]);

  useEffect(() => {
    getNextLetter();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-bg to-[#6b3844] p-4">
      <div className="absolute inset-0 w-full h-full bg-primary-bg/30 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 w-full max-w-narrow">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <div className="w-full">
              {currentLetter ? (
                <article>
                  {currentLetter.title && (
                    <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-8">
                      {currentLetter.title}
                    </h2>
                  )}
                  <div className="text-text-primary/80 text-base md:text-lg leading-relaxed whitespace-pre-wrap selection:bg-accent-red/30">
                    {currentLetter.body}
                  </div>
                  {currentLetter.date && (
                    <div className="text-sm text-text-secondary/70 mt-10 font-serif italic">
                      {currentLetter.date}
                    </div>
                  )}
                </article>
              ) : (
                <div className="text-center text-text-secondary">No letters yet.</div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {letters && letters.length > 1 && (
          <div
            onClick={getNextLetter}
            className="mt-12 text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 font-serif underline decoration-accent-red/50 hover:decoration-accent-red cursor-pointer"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.0 }}
            >
              Read another
            </motion.span>
          </div>
        )}
      </div>
    </div>
  );
}
