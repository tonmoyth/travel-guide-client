"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"


export default function Hero() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(
        `/travel-guides?searchTerm=${encodeURIComponent(searchTerm.trim())}`
      )
    } else {
      router.push("/travel-guides")
    }
  }

  return (
    <section className="relative flex min-h-[1000px] items-center justify-center overflow-hidden px-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.png"
          alt="Travel Adventure Background"
          className="h-full w-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 
  bg-linear-to-b from-teal-950/40 via-transparent to-background
  dark:from-black/10 dark:via-black/20 dark:to-gray-900/80">
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl space-y-12 text-center">
        <div className="space-y-6">
          {/* <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block rounded-sm bg-secondary-container px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest text-on-secondary-container"
          >
            Premium Curations
          </motion.span> */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="select-none text-5xl font-extrabold tracking-tighter text-white drop-shadow-2xl leading-[0.9] md:text-8xl"
          >
            Unlock Your <br />
            Next <span className="text-secondary-container">Adventure</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl select-none font-body text-lg font-medium text-white/90 drop-shadow-md md:text-xl"
          >
            Step beyond the typical itinerary. Experience bespoke travel guides
            designed by editors who live for the extraordinary.
          </motion.p>
        </div>

        {/* Search Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-panel mx-auto flex max-w-2xl items-center rounded-full p-2 shadow-2xl"
        >
          <div className="flex flex-1 items-center space-x-2 md:space-x-3 px-3 md:px-6">
            <span
              className="material-symbols-outlined text-primary text-lg md:text-xl"
              data-icon="search"
            >
              search
            </span>

            <input
              className="w-full border-none bg-transparent 
    p-1.5 md:p-2 lg:p-4 
    text-sm md:text-base lg:text-lg 
    text-on-surface placeholder:text-outline 
    focus:ring-0"
              placeholder="Where do you want to explore?"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="flex items-center space-x-2 rounded-full bg-primary py-2 px-4 md:py-2 md:px-6 lg:py-4 lg:px-8 font-bold text-on-primary transition-all hover:bg-primary-container active:scale-95"
          >
            <span>Search</span>
            <span
              className="material-symbols-outlined"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
