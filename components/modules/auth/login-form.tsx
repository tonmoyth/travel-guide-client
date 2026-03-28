"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import Link from "next/link"

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

export function LoginForm({ redirectPath }: { redirectPath?: string }) {
  const [loading, setLoading] = React.useState(false)

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

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
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
                    <FieldLabel>Email</FieldLabel>
                    <Input
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
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors.map(String)} />
                  </Field>
                )}
              </form.Field>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>

              <Link href="/register">Create account</Link>
            </CardFooter>
          </form>
        </form.Provider>
      </Card>
    </div>
  )
}
