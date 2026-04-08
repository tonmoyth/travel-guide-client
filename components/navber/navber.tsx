"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import swal from "sweetalert"
import { UserInfo } from "@/types/user.types"
import { logoutActionForNavber } from "@/app/actions/auth/logout"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface NavbarProps {
  userInfo?: UserInfo | null
}

export function Navbar({ userInfo }: NavbarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/travel-guides", label: "Travel Guides" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
  ]

  const isActive = (href: string) => pathname === href

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
    <nav className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl shadow-sm transition-all duration-300 dark:bg-black/60 dark:border-b dark:border-white/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-teal-900 dark:text-teal-50"
        >
          Travel Guide
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 font-heading tracking-tight md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors duration-300",
                isActive(item.href)
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-teal-900/60 hover:text-primary dark:text-white/60 dark:hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center space-x-4 md:flex">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-teal-900" />
              )}
            </button>
          )}

          {!userInfo ? (
            <>
              <Link href="/login">
                <button className="rounded-full px-6 py-2.5 font-medium text-teal-900 transition-all hover:bg-teal-50 focus:outline-none dark:text-white dark:hover:bg-white/10">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="rounded-full bg-linear-to-r from-primary to-primary-container px-6 py-2.5 font-bold text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-95 focus:outline-none">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/my-profile">
                <button className="rounded-full px-6 py-2.5 font-medium text-teal-900 transition-all hover:bg-teal-50 focus:outline-none dark:text-white dark:hover:bg-white/10">
                  My Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center space-x-2 rounded-full bg-linear-to-r from-primary to-primary-container px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 focus:outline-none disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                <span>{isLoggingOut ? "..." : "Logout"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-teal-900" />
              )}
            </button>
          )}
          <button
            className="text-teal-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white/95 backdrop-blur-xl md:hidden dark:bg-black/90"
          >
            <div className="flex flex-col space-y-4 px-8 py-8 font-heading">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium",
                    isActive(item.href)
                      ? "text-primary dark:text-primary"
                      : "text-teal-900/60 dark:text-white/60"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-teal-900/10 dark:bg-white/10" />
              {!userInfo ? (
                <div className="flex flex-col space-y-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full rounded-full px-6 py-3 font-medium text-teal-900 hover:bg-teal-50 dark:text-white dark:hover:bg-white/10">
                      Login
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <button className="w-full rounded-full bg-linear-to-r from-primary to-primary-container px-6 py-3 font-bold text-on-primary shadow-lg">
                      Register
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link href="/my-profile" onClick={() => setIsOpen(false)}>
                    <button className="w-full text-left rounded-full px-6 py-3 font-medium text-teal-900 hover:bg-teal-50 dark:text-white dark:hover:bg-white/10">
                      My Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      handleLogout()
                    }}
                    disabled={isLoggingOut}
                    className="flex items-center space-x-2 rounded-full bg-linear-to-r from-primary to-primary-container px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 focus:outline-none disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
