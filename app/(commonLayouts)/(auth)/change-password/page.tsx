import Link from "next/link"

export default function ChangePasswordShortPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p className="mt-3 text-muted-foreground">
          Redirected route for /change-password.
        </p>
        <Link
          href="/settings/change-password"
          className="text-primary underline"
        >
          Go to settings change password page
        </Link>
      </div>
    </div>
  )
}
