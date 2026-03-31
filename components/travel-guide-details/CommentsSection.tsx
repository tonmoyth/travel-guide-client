"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createCommentAction } from "@/actions/travel-details/commentActions"
import CommentItem from "./CommentItem"

interface Comment {
  id: string
  guideId: string
  memberId: string
  parentId: string | null
  comment: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  member: {
    id: string
    name: string
    email: string
  }
  replies?: Comment[]
}

interface Props {
  guideId: string
  comments?: Comment[]
}

export default function CommentsSection({ guideId, comments }: Props) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  const displayedComments = showAll ? comments : comments?.slice(0, 5)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    const toastId = toast.loading("Posting comment...")

    setError(null)
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("guideId", guideId)
      formData.append("comment", newComment)

      const result = await createCommentAction(formData)

      if (result.success) {
        setNewComment("")
        toast.success("Comment added successfully!", { id: toastId })
        // The page will revalidate and show new comment
        router.refresh()
      } else {
        setError(result.message || "Failed to add comment")
        toast.error(result.message || "Failed to add comment", { id: toastId })
      }
    } catch (error: any) {
      setError("Failed to add comment. Please try again.")
      toast.error("Failed to add comment. Please try again.", { id: toastId })
      console.error("Comment error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 rounded border bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Comments</h2>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded border p-2"
          rows={3}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="space-y-4">
        {displayedComments && displayedComments.length > 0 ? (
          displayedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} guideId={guideId} />
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No comments yet. Start the discussion!
          </p>
        )}
        {comments && comments.length > 5 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm text-blue-500 hover:underline"
          >
            Show More Comments
          </button>
        )}
      </div>
    </div>
  )
}
