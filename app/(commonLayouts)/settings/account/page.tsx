import Link from "next/link"

export default function AccountSettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="mt-3 text-muted-foreground">
          Update your profile, email preferences, and connected accounts.
        </p>
        <div className="mt-6 space-y-3">
          <p>Placeholder for account settings content.</p>
          <Link
            href="/settings/change-password"
            className="text-primary underline"
          >
            Change password
          </Link>
        </div>
      </div>
    </div>
  )
}
