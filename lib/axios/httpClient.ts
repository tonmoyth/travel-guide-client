import { IResponse } from "@/types/api.types"
import axios from "axios"
import { refreshCookie } from "./refreshCookie"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables"
  )
}

// ✅ create instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 40000,
  withCredentials: true, // 🔥 important for cookies
})

// ✅ request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // ✅ attach cookie if needed
    const cookieHeader = await refreshCookie()

    if (cookieHeader) {
      config.headers["Cookie"] = cookieHeader
    }

    // ✅ ONLY set JSON when NOT FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"
    } else {
      // ❗ ensure axios handles multipart নিজে
      delete config.headers["Content-Type"]
    }

    return config
  },
  (error) => Promise.reject(error)
)

export interface HttpRequestOptions {
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

// ✅ GET
const httpGet = async <TData>(
  endPoint: string,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  const response = await axiosInstance.get<IResponse<TData>>(endPoint, {
    params: options?.params,
    headers: options?.headers,
  })
  return response.data
}

// ✅ POST
const httpPost = async <TData>(
  endPoint: string,
  data: any,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  const response = await axiosInstance.post<IResponse<TData>>(endPoint, data, {
    params: options?.params,
    headers: options?.headers,
  })
  return response.data
}

// ✅ PUT
const httpPut = async <TData>(
  endPoint: string,
  data: any,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  const response = await axiosInstance.put<IResponse<TData>>(endPoint, data, {
    params: options?.params,
    headers: options?.headers,
  })
  return response.data
}

// ✅ PATCH
const httpPatch = async <TData>(
  endPoint: string,
  data: any,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  const response = await axiosInstance.patch<IResponse<TData>>(endPoint, data, {
    params: options?.params,
    headers: options?.headers,
  })
  return response.data
}

// ✅ DELETE
const httpDelete = async <TData>(
  endPoint: string,
  options?: HttpRequestOptions
): Promise<IResponse<TData>> => {
  const response = await axiosInstance.delete<IResponse<TData>>(endPoint, {
    params: options?.params,
    headers: options?.headers,
  })
  return response.data
}

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
}
