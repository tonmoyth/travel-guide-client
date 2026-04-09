"use client"

import Image from "next/image"

const photos = [
  {
    url: "https://images.unsplash.com/photo-1544735716-3af2edb4f4c2?auto=format&fit=crop&q=80&w=1000",
    alt: "Tropical paradise",
    className: "col-span-1 row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1516483642774-2143b185b3bc?auto=format&fit=crop&q=80&w=1000",
    alt: "Coastal village",
    className: "col-span-1 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=1000",
    alt: "Desert landscape",
    className: "col-span-2 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000",
    alt: "Lake and mountains",
    className: "col-span-1 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1000",
    alt: "Misty forest",
    className: "col-span-1 row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
    alt: "Sunrise hike",
    className: "col-span-2 row-span-1",
  },
]

export default function TravelGallery() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="mb-16 max-w-3xl space-y-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tighter text-primary lg:text-5xl dark:text-primary-container">
            Expedition Gallery
          </h2>
          <p className="text-lg text-on-surface-variant">
            A visual anthology of the world's most breathtaking landscapes, captured by our global collective of explorers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-surface-container-high transition-transform duration-500 hover:scale-[0.98] ${photo.className}`}
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                  View Full Memory
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
