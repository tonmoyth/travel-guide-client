"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
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
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>

        <form.Provider>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <CardContent className="space-y-4">
              <form.Field name="name">
                {(field) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
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
                  </Field>
                )}
              </form.Field>

              <form.Field name="confirmPassword">
                {(field) => (
                  <Field>
                    <FieldLabel>Confirm Password</FieldLabel>
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
                {loading ? "Loading..." : "Register"}
              </Button>

              <Link href="/login">Already have account?</Link>
            </CardFooter>
          </form>
        </form.Provider>
      </Card>
    </div>
  )
}
