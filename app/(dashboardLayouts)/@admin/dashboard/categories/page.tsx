import { CategoriesList } from "@/components/admin/categories-list"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage travel guide categories
          </p>
        </div>
      </div>

      <CategoriesList />
    </div>
  )
}
