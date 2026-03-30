import { refreshCookie } from "@/lib/axios/refreshCookie"
import { IResponse } from "@/types/api.types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface IQueryResult<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface DraftGuide {
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

interface GetDraftsResponse {
  data: IQueryResult<DraftGuide>
  success: boolean
  message: string
}

interface UpdateDraftPayload {
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

const travelGuideServices = {
  getDrafts: async (
    page: number = 1,
    limit: number = 10,
    sort?: string,
    search?: string
  ): Promise<GetDraftsResponse> => {
    try {
      const url = new URL(`${API_BASE_URL}/travel-guides/draft-guides`)

      url.searchParams.append("page", String(page))
      url.searchParams.append("limit", String(limit))

      if (sort) {
        url.searchParams.append("sort", sort)
      }
      if (search) {
        url.searchParams.append("search", search)
      }

      const cookieHeader = await refreshCookie()

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        next: {
          revalidate: 60, // Revalidate every 60 seconds
          tags: ["draft-guides"],
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch draft guides")
      }

      const data: IResponse<IQueryResult<DraftGuide>> = await response.json()

      return {
        data: data.data as IQueryResult<DraftGuide>,
        success: data.success ?? false,
        message: data.message ?? "",
      }
    } catch (error: any) {
      console.error("Failed to fetch draft guides:", error)
      throw error
    }
  },

  updateGuide: async (
    guideId: string,
    payload: UpdateDraftPayload
  ): Promise<DraftGuide> => {
    try {
      const url = new URL(`${API_BASE_URL}/travel-guides/${guideId}`)
      const cookieHeader = await refreshCookie()

      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to update guide")
      }

      const data: IResponse<DraftGuide> = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Failed to update guide")
      }

      return data.data as DraftGuide
    } catch (error: any) {
      console.error("Failed to update guide:", error)
      throw error
    }
  },

  updateStatus: async (guideId: string): Promise<DraftGuide> => {
    try {
      const url = new URL(
        `${API_BASE_URL}/travel-guides/${guideId}/submit-for-review`
      )
      const cookieHeader = await refreshCookie()

      const response = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to submit guide for review")
      }

      const data: IResponse<DraftGuide> = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Failed to submit guide for review")
      }

      return data.data as DraftGuide
    } catch (error: any) {
      console.error("Failed to submit guide for review:", error)
      throw error
    }
  },

  deleteDraft: async (guideId: string): Promise<boolean> => {
    console.log("Deleting guide with ID:", guideId)
    try {
      const url = new URL(`${API_BASE_URL}/travel-guides/${guideId}`)
      const cookieHeader = await refreshCookie()

      const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete draft")
      }

      const data: IResponse<null> = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Failed to delete draft")
      }

      return true
    } catch (error: any) {
      console.error("Failed to delete draft:", error)
      throw error
    }
  },

  getSubmission: async (
    page: number = 1,
    limit: number = 10,
    sort?: string,
    search?: string
  ): Promise<GetDraftsResponse> => {
    try {
      const url = new URL(`${API_BASE_URL}/travel-guides/my-approved-guides`)

      url.searchParams.append("page", String(page))
      url.searchParams.append("limit", String(limit))

      if (sort) {
        url.searchParams.append("sort", sort)
      }
      if (search) {
        url.searchParams.append("search", search)
      }

      const cookieHeader = await refreshCookie()

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        next: {
          revalidate: 60,
          tags: ["approved-guides"],
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch approved guides")
      }

      const data: IResponse<IQueryResult<DraftGuide>> = await response.json()

      return {
        data: data.data as IQueryResult<DraftGuide>,
        success: data.success ?? false,
        message: data.message ?? "",
      }
    } catch (error: any) {
      console.error("Failed to fetch approved guides:", error)
      throw error
    }
  },

  getUnderReview: async (
    page: number = 1,
    limit: number = 10,
    sort?: string,
    search?: string
  ): Promise<GetDraftsResponse> => {
    try {
      const url = new URL(
        `${API_BASE_URL}/travel-guides/my-under-review-guides`
      )

      url.searchParams.append("page", String(page))
      url.searchParams.append("limit", String(limit))

      if (sort) {
        url.searchParams.append("sort", sort)
      }
      if (search) {
        url.searchParams.append("search", search)
      }

      const cookieHeader = await refreshCookie()

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        next: {
          revalidate: 60,
          tags: ["under-review-guides"],
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch under review guides")
      }

      const data: IResponse<IQueryResult<DraftGuide>> = await response.json()

      return {
        data: data.data as IQueryResult<DraftGuide>,
        success: data.success ?? false,
        message: data.message ?? "",
      }
    } catch (error: any) {
      console.error("Failed to fetch under review guides:", error)
      throw error
    }
  },
}

export default travelGuideServices
