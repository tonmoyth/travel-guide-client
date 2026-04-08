import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn about how we use cookies to improve your experience on Travel Guide.",
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-18">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-24">
        {/* Header Section */}
        <header className="mb-16 border-b border-outline-variant/30 pb-12">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            This policy explains how The Digital Curator uses cookies and
            similar technologies to recognize you when you visit our website.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              1. What are Cookies?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cookies are small data files that are placed on your computer or
                mobile device when you visit a website. Cookies are widely used
                by website owners in order to make their websites work, or to
                work more efficiently, as well as to provide reporting
                information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              2. How We Use Cookies
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We use first-party and third-party cookies for several reasons.
                Some cookies are required for technical reasons in order for our
                website to operate, and we refer to these as "essential" or
                "strictly necessary" cookies. Other cookies enable us to track
                and target the interests of our users to enhance the experience
                on our online properties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              3. Types of Cookies We Use
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6">
                <h3 className="mb-2 font-bold text-foreground">Essential Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Required for basic site functionality, such as user login and
                  security authentication.
                </p>
              </div>
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6">
                <h3 className="mb-2 font-bold text-foreground">Analytics Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with the website by
                  collecting and reporting information anonymously.
                </p>
              </div>
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6">
                <h3 className="mb-2 font-bold text-foreground">Personalization Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Used to remember your preferences, such as your language or
                  region.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              4. User Control
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                You have the right to decide whether to accept or reject
                cookies. You can set or amend your web browser controls to
                accept or refuse cookies. If you choose to refuse cookies, you
                may still use our website though your access to some
                functionality and areas of our website may be restricted.
              </p>
              <p>
                To learn more about how to manage cookies on your specific
                browser, please visit your browser's help pages.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Info */}
        <footer className="mt-24 border-t border-outline-variant/30 pt-12 text-sm text-muted-foreground/60">
          Last updated: October 2023
        </footer>
      </div>
    </div>
  )
}
