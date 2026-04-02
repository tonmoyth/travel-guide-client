import Button from "@/components/shared/Button"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            About TravelGuide
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your online community portal for sharing travel guides, destination
            tips, itineraries, and travel experiences.
          </p>
        </div>

        <div className="space-y-10">
          <section className="rounded-xl border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Our Mission
            </h2>
            <p className="text-muted-foreground">
              We believe in empowering travelers with real stories and
              high-quality guides. Our mission is to build a trusted platform
              where every trip plan is enriched by community expertise and
              admin-verified quality.
            </p>
          </section>

          <section className="rounded-xl border bg-card p-8">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              What We Offer
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-background p-4">
                <h3 className="font-medium text-foreground">
                  Community Travel Guides
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse rich, curated guides from fellow travelers across the
                  globe.
                </p>
              </div>
              <div className="rounded-lg bg-background p-4">
                <h3 className="font-medium text-foreground">
                  Destination Insights
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get local tips, must-see locations, and up-to-date travel
                  info.
                </p>
              </div>
              <div className="rounded-lg bg-background p-4">
                <h3 className="font-medium text-foreground">
                  Trip Itineraries
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use ready-made itineraries or make your own with actionable
                  steps.
                </p>
              </div>
              <div className="rounded-lg bg-background p-4">
                <h3 className="font-medium text-foreground">
                  Experience Sharing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Post your journey, collect feedback, and connect with the
                  travel community.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border bg-card p-8">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              How It Works
            </h2>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  1
                </span>
                <span>
                  Share your guide, itinerary, or travel story in a simple form.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  2
                </span>
                <span>
                  Admins review and give feedback to maintain high quality and
                  accuracy.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  3
                </span>
                <span>
                  Approved guides are published for everyone to use and enjoy.
                </span>
              </li>
            </ol>
          </section>

          <section className="rounded-xl border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Community and Moderation
            </h2>
            <p className="mb-3 text-muted-foreground">
              Admins monitor submissions, provide feedback, and ensure
              high-quality travel guides are available to all users. This
              creates a reliable and engaging community for planners and
              explorers.
            </p>
            <p className="text-muted-foreground">
              Join our platform to discover trusted trip plans, share your own
              experiences, and help others find the best routes.
            </p>
          </section>

          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Ready to join the adventure?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Start contributing or explore guides in the community now.
            </p>
            <Button
              label="Browse Travel Guides"
              href="/travel-guides"
              variant="primary"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
