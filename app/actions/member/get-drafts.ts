"use server"

import { axiosInstance } from "@/lib/axios/httpClient"
import { IResponse } from "@/types/api.types"

export interface IQueryResult<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface DraftGuide {
  id: string
  memberId: string
  categoryId: string
  title: string
  description: string
  itinerary: string
  status: string
  isPaid: boolean
  price: number
  coverImage: string
  isDeleted: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  guideMedia: Array<{
    id: string
    guideId: string
    type: string
    url: string
    createdAt: string
    updatedAt: string
  }>
  votes: any[]
  comments: any[]
  category: {
    id: string
    slug: string
    title: string
    description: string
    isDeleted: boolean
    deletedAt: string | null
    createdAt: string
    updatedAt: string
  }
}

export interface GetDraftsResponse {
  data: IQueryResult<DraftGuide>
  success: boolean
  message: string
}

export async function getDrafts(
  page: number = 1,
  limit: number = 10,
  sort?: string,
  search?: string
): Promise<GetDraftsResponse> {
  try {
    const instance = axiosInstance

    const params: Record<string, any> = {
      page,
      limit,
    }

    if (sort) {
      params.sort = sort
    }

    if (search) {
      params.search = search
    }

    const response = await instance.get<IResponse<IQueryResult<DraftGuide>>>(
      "/travel-guides/draft-guides",
      {
        params,
      }
    )

    return {
      success: response.data?.success ?? false,
      message: response.data?.message ?? "",
      data: response.data?.data as IQueryResult<DraftGuide>,
    }
  } catch (error) {
    console.error("Failed to fetch draft guides:", error)
    throw error
  }
}
