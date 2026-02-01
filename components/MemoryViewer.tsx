'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type MemoryItem = {
  type: 'image' | 'video';
  src: string;
  caption: string;
};

export default function MemoryViewer({ item }: { item: MemoryItem }) {
  const [isCaptionVisible, setCaptionVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setCaptionVisible(false);
    setIsPlaying(false);

    const timer = setTimeout(() => setCaptionVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [item]);

  if (!item) return null;

  const handlePlay = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Playback failed:', err);
    }
  };

  const handlePause = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="relative w-full max-w-[270px] max-h-[480px] aspect-[9/16] bg-secondary-bg/20 rounded-lg overflow-hidden shadow-2xl ring-1 ring-black/10">

        {item.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={item.src}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* ▶ PLAY BUTTON OVERLAY */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg
                      viewBox="0 0 24 24"
                      fill="black"
                      className="w-8 h-8 ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

            {/* TAP TO PAUSE */}
            {isPlaying && (
              <button
                onClick={handlePause}
                className="absolute inset-0"
              />
            )}
          </>
        ) : (
          <Image
            src={item.src}
            alt={item.caption}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* CAPTION */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isCaptionVisible ? 1 : 0,
          y: isCaptionVisible ? 0 : 10,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <div className="mt-6 text-center">
          <p className="font-serif text-text-secondary italic">
            {item.caption}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
