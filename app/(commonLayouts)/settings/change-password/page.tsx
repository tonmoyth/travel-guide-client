import Link from "next/link"

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p className="mt-3 text-muted-foreground">
          Secure your account by updating your password regularly.
        </p>
        <div className="mt-6 rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">(UI form goes here)</p>
          <Link href="/settings/account" className="text-primary underline">
            Back to account settings
          </Link>
        </div>
      </div>
    </div>
  )
}
