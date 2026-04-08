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
    const toastId = toast.loading("Posting expedition note...")

    setError(null)
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("guideId", guideId)
      formData.append("comment", newComment)

      const result = await createCommentAction(formData)

      if (result.success) {
        setNewComment("")
        toast.success("Note added successfully!", { id: toastId })
        router.refresh()
      } else {
        setError(result.message || "Failed to add note")
        toast.error(result.message || "Failed to add note", { id: toastId })
      }
    } catch (error: any) {
      setError("Failed to add note. Please try again.")
      toast.error("Failed to add note. Please try again.", { id: toastId })
      console.error("Comment error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">edit_note</span>
            <h2 className="text-xl font-bold text-primary font-heading">Expedition Notes</h2>
        </div>

        {error && (
            <div className="rounded-xl border border-error/20 bg-error/5 p-4 text-sm text-error">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="relative group">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your expedition reflections..."
                className="w-full bg-surface-container-highest border-none rounded-2xl p-6 focus:ring-2 focus:ring-primary min-h-[140px] font-sans text-on-surface shadow-inner transition-all placeholder:text-slate-400 dark:bg-surface-container-highest/50"
                required
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className="absolute bottom-4 right-4 bg-primary text-on-primary px-8 py-2 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
                {isSubmitting ? "Posting..." : "Post Note"}
            </button>
        </form>
      </div>

      <div className="space-y-8">
        {displayedComments && displayedComments.length > 0 ? (
          <div className="divide-y divide-primary/5">
            {displayedComments.map((comment) => (
              <div key={comment.id} className="py-6 first:pt-0">
                <CommentItem comment={comment} guideId={guideId} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-primary/5 rounded-3xl border border-dashed border-primary/10">
            <span className="material-symbols-outlined text-4xl text-primary/20 mb-2">forum</span>
            <p className="text-sm text-slate-500 font-sans">
                Silence rules this path. Be the first to leave a reflected note.
            </p>
          </div>
        )}
        
        {comments && comments.length > 5 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-4 text-sm font-bold text-primary hover:bg-primary/5 rounded-2xl transition-colors border border-primary/10"
          >
            Show All reflections ({comments.length})
          </button>
        )}
      </div>
    </div>
  )
}
