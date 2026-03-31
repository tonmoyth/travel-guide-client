import { Badge } from "@/components/ui/badge"

interface Guide {
  id: string
  title: string
  description?: string
  itinerary?: string
  category: {
    title: string
  }
  price: number
  coverImage?: string
  createdAt: string
  member?: {
    name: string
  }
}

interface GuideDetailsModalProps {
  guide: Guide
}

export function GuideDetailsModal({ guide }: GuideDetailsModalProps) {
  const itinerary = guide.itinerary ? JSON.parse(guide.itinerary) : []

  return (
    <div className="space-y-4">
      {guide.coverImage && (
        <img
          src={guide.coverImage}
          alt={guide.title}
          className="h-64 w-full rounded-md object-cover"
        />
      )}
      <div>
        <h2 className="text-2xl font-bold">{guide.title}</h2>
        <Badge className="mt-2">{guide.title}</Badge>
        <p className="mt-2 text-sm text-gray-600">
          Created by: {guide.member?.name || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">Price: ${guide.price}</p>
        <p className="text-sm text-gray-600">
          Created At: {new Date(guide.createdAt).toLocaleDateString()}
        </p>
      </div>
      {guide.description && (
        <div>
          <h3 className="font-semibold">Description</h3>
          <p>{guide.description}</p>
        </div>
      )}
      {itinerary.length > 0 && (
        <div>
          <h3 className="font-semibold">Itinerary</h3>
          <div className="space-y-2">
            {itinerary.map((day: any, index: number) => (
              <div key={index} className="rounded border p-2">
                <h4 className="font-medium">
                  Day {day.day}: {day.title}
                </h4>
                <p>{day.activities?.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
