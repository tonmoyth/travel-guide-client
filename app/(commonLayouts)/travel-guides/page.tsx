import * as React from "react"
import { GuidesList } from "@/components/modules/member/guides-list"
import travelGuideServices from "@/services/travelGuide/travelGuide.service"

export default async function TravelGuidesPage() {
  // Fetch initial guides data on server
  const result = await travelGuideServices.getAll(1, 10)

  const initialData = result.success
    ? {
      guides: result.data.data,
      totalPages: result.data.meta.totalPages,
      total: result.data.meta.total,
    }
    : {
      guides: [],
      totalPages: 0,
      total: 0,
    }

  return (
    <div className="min-h-screen bg-background pt-15">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Travel Guides</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover amazing travel guides from our community
          </p>
        </div>

        {/* Search section */}
        {/* <SearchSection /> */}

        {/* Interactive Content */}
        <React.Suspense
          fallback={
            <div className="flex h-64 items-center justify-center">
              <div className="text-sm text-muted-foreground">
                Loading guides...
              </div>
            </div>
          }
        >
          <GuidesList initialData={initialData} />
        </React.Suspense>
      </div>
    </div>
  )
}
