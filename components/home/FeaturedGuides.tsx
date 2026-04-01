"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  Users,
  Loader2,
  Heart,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GuideCard {
  id: string
  title: string
  category: string
  description: string
  image: string
  author: string
  location: string
  votes: number
  commentsCount: number
}

interface FeaturedGuidesProps {
  guides: any[] // Raw API data
}

export default function FeaturedGuides({ guides }: FeaturedGuidesProps) {
  // Transform API data to component format
  const transformedGuides: GuideCard[] = guides.map((guide) => {
    const totalVotes = Array.isArray(guide.votes)
      ? guide.votes.length
      : typeof guide.votes === "number"
        ? guide.votes
        : Number(guide.votes) || 0

    const commentsCount =
      guide.comments?.filter((comment: any) => comment && !comment.isDeleted)
        .length ?? 0

    const imageUrl =
      guide.coverImage || guide.guideMedia?.[0]?.url || "/assts/hero/hero.jpg"

    return {
      id: guide.id,
      title: guide.title,
      category: guide.category.title,
      description: guide.description,
      image: imageUrl,
      author: "Anonymous", // API doesn't provide author name for privacy
      location: guide.category.title, // Using category as location for now
      votes: totalVotes,
      commentsCount: commentsCount,
    }
  })

  if (transformedGuides.length === 0) {
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

  console.log("Rendering FeaturedGuides with guides:", transformedGuides)
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
          {transformedGuides.map((guide) => (
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
                      {/* <MapPin className="h-4 w-4" /> */}
                      <p> {guide.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>

                <p className="mt-3 line-clamp-3 text-gray-600">
                  {guide.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span
                        className="text-xs font-semibold text-gray-800"
                        title="Likes"
                      >
                        {guide.votes}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span
                        className="text-xs font-semibold text-gray-800"
                        title="Comments"
                      >
                        {guide.commentsCount}
                      </span>
                    </div>
                  </div>
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
