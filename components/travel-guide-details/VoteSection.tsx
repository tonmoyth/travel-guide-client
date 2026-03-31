"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { toast } from "sonner"
import { castVoteAction } from "@/actions/travel-details/castVoteAction"

interface VoteStats {
  voteCount: {
    upVotes: number
    downVotes: number
    totalScore?: number
  }
  userVote?: {
    id: string
    voteType: "UP" | "DOWN"
  } | null
  userVoteScore?: number
}

interface Props {
  guideId: string
  voteStats: VoteStats | null
}

export default function VoteSection({ guideId, voteStats }: Props) {
  const [isVoting, setIsVoting] = useState(false)
  const [currentStats, setCurrentStats] = useState<VoteStats | null>(voteStats)
  const [error, setError] = useState<string | null>(null)

  const handleVote = async (voteType: "UP" | "DOWN") => {
    const toastId = toast.loading("Casting vote...")
    setError(null)
    setIsVoting(true)
    try {
      const formData = new FormData()
      formData.append("guideId", guideId)
      formData.append("voteType", voteType)

      const result = await castVoteAction(formData)

      if (result.success && result.data) {
        setCurrentStats(result.data as VoteStats)
        toast.success("Vote cast successfully!", { id: toastId })
      } else {
        setError(result.message || "Failed to cast vote")
        toast.error(result.message || "Failed to cast vote", { id: toastId })
      }
    } catch (error: any) {
      setError("Failed to cast vote. Please try again.")
      toast.error("Failed to cast vote. Please try again.", { id: toastId })
      console.error("Vote error:", error)
    } finally {
      setIsVoting(false)
    }
  }

  if (!currentStats) return null

  const { voteCount, userVote } = currentStats

  return (
    <div className="space-y-4 rounded border bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Voting</h2>
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => handleVote("UP")}
          disabled={isVoting}
          className={`flex items-center gap-2 rounded px-4 py-2 ${
            userVote?.voteType === "UP"
              ? "bg-green-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          Upvote ({voteCount.upVotes})
        </button>
        <button
          onClick={() => handleVote("DOWN")}
          disabled={isVoting}
          className={`flex items-center gap-2 rounded px-4 py-2 ${
            userVote?.voteType === "DOWN"
              ? "bg-red-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <ThumbsDown className="h-4 w-4" />
          Downvote ({voteCount.downVotes})
        </button>
        {userVote && (
          <button
            onClick={() => handleVote(userVote.voteType)}
            disabled={isVoting}
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Remove Vote
          </button>
        )}
      </div>
    </div>
  )
}
