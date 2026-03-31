import { getGuideDetails } from "@/actions/purchases/getGuideDetailsAction"
import { GuideDetails } from "@/components/purchases/GuideDetails"
import { IResponse } from "@/types/api.types"

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

export default async function PurchaseDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const result = await getGuideDetails(id)

  if (!result.success) {
    return <div>Error: {result.message}</div>
  }

  const guide = (result as IResponse<Guide>).data

  if (!guide) {
    return <div>Guide not found</div>
  }

  return <GuideDetails guide={guide} />
}
