import { getPurchases } from "@/actions/purchases/getPurchasesAction"
import { PurchasesTable } from "@/components/purchases/PurchasesTable"
import { IResponse } from "@/types/api.types"

interface Guide {
  id: string
  title: string
  category: {
    title: string
  }
  price: number
  createdAt: string
}

export default async function PurchasesPage() {
  const result = await getPurchases()

  if (!result.success) {
    return <div>Error: {result.message}</div>
  }

  const guides = (result as IResponse<Guide[]>).data || []

  return <PurchasesTable guides={guides} />
}
