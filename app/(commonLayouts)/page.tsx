import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Discover Your Next Adventure
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            Explore authentic travel guides, destination tips, and itineraries
            shared by fellow travelers. Plan your perfect trip with insights
            from our community.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/travel-guides">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Guides
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Share Your Experience
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose TravelGuide?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              ✈️
            </div>
            <h3 className="mb-2 text-xl font-semibold">Expert Guides</h3>
            <p className="text-muted-foreground">
              Get detailed travel guides from experienced travelers and experts
              in various destinations.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              👥
            </div>
            <h3 className="mb-2 text-xl font-semibold">Community Driven</h3>
            <p className="text-muted-foreground">
              Share your experiences and learn from fellow travelers around the
              world.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              ⭐
            </div>
            <h3 className="mb-2 text-xl font-semibold">Quality Content</h3>
            <p className="text-muted-foreground">
              All guides are reviewed by our admins to ensure accuracy and
              usefulness.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Guides Section */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Popular Destinations
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["Paris", "Tokyo", "Bali", "Barcelona", "New York", "Dubai"].map(
            (destination) => (
              <div
                key={destination}
                className="rounded-lg border bg-card p-6 transition hover:shadow-md"
              >
                <h3 className="mb-2 text-xl font-semibold">{destination}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Explore guides and tips for {destination}
                </p>
                <Link href="/travel-guides">
                  <Button variant="outline" className="w-full">
                    View Guides
                  </Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to Share Your Travel Story?
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Join thousands of travelers and create your own guides to inspire
          others.
        </p>
        <Link href="/register">
          <Button size="lg">Get Started Today</Button>
        </Link>
      </div>
    </div>
  )
}
