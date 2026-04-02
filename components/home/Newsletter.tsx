"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"
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
    <section className="bg-gradient-to-r from-[#5B2EFF]/8 to-[#8A63D2]/8 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="bg-white">
          <CardContent className="p-8 text-center">
            <Mail className="mx-auto h-12 w-12 text-[#1989A3]" />

            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Stay Updated with TravelGuide
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Get the latest travel guides, top-voted destinations, and
              exclusive tips delivered to your inbox. Join thousands of
              travelers who trust our community insights.
            </p>

            {isSubscribed ? (
              <div className="mt-8 flex flex-col items-center gap-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    You're all set!
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Thank you for subscribing. Check your email for
                    confirmation.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-8">
                <div className="mx-auto max-w-md">
                  <div className="flex gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </div>
              </form>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <p>
                We respect your privacy. Unsubscribe at any time.
                <br />
                By subscribing, you agree to our{" "}
                <a
                  href="/privacy-policy"
                  className="text-[#1989A3] hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms-of-service"
                  className="text-[#1989A3] hover:underline"
                >
                  Terms of Service
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
