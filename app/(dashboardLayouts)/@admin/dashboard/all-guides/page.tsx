import { AllGuidesList } from "@/components/admin/all-guides-list"

export default function AllGuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Guide Management</h1>
          <p className="mt-2 text-muted-foreground">
            View, edit, and manage all travel guides
          </p>
        </div>

        <AllGuidesList />
      </div>
    </div>
  )
}
