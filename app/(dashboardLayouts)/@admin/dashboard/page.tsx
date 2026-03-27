import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage guides, members, and moderation tasks
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">Pending Guides</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">Total Members</p>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">
              Approved Guides
            </p>
            <p className="text-3xl font-bold">456</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">Reports</p>
            <p className="text-3xl font-bold">8</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Guide Management</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Review, approve, or reject travel guides submitted by members
            </p>
            <div className="space-y-2">
              <Link href="/admin/dashboard/pending-guides">
                <Button variant="outline" className="w-full justify-start">
                  View Pending Guides
                </Button>
              </Link>
              <Link href="/admin/dashboard/approved-guides">
                <Button variant="outline" className="w-full justify-start">
                  View Approved Guides
                </Button>
              </Link>
              <Link href="/admin/dashboard/rejected-guides">
                <Button variant="outline" className="w-full justify-start">
                  View Rejected Guides
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">User Management</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Manage members, roles, and account status
            </p>
            <div className="space-y-2">
              <Link href="/admin/dashboard/members">
                <Button variant="outline" className="w-full justify-start">
                  Manage Members
                </Button>
              </Link>
              <Link href="/admin/dashboard/user-roles">
                <Button variant="outline" className="w-full justify-start">
                  User Roles
                </Button>
              </Link>
              <Link href="/admin/dashboard/account-status">
                <Button variant="outline" className="w-full justify-start">
                  Account Status
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Feedback & Moderation
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Monitor feedback and handle reported content
            </p>
            <div className="space-y-2">
              <Link href="/admin/dashboard/feedback">
                <Button variant="outline" className="w-full justify-start">
                  Feedback Queue
                </Button>
              </Link>
              <Link href="/admin/dashboard/reports">
                <Button variant="outline" className="w-full justify-start">
                  View Reports
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">All Guides</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              View and manage all travel guides on the platform
            </p>
            <Link href="/admin/dashboard/all-guides">
              <Button className="w-full">Manage All Guides</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
