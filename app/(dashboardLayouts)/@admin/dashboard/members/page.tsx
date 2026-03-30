import { MembersList } from "@/components/admin/members-list"

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Member Management</h1>
          <p className="mt-2 text-muted-foreground">
            Activate/deactivate accounts and manage member roles
          </p>
        </div>

        <MembersList />
      </div>
    </div>
  )
}
