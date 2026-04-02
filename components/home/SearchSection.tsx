"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin } from "lucide-react"
import { axiosInstance } from "@/lib/axios/httpClient"

export default function SearchSection() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim())
    }
    if (category && category !== "all") {
      params.set("categoryId", category)
    }

    const queryString = params.toString()
    const targetPath = pathname.startsWith("/travel-guides")
      ? `/travel-guides${queryString ? `?${queryString}` : ""}`
      : `/travel-guides${queryString ? `?${queryString}` : ""}`

    router.push(targetPath)
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Discover Amazing Travel Guides
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find the perfect destination and get insider tips from fellow
            travelers
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#1989A3]/30 shadow-xl">
            <div className="p-8">
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search
                      className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
                      style={{ color: "#1989A3" }}
                    />
                    <Input
                      type="text"
                      placeholder="Search destinations, activities, or guides..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="border-[#1989A3]/30 bg-[#1989A3]/5 py-3 pl-12 text-base focus:border-[#1989A3] focus:bg-white focus:ring-[#1989A3]"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSearch}
                  className="inline-flex items-center justify-center gap-2 rounded-full text-white shadow-md transition hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: "#1989A3",
                    padding: "0.75rem 1.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#4920D4"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#1989A3"
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor = "#3A1AA3"
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor = "#4920D4"
                  }}
                >
                  <Search className="h-5 w-5" />
                  <span className="text-base font-semibold">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1989A3]/30 px-4 py-2 shadow-md">
            <MapPin className="h-4 w-4" style={{ color: "#1989A3" }} />
            <span className="text-sm font-medium text-foreground">
              Popular: Paris, Tokyo, Bali, Barcelona
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
