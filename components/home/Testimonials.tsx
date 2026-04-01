"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

interface TestimonialCard {
  id: string
  title: string
  author: string
  rating: number
  votes: number
  excerpt: string
  category: string
}

const topGuides: TestimonialCard[] = [
  {
    id: "1",
    title: "Ultimate Tokyo Experience",
    author: "Sarah Chen",
    rating: 4.9,
    votes: 1247,
    excerpt:
      "This guide completely transformed my trip to Tokyo. Every recommendation was spot-on, from the hidden ramen shops to the best viewpoints.",
    category: "City Exploration",
  },
  {
    id: "2",
    title: "Bali Spiritual Journey",
    author: "Marcus Rodriguez",
    rating: 4.8,
    votes: 892,
    excerpt:
      "Found the perfect balance of adventure and relaxation. The temple recommendations and yoga retreat suggestions were incredible.",
    category: "Cultural Experiences",
  },
  {
    id: "3",
    title: "Paris Food Lover's Paradise",
    author: "Emma Thompson",
    rating: 4.7,
    votes: 756,
    excerpt:
      "Discovered amazing local bistros and patisseries I never would have found on my own. The wine pairings were exceptional.",
    category: "Food & Cuisine",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Traveler Favorites
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Most loved guides by our community
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {topGuides.map((guide, index) => (
            <Card key={guide.id} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    #{index + 1}
                  </Badge>
                </div>

                <Quote className="h-8 w-8 text-blue-600" />

                <p className="mt-4 text-gray-700 italic">"{guide.excerpt}"</p>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {guide.title}
                      </h4>
                      <p className="text-sm text-gray-600">by {guide.author}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {guide.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {guide.votes} votes
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {guide.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
