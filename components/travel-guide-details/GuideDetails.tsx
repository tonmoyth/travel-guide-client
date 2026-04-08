import { notFound } from "next/navigation";
import travelGuideServices from "@/services/travelGuide/travelGuide.service";
import voteServices from "@/services/travelGuide/vote.service";
import commentServices from "@/services/travelGuide/comment.service";

import HeroSection from "./redesign/HeroSection";
import FeatureImage from "./redesign/FeatureImage";
import GuideContent from "./redesign/GuideContent";
import ItinerarySection from "./redesign/ItinerarySection";
import InteractionSection from "./redesign/InteractionSection";
import Sidebar from "./redesign/Sidebar";

import LockedGuide from "./redesign/LockedGuide";

interface Props {
  id: string;
}

export default async function GuideDetails({ id }: Props) {
  try {
    // Fetch guide details - this is critical
    const guideResponse = await travelGuideServices.getById(id).catch((error) => {
      console.error("Error fetching guide:", error);
      return { success: false, data: null };
    });


    if (!guideResponse.success || !guideResponse.data) {
      return (
        <div className="mx-auto max-w-7xl p-6 text-center py-20">
          <h1 className="mb-4 text-2xl font-bold">Guide Not Found</h1>
          <p className="text-gray-600">
            The travel guide you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      );
    }

    const guide = guideResponse.data;

    // Fetch vote stats
    type VoteStats = {
      voteCount: {
        upVotes: number;
        downVotes: number;
        totalScore?: number;
      };
      userVote: {
        id: string;
        voteType: "UP" | "DOWN";
      } | null;
    };

    let voteStats: VoteStats | null = null;
    try {
      const voteStatsResponse = await voteServices.getVoteStats(id);
      if (voteStatsResponse.success && voteStatsResponse.data) {
        voteStats = voteStatsResponse.data as VoteStats;
      }
    } catch (error) {
      console.error("Failed to fetch vote stats:", error);
    }

    // Fetch comments
    let comments: any[] = [];
    try {
      const commentsResponse = await commentServices.getComments(id);
      if (commentsResponse.success) {
        comments = commentsResponse.data ?? [];
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }

    let itinerary = [] as any[];
    try {
      itinerary = guide.itinerary ? JSON.parse(guide.itinerary ?? "[]") : [];
    } catch (err) {
      itinerary = [];
      console.warn("Failed to parse itinerary", err);
    }

    const formattedDate = guide.createdAt
      ? new Date(guide.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      : "Unknown Date";

    return (
      <main className="min-h-screen bg-background text-on-surface transition-colors duration-300">
        {/* Dynamic Hero Section - Always visible for basic info */}
        <HeroSection
          title={guide.title}
          category={guide.category.title}
          isPaid={guide.isPaid}
          authorName={guide.member?.name || "Anonymous Curator"}
          date={formattedDate}
          difficulty={guide.isPaid ? "Advanced" : "Intermediate"}
        />

        {/* Conditional Rendering Logic based on isPaid */}
        {guide.locked ? (
          /* Premium Locked UI */
          <LockedGuide guideId={id} />
        ) : (
          /* Full Guide Content for free guides */
          <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-12 pb-20">
            {/* Left Column: Content */}
            <div className="lg:col-span-8 space-y-16">
              {/* Feature Image */}
              <FeatureImage
                src={guide.coverImage || "https://images.unsplash.com/photo-1544735716-a4ed20f6993a"}
                alt={guide.title}
                intensity={guide.isPaid ? 8.5 : 6.0}
              />

              {/* Guide Text Content */}
              {!guide.locked ? (
                <>
                  <GuideContent
                    problemStatement={guide.description || ""}
                    solutionSummary="We've mapped a path that prioritizes sensory immersion over sightseeing checklists. This guide unlocks private coves and artisan workshops tucked away from the main trails."
                    detailedDescription={guide.description || ""}
                  />

                  {/* Itinerary */}
                  <ItinerarySection itinerary={itinerary} />
                </>
              ) : (
                /* Note: guide.locked logic preserved here for additional state handling if needed, 
                   but primary block is now guide.isPaid as requested. */
                <div className="bg-surface-container-low p-8 rounded-3xl border-2 border-dashed border-primary/20 text-center space-y-6">
                  <span className="material-symbols-outlined text-5xl text-primary/30">lock</span>
                  <h2 className="text-2xl font-bold text-primary">Access Restricted</h2>
                  <p className="text-on-surface-variant max-w-md mx-auto">
                    Please upgrade your access to view the restricted details of this expedition.
                  </p>
                </div>
              )}

              {/* Interactions (Votes & Comments) */}
              {!guide.locked && (
                <InteractionSection
                  guideId={id}
                  voteStats={voteStats}
                  comments={comments}
                />
              )}
            </div>

            {/* Right Column: Sidebar */}
            <Sidebar
              author={{
                name: guide.member?.name || "Anonymous Curator",
                description: guide.member?.email,
                profilePhoto: undefined,
              }}
              isLocked={guide.locked}
              price={guide.price}
              recommendedGear={["All-terrain Sandal", "Polarized Lenses", "10L Dry Bag"]}
              relatedGuides={[]}
            />
          </section>
        )}


      </main>
    );
  } catch (error) {
    console.error("Error fetching guide details:", error);
    notFound();
  }
}
