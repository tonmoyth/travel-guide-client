import { Button } from "@/components/ui/button"

export default function MyProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                JD
              </div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-muted-foreground">john@example.com</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Member Since:</span> Jan 2024
                </p>
                <p className="text-sm">
                  <span className="font-medium">Guides Published:</span> 5
                </p>
              </div>
              <Button className="mt-6 w-full">Edit Profile</Button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">About</h3>
              <p className="text-muted-foreground">
                An avid traveler passionate about sharing travel experiences and
                tips with the community.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
              <div className="space-y-3">
                <div className="border-b pb-3">
                  <p className="text-sm font-medium">
                    Published: "Top 10 Things to Do in Paris"
                  </p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm font-medium">
                    Published: "Hidden Gems of Tokyo"
                  </p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border"
                  />
                  <span className="text-sm">Email notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border"
                  />
                  <span className="text-sm">Community updates</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
