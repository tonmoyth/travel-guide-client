"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import Link from "next/link"

import { Compass, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerAction } from "@/app/actions/auth/register"

export function RegisterForm({ redirectPath }: { redirectPath?: string }) {
  const [loading, setLoading] = React.useState(false)

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        const registerPayload = {
          name: value.name,
          email: value.email,
          password: value.password,
        }

        const result = await registerAction(registerPayload)

        if (!result.success) {
          toast.error(result.message || "Registration failed")
          return
        }

        toast.success("Registration successful!")
      } catch (error: any) {
        if (
          error &&
          typeof error === "object" &&
          "digest" in error &&
          typeof error.digest === "string" &&
          error.digest.startsWith("NEXT_REDIRECT")
        ) {
          throw error
        }
        console.error("Registration error:", error)
        toast.error(error?.message || "An error occurred during registration")
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <main className="flex min-h-screen w-full bg-surface text-on-surface">
      {/* Left Side: Immersive Editorial Visual */}
      <aside className="relative hidden w-1/2 overflow-hidden bg-primary lg:flex">
        <img
          alt="Cinematic tropical lagoon"
          className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-soft-light"
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
          <div className="flex items-center gap-2 mt-18">
            <Compass className="h-8 w-8 text-white" />
            <h1 className="font-heading text-3xl  font-extrabold tracking-tighter text-white">
              Travel Guide
            </h1>
          </div>
          <div className="max-w-xl">

            <h2 className="font-heading mb-6 text-6xl font-bold leading-tight text-white">
              Start your curated journey today.
            </h2>
            <p className="text-xl leading-relaxed text-primary-fixed opacity-90">
              Join an exclusive community of modern travelers. Experience the
              world through an editorial lens with bespoke itineraries and
              hidden gem discovery.
            </p>
          </div>
          <div className="flex items-center gap-6">


          </div>
        </div>
      </aside>

      {/* Right Side: Clean Modern Register Form */}
      <section className="flex flex-1 items-center justify-center bg-background p-8 md:p-12 lg:p-24 lg:w-1/2">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-12 flex items-center gap-2 lg:hidden">
            <Compass className="h-8 w-8 text-primary" />
            <span className="font-heading text-xl font-bold tracking-tighter text-on-surface">
              Travel Guide
            </span>
          </div>

          <header className="mb-8">
            <h2 className="font-heading mb-2 text-4xl font-bold tracking-tight text-on-surface">
              Create Account
            </h2>
            <p className="text-sm text-on-surface/60">
              Elevate your travel experience with curated expertise.
            </p>
          </header>

          {/* Social Register Section */}
          {/* <div className="mb-8 w-full">
            <button
              type="button"
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-outline-variant py-3.5 px-4 transition-colors hover:bg-surface-container-low"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-on-surface">
                Google
              </span>
            </button>
          </div> */}

          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20" />
            </div>
            <div className="relative flex justify-center text-xs font-semibold uppercase tracking-widest">
              <span className="bg-background px-4 text-on-surface/50">
                or register with email
              </span>
            </div>
          </div>

          <form.Provider>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-5"
            >
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-1.5">
                    <label className="ml-1 text-[11px] font-semibold uppercase tracking-wider text-on-surface/80">
                      Full Name
                    </label>
                    <Input
                      placeholder="Johnathan Doe"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="h-14 w-full rounded-xl border-none bg-surface-container-low px-4 ring-1 ring-outline-variant/30 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-primary dark:focus:bg-surface-container-low"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <div className="space-y-1.5">
                    <label className="ml-1 text-[11px] font-semibold uppercase tracking-wider text-on-surface/80">
                      Email Address
                    </label>
                    <Input
                      placeholder="curator@example.com"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="h-14 w-full rounded-xl border-none bg-surface-container-low px-4 ring-1 ring-outline-variant/30 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-primary dark:focus:bg-surface-container-low"
                    />
                  </div>
                )}
              </form.Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <form.Field name="password">
                  {(field) => (
                    <div className="space-y-1.5">
                      <label className="ml-1 text-[11px] font-semibold uppercase tracking-wider text-on-surface/80">
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          field.handleChange(e.target.value)
                        }
                        className="h-14 w-full rounded-xl border-none bg-surface-container-low px-4 ring-1 ring-outline-variant/30 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-primary dark:focus:bg-surface-container-low"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="confirmPassword">
                  {(field) => (
                    <div className="space-y-1.5">
                      <label className="ml-1 text-[11px] font-semibold uppercase tracking-wider text-on-surface/80">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          field.handleChange(e.target.value)
                        }
                        className="h-14 w-full rounded-xl border-none bg-surface-container-low px-4 ring-1 ring-outline-variant/30 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-primary dark:focus:bg-surface-container-low"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="ml-1 text-[10px] text-error">
                          {field.state.meta.errors.map(String).join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="flex items-start gap-3 px-1 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-5 w-5 cursor-pointer rounded-md border-outline-variant text-primary focus:ring-primary/20"
                />
                <label
                  htmlFor="terms"
                  className="select-none text-xs leading-relaxed text-on-surface/70"
                >
                  I agree to the{" "}
                  <Link href="#" className="font-bold text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="font-bold text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-14 w-full cursor-pointer rounded-full bg-gradient-to-r from-primary to-primary-container text-sm font-semibold tracking-wide text-white shadow-lg shadow-primary/10 transition-all hover:opacity-90 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </form.Provider>

          <footer className="pt-8 text-center">
            <p className="text-sm text-on-surface/70">
              Already have an account?
              <Link
                href="/login"
                className="ml-1 font-bold text-primary decoration-2 underline-offset-4 transition-all hover:underline"
              >
                Login
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  )
}

