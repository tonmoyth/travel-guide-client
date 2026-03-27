import { UserRole } from "@/types/dashboard.navItems.types"

/**
 * Get default dashboard route based on user role
 */
export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard"
    case "MEMBER":
      return "/member/dashboard"
    default:
      return "/"
  }
}

/**
 * Check if user is admin
 */
export const isAdmin = (role: UserRole): boolean => {
  return role === "ADMIN"
}

/**
 * Check if user is member
 */
export const isMember = (role: UserRole): boolean => {
  return role === "MEMBER"
}

/**
 * Get user role from token or session
 * This is a placeholder - implement with your auth system
 */
export const getUserRole = (): UserRole => {
  // TODO: Implement with your authentication system
  return "GUEST"
}
