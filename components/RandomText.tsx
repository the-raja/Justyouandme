'use client';

import React, { useState, useEffect } from 'react';

export default function RandomText({ lines }: { lines: string[] }) {
  const [line, setLine] = useState<string>('');

  useEffect(() => {
    if (lines && lines.length > 0) {
      const index = Math.floor(Math.random() * lines.length);
      setLine(lines[index]);
    }
  }, [lines]);

  if (!line) return null;

  return <>{line}</>;
}
