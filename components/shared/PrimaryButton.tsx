"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ReactNode } from "react"

interface PrimaryButtonProps {
  label: string | ReactNode
  href?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
}

export default function PrimaryButton({
  label,
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: PrimaryButtonProps) {
  const button = (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.05,
              boxShadow: "0 0 30px rgba(2, 223, 227, 0.28)",
            }
      }
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className={
        "inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-30px_rgba(2,223,227,0.8)] transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none " +
        className
      }
    >
      {label}
    </motion.button>
  )

  if (href && !disabled) {
    return <Link href={href}>{button}</Link>
  }

  return button
}
