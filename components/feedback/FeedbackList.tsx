"use client"

import { FeedbackCard } from "./FeedbackCard"



interface FeedbackItem {
  feedback: string
  guide: {
    id: string
    title: string
    description: string
    status: string
    // add more fields
  }
}

interface FeedbackListProps {
  feedbacks: FeedbackItem[]
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {feedbacks.map((item, index) => (
        <FeedbackCard
          key={item.guide.id || index}
          feedback={item.feedback}
          guide={item.guide}
        />
      ))}
    </div>
  )
}
