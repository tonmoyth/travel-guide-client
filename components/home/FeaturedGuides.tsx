"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import travelGuideServices from "@/services/travelGuide/travelGuide.service"

interface GuideCard {
  id: string
  title: string
  category: string
  description: string
  image: string
  rating: number
  author: string
  location: string
}

export default function FeaturedGuides() {
  const [guides, setGuides] = useState<GuideCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopVotedGuides = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await travelGuideServices.getTopVotedGuides()

        if (response.success && response.data) {
          // Transform API data to component format
          const transformedGuides: GuideCard[] = response.data
            .slice(0, 3)
            .map((guide) => {
              // Calculate rating from votes
              const upVotes =
                guide.votes?.filter((vote) => vote.voteType === "UP").length ||
                0
              const downVotes =
                guide.votes?.filter((vote) => vote.voteType === "DOWN")
                  .length || 0
              const totalVotes = upVotes + downVotes
              const rating = totalVotes > 0 ? (upVotes / totalVotes) * 5 : 0

              const imageUrl =
                guide.coverImage ||
                guide.guideMedia?.[0]?.url ||
                "/assts/hero/hero.jpg"

              return {
                id: guide.id,
                title: guide.title,
                category: guide.category.title,
                description: guide.description,
                image: imageUrl,
                rating: Math.round(rating * 10) / 10, // Round to 1 decimal place
                author: "Anonymous", // API doesn't provide author name for privacy
                location: guide.category.title, // Using category as location for now
              }
            })

          setGuides(transformedGuides)
        } else {
          setError(response.message || "Failed to load guides")
        }
      } catch (err) {
        console.error("Error fetching top voted guides:", err)
        setError("Failed to load featured guides")
      } finally {
        setLoading(false)
      }
    }

    fetchTopVotedGuides()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Travel Guides
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Handpicked guides from our community of expert travelers
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Travel Guides
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Handpicked guides from our community of expert travelers
            </p>
          </div>
          <div className="mt-12 text-center">
            <p className="text-red-600">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (guides.length === 0) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Travel Guides
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Handpicked guides from our community of expert travelers
            </p>
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              No featured guides available at the moment.
            </p>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Travel Guides
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Handpicked guides from our community of expert travelers
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Card
              key={guide.id}
              className="overflow-hidden transition hover:shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-900"
                  >
                    {guide.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {guide.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {guide.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{guide.rating}</span>
                  </div>
                </div>

                <p className="mt-3 line-clamp-3 text-gray-600">
                  {guide.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  {/* <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    by {guide.}
                  </div> */}
                  <Link href={`/travel-guides/${guide.id}`}>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/travel-guides">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Explore All Guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
