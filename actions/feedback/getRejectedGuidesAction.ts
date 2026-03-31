"use server"

import { httpClient } from "@/lib/axios/httpClient"

export async function getRejectedGuides() {
  try {
    const response = await httpClient.get("/members/rejected-guides")
    return response
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
