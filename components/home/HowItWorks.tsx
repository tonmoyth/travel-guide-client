"use client"

import { Search, Lock, Map as MapIcon, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Browse Curated Guides",
    text: "Discover a world of handpicked journeys from our elite community of global travelers.",
    icon: <Search className="h-6 w-6" />,
    color: "bg-primary text-on-primary",
  },
  {
    number: "02",
    numberColor: "text-secondary",
    title: "Unlock Premium Access",
    text: "Access detailed itineraries, interactive maps, and expert-level hidden location pins.",
    icon: <Lock className="h-6 w-6" />,
    color: "bg-secondary text-on-secondary",
  },
  {
    number: "03",
    numberColor: "text-tertiary",
    title: "Start Your Journey",
    text: "Launch your expedition with all the tools you need for a truly immersive experience.",
    icon: <MapIcon className="h-6 w-6" />,
    color: "bg-tertiary text-on-tertiary",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-background py-32 dark:bg-surface-container">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-24 text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-tighter text-primary md:text-5xl dark:text-primary-container">
            Expedition Sequence
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            From inspiration to exploration — our simplified process ensures you spend more time experiencing the world and less time planning it.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Desktop Timeline Connector */}
          <div className="absolute top-12 left-0 hidden h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent md:block"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center space-y-8 text-center"
            >
              <div className={`flex h-24 w-24 items-center justify-center rounded-3xl ${step.color} shadow-lg shadow-primary/20 ring-8 ring-background dark:ring-surface-container transition-transform duration-500 hover:scale-110`}>
                {step.icon}
              </div>
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-[0.25em] text-primary/60 dark:text-primary-container/60">
                        Step {step.number}
                    </span>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-on-surface">
                    {step.title}
                  </h3>
                </div>
                <p className="max-w-[280px] text-on-surface-variant leading-relaxed">
                  {step.text}
                </p>
              </div>
              
              {/* Desktop Arrow */}
              {index < steps.length - 1 && (
                <div className="absolute right-[-2.5rem] top-12 hidden text-primary/20 md:block">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
