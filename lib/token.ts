"use server"

import { cookies } from "next/headers"

interface TokenPayload {
  accessToken: string
  refreshToken: string
  "better-auth.session_token": string
}

export async function setTokenInCookie(payload: TokenPayload) {
  try {
    const cookieStore = await cookies()

    cookieStore.set("accessToken", payload.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    cookieStore.set("refreshToken", payload.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    cookieStore.set(
      "better-auth.session_token",
      payload["better-auth.session_token"],
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      }
    )

    return true
  } catch (error) {
    console.error("Error setting tokens in cookies:", error)
    return false
  }
}

export async function getTokenFromCookie(
  tokenName: string
): Promise<string | undefined> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(tokenName)
    return token?.value
  } catch (error) {
    console.error("Error getting token from cookies:", error)
    return undefined
  }
}

export async function clearTokens() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")
    cookieStore.delete("better-auth.session_token")
    return true
  } catch (error) {
    console.error("Error clearing tokens:", error)
    return false
  }
}
