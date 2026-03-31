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
    const toastId = toast.loading("Updating comment...")
    setError(null)
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("commentId", comment.id)
      formData.append("comment", editText)

      const result = await updateCommentAction(formData)

      if (result.success) {
        setIsEditing(false)
        toast.success("Comment updated successfully!", { id: toastId })
        router.refresh()
      } else {
        setError(result.message || "Failed to update comment")
        toast.error(result.message || "Failed to update comment", {
          id: toastId,
        })
      }
    } catch (error: any) {
      setError("Failed to update comment. Please try again.")
      toast.error("Failed to update comment. Please try again.", {
        id: toastId,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    const result = await swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })

    if (!result) return

    const toastId = toast.loading("Deleting comment...")

    setError(null)
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("commentId", comment.id)

      const result = await deleteCommentAction(formData)

      if (result.success) {
        toast.success("Comment deleted successfully!", { id: toastId })
        router.refresh()
      } else {
        setError(result.message || "Failed to delete comment")
        toast.error(result.message || "Failed to delete comment")
      }
    } catch (error: any) {
      setError("Failed to delete comment. Please try again.")
      toast.error("Failed to delete comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = async () => {
    if (!replyText.trim()) return
    const toastId = toast.loading("Posting reply...")

    setError(null)
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
        toast.success("Reply added successfully!", { id: toastId })
        router.refresh()
      } else {
        setError(result.message || "Failed to add reply")
        toast.error(result.message || "Failed to add reply", { id: toastId })
      }
    } catch (error: any) {
      setError("Failed to add reply. Please try again.")
      toast.error("Failed to add reply. Please try again.", { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-2 border-l-2 border-gray-300 py-2 pl-4">
      {error && (
        <div className="mb-2 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="font-medium text-gray-900">{comment.member.name}</span>
        <span className="text-gray-500">
          {comment.createdAt
            ? new Date(comment.createdAt).toLocaleDateString()
            : "Unknown"}
        </span>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full rounded border p-2"
            rows={3}
          />
          <div className="space-x-2">
            <button
              onClick={handleUpdate}
              disabled={isSubmitting}
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="rounded bg-gray-500 px-3 py-1 text-sm text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p>{comment.comment}</p>
      )}

      <div className="flex space-x-2 text-sm">
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-blue-500 hover:underline"
        >
          Reply
        </button>
        {/* Assuming current user can edit/delete their own comments */}
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-500 hover:underline"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:underline">
          Delete
        </button>
      </div>

      {isReplying && (
        <div className="mt-2 space-y-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full rounded border p-2"
            rows={2}
          />
          <div className="space-x-2">
            <button
              onClick={handleReply}
              disabled={isSubmitting}
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
            >
              Reply
            </button>
            <button
              onClick={() => setIsReplying(false)}
              className="rounded bg-gray-500 px-3 py-1 text-sm text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {(comment.replies ?? []).map((reply) => (
            <CommentItem key={reply.id} comment={reply} guideId={guideId} />
          ))}
        </div>
      )}
    </div>
  )
}
