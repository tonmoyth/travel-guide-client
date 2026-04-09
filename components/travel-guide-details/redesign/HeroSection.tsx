import React from "react";

interface HeroSectionProps {
  title: string;
  category: string;
  isPaid: boolean;
  authorName: string;
  date: string;
  difficulty?: string;
}

export default function HeroSection({
  title,
  category,
  isPaid,
  authorName,
  date,
  difficulty = "Intermediate",
}: HeroSectionProps) {
  return (
    <section className="relative w-full px-4 md:px-8 pt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-end">
        <div className="flex-1 z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest font-label">
              {category}
            </span>
            <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest font-label">
              {isPaid ? "Pro Guide" : "Free Guide"}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-primary leading-[1.1] tracking-tighter mb-6">
            {title}
          </h1>
          <div className="flex flex-col md:flex-row lg:items-center gap-6 text-on-surface-variant font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">
                person_pin
              </span>
              <span className="font-sans">{authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">
                calendar_today
              </span>
              <span className="font-sans">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-tertiary-fixed-dim"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="font-sans">{difficulty}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 text-right">
          {/* <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 w-full md:w-auto">
            <span className="material-symbols-outlined">map</span>
            Start Expedition
          </button> */}
        </div>
      </div>
    </section>
  );
}
