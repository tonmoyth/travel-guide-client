"use client"

import {
  getDrafts,
  DraftGuide,
  IQueryResult,
} from "@/app/actions/member/get-drafts"
import { Button } from "@/components/ui/button"
import DraftCard from "./draft-card"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

interface DraftsListProps {
  initialData: IQueryResult<DraftGuide>
}

export default function DraftsList({ initialData }: DraftsListProps) {
  const searchParams = useSearchParams()
  const [data, setData] = useState<IQueryResult<DraftGuide>>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = async (page: number) => {
    setIsLoading(true)
    try {
      const response = await getDrafts(page, 10)
      setData(response.data)
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Failed to fetch drafts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (guide: DraftGuide) => {
    // TODO: Implement submit functionality
    console.log("Submitting guide:", guide.id)
  }

  const handleEdit = (guide: DraftGuide) => {
    // Update the guides list with the edited guide
    const updatedGuides = data.data.map((g) => (g.id === guide.id ? guide : g))
    setData((prev) => ({
      ...prev,
      data: updatedGuides,
    }))
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="mb-2 text-lg font-medium text-muted-foreground">
          No draft guides yet
        </p>
        <p className="text-sm text-muted-foreground">
          Start creating your first travel guide to see it here
        </p>
      </div>
    )
  }

  const { data: guides, meta } = data

  return (
    <div className="space-y-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <DraftCard
            key={guide.id}
            guide={guide}
            onSubmit={handleSubmit}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Pagination */}
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

          {/* Page Numbers */}
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
            disabled={currentPage === meta.totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      )}

      {/* Pagination Info */}
      {meta && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {(currentPage - 1) * meta.limit + 1} to{" "}
          {Math.min(currentPage * meta.limit, meta.total)} of {meta.total}{" "}
          drafts
        </div>
      )}
    </div>
  )
}
