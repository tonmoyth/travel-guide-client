export default function TravelGuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Travel Guides</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover amazing travel guides from our community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder for guides */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold">Coming Soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Travel guides will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
