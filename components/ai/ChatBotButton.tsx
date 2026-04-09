"use client"

import { useState } from "react"
import { Bot, X } from "lucide-react"
import ChatBox from "./ChatBox"

export default function ChatBotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}

      {/* Tooltip + FAB wrapper */}
      <div className="relative group">
        {/* Tooltip */}
        {!isOpen && (
          <span
            className="
              pointer-events-none
              absolute bottom-full right-0 mb-2
              whitespace-nowrap rounded-lg
              bg-inverse-surface
              px-3 py-1.5 text-xs font-medium
              text-inverse-on-surface
              opacity-0 group-hover:opacity-100
              translate-y-1 group-hover:translate-y-0
              transition-all duration-200
              shadow-lg
            "
          >
            Ask anything
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-inverse-surface" />
          </span>
        )}

        {/* Pulse rings (only when closed) */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-secondary opacity-20 animate-ping [animation-delay:0.4s]" />
          </>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
          className="
            relative
            flex h-14 w-14 items-center justify-center
            rounded-full
            bg-primary
            text-on-primary
            shadow-lg
            hover:bg-primary-container
            hover:shadow-xl
            hover:scale-110 active:scale-95
            transition-all duration-300
            focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
          "
        >
          <span
            className={`
              absolute inset-0 flex items-center justify-center
              transition-all duration-300
              ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}
            `}
          >
            <X className="h-6 w-6" />
          </span>
          <span
            className={`
              absolute inset-0 flex items-center justify-center
              transition-all duration-300
              ${isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
            `}
          >
            <Bot className="h-6 w-6" />
          </span>
        </button>
      </div>
    </div>
  )
}
