import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MemberDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Create and manage your travel guides
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">Draft Guides</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">
              Published Guides
            </p>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">Pending Review</p>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">Total Views</p>
            <p className="text-3xl font-bold">1,234</p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Create & Manage Guides
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Create new guides, save drafts, and manage your submissions
            </p>
            <div className="space-y-2">
              <Link href="/dashboard/create-guide">
                <Button className="w-full justify-start bg-primary">
                  + Create New Guide
                </Button>
              </Link>
              <Link href="/dashboard/drafts">
                <Button variant="outline" className="w-full justify-start">
                  View Drafts
                </Button>
              </Link>
              <Link href="/dashboard/published">
                <Button variant="outline" className="w-full justify-start">
                  Published Guides
                </Button>
              </Link>
              <Link href="/dashboard/submissions">
                <Button variant="outline" className="w-full justify-start">
                  View Submissions
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Feedback & Analytics</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              View feedback from admins and track guide performance
            </p>
            <div className="space-y-2">
              <Link href="/dashboard/feedback">
                <Button variant="outline" className="w-full justify-start">
                  View Feedback
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="w-full justify-start">
                  Guide Analytics
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
          <div className="space-y-3">
            <div className="border-b pb-3">
              <p className="text-sm font-medium">
                Draft saved: "Paris Travel Guide"
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <div className="border-b pb-3">
              <p className="text-sm font-medium">
                Submitted: "Tokyo 7-Day Itinerary"
              </p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
            <div>
              <p className="text-sm font-medium">
                Approved: "Bangkok Food Guide"
              </p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
