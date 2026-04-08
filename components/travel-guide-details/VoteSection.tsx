"use client"

import { useState } from "react"
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
    <div className="space-y-6">
      <div className="flex items-center gap-2">
         <span className="material-symbols-outlined text-primary">how_to_vote</span>
         <h2 className="text-xl font-bold text-primary font-heading">Expedition Voting</h2>
      </div>
      
      {error && (
        <div className="rounded-xl border border-error/20 bg-error/5 p-4 text-sm text-error">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => handleVote("UP")}
          disabled={isVoting}
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-all duration-300 shadow-sm hover:shadow-md ${
            userVote?.voteType === "UP"
              ? "bg-primary text-on-primary scale-105"
              : "bg-surface-container-highest text-primary hover:bg-primary/10"
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: userVote?.voteType === 'UP' ? "'FILL' 1" : "" }}>thumb_up</span>
          <span>{voteCount.upVotes}</span>
        </button>

        <button
          onClick={() => handleVote("DOWN")}
          disabled={isVoting}
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-all duration-300 shadow-sm hover:shadow-md ${
            userVote?.voteType === "DOWN"
              ? "bg-error text-on-error scale-105"
              : "bg-surface-container-highest text-error hover:bg-error/10"
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: userVote?.voteType === 'DOWN' ? "'FILL' 1" : "" }}>thumb_down</span>
          <span>{voteCount.downVotes}</span>
        </button>

        {userVote && (
          <button
            onClick={() => handleVote(userVote.voteType)}
            disabled={isVoting}
            className="text-xs font-bold text-slate-400 hover:text-primary transition-colors underline underline-offset-4"
          >
            Remove Vote
          </button>
        )}
      </div>
    </div>
  )
}
