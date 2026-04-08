import { getUserInfo } from "@/services/auth.service"
import { MyProfileCard } from "@/components/modules/profile/my-profile-card"
import Link from "next/link"

export default async function MyProfilePage() {
  const user = await getUserInfo()



  return (
    <div className="min-h-screen bg-background pt-18">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
            <p className="text-sm text-muted-foreground">
              This section shows your account information and membership details.
            </p>
          </div>
          <div>
            <Link href="/change-password" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 hover:shadow-primary/30 active:scale-95">
              {/* <Plus className="h-4 w-4" /> */}
              Change Password
            </Link>
          </div>
        </div>

        {user ? (
          <MyProfileCard user={user} />
        ) : (
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-lg font-medium">
              No profile information available.
            </p>
            <p className="text-sm text-muted-foreground">
              Please log in to view your profile.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
