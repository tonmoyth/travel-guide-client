"use server"

import { cookies } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function sendMessageToAIAction(
  message: string
): Promise<{ success: boolean; reply?: string; message?: string }> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    const session = cookieStore.get("better-auth.session_token")?.value

    if (!accessToken || !session) {
      return { success: false, message: "Not authenticated" }
    }

    const response = await fetch(`${BASE_URL}/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}; better-auth.session_token=${session}`,
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData?.message || `Request failed with status ${response.status}`,
      }
    }

    const data = await response.json()

    if (!data.success) {
      return { success: false, message: data.message || "AI request failed" }
    }

    return { success: true, reply: data.data }
  } catch (error: any) {
    console.error("Error sending message to AI:", error)
    return { success: false, message: error?.message || "Something went wrong" }
  }
}
