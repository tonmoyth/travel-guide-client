import { IResponse } from "@/types/api.types"
import axios from "axios"
import { refreshCookie } from "./refreshCookie"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables"
  )
}

export const axiosInstance = async () => {
  //   const cookieHeader = await refreshCookie()

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      //   Cookie: cookieHeader,
    },
  })

  return instance
}

export interface HttpRequestOptions {
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

const httpGet = async <TData>(
  endPoint: string,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  try {
    const instance = await axiosInstance()
    const response = await instance.get<IResponse<TData>>(endPoint, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  } catch (error) {
    console.error("HTTP GET request failed:", error)
    throw error
  }
}

const httpPost = async <TData>(
  endPoint: string,
  data: any,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  try {
    console.log("Making HTTP POST request to:", endPoint, "with data:", data) // Debug log
    const instance = await axiosInstance()
    const response = await instance.post<IResponse<TData>>(endPoint, data, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  } catch (error) {
    console.error("HTTP POST request failed:", error)
    throw error
  }
}

const httpPut = async <TData>(
  endPoint: string,
  data: any,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  try {
    const instance = await axiosInstance()
    const response = await instance.put<IResponse<TData>>(endPoint, data, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  } catch (error) {
    console.error("HTTP PUT request failed:", error)
    throw error
  }
}

const httpPatch = async <TData>(
  endPoint: string,
  data: any,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  try {
    const instance = await axiosInstance()
    const response = await instance.patch<IResponse<TData>>(endPoint, data, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  } catch (error) {
    console.error("HTTP PATCH request failed:", error)
    throw error
  }
}

const httpDelete = async <TData>(
  endPoint: string,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  try {
    const instance = await axiosInstance()
    const response = await instance.delete<IResponse<TData>>(endPoint, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  } catch (error) {
    console.error("HTTP DELETE request failed:", error)
    throw error
  }
}

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
}
