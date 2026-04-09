"use client"

import { useEffect, useRef, useState } from "react"
import { X, Send, Bot, User, Loader2, Sparkles } from "lucide-react"
import { sendMessageToAIAction } from "@/actions/ai/sendMessage"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatBoxProps {
  onClose: () => void
}

export default function ChatBox({ onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your **AI Travel Assistant**. Ask me anything about destinations, travel tips, itineraries, or anything travel-related!",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: Message = { role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const result = await sendMessageToAIAction(trimmed)

      if (!result.success || !result.reply) {
        toast.error(result.message || "Failed to get AI response")
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't process your request. Please try again.",
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: result.reply as string },
        ])
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! An error occurred. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="
        flex flex-col
        w-[calc(100vw-2rem)] sm:w-[370px] h-[560px] max-h-[75vh] sm:max-h-[80vh]
        rounded-2xl overflow-hidden
        shadow-2xl
        border border-outline/20
        bg-surface/95
        backdrop-blur-xl
        animate-in slide-in-from-bottom-4 fade-in duration-300
      "
    >
      {/* ── Header ── */}
      <div
        className="
          flex items-center justify-between gap-3
          px-4 py-3
          bg-primary
          shrink-0
        "
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-on-primary/10 shrink-0">
            <Sparkles className="h-4 w-4 text-on-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-on-primary leading-tight">
              AI Travel Assistant
            </p>
            <span className="flex items-center gap-1 text-[10px] text-on-primary/70">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary-container inline-block animate-pulse" />
              Online
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close chat"
          className="
            flex h-7 w-7 items-center justify-center rounded-full
            text-on-primary/70 hover:text-on-primary
            hover:bg-on-primary/10
            transition-colors shrink-0
          "
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth bg-surface">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`
                flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                ${msg.role === "user"
                  ? "bg-primary"
                  : "bg-secondary-container"
                }
              `}
            >
              {msg.role === "user" ? (
                <User className="h-3.5 w-3.5 text-on-primary" />
              ) : (
                <Bot className="h-3.5 w-3.5 text-on-secondary-container" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`
                max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed
                ${msg.role === "user"
                  ? "bg-primary text-on-primary rounded-br-sm"
                  : "bg-surface-container text-on-surface rounded-bl-sm"
                }
              `}
            >
              {msg.role === "assistant" ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="my-0.5 leading-relaxed">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-primary">
                        {children}
                      </strong>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mt-2 mb-1 text-sm font-bold text-on-surface">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mt-1.5 mb-0.5 text-xs font-bold text-on-surface">
                        {children}
                      </h3>
                    ),
                    ul: ({ children }) => (
                      <ul className="my-1 ml-3 list-disc space-y-0.5">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="my-1 ml-3 list-decimal space-y-0.5">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-xs leading-relaxed">{children}</li>
                    ),
                    hr: () => (
                      <hr className="my-2 border-outline-variant" />
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-1">
                        <table className="text-xs w-full border-collapse">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-outline-variant px-2 py-1 bg-surface-container-high font-semibold text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-outline-variant px-2 py-1">
                        {children}
                      </td>
                    ),
                    code: ({ children }) => (
                      <code className="rounded bg-surface-container-highest px-1 py-0.5 text-[11px] font-mono text-on-surface">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <span>{msg.content}</span>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-end gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-container">
              <Bot className="h-3.5 w-3.5 text-on-secondary-container" />
            </div>
            <div className="rounded-2xl rounded-bl-sm bg-surface-container px-4 py-3">
              <div className="flex items-center gap-1">
                <span
                  className="h-2 w-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-secondary animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-tertiary animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div className="shrink-0 border-t border-outline/20 px-3 py-2.5 bg-surface-container-low backdrop-blur-sm">
        <div className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-1.5 transition-shadow focus-within:ring-2 focus-within:ring-primary/40">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask me anything…"
            className="
              flex-1 bg-transparent text-sm text-on-surface
              placeholder:text-on-surface-variant
              outline-none disabled:opacity-50
            "
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="
              flex h-7 w-7 items-center justify-center rounded-lg
              bg-primary text-on-primary
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-primary-container hover:text-on-primary-container
              active:scale-95
              transition-all
            "
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        <p className="mt-1 text-center text-[10px] text-on-surface-variant">
          Powered by AI · Press Enter to send
        </p>
      </div>
    </div>
  )
}
