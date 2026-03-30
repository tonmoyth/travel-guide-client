"use client"

import { getUnderReview } from "@/app/actions/member/getUnderReview"
import { DraftGuide, IQueryResult } from "@/app/actions/member/get-drafts"
import UnderReviewCard from "./underreview-card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface UnderReviewListProps {
  initialData: IQueryResult<DraftGuide>
}

export default function UnderReviewList({ initialData }: UnderReviewListProps) {
  const [data, setData] = useState<IQueryResult<DraftGuide>>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = async (page: number) => {
    if (page < 1 || !data.meta || page > data.meta.totalPages) return

    setIsLoading(true)
    try {
      const pageData = await getUnderReview(page, 10)
      setData(pageData)
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Failed to fetch under review guides:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="mb-2 text-lg font-medium text-muted-foreground">
          No guides currently under review
        </p>
        <p className="text-sm text-muted-foreground">
          Submit a guide and check back once it's in review.
        </p>
      </div>
    )
  }

  const { data: guides, meta } = data

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <UnderReviewCard key={guide.id} guide={guide} />
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  disabled={isLoading}
                  className="min-w-9"
                >
                  {page}
                </Button>
              )
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!meta || currentPage >= meta.totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      )}

      {meta && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {(currentPage - 1) * meta.limit + 1} to{" "}
          {Math.min(currentPage * meta.limit, meta.total)} of {meta.total}{" "}
          guides
        </div>
      )}
    </div>
  )
}
