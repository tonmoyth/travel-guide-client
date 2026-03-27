export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
        </div>

        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            Welcome to TravelGuide, your online community portal for sharing
            travel experiences, destination tips, and comprehensive travel
            guides.
          </p>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              Our Mission
            </h2>
            <p>
              We believe that travel is more enriching when guided by real
              experiences from fellow travelers. Our mission is to create a
              vibrant community where travelers can share their knowledge and
              help others discover the world.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              What We Offer
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Comprehensive travel guides from experienced travelers</li>
              <li>Destination tips and recommendations</li>
              <li>Detailed itineraries for various trip types</li>
              <li>A platform to share your own travel experiences</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              Our Community
            </h2>
            <p>
              Our community is moderated by experienced administrators who
              ensure that all content meets our quality standards and provides
              genuine value to our travelers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
