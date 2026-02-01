'use client';
import React, { useEffect, useRef } from 'react';

export default function AudioController({ src, play }: { src?: string; play?: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (play) {
      ref.current.volume = 0;
      ref.current.play().catch(() => {});
      let v = 0;
      const id = setInterval(() => {
        v = Math.min(0.6, v + 0.05);
        if (ref.current) ref.current.volume = v;
        if (v >= 0.6) clearInterval(id);
      }, 200);
      return () => clearInterval(id);
    } else {
      ref.current.pause();
    }
  }, [play]);
  if (!src) return null;
  return <audio ref={ref} src={src} loop />;
}
