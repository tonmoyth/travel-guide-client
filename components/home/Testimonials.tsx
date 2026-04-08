"use client"

import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Helena Vala",
    role: "Adventure Photographer",
    comment: "The precision in the Bali spiritual guide was unmatched. It unlocked locations I hadn't found in years of self-led traveling.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=helena",
  },
  {
    name: "Marcus Thorne",
    role: "Luxury Consultant",
    comment: "TravelGuide is my secret weapon for high-end client itineraries. The curation quality is consistently world-class.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    name: "Elena Rodriguez",
    role: "Cultures Enthusiast",
    comment: "Discovering the hidden tea houses of Tokyo through your interactive maps was a life-changing afternoon. Pure magic.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-surface-container-low py-24 dark:bg-surface-container-high">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <h2 className="font-heading text-3xl font-extrabold tracking-tighter text-primary md:text-5xl dark:text-primary-container">
              Explorer Voices
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Real reflections from our global community of sophisticated travelers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-primary text-primary" />
            ))}
            <span className="ml-2 font-bold text-primary">4.9 / 5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-panel relative flex flex-col justify-between rounded-3xl p-10 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
            >
              <div className="absolute -top-6 -left-6 opacity-10">
                <Quote className="h-24 w-24 text-primary" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-sans text-lg italic leading-relaxed text-on-surface lg:text-xl">
                  "{testimonial.comment}"
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20 bg-surface-container">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-on-surface">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-70">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
