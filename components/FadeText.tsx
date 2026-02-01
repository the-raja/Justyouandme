"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface FadeTextProps {
  lines: string[]
  duration?: number
}

export default function FadeText({
  lines,
  duration = 4500,
}: FadeTextProps) {
  const [mounted, setMounted] = useState(false)

  // pick random index ONLY on client
  const startIndexRef = useRef<number | null>(null)

  const [index, setIndex] = useState(0)

  useEffect(() => {
    setMounted(true)

    startIndexRef.current = Math.floor(Math.random() * lines.length)
    setIndex(startIndexRef.current)

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length)
    }, duration)

    return () => clearInterval(interval)
  }, [lines.length, duration])

  // 🚫 render nothing on server
  if (!mounted) return null

  return (
    <div className="relative w-full flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="max-w-[900px] text-center leading-snug"
        >
          {lines[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
