"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { subscribeNewsletterAction } from "@/actions/newsletter/newsletter.action"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check localStorage on component mount
  useEffect(() => {
    const subscribedEmail = localStorage.getItem("subscribedEmail")
    if (subscribedEmail) {
      setIsSubscribed(true)
      setEmail(subscribedEmail)
    }
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const result = await subscribeNewsletterAction(email)

      if (result.success) {
        localStorage.setItem("subscribedEmail", email)
        setIsSubscribed(true)
        setEmail("")
        toast.success(
          result.message || "Successfully subscribed to our newsletter!"
        )
      } else {
        toast.error(result.message || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="px-8 py-32">
      <div className="relative flex flex-col items-center justify-between gap-16 overflow-hidden rounded-[2.5rem] bg-primary p-12 md:flex-row md:p-24 mx-auto max-w-7xl">
        {/* Visual Background Elements */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-10">
          <span
            className="absolute -top-20 -right-20 material-symbols-outlined text-[30rem]"
            data-icon="mail"
          >
            mail
          </span>
        </div>

        <div className="relative z-10 max-w-xl space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tighter text-white md:text-6xl">
            Stay Curated.
          </h2>
          <p className="text-lg text-white text-primary-fixed">
            Join 50,000+ discerning travelers who receive our weekly "Hidden
            Finds" digest directly to their inbox.
          </p>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {isSubscribed ? (
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md text-center">
              <h3 className="text-2xl font-bold text-white">You're all set!</h3>
              <p className="mt-2 text-primary-fixed/80">
                Thank you for subscribing. Check your email for inspiration.
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubscribe}>
              <div className="flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md sm:flex-row">
                <input
                  className="flex-1 bg-transparent px-6 py-4 text-white placeholder:text-white/50 focus:ring-0 focus:outline-none"
                  placeholder="Enter your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-secondary-container px-8 py-4 font-bold text-on-secondary-container transition-all hover:bg-white hover:text-primary disabled:opacity-50"
                >
                  {isLoading ? "..." : "Subscribe"}
                </button>
              </div>
              <p className="px-4 text-center text-white text-[10px] uppercase tracking-[0.2em] text-primary-fixed/60 md:text-left">
                No spam. Only inspiration. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
