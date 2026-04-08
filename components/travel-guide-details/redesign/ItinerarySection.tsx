import React from "react";

interface ItineraryDay {
  day: number | string;
  title: string;
  activities: string[];
}

interface ItinerarySectionProps {
  itinerary: ItineraryDay[];
}

export default function ItinerarySection({ itinerary }: ItinerarySectionProps) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-heading font-bold text-primary">
        Day-by-Day Odyssey
      </h2>
      <div className="space-y-8">
        {itinerary.map((day, index) => (
          <div key={index} className="relative pl-8 border-l-2 border-primary/20 pb-8 last:pb-0">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-inverse-surface"></div>
            <div className="bg-surface-container-low p-6 rounded-2xl dark:bg-surface-container shadow-sm border border-primary/5 hover:border-primary/20 transition-colors">
              <h3 className="text-xl font-bold text-primary mb-3">
                Day {day.day}: {day.title}
              </h3>
              <ul className="space-y-2">
                {day.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3 text-on-surface-variant font-sans">
                    <span className="material-symbols-outlined text-sm text-secondary mt-1">
                      check_circle
                    </span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
