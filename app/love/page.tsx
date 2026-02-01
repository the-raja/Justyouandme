"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// ─── SECRET MESSAGES ───
const secretMessages = [
  `You found it.

In all the noise of the world,
this is our quiet.

This space, this feeling,
this very moment...

…is only for you.`,

  `You came here again.

That means something,
even if neither of us says it out loud.

This place remembers
what the world forgets.

It remembers you.`,

  `If you’re reading this,
then you needed a pause.

So stay.
Just for a moment.

Nothing else exists here
but you and me.`
]

// ─── MUSIC FILES (from /public/audio) ───
const songs = [
  "/audio/song1.mp3",
  "/audio/song1.mp3",
  "/audio/song1.mp3",
  "/audio/song1.mp3",
]

export default function OnlyYouPage() {
  const [pos, setPos] = useState({ x: -400, y: -400 })
  const [message, setMessage] = useState("")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Random message on load
  useEffect(() => {
    const random =
      secretMessages[Math.floor(Math.random() * secretMessages.length)]
    setMessage(random)
  }, [])

  // Random music autoplay
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.35
    audio.loop = true

    const playAudio = () => {
      audio.play().catch(() => {
        // browser blocked autoplay — wait for interaction
      })
    }

    playAudio()

    // Try again on first interaction if blocked
    const resume = () => {
      audio.play().catch(() => {})
      window.removeEventListener("click", resume)
      window.removeEventListener("touchstart", resume)
    }

    window.addEventListener("click", resume)
    window.addEventListener("touchstart", resume)

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  // Mouse + touch tracking
  useEffect(() => {
    const move = (x: number, y: number) => setPos({ x, y })
    const mouse = (e: MouseEvent) => move(e.clientX, e.clientY)
    const touch = (e: TouchEvent) => {
      if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY)
    }

    window.addEventListener("mousemove", mouse)
    window.addEventListener("touchmove", touch)

    return () => {
      window.removeEventListener("mousemove", mouse)
      window.removeEventListener("touchmove", touch)
    }
  }, [])

  // Pick random song
  const randomSong = songs[Math.floor(Math.random() * songs.length)]

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1a0a0e] via-[#2a0f16] to-[#0e0608] text-[#f5eaea]">

      {/* 🎵 Hidden Audio */}
      <audio ref={audioRef} src={randomSong} preload="auto" />

      {/* ❤️ Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 border border-rose-400/20 rounded-[50%_50%_0_0] rotate-45 blur-[1.5px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [-20, -600], opacity: [0, 0.03, 0] }}
            transition={{
              duration: 40 + Math.random() * 30,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 🌫 Grain */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
        }}
      />

      {/* 🕯 Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_100%)]" />

      {/* 🔦 Cursor Light */}
      <div
        className="absolute inset-0 z-30"
        style={{
          maskImage: `radial-gradient(320px at ${pos.x}px ${pos.y}px, white, transparent)`,
          WebkitMaskImage: `radial-gradient(320px at ${pos.x}px ${pos.y}px, white, transparent)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-t from-[#3a141c] to-rose-400/10" />
      </div>

      {/* 🖤 Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2 }}
        className="relative z-40 max-w-[380px] px-6 text-center font-serif text-[1.35rem] leading-[1.9] text-[#f5eaea]/80"
        style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
      >
        {message.split("\n").map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.6 }}
            className={line.trim() === "" ? "h-5" : ""}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </div>
  )
}
