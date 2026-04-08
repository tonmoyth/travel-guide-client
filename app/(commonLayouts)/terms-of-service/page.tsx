import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the terms and conditions for using the Travel Guide platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background pt-18">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-24">
        {/* Header Section */}
        <header className="mb-16 border-b border-outline-variant/30 pb-12 text-center sm:text-left">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            By accessing or using The Digital Curator, you agree to be bound by
            these terms. Please read them carefully.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Digital Curator provides its services to you subject to the
                following Terms of Service, which may be updated from time to
                time without notice to you. Your continued use of the service
                after any such changes constitutes your acceptance of the new
                terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              2. User Responsibilities
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a user of The Digital Curator, you represent and warrant that
                any information you provide to us is accurate, complete, and
                current. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring the content you post does not violate any laws or third-party rights</li>
                <li>Restricting access to your account to yourself and authorized persons only</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              3. Account Usage
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                To access certain features of the service, you must register for
                an account. You agree to provide and maintain true, accurate,
                current, and complete information. Users are limited to one
                account per person. Commercial use of the account for
                advertising or non-personal travel curation requires explicit
                written consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              4. Limitations of Liability
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Digital Curator is provided "as is" and "as available." To
                 the maximum extent permitted by law, we shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or revenues, whether
                incurred directly or indirectly, or any loss of data, use,
                goodwill, or other intangible losses.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              5. Termination
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We reserve the right, without notice and in our sole
                discretion, to terminate or suspend your account and your
                ability to use the service for any reason, including but not
                limited to misuse of the platform or violation of these terms.
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
