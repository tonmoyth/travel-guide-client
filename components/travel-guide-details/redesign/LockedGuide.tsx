import React from "react";
import Link from "next/link";

interface LockedGuideProps {
  guideId: string;
}

export default function LockedGuide({ guideId }: LockedGuideProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative group max-w-2xl w-full">
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-500"></div>
        
        {/* Main Card */}
        <div className="relative bg-white/40 dark:bg-surface-container-low/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-[2rem] p-12 text-center space-y-8 shadow-[0_40px_60px_-15px_rgba(0,87,88,0.1)]">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-4 transform group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              lock
            </span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-extrabold text-primary">
              This guide is premium content
            </h2>
            <p className="text-lg text-on-surface-variant font-sans max-w-md mx-auto">
              Unlock this guide to access our exclusive itinerary, coordinates, and full travel experience.
            </p>
          </div>
          
          <div className="pt-4">
            <Link
              href={`/payment?guideId=${guideId}`}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span className="material-symbols-outlined">payments</span>
              Unlock Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
