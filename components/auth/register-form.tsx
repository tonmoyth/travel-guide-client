"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement register logic with backend
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join our community of travel enthusiasts
          </p>
        </div>

        <div className="rounded-lg border bg-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
