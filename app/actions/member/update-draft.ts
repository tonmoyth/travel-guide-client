"use server"

import { axiosInstance } from "@/lib/axios/httpClient"
import { DraftGuide } from "@/app/actions/member/get-drafts"
import { IResponse } from "@/types/api.types"

export interface UpdateDraftPayload {
  title?: string
  destination?: string
  description?: string
  categoryId?: string
  itinerary?: any
  status?: string
  isPaid?: boolean
  price?: number
  coverImage?: string
}

export async function updateDraft(
  guideId: string,
  payload: UpdateDraftPayload
): Promise<DraftGuide> {
  try {
    const instance = axiosInstance

    const response = await instance.put<IResponse<DraftGuide>>(
      `/travel-guides/${guideId}`,
      payload
    )

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to update draft")
    }

    return response.data.data as DraftGuide
  } catch (error) {
    console.error("Failed to update draft:", error)
    throw error
  }
}
