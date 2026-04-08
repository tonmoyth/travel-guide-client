"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import swal from "sweetalert"
import {
  updateCommentAction,
  deleteCommentAction,
  createCommentAction,
} from "@/actions/travel-details/commentActions"

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
  comment: Comment
  guideId: string
}

export default function CommentItem({ comment, guideId }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.comment)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating reflection...")
    setError(null)
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("commentId", comment.id)
      formData.append("comment", editText)

      const result = await updateCommentAction(formData)

      if (result.success) {
        setIsEditing(false)
        toast.success("Reflection updated!", { id: toastId })
        router.refresh()
      } else {
        setError(result.message || "Failed to update reflection")
        toast.error(result.message || "Failed to update reflection", { id: toastId })
      }
    } catch (error: any) {
      setError("An unexpected error occurred.")
      toast.error("An unexpected error occurred.", { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = await swal({
      title: "Remove this reflection?",
      text: "This action cannot be undone.",
      icon: "warning",
      buttons: ["Keep it", "Remove Note"],
      dangerMode: true,
    })

    if (!confirmed) return

    const toastId = toast.loading("Removing reflection...")
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("commentId", comment.id)
      const result = await deleteCommentAction(formData)

      if (result.success) {
        toast.success("Reflection removed.", { id: toastId })
        router.refresh()
      } else {
        toast.error(result.message || "Failed to remove.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = async () => {
    if (!replyText.trim()) return
    const toastId = toast.loading("Adding reply...")
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("guideId", guideId)
      formData.append("comment", replyText)
      formData.append("parentId", comment.id)

      const result = await createCommentAction(formData)

      if (result.success) {
        setReplyText("")
        setIsReplying(false)
        toast.success("Reply added!", { id: toastId })
        router.refresh()
      } else {
        toast.error(result.message || "Failed to add reply.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-error/5 p-3 text-xs text-error">
          {error}
        </div>
      )}
      
      <div className="flex gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
          {comment.member.name.charAt(0)}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary text-sm">{comment.member.name}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest bg-surface-container-highest px-2 py-0.5 rounded-full">
                {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Expedition Date"}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
                 <button onClick={() => setIsReplying(!isReplying)} className="text-secondary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">reply</span>
                 </button>
                 <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">edit</span>
                 </button>
                 <button onClick={handleDelete} className="text-error/50 hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                 </button>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                  className="rounded-full bg-primary px-4 py-1 text-xs text-on-primary font-bold"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-full bg-slate-200 dark:bg-slate-700 px-4 py-1 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {comment.comment}
            </p>
          )}
        </div>
      </div>

      {isReplying && (
        <div className="ml-14 space-y-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full bg-surface-container-highest/50 border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-secondary"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleReply}
              disabled={isSubmitting}
              className="rounded-full bg-secondary px-4 py-1 text-xs text-on-secondary font-bold"
            >
              Reply
            </button>
            <button
              onClick={() => setIsReplying(false)}
              className="rounded-full bg-slate-200 dark:bg-slate-700 px-4 py-1 text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-14 space-y-6 pt-4 border-l border-primary/10">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="pl-4 relative">
                 <div className="absolute left-0 top-5 w-4 h-px bg-primary/10"></div>
                 <CommentItem comment={reply} guideId={guideId} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
