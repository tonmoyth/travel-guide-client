import { Navbar } from "@/components/navber/navber"

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
