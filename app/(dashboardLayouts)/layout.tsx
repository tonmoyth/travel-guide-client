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
  // TODO: Implement role-based rendering
  // For now, render all slots
  return (
    <div>
      {/* {children} */}
      {admin}
      {/* {member} */}
    </div>
  )
}
