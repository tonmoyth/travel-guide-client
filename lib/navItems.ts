import { NavSection, UserRole } from "@/types/dashboard.navItems.types"
import { getDefaultDashboardRoute } from "./authUtils"

/**
 * Common navigation items for all authenticated users
 */
const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role)
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
        },
        {
          title: "Travel Guides",
          href: "/travel-guides",
          icon: "Map",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Account Settings",
          href: "/settings/account",
          icon: "Settings",
        },
        {
          title: "Change Password",
          href: "/settings/change-password",
          icon: "Lock",
        },
      ],
    },
  ]
}

/**
 * Admin navigation items
 */
const adminNavItems: NavSection[] = [
  {
    title: "Guide Management",
    items: [
      {
        title: "Pending Guides",
        href: "/admin/dashboard/pending-guides",
        icon: "Clock",
      },
      {
        title: "Approved Guides",
        href: "/admin/dashboard/approved-guides",
        icon: "CheckCircle",
      },
      {
        title: "Rejected Guides",
        href: "/admin/dashboard/rejected-guides",
        icon: "XCircle",
      },
      {
        title: "All Guides",
        href: "/admin/dashboard/all-guides",
        icon: "FileText",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Manage Members",
        href: "/admin/dashboard/members",
        icon: "Users",
      },
      {
        title: "User Roles",
        href: "/admin/dashboard/user-roles",
        icon: "Shield",
      },
      {
        title: "Account Status",
        href: "/admin/dashboard/account-status",
        icon: "Activity",
      },
    ],
  },
  {
    title: "Feedback & Moderation",
    items: [
      {
        title: "Feedback Queue",
        href: "/admin/dashboard/feedback",
        icon: "MessageSquare",
      },
      {
        title: "Reports",
        href: "/admin/dashboard/reports",
        icon: "Flag",
      },
    ],
  },
]

/**
 * Member navigation items
 */
const memberNavItems: NavSection[] = [
  {
    title: "My Guides",
    items: [
      {
        title: "Create Guide",
        href: "/member/dashboard/create-guide",
        icon: "Plus",
      },
      {
        title: "My Drafts",
        href: "/member/dashboard/drafts",
        icon: "BookOpen",
      },
      {
        title: "Published Guides",
        href: "/member/dashboard/published",
        icon: "CheckCircle",
      },
      {
        title: "My Submissions",
        href: "/member/dashboard/submissions",
        icon: "Send",
      },
    ],
  },
  {
    title: "Reviews & Feedback",
    items: [
      {
        title: "Feedback",
        href: "/member/dashboard/feedback",
        icon: "MessageSquare",
      },
      {
        title: "Guide Analytics",
        href: "/member/dashboard/analytics",
        icon: "BarChart3",
      },
    ],
  },
]

/**
 * Get navigation items based on user role
 */
export const getNavItems = (role: UserRole): NavSection[] => {
  const commonRoutes = getCommonNavItems(role)

  switch (role) {
    case "ADMIN":
      return [...commonRoutes, ...adminNavItems]
    case "MEMBER":
      return [...commonRoutes, ...memberNavItems]
    default:
      return commonRoutes
  }
}

/**
 * Get navigation items for specific section (e.g., sidebar, header menu)
 */
export const getDashboardNavItems = (role: UserRole): NavSection[] => {
  switch (role) {
    case "ADMIN":
      return adminNavItems
    case "MEMBER":
      return memberNavItems
    default:
      return []
  }
}
