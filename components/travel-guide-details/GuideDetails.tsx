import Link from "next/link"
import { notFound } from "next/navigation"
import { Lock, ArrowRight, CloudMoon, Heart, MessageCircle } from "lucide-react"
import travelGuideServices from "@/services/travelGuide/travelGuide.service"
import voteServices from "@/services/travelGuide/vote.service"
import commentServices from "@/services/travelGuide/comment.service"
import VoteSection from "./VoteSection"
import CommentsSection from "./CommentsSection"

interface Props {
  id: string
}

export default async function GuideDetails({ id }: Props) {
  try {
    // Fetch guide details - this is critical
    const guideResponse = await travelGuideServices
      .getById(id)
      .catch((error) => {
        console.error("Error fetching guide:", error)
        return { success: false, data: null }
      })

    if (!guideResponse.success || !guideResponse.data) {
      return (
        <div className="mx-auto max-w-4xl p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold">Guide Not Found</h1>
          <p className="text-gray-600">
            The travel guide you're looking for doesn't exist or has been
            deleted.
          </p>
        </div>
      )
    }

    const guide = guideResponse.data

    // Fetch vote stats - non-critical, use fallback if fails
    type VoteStats = {
      voteCount: {
        upVotes: number
        downVotes: number
        totalScore?: number
      }
      userVote: {
        id: string
        voteType: "UP" | "DOWN"
      } | null
    }

    let voteStats: VoteStats | null = null
    try {
      const voteStatsResponse = await voteServices.getVoteStats(id)
      if (voteStatsResponse.success && voteStatsResponse.data) {
        voteStats = voteStatsResponse.data as VoteStats
      }
    } catch (error) {
      console.error("Failed to fetch vote stats:", error)
    }

    // Fetch comments - non-critical, use fallback if fails
    let comments: any[] = []
    try {
      const commentsResponse = await commentServices.getComments(id)
      if (commentsResponse.success) {
        comments = commentsResponse.data ?? []
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    }

    let itinerary = [] as any[]
    try {
      itinerary = guide.itinerary ? JSON.parse(guide.itinerary ?? "[]") : []
    } catch (err) {
      itinerary = []
      console.warn("Failed to parse itinerary", err)
    }

    return (
      <div className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{guide.title}</h1>
          <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:space-x-4">
            <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
              {guide.category.title}
            </span>
            {guide.member && <span>By {guide.member.name}</span>}
            <span>
              {guide.createdAt
                ? new Date(guide.createdAt).toLocaleDateString()
                : "Unknown"}
            </span>
            <span
              className={`rounded px-2 py-1 ${guide.isPaid ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
            >
              {guide.isPaid ? "Paid" : "Free"}
            </span>
          </div>
        </div>

        {/* Main Content */}
        {guide.locked ? (
          <div className="space-y-4 py-12 text-center">
            <h2 className="text-xl font-semibold">This guide is locked</h2>
            <p>Problem: {guide.description || "N/A"}</p>
            <div className="mx-auto flex w-fit items-center gap-2 rounded-md border border-gray-200 bg-slate-50 px-3 py-2 text-sm text-gray-700">
              <Lock className="h-4 w-4" />
              <span>Locked content</span>
            </div>
            <p className="text-lg font-medium">
              Unlock this guide for ৳{guide.price}
            </p>
            <Link
              href={`/payment?guideId=${id}`}
              className="inline-flex items-center gap-2 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              <ArrowRight className="h-4 w-4" />
              Go to Payment
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded bg-gray-50 p-4">
              <h2 className="mb-2 text-xl font-semibold">Problem Statement</h2>
              <p className="text-gray-700">{guide.description}</p>
            </div>

            <div className="rounded bg-gray-50 p-4">
              <h2 className="mb-4 text-xl font-semibold">Proposed Solution</h2>
              <div className="space-y-3">
                {itinerary.length > 0 ? (
                  itinerary.map((day: any, index: number) => (
                    <div
                      key={index}
                      className="rounded border-l-4 border-blue-500 bg-white p-4"
                    >
                      <h3 className="font-semibold text-blue-900">
                        Day {day.day}: {day.title}
                      </h3>
                      <ul className="mt-2 list-inside list-disc text-gray-700">
                        {day.activities?.map((activity: string, i: number) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No itinerary details available
                  </p>
                )}
              </div>
            </div>

            <div className="rounded bg-gray-50 p-4">
              <h2 className="mb-2 text-xl font-semibold">
                Detailed Description
              </h2>
              <p className="text-gray-700">{guide.description}</p>
            </div>

            {guide.coverImage && (
              <div>
                <h2 className="mb-2 text-xl font-semibold">Cover Image</h2>
                <img
                  src={guide.coverImage}
                  alt="Cover"
                  className="h-auto max-w-full rounded"
                />
              </div>
            )}
          </div>
        )}

        {/* Interactive Section */}
        {!guide.locked && (
          <>
            <VoteSection guideId={id} voteStats={voteStats} />
            <CommentsSection guideId={id} comments={comments} />
          </>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching guide details:", error)
    notFound()
  }
}
