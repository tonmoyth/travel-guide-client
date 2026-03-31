import { getRejectedGuides } from "@/actions/feedback/getRejectedGuidesAction"
import { FeedbackList } from "@/components/feedback/FeedbackList"

import { IResponse } from "@/types/api.types"

interface FeedbackItem {
  feedback: string
  guide: {
    id: string
    title: string
    description: string
    status: string
    // add more fields as needed
  }
}

export default async function MemberFeedbackPage() {
  const result = await getRejectedGuides()

  if (!result.success) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Feedback from Admins</h1>
          <p className="mt-2 text-muted-foreground">Error: {result.message}</p>
        </div>
      </div>
    )
  }

  const feedbacks = (result as IResponse<FeedbackItem[]>).data || []

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Feedback from Admins</h1>
        <p className="mt-2 text-muted-foreground">
          View feedback and suggestions for your guides
        </p>
        <div className="mt-8">
          <FeedbackList feedbacks={feedbacks} />
        </div>
      </div>
    </div>
  )
}
