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

interface FeaturedGuidesProps {
  guides: any[] // Raw API data
}

export default function FeaturedGuides({ guides }: FeaturedGuidesProps) {
  // Transform API data to component format
  const transformedGuides: GuideCard[] = (guides.length > 0 ? guides : [
    {
      id: "bali",
      title: "The Bali Chronicles",
      category: "Indonesia",
      description: "Lush tropical villa pool overlooking a misty jungle valley.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000",
      location: "Bali",
      votes: 120,
      commentsCount: 15
    },
    {
      id: "dolomites",
      title: "Dolomites: Peak Serenity",
      category: "Italy",
      description: "Snow-capped peaks reflecting in a crystal clear alpine lake.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1000",
      location: "Italy",
      votes: 95,
      commentsCount: 8
    },
    {
      id: "rajasthan",
      title: "The Kings of Rajasthan",
      category: "India",
      description: "Intricate architecture of an ancient Indian temple complex.",
      image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&q=80&w=1000",
      location: "India",
      votes: 88,
      commentsCount: 12
    },
    {
      id: "phuket",
      title: "Hidden Bays of Phuket",
      category: "Thailand",
      description: "Traditional wooden longtail boat floating on turquoise water.",
      image: "https://i.ibb.co.com/Dg7yjbBv/0502-0403-phuket-xlarge.webp",
      location: "Thailand",
      votes: 75,
      commentsCount: 5
    }
  ]).map((guide) => {
    const totalVotes = Array.isArray(guide.votes)
      ? guide.votes.length
      : typeof guide.votes === "number"
        ? guide.votes
        : Number(guide.votes) || 0

    const commentsCount =
      guide.comments?.filter((comment: any) => comment && !comment.isDeleted)
        .length ?? (guide.commentsCount || 0)

    const imageUrl =
      guide.image ||
      guide.coverImage ||
      guide.guideMedia?.[0]?.url ||
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000"

    return {
      id: guide.id,
      title: guide.title,
      category: guide.category?.title || guide.category || "Travel",
      description: guide.description,
      image: imageUrl,
      location: guide.category?.title || guide.location || "Location",
      votes: totalVotes,
      commentsCount: commentsCount,
    }
  })

  // Take first 4 for the asymmetric grid
  const featured = transformedGuides.slice(0, 4)

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
      <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
        <div className="max-w-xl space-y-4">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tighter text-teal-900 lg:text-6xl dark:text-teal-50">
            Handpicked <br />
            Escapes.
          </h2>
          <p className="text-lg text-on-surface-variant dark:text-on-surface-variant">
            Explore our most coveted travel guides, curated with an eye for
            luxury, authenticity, and hidden gems.
          </p>
        </div>
        <Link
          href="/travel-guides"
          className="group flex items-center space-x-2 font-bold text-primary transition-transform duration-300 hover:translate-x-2"
        >
          <span className="border-b-2 border-primary">View All Guides</span>
          <span className="material-symbols-outlined" data-icon="trending_flat">
            trending_flat
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Large Featured Card (First) */}
        {featured[0] && (
          <div

            className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-container shadow-xl md:col-span-8 dark:bg-surface-container-highest"
          >
            <Image
              src={featured[0].image}
              alt={featured[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-teal-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-6 lg:p-10">
              <div className="space-y-2 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary-container">
                  {featured[0].category}
                </span>
                <h3 className="text-4xl font-bold">{featured[0].title}</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span
                      className="material-symbols-outlined text-sm"
                      data-icon="schedule"
                    >
                      schedule
                    </span>
                    <span className="ml-1 text-sm">Curated Guide</span>
                  </div>
                  <div className="flex items-center">
                    <span
                      className="material-symbols-outlined text-sm"
                      data-icon="hotel"
                    >
                      hotel
                    </span>
                    <span className="ml-1 text-sm">Luxury Boutique</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Secondary Card (Second) */}
        {featured[1] && (
          <div

            className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container shadow-xl md:col-span-4 md:mt-12 dark:bg-surface-container-highest"
          >
            <Image
              src={featured[1].image}
              alt={featured[1].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-teal-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 lg:p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary-container">
                {featured[1].category}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {featured[1].title}
              </h3>
            </div>
          </div>
        )}

        {/* Third Card (Third) */}
        {featured[2] && (
          <div

            className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container shadow-xl md:col-span-4 md:-mt-12 dark:bg-surface-container-highest"
          >
            <Image
              src={featured[2].image}
              alt={featured[2].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-teal-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 lg:p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary-container">
                {featured[2].category}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {featured[2].title}
              </h3>
            </div>
          </div>
        )}

        {/* Fourth Card (Fourth) */}
        {featured[3] && (
          <div

            className="group relative aspect-[16/8] overflow-hidden rounded-xl bg-surface-container shadow-xl md:col-span-8 dark:bg-surface-container-highest"
          >
            <Image
              src={featured[3].image}
              alt={featured[3].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-teal-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 lg:p-10">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary-container">
                {featured[3].category}
              </span>
              <h3 className="mt-2 text-4xl font-bold text-white">
                {featured[3].title}
              </h3>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
