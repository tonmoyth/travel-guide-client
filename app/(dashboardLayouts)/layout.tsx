import DashboardNavber from "@/components/modules/dasboard/DashboardNavber"
import DashboardSidebar from "@/components/modules/dasboard/DashboardSidebar"

type DashboardLayoutProps = {
  children: React.ReactNode
  admin: React.ReactNode
  member: React.ReactNode
}

export default function DashboardLayout({
  children,
  admin,
  member,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Dashboard Sidebar */}
      <DashboardSidebar></DashboardSidebar>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* DashboardNavbar */}
        <DashboardNavber></DashboardNavber>
        {/* <DashboardNavbar /> */}
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div>{admin || member || children}</div>
        </main>
      </div>
    </div>
  )
}
