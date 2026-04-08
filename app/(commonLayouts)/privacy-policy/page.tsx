import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-18">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-24">
        {/* Header Section */}
        <header className="mb-16 border-b border-outline-variant/30 pb-12">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            At The Digital Curator, your privacy is a priority. This document
            outlines how we handle your personal data and your rights regarding
            it.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              1. Introduction
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Welcome to The Digital Curator. We are committed to protecting
                your personal information and your right to privacy. If you have any
                questions or concerns about this privacy notice, or our practices
                with regards to your personal information, please contact us.
              </p>
              <p>
                When you visit our website and use our services, you trust us
                with your personal information. We take your privacy very
                seriously. In this privacy notice, we seek to explain to you in the
                clearest way possible what information we collect, how we use it
                and what rights you have in relation to it.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We collect personal information that you voluntarily provide to
                us when you register on the website, express an interest in
                obtaining information about us or our products and services, or
                otherwise when you contact us.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identifiers (name, email address, phone number)</li>
                <li>Login credentials and account information</li>
                <li>Travel preferences and community contributions</li>
                <li>Payment information (processed securely through third parties)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              3. How We Use Data
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We use personal information collected via our website for a
                variety of business purposes described below. We process your
                personal information for these purposes in reliance on our
                legitimate business interests.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate account creation and logon process</li>
                <li>To post testimonials and travel guides</li>
                <li>To enable user-to-user communications</li>
                <li>To manage orders and purchases</li>
                <li>To respond to user inquiries and offer support</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              4. Data Protection
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We have implemented appropriate technical and organizational
                security measures designed to protect the security of any
                personal information we process.
              </p>
              <p>
                However, please also remember that we cannot guarantee that the
                internet itself is 100% secure. Although we will do our best to
                protect your personal information, transmission of personal
                information to and from our website is at your own risk.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              5. User Rights
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Depending on your location, you may have certain rights under
                applicable data protection laws (like GDPR or CCPA). These may
                include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to request access and obtain a copy of your personal information</li>
                <li>The right to request rectification or erasure</li>
                <li>The right to restrict the processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
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
