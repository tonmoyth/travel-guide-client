"use client"

import Image from "next/image"

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-surface-container-low px-4 sm:px-6 lg:px-8 py-16 lg:py-24 dark:bg-black/20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-20 md:flex-row">
        {/* Left Content */}
        <div className="space-y-10 md:w-1/2">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              The Digital Curator Standard
            </span>
            <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tighter text-teal-900 lg:text-6xl dark:text-teal-50">
              Why Travelers Love Us.
            </h2>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-surface-container-highest">
                <span
                  className="material-symbols-outlined text-3xl text-primary"
                  data-icon="verified"
                >
                  verified
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-teal-900 dark:text-teal-100">
                  Expertly Curated
                </h4>
                <p className="text-on-surface-variant dark:text-white/70">
                  Every recommendation is personally vetted by our global team
                  of luxury travel editors.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-surface-container-highest">
                <span
                  className="material-symbols-outlined text-3xl text-primary"
                  data-icon="map"
                >
                  map
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-teal-900 dark:text-teal-100">
                  Custom Itineraries
                </h4>
                <p className="text-on-surface-variant dark:text-white/70">
                  Flexible, downloadable itineraries that adapt to your personal
                  travel pace and style.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-surface-container-highest">
                <span
                  className="material-symbols-outlined text-3xl text-primary"
                  data-icon="diamond"
                >
                  diamond
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-teal-900 dark:text-teal-100">
                  Exclusive Access
                </h4>
                <p className="text-on-surface-variant dark:text-white/70">
                  Gain entry to members-only locations and boutique stays not
                  found on public platforms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Visuals */}
        <div className="relative md:w-1/2">
          <div className="relative z-10 rotate-3 transform overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0">
            <Image
              alt="Travelers Group"
              width={800}
              height={1000}
              className="aspect-[4/5] object-cover"
              src={`/assets/whyChooseImage.jpg`}
            />
          </div>

          {/* <div className="glass-panel absolute -bottom-10 -left-10 z-20 max-w-xs space-y-4 rounded-2xl p-8 shadow-xl">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  data-icon="star"
                >
                  star
                </span>
              ))}
            </div>
            <p className="italic text-teal-900 dark:text-white">
              "Finally, travel advice that feels like it's coming from a
              sophisticated friend, not an algorithm."
            </p>
            <p className="text-sm font-bold dark:text-primary">
              — Elena Rose, Luxury Travel Writer
            </p>
          </div> */}

          <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-primary-container/10 blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}
