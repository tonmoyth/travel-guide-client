"use client"

import Image from "next/image"
import Link from "next/link"

const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    tagline: "Paradise of spiritual discovery and tropical bliss.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "Phuket",
    country: "Thailand",
    tagline: "Azure waters and vibrant island life await.",
    image: "https://i.ibb.co.com/xKVwqDG9/a3d38a02-040a-4319-a463-cf1bc670deba.webp",
  },
  {
    name: "Santorini",
    country: "Greece",
    tagline: "Whitewashed dreams overlooking the endless blue.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "Tokyo",
    country: "Japan",
    tagline: "A neon-lit journey through future and tradition.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "Paris",
    country: "France",
    tagline: "Timeless romance and culinary excellence.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "New York",
    country: "USA",
    tagline: "The heartbeat of the world that never sleeps.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000",
  },
]

export default function PopularDestinations() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="font-heading text-3xl font-extrabold tracking-tighter text-primary md:text-5xl dark:text-primary-container">
            Popular Destinations
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-on-surface-variant">
            Explore our most coveted travel destinations, curated for those who seek the extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.name}
              href={`/travel-guides?search=${destination.name}`}
              className="group relative aspect-4/3 overflow-hidden rounded-xl bg-surface-container shadow-sm transition-all duration-500 hover:shadow-xl dark:bg-surface-container-high"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-container opacity-90">
                  {destination.country}
                </span>
                <h3 className="mt-1 text-3xl font-bold tracking-tight">
                  {destination.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/80 leading-relaxed max-w-[250px]">
                  {destination.tagline}
                </p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
                  <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
