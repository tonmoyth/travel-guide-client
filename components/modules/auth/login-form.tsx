"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import Link from "next/link"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginAction } from "@/app/actions/auth/login"
import { googleLoginAction } from "@/app/actions/auth/googleLogin"

export function LoginForm({ redirectPath }: { redirectPath?: string }) {
  const [loading, setLoading] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)

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
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>

        <form.Provider>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <CardContent className="space-y-4">
              <form.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors.map(String)} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors.map(String)} />
                  </Field>
                )}
              </form.Field>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                {/* <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div> */}
              </div>

              {/* <Button
                type="button"
                variant="outline"
                disabled={googleLoading}
                onClick={handleGoogleLogin}
                className="w-full"
                size="lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                {googleLoading ? "Signing in..." : "Google"}
              </Button> */}

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <Link
                  href="/register"
                  className="font-semibold text-primary hover:underline"
                >
                  Create account
                </Link>
              </div>
            </CardFooter>
          </form>
        </form.Provider>
      </Card>
    </div>
  )
}
