import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-teal-50 dark:bg-black/40 dark:border-t dark:border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-12 py-16 md:flex-row">
        <div className="mb-8 space-y-4 text-center md:mb-0 md:text-left">
          <div className="text-xl font-bold text-teal-900 dark:text-teal-50">
            The Digital Curator
          </div>
          <p className="max-w-xs font-sans text-sm tracking-wide text-teal-900/50 dark:text-white/40">
            Elevating the art of travel through meticulous curation and
            storytelling.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex flex-wrap justify-center gap-8 font-sans text-sm tracking-wide">
            <Link
              className="text-teal-900/50 transition-colors hover:text-teal-700 dark:text-white/40 dark:hover:text-primary"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-teal-900/50 transition-colors hover:text-teal-700 dark:text-white/40 dark:hover:text-primary"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-teal-900/50 transition-colors hover:text-teal-700 dark:text-white/40 dark:hover:text-primary"
              href="#"
            >
              Cookie Policy
            </Link>
            <Link
              className="text-teal-900/50 transition-colors hover:text-teal-700 dark:text-white/40 dark:hover:text-primary"
              href="#"
            >
              Contact Us
            </Link>
          </div>
          <div className="font-sans text-sm tracking-wide text-teal-900/50 dark:text-white/30 text-center md:text-right">
            © {currentYear} The Digital Curator. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
