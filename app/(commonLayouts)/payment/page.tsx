"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Lock, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import travelGuideServices from "@/services/travelGuide/travelGuide.service"
import { initiatePaymentAction } from "@/actions/payment/initiatePaymentAction"

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
        console.log("Guide fetch response:", response)

        if (response.success && response.data) {
          console.log("Guide data:", response.data)
          setGuide(response.data as GuideDetails)
        } else {
          console.log("Guide fetch failed:", response.message)
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
        // Redirect to Stripe checkout
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="font-medium text-gray-600">
            Loading payment details...
          </p>
        </div>
      </div>
    )
  }

  if (error || !guide) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="w-full max-w-md">
          <div className="rounded-lg bg-white p-6 shadow-lg md:p-8">
            <div className="mb-4 flex items-center gap-3 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <h2 className="text-xl font-bold">Error</h2>
            </div>
            <p className="mb-6 text-gray-600">
              {error || "Failed to load payment details"}
            </p>
            <button
              onClick={() => router.back()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 py-2 font-medium text-gray-800 transition hover:bg-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Complete Your Purchase
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-lg md:p-8">
              {/* Guide Image */}
              {guide.coverImage && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img
                    src={guide.coverImage}
                    alt={guide.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}

              {/* Guide Details */}
              <div className="mb-6 space-y-4">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Guide Title
                  </h3>
                  <p className="text-gray-700">{guide.title}</p>
                </div>

                {/* <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                  <p className="line-clamp-3 text-gray-700">
                    {guide.}
                  </p>
                </div> */}

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">
                      {guide.category.title}
                    </p>
                  </div>
                  {/* <div>
                    <p className="mb-1 text-sm text-gray-500">Author</p>
                    <p className="font-medium text-gray-900">
                      {guide.member?.name || "Unknown"}
                    </p>
                  </div> */}
                </div>
              </div>

              {/* Security Info */}
              <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Secure Payment</p>
                  <p className="text-sm text-blue-800">
                    Your payment is secured by Stripe. We never store your card
                    details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary Card */}
          <div className="md:col-span-1">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-lg font-bold text-gray-900">
                Order Summary
              </h3>

              <div className="mb-6 space-y-4 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Guide Price</span>
                  <span className="font-medium text-gray-900">
                    ${guide?.price?.toFixed(2) || "0.00"}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div> */}
              </div>

              <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${guide?.price?.toFixed(2) || "0.00"}
                </span>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white transition ${
                  processing
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Pay ${guide?.price?.toFixed(2) || "0.00"}
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                By clicking "Pay", you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 font-semibold text-blue-900">
            What happens next?
          </h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>✓ You'll be redirected to Stripe to complete your payment</li>
            <li>
              ✓ After successful payment, you'll get instant access to the guide
            </li>
            <li>
              ✓ A confirmation email will be sent to your registered email
            </li>
            <li>✓ You can download the guide anytime from your profile</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <PaymentContent />
    </React.Suspense>
  )
}
