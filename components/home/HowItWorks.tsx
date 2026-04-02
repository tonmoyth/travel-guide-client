"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Search,
  BookmarkPlus,
  MapPin,
  Share2,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

interface Step {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  delay: number
}

const steps: Step[] = [
  {
    id: 1,
    title: "Browse Guides",
    description:
      "Explore thousands of travel guides created by experienced travelers and locals from around the world.",
    icon: <Search className="h-8 w-8" />,
    delay: 0,
  },
  {
    id: 2,
    title: "Save Your Favorites",
    description:
      "Bookmark guides to your collection for easy access whenever you plan your next adventure.",
    icon: <BookmarkPlus className="h-8 w-8" />,
    delay: 100,
  },
  {
    id: 3,
    title: "Plan Your Trip",
    description:
      "Use detailed itineraries, local tips, and hidden gems to craft the perfect travel experience.",
    icon: <MapPin className="h-8 w-8" />,
    delay: 200,
  },
  {
    id: 4,
    title: "Share & Connect",
    description:
      "Vote on helpful guides, leave comments, and connect with fellow travelers in our community.",
    icon: <Share2 className="h-8 w-8" />,
    delay: 300,
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Start planning your perfect trip in just four simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`transition-all duration-500 ease-out`}
              style={{
                animation: `slideUp 0.6s ease-out ${step.delay}ms forwards`,
                opacity: 0,
              }}
            >
              <Card className="relative h-full border-blue-100 transition-shadow duration-300 hover:shadow-lg">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg">
                  {step.id}
                </div>

                {/* Connect Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 -right-6 hidden h-1 w-6 bg-gradient-to-r from-blue-400 to-transparent lg:block"></div>
                )}

                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-center text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-center text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg md:p-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Left Content */}
            <div>
              <h3 className="mb-4 text-3xl font-bold text-gray-900">
                Ready to Start Exploring?
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                Join thousands of travelers discovering authentic experiences
                and hidden gems around the world. Whether you're planning a
                weekend getaway or a round-the-world adventure, our community
                guides have you covered.
              </p>

              {/* Features List */}
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">
                    Access thousands of guides
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">
                    Create and share your own guides
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">
                    Connect with fellow travelers
                  </span>
                </li>
              </ul>

              {/* Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/travel-guides">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
                    Explore Guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 sm:w-auto"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative">
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="text-center">
                  <div className="mb-2 text-6xl font-bold text-blue-600">
                    12K+
                  </div>
                  <p className="mb-4 font-semibold text-gray-700">
                    Active Travelers
                  </p>

                  <div className="inline-block space-y-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      <span className="text-gray-700">
                        <strong>5000+</strong> Travel Guides
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                      <span className="text-gray-700">
                        <strong>150+</strong> Destinations
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                      <span className="text-gray-700">
                        <strong>24/7</strong> Community Support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
