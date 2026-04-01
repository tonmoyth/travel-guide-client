import Link from "next/link"
import { Mail, Phone, MapPin, Share2, MessageCircle, Globe } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                TG
              </div>
              <span className="text-xl font-bold">TravelGuide</span>
            </div>
            <p className="text-gray-300">
              Discover authentic travel experiences and connect with fellow
              adventurers worldwide. Your journey starts here.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/travelguide"
                className="text-gray-400 transition hover:text-white"
                aria-label="Facebook"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/travelguide"
                className="text-gray-400 transition hover:text-white"
                aria-label="Twitter"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/travelguide"
                className="text-gray-400 transition hover:text-white"
                aria-label="Instagram"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/travel-guides"
                  className="text-gray-300 transition hover:text-white"
                >
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-300 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 transition hover:text-white"
                >
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 transition hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 transition hover:text-white"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 transition hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 transition hover:text-white"
                >
                  Send Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a
                  href="mailto:hello@travelguide.com"
                  className="text-gray-300 transition hover:text-white"
                >
                  hello@travelguide.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 transition hover:text-white"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-blue-400" />
                <address className="text-gray-300 not-italic">
                  123 Travel Street
                  <br />
                  Adventure City, AC 12345
                  <br />
                  United States
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} TravelGuide. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="#"
                className="text-gray-400 transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition hover:text-white"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition hover:text-white"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
