import React from "react";
import VoteSection from "../VoteSection";
import CommentsSection from "../CommentsSection";

interface InteractionSectionProps {
  guideId: string;
  voteStats: any;
  comments: any[];
}

export default function InteractionSection({
  guideId,
  voteStats,
  comments,
}: InteractionSectionProps) {
  return (
    <div className="pt-16 border-t border-primary/5 space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer text-on-surface">
            <span
              className="material-symbols-outlined text-3xl text-secondary group-hover:scale-125 transition-transform"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            <span className="font-bold">
              {voteStats?.voteCount?.upVotes || 0} Loves
            </span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-3xl">
              mode_comment
            </span>
            <span className="font-bold">
              {comments?.length || 0} Reflections
            </span>
          </div>
        </div>

      </div>

      <div className="bg-surface-container p-8 rounded-[2rem] space-y-12 dark:bg-surface-container-low border border-primary/5">
        <h3 className="text-2xl font-bold text-primary font-heading">Traveler Community</h3>

        <div className="space-y-12">
          <VoteSection guideId={guideId} voteStats={voteStats} />
          <div className="h-px bg-primary/10 w-full"></div>
          <CommentsSection guideId={guideId} comments={comments} />
        </div>
      </div>
    </div>
  );
}
