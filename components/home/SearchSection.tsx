"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
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
  const [categories, setCategories] = useState<
    {
      id: string
      title: string
      slug?: string
    }[]
  >([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories")

        let data: any[] = []
        if (response?.data?.data && Array.isArray(response.data.data)) {
          data = response.data.data
        } else if (Array.isArray(response.data)) {
          data = response.data
        }

        const normalized = data.map((cat: any) => ({
          id: String(cat.id || cat._id || cat.slug || cat.title || cat.name),
          title: cat.title || cat.name || String(cat.slug || cat.id || ""),
          slug: cat.slug,
        }))

        setCategories(normalized)
      } catch (error) {
        console.error("SearchSection: failed to load categories", error)
      }
    }

    loadCategories()
  }, [])

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
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Discover Amazing Travel Guides
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find the perfect destination and get insider tips from fellow
            travelers
          </p>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search destinations, activities, or guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* <div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            <Button onClick={handleSearch} className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              Popular: Paris, Tokyo, Bali
            </span>
          </div>
        </div> */}
      </div>
    </section>
  )
}
