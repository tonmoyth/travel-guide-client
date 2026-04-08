"use client"

import Link from "next/link"
import Image from "next/image"

interface GuideCard {
  id: string
  title: string
  category: string
  description: string
  image: string
  location: string
  votes: number
  commentsCount: number
}

interface TopRatedExplorationsProps {
  guides: any[] // Raw API data
}

export default function TopRatedExplorations({
  guides,
}: TopRatedExplorationsProps) {

  // Transform API data
  const transformedGuides: GuideCard[] = (guides.length > 0 ? guides : [
    {
      id: "maldives",
      title: "Maldives: Azure Dreams",
      category: "Luxury",
      description: "Escape to an overwater paradise with private atolls and hidden sandbars.",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1000",
      location: "Maldives",
      votes: 150,
      commentsCount: 22
    },
    {
      id: "kyoto",
      title: "Kyoto's Hidden Temples",
      category: "Culture",
      description: "Discover moss gardens and teahouses tucked away in bamboo groves.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
      location: "Japan",
      votes: 135,
      commentsCount: 18
    },
    {
      id: "dolomites-2",
      title: "Alpine Peaks & Pines",
      category: "Adventure",
      description: "Traverse dramatic landscapes from luxury rifugios to secret alpine lakes.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
      location: "Italy",
      votes: 142,
      commentsCount: 25
    }
  ]).map((guide) => {
    const imageUrl =
      guide.image ||
      guide.coverImage ||
      guide.guideMedia?.[0]?.url ||
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1000"

    return {
      id: guide.id,
      title: guide.title,
      category: guide.category?.title || guide.category || "Travel",
      description: guide.description,
      image: imageUrl,
      location: guide.category?.title || guide.location || "Location",
      votes: guide.votes?.length || guide.votes || 0,
      commentsCount: guide.comments?.length || guide.commentsCount || 0,
    }
  })

  // Take the relevant slice for explorations (if using API guides, skip featured ones)
  const explorers = guides.length > 4 ? transformedGuides.slice(4, 7) : transformedGuides.slice(0, 3)

  return (
    <section className="bg-white px-8 py-32 dark:bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Crowd Favorites
          </span>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tighter text-teal-900 md:text-5xl dark:text-teal-50">
            Top-Rated Explorations
          </h2>
          <p className="max-w-2xl text-lg text-on-surface-variant dark:text-on-surface-variant">
            Discover the journeys that left our travelers breathless. Vetted by
            our community, loved by everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 ">
          {explorers.map((guide) => (
            <div
              key={guide.id}
              className="group overflow-hidden rounded-2xl border border-surface-container bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-surface-container-highest dark:border-white/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* <div className="absolute top-4 right-4 flex items-center space-x-1 rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-md dark:bg-black/60 dark:text-white">
                  <span
                    className="material-symbols-outlined text-sm text-amber-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-xs font-bold">
                    {Math.min(5.0, 4.2 + (guide.votes % 10) / 10).toFixed(1)}
                  </span>
                </div> */}
              </div>
              <div className="space-y-4 p-8">
                <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-50">
                  {guide.title}
                </h3>
                <p className="line-clamp-2 text-sm text-on-surface-variant dark:text-white/70">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <Link
                    href={`/travel-guides/${guide.id}`}
                    className="group/btn flex items-center space-x-1 text-sm font-bold text-primary"
                  >
                    <span>View Guide</span>
                    <span
                      className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-1"
                      data-icon="chevron_right"
                    >
                      chevron_right
                    </span>
                  </Link>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline dark:text-white/40">
                    {guide.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
