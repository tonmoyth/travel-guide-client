"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import swal from "sweetalert"
import { UserInfo } from "@/types/user.types"
import { logoutActionForNavber } from "@/app/actions/auth/logout"

interface NavbarProps {
  userInfo?: UserInfo | null
}

export function Navbar({ userInfo }: NavbarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/travel-guides", label: "Travel Guides" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
  ]

  const authItems = userInfo
    ? [{ href: "/my-profile", label: "My Profile" }]
    : [
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
      ]

  const isActive = (href: string) => pathname === href

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return

    const shouldLogout = await swal({
      title: "Are you sure?",
      text: "You will be logged out from the application.",
      icon: "warning",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    })

    if (!shouldLogout) return

    setIsLoggingOut(true)
    try {
      await logoutActionForNavber()
    } catch (error) {
      console.error("Logout failed:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="Travel Guide Logo"
              width={100}
              height={100}
              className="rounded"
            />
            {/* <span className="text-xl font-bold text-foreground">
              TravelGuide
            </span> */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className="cursor-pointer font-medium"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Auth & Profile - Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <div className="h-6 w-px bg-border" />
            {authItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "outline"}
                  className="cursor-pointer font-medium"
                >
                  {item.label}
                </Button>
              </Link>
            ))}

            {userInfo && (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="cursor-pointer font-medium"
                disabled={isLoggingOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t bg-background py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="w-full justify-start font-medium"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="my-2 h-px bg-border"></div>
              {/* <Link href={profileItem.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant={isActive(profileItem.href) ? "default" : "ghost"}
                  className="w-full justify-start font-medium"
                >
                  {profileItem.label}
                </Button>
              </Link> */}
              <div className="my-2 h-px bg-border"></div>
              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(item.href) ? "default" : "outline"}
                    className="w-full justify-start font-medium"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}

              {userInfo && (
                <Button
                  variant="outline"
                  className="w-full justify-start font-medium"
                  onClick={async () => {
                    setIsOpen(false)
                    await handleLogout()
                  }}
                  disabled={isLoggingOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
