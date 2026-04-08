import React from "react";

interface GuideContentProps {
  problemStatement: string;
  solutionSummary: string;
  detailedDescription: string;
}

export default function GuideContent({
  problemStatement,
  solutionSummary,
  detailedDescription,
}: GuideContentProps) {
  return (
    <div className="space-y-16">
      {/* Problem Statement & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-low p-8 rounded-3xl border-l-4 border-error/30 dark:bg-surface-container">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">warning</span>
            The Travel Fatigue
          </h3>
          <p className="text-on-surface-variant leading-relaxed font-sans">
            {problemStatement}
          </p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-3xl border-l-4 border-tertiary/30 dark:bg-surface-container">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">explore</span>
            The Curated Escape
          </h3>
          <p className="text-on-surface-variant leading-relaxed font-sans">
            {solutionSummary}
          </p>
        </div>
      </div>

      {/* Detailed Description */}
      <article className="space-y-8">
        <h2 className="text-3xl font-heading font-bold text-primary">
          Unlocking the Azure Rhythm
        </h2>
        <div className="text-lg text-on-surface-variant leading-[1.8] font-sans space-y-6">
          <p>{detailedDescription}</p>
        </div>
      </article>
    </div>
  );
}
