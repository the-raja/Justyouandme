"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type MemoryItem = {
  type: 'image' | 'video'
  src: string
  caption: string
}

export default function MemoryViewer({ item }: { item: MemoryItem }) {
  const [isCaptionVisible, setCaptionVisible] = useState(false)

  useEffect(() => {
    setCaptionVisible(false)
    const timer = setTimeout(() => setCaptionVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [item])

  if (!item) return null

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="relative w-full max-w-[270px] max-h-[480px] aspect-[9/16] bg-secondary-bg/20 rounded-lg overflow-hidden shadow-2xl ring-1 ring-black/10">
        {item.type === 'video' ? (
          <video
            key={item.src}
            src={item.src}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            key={item.src}
            src={item.src}
            alt={item.caption}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isCaptionVisible ? 1 : 0, y: isCaptionVisible ? 0 : 10 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <div className="mt-6 text-center">
          <p className="font-serif text-text-secondary italic">{item.caption}</p>
        </div>
      </motion.div>
    </div>
  )
}
