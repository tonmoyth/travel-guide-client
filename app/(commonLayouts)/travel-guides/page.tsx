import { GuidesList } from "@/components/modules/member/guides-list"

export default function TravelGuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Travel Guides</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover amazing travel guides from our community
          </p>
        </div>

        {/* Interactive Content */}
        <GuidesList />
      </div>
    </div>
  )
}
