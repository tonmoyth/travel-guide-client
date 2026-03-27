export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Latest stories and insights from our community
          </p>
        </div>

        <div className="space-y-6">
          {/* Placeholder for blog posts */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-semibold">Coming Soon</h2>
            <p className="mt-2 text-muted-foreground">
              Blog posts will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
