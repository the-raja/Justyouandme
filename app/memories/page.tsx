"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MemoryViewer from '../../components/MemoryViewer'
import memories from '../../data/memories.json'

type Memory = {
  type: 'image' | 'video'
  src: string
  caption: string
}

export default function MemoriesPage() {
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null)
  
  const getNextMemory = useCallback(() => {
    if (!memories || memories.length === 0) return
    
    let nextMemory: Memory | undefined = currentMemory || undefined
    if (memories.length > 1) {
      while (nextMemory === currentMemory) {
        const index = Math.floor(Math.random() * memories.length)
        nextMemory = memories[index] as Memory
      }
    } else {
      nextMemory = memories[0] as Memory
    }
    
    setCurrentMemory(nextMemory)
  }, [currentMemory])

  useEffect(() => {
    getNextMemory()
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-gradient-to-b from-[#38121a] to-primary-bg">
      {/* Soft blur layer */}
      <div className="absolute inset-0 w-full h-full bg-primary-bg/50 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 w-full max-w-narrow" style={{ minHeight: '500px' }}>
        <AnimatePresence>
          {currentMemory && (
            <motion.div
              key={currentMemory.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0">
                <MemoryViewer item={currentMemory} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {memories && memories.length > 1 && (
        <div 
          onClick={getNextMemory}
          className="relative z-10 mt-14 text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 font-serif decoration-accent-red/50 hover:decoration-accent-red cursor-pointer"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.0 }}
          >❤️ View ❤️
          </motion.span>
        </div>
      )}
    </div>
  )
}
