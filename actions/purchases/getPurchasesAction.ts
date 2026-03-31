"use server"

import { httpClient } from "@/lib/axios/httpClient"

export async function getPurchases() {
  try {
    const response = await httpClient.get("/members/purchases")
    return response
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
