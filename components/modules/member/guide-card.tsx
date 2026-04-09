import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, MessageCircle } from "lucide-react"
import Link from "next/link"

interface GuideCardProps {
  guide: {
    id: string
    title: string
    description: string
    coverImage: string
    isPaid: boolean
    price?: number
    category?: { title: string; slug: string }
    guideMedia?: Array<{ url: string; type: string }>
    votes?: Array<{ type: "UPVOTE" | "DOWNVOTE" | "UP" | "DOWN" }>
    comments?: Array<{ id: string; isDeleted?: boolean }>
    createdAt: string
  }
  authorName?: string
}

export function GuideCard({ guide, authorName }: GuideCardProps) {
  // const upvoteCount =
  //   guide.votes?.filter((v) => v.type === "UPVOTE" || v.type === "UP").length ||
  //   0
  const downvoteCount =
    guide.votes?.filter((v) => v.type === "DOWNVOTE" || v.type === "DOWN")
      .length || 0
  const commentCount =
    guide.comments?.filter((com) => !com.isDeleted).length || 0

  // Use cover image or first media image as fallback
  const imageUrl = guide.coverImage || guide.guideMedia?.[0]?.url

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={guide.title}
          className="h-full w-full object-cover"
        //   onError={(e) => {
        //     e.currentTarget.src = `/images/guide-placeholder.jpg`
        //   }}
        />
        {guide.isPaid && (
          <div className="absolute top-2 right-2">
            <span className="inline-block rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-white">
              Paid
            </span>
          </div>
        )}
        {guide.isPaid === false && (
          <div className="absolute top-2 right-2">
            <span className="inline-block rounded bg-primary px-2 py-1 text-xs font-semibold text-white">
              Free
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Category and Title */}
        <div className="mb-2">
          {guide.category && (
            <p className="text-xs text-muted-foreground uppercase">
              {guide.category.title}
            </p>
          )}
          <h3 className="line-clamp-2 text-lg font-semibold">{guide.title}</h3>
        </div>

        {/* Description */}
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {guide.description}
        </p>

        {/* Author and Meta */}
        <div className="mb-3 space-y-1 border-b pb-3">
          {authorName && (
            <p className="text-xs text-muted-foreground">By {authorName}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {new Date(guide.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Vote and Comment Stats */}
        <div className="mb-3 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4 text-green-600" />
            <span className="text-sm">{guide.votes?.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4 text-blue-600" />
            <span className="text-sm">{commentCount}</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          {guide.isPaid && guide.price ? (
            <span className="font-semibold text-primary">${guide.price}</span>
          ) : (
            <span className="text-sm text-muted-foreground">Free</span>
          )}
          <Link
            href={`/travel-guides/${guide.id}`}
            className="inline-flex text-white rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:opacity-90"
          >
            View Guide
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
