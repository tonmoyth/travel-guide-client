"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAction } from "@/app/actions/auth/login"
import { googleLoginAction } from "@/app/actions/auth/googleLogin"

export function LoginForm({ redirectPath }: { redirectPath?: string }) {
  const [loading, setLoading] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        const result = await loginAction(value, redirectPath)

        if (!result.success) {
          toast.error(result.message || "Login failed")
          return
        }

        toast.success("Login successful!")
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
        console.error("Login error:", error)
        toast.error(error?.message || "An error occurred during login")
      } finally {
        setLoading(false)
      }
    },
  })

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      await googleLoginAction(redirectPath)
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
      console.error("Google login error:", error)
      toast.error(error?.message || "Google login failed")
      setGoogleLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen w-full bg-surface text-on-surface">
      {/* Left Side: Immersive Editorial Visual */}
      <section className="relative hidden w-1/2 overflow-hidden bg-primary lg:flex">
        <img
          alt="Cinematic mountain landscape"
          className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply"
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
        />
        {/* Branding Overlay */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
          <div>
            <h1 className="font-heading mt-20 text-4xl font-extrabold tracking-tighter text-on-primary-container">
              Travel Guide
            </h1>
          </div>
          <div className="max-w-md">
            <p className="font-label mb-4 text-xs uppercase tracking-[0.2em] text-secondary-container">
              Volume IV: Alpine Serenity
            </p>
            <h2 className="font-heading mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-white">
              Discover the world <br />
              through an <span className="italic font-light text-primary-fixed">edited lens.</span>
            </h2>
            <p className="text-lg leading-relaxed text-on-primary-container/80">
              Join our exclusive community of travelers who value the art of
              discovery and the luxury of quiet moments.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-on-primary-container/30" />
          </div>
        </div>
        {/* Subtle Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </section>

      {/* Right Side: Clean Modern Login Form */}
      <section className="flex w-full flex-col items-center justify-center bg-background p-8 md:p-16  lg:w-1/2">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Mobile Branding */}
          <div className="mb-12 lg:hidden">
            <h1 className="font-heading text-2xl font-black tracking-tighter text-primary">
              Travel Guide
            </h1>
          </div>

          {/* Form Header */}
          <header className="mb-10">
            <h2 className="font-heading mb-2 text-3xl font-bold tracking-tight text-on-surface-variant">
              Welcome Back
            </h2>
            <p className="text-sm text-on-surface-variant">
              Please enter your details to access your curated collection.
            </p>
          </header>

          <form.Provider>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-6"
            >
              <form.Field name="email">
                {(field) => (
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="ml-1 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="curator@journal.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-14 rounded-xl border-none bg-surface-container-low px-4 ring-1 ring-outline-variant/30 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-primary dark:focus:bg-surface-container-low"
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="ml-1 text-xs text-error">
                        {field.state.meta.errors.map(String).join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between px-1">
                      <label
                        htmlFor="password"
                        className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-14 rounded-xl border-none bg-surface-container-low px-4 ring-1 ring-outline-variant/30 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-primary dark:focus:bg-surface-container-low"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-outline-variant transition-colors hover:text-black-variant"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="ml-1 text-xs text-error">
                        {field.state.meta.errors.map(String).join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <Button
                type="submit"
                disabled={loading}
                className="h-14 w-full cursor-pointer rounded-full bg-gradient-to-r from-primary to-primary-container text-sm font-semibold tracking-wide text-on-primary shadow-lg shadow-primary/10 transition-all hover:opacity-90 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </form.Provider>

          {/* Social Login Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20" />
            </div>
            {/* <div className="relative flex justify-center text-xs font-semibold uppercase tracking-widest">
              <span className=" px-4 text-on-surface-variant ">
                Or continue with
              </span>
            </div> */}
          </div>

          {/* Social Buttons */}
          {/* <div className="w-full">
            <button
              type="button"
              disabled={googleLoading}
              onClick={handleGoogleLogin}
              className="group flex w-full items-center justify-center gap-3 rounded-xl py-3.5 px-4 ring-1 ring-outline-variant/30 transition-colors hover:bg-surface-container disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="fill-[#4285F4]"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="fill-[#34A853]"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  className="fill-[#FBBC05]"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  className="fill-[#EA4335]"
                />
              </svg>
              <span className="text-sm font-medium text-on-surface-variant">
                {googleLoading ? "Connecting..." : "Google"}
              </span>
            </button>
          </div> */}

          {/* Footer Link */}
          <p className="mt-12 text-center text-on-surface-variant">
            Don't have an account?
            <Link
              href="/register"
              className="ml-1 font-bold text-primary decoration-2 underline-offset-4 transition-all hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
