"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/travel-guides", label: "Travel Guides" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
  ]

  const authItems = [
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
              TG
            </div>
            <span className="text-xl font-bold text-foreground">
              TravelGuide
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className="font-medium"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Auth & Profile - Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {/* <Link href={profileItem.href}>
              <Button
                variant={isActive(profileItem.href) ? "default" : "ghost"}
                className="font-medium"
              >
                {profileItem.label}
              </Button>
            </Link> */}
            <div className="h-6 w-px bg-border"></div>
            {authItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "outline"}
                  className="font-medium"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
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
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
