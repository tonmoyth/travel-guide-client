"use client"

import { Umbrella, Mountain, Landmark, Gem, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "Beach Travel",
    slug: "beach",
    description: "Pristine sands and turquoise horizons for ultimate relaxation.",
    icon: <Umbrella className="h-8 w-8" />,
    color: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Adventure",
    slug: "adventure",
    description: "Thrill-seeking expeditions into the heart of the wild.",
    icon: <Mountain className="h-8 w-8" />,
    color: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Culture",
    slug: "culture",
    description: "Immerse yourself in timeless traditions and local stories.",
    icon: <Landmark className="h-8 w-8" />,
    color: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Luxury",
    slug: "luxury",
    description: "Refined experiences for the most discerning travelers.",
    icon: <Gem className="h-8 w-8" />,
    color: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
]

export default function TravelCategories() {
  return (
    <section className="bg-surface py-24 dark:bg-background">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <h2 className="font-heading text-3xl font-extrabold tracking-tighter text-primary md:text-5xl dark:text-primary-container">
              Travel Categories
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Tailor your journey by selecting from our expertly curated travel themes.
            </p>
          </div>
          <Link
            href="/travel-guides"
            className="group flex items-center gap-2 font-bold text-primary transition-all hover:gap-4"
          >
            <span>Explore All Themes</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/travel-guides?category=${category.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-outline/10 bg-surface-container p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-surface-container-high hover:shadow-lg dark:bg-surface-container-low dark:hover:bg-surface-container"
            >
              <div className="space-y-6">
                <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${category.color} ${category.iconColor} transition-transform duration-500 group-hover:scale-110`}>
                  {category.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-on-surface">
                    {category.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2 font-bold text-primary opacity-60 transition-all group-hover:opacity-100">
                <span className="text-xs uppercase tracking-widest">Discover More</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
