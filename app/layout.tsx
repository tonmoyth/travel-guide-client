import { Metadata, Viewport } from "next"
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerToaster } from "@/components/sonner-toaster"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Travel Guide Team",
      url: "https://travelguide.com",
    },
  ],
  creator: "Travel Guide Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://travel-guide-client-nine.vercel.app/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/assets/hero.png"],
    creator: "@travelguide",
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        plusJakartaSans.variable
      )}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn(inter.className, plusJakartaSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
