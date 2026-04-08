"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Lock, ArrowLeft, Loader2, AlertCircle, ShieldCheck, Zap, Map, CheckCircle2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import travelGuideServices from "@/services/travelGuide/travelGuide.service"
import { initiatePaymentAction } from "@/actions/payment/initiatePaymentAction"
import Image from "next/image"

interface GuideDetails {
  id: string
  title: string
  description: string
  price: number
  category: {
    title: string
  }
  member?: {
    name: string
  }
  coverImage?: string
  createdAt?: string
}

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const guideId = searchParams.get("guideId")

  const [guide, setGuide] = useState<GuideDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGuide = async () => {
      if (!guideId) {
        setError("No guide ID provided")
        setLoading(false)
        return
      }

      try {
        const response = await travelGuideServices.getById(guideId)
        if (response.success && response.data) {
          console.log("response.data", response.data)
          setGuide(response.data as GuideDetails)
        } else {
          setError("Failed to fetch guide details")
        }
      } catch (err: any) {
        console.error("Error fetching guide:", err)
        setError("Failed to load guide information")
      } finally {
        setLoading(false)
      }
    }

    fetchGuide()
  }, [guideId])


  const handlePayment = async () => {
    if (!guideId) {
      toast.error("Guide ID is missing")
      return
    }

    setProcessing(true)
    try {
      const formData = new FormData()
      formData.append("guideId", guideId)

      const result = await initiatePaymentAction(formData)

      if (result.success && result.data?.checkoutUrl) {
        toast.success("Redirecting to payment...")
        window.location.href = result.data.checkoutUrl
      } else {
        toast.error(result.message || "Failed to initiate payment")
        setError(result.message || "Failed to initiate payment")
      }
    } catch (error: any) {
      console.error("Payment error:", error)
      toast.error("An error occurred during payment")
      setError("An error occurred during payment")
    } finally {
      setProcessing(false)
    }
  }

  const formattedDate = guide?.createdAt
    ? new Date(guide.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : "Spring 2026"

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="font-heading font-bold text-primary animate-pulse">
            AUTHENTICATING YOUR ORDER...
          </p>
        </div>
      </div>
    )
  }

  if (error || !guide) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-surface-container p-8 shadow-[0_40px_60px_-15px_rgba(0,87,88,0.1)] border border-primary/5 text-center">
            <div className="mb-6 flex justify-center text-error">
              <AlertCircle className="h-16 w-16" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">Access Restricted</h2>
            <p className="mb-8 text-on-surface-variant font-sans">
              {error || "We encountered an issue while loading your payment details. Please try refreshing the page."}
            </p>
            <button
              onClick={() => router.back()}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-surface-container-highest py-4 font-bold text-primary transition-all hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
              Return to Explorer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <button
          onClick={() => router.back()}
          className="group mb-6 flex items-center gap-2 font-bold text-primary transition-all hover:gap-3"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-heading tracking-tight">Back to Destination</span>
        </button>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-primary tracking-tighter leading-tight mb-4">
          Complete Your Purchase
        </h1>
        <p className="text-on-surface-variant max-w-2xl font-sans text-lg">
          Finalize your selection and unlock your next luxury destination guide with our secure, curated checkout experience.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Payment & Process Details */}
        <div className="lg:col-span-7 space-y-12">
          {/* Main Checkout Section */}
          <section className="bg-surface-container-low rounded-[2rem] p-10 shadow-[0_30px_50px_-12px_rgba(0,87,88,0.05)] border border-primary/5 dark:bg-surface-container">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-primary/5">
              <h2 className="font-heading text-2xl font-bold text-primary tracking-tight">Secure Checkout</h2>
              <div className="flex items-center gap-3 opacity-60 dark:opacity-80 grayscale active:grayscale-0 transition-all cursor-help">
                <div className="flex items-center gap-2 text-xs font-bold font-heading text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="h-4 w-4" />
                  Stripe SSL
                </div>
              </div>
            </div>

            {/* Security Context */}
            <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-3xl p-6 mb-10 border border-white/20 shadow-inner">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary mb-1 text-lg">Encrypted Stripe Transaction</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                    Your payment is processed securely via Stripe. We strictly adhere to PCI-DSS standards and never store your card details on our infrastructure.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-primary/5">
                <div className="flex justify-between items-center group">
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label group-hover:text-primary transition-colors">Selected Product</span>
                  <span className="text-sm font-bold text-primary font-heading tracking-tight underline decoration-primary/20 underline-offset-4">{guide.title}</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label group-hover:text-primary transition-colors">Access Type</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-on-surface font-heading">
                    <Zap className="h-4 w-4 text-tertiary" />
                    Immediate Digital Access
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className={`relative w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-6 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary/20 active:scale-[0.98] group overflow-hidden ${processing ? "grayscale cursor-not-allowed opacity-80" : "hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/30"
                }`}
            >
              {processing ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="font-heading tracking-wide uppercase text-sm">Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="h-6 w-6 transform group-hover:rotate-12 transition-transform" />
                  <span className="font-heading text-lg tracking-tight">Confirm & Pay Now — ${(guide.price).toFixed(2)}</span>
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap gap-8 items-center justify-center border-t border-primary/5 pt-10">
              <div className="flex items-center gap-2.5 text-on-surface-variant group">
                <div className="bg-primary/5 p-1.5 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-bold font-heading tracking-tight">Verified by Stripe</span>
              </div>
              <div className="flex items-center gap-2.5 text-on-surface-variant group">
                <div className="bg-primary/5 p-1.5 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-bold font-heading tracking-tight">14-Day Guarantee</span>
              </div>
            </div>
          </section>

          {/* Steps Info */}
          <section className="bg-surface-container-highest/30 dark:bg-surface-container-high p-10 rounded-[2rem] border border-primary/5">
            <h3 className="font-heading text-xl font-extrabold text-primary mb-8 tracking-tight">Access Sequence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">1</div>
                <div>
                  <p className="text-sm font-bold text-primary font-heading mb-1 uppercase tracking-tighter">Instant Confirmation</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-sans">Verification of your order and digital entitlement delivery.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">2</div>
                <div>
                  <p className="text-sm font-bold text-primary font-heading mb-1 uppercase tracking-tighter">Dashboard Unlock</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-sans">Full ecosystem access granted on your Curator profile.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">3</div>
                <div>
                  <p className="text-sm font-bold text-primary font-heading mb-1 uppercase tracking-tighter">Expedition Launch</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-sans">Integrated maps, hidden pins, and expert itineraries available.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <aside className="lg:col-span-5 space-y-8 sticky top-28">
          <div className="bg-surface-container-low dark:bg-surface-container rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/5 border border-primary/5 group">
            {/* Visual Header */}
            <div className="relative h-72 overflow-hidden">
              <Image
                src={guide?.coverImage || "https://images.unsplash.com/photo-1544735716-a4ed20f6993a"}
                alt={guide.title}
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-on-primary">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full mb-3 inline-block border border-white/10">{guide.category.title}</span>
                <h2 className="font-heading text-3xl font-extrabold tracking-tighter leading-none">{guide.title}</h2>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="p-10 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-sans">Digital Curator Access</span>
                  <span className="text-on-surface font-bold font-heading">${(guide.price).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-on-surface-variant font-sans">
                    <Map className="h-4 w-4 text-primary" />
                    Interactive Maps
                  </div>
                  <span className="text-tertiary font-extrabold font-heading text-xs tracking-widest uppercase">Included</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-on-surface-variant font-sans">
                    <Zap className="h-4 w-4 text-primary" />
                    Priority Updates
                  </div>
                  <span className="text-tertiary font-extrabold font-heading text-xs tracking-widest uppercase">Lifetime</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-8 border-t border-primary/5">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label">Total Investment</span>
                    <div className="text-5xl font-extrabold text-primary font-heading tracking-tighter">${(guide.price).toFixed(2)}</div>
                  </div>
                  <span className="text-[10px] text-on-surface-variant italic font-sans mb-1 opacity-70">Digital Delivery Included</span>
                </div>
              </div>

              {/* Guarantee Box */}
              <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-3xl border border-primary/10 flex items-start gap-4 transform transition-all hover:scale-[1.02]">
                <div className="bg-primary text-on-primary p-2 rounded-xl scale-90">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-primary uppercase tracking-widest mb-1.5 font-heading">Curator's Guarantee</p>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-sans font-medium">
                    If this guide doesn't refine your travel intent within 14 days, we will settle a full refund, preserving our integrity as curators.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </aside>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="font-heading font-bold text-primary animate-pulse text-xs tracking-widest">
              PREPARING CHECKOUT SECRETS...
            </p>
          </div>
        </div>
      }
    >
      <PaymentContent />
    </React.Suspense>
  )
}
