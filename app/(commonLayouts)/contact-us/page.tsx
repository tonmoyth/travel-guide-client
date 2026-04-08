import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Button from "@/components/shared/Button"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Travel Guide team. We're here to help with your questions about guides, partnerships, and more.",
}

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background pt-18">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-24">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Have a question about our travel guides or want to partner with us?
            We'd love to hear from you.
          </p>
        </header>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-12">
            <section>
              <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">
                Get in Touch
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Email</h3>
                    <p className="text-muted-foreground">support@digitalcurator.com</p>
                    <p className="text-muted-foreground">partnerships@digitalcurator.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 000-0000</p>
                    <p className="text-muted-foreground">Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Office</h3>
                    <p className="text-muted-foreground">
                      123 Curation Way, Suite 100<br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="rounded-3xl bg-surface-container-low p-8 ring-1 ring-outline-variant/30">
              <h3 className="mb-2 font-bold text-foreground">Support Hours</h3>
              <p className="text-sm text-muted-foreground">
                Our team typically responds to all inquiries within 24-48 business
                hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-outline-variant/30 bg-card p-8 shadow-xl sm:p-12">
            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="h-12 rounded-xl bg-background"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 rounded-xl bg-background"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help?"
                  className="min-h-[150px] rounded-xl bg-background pt-3"
                />
              </div>

              <Button
                label={
                  <div className="flex items-center gap-2">
                    Send Message
                    <Send className="h-4 w-4" />
                  </div>
                }
                className="w-full h-14"
                variant="primary"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
