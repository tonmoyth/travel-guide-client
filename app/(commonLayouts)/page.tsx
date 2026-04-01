import Hero from "@/components/modules/home/hero"
import SearchSection from "@/components/home/SearchSection"
import FeaturedGuides from "@/components/home/FeaturedGuides"
import Testimonials from "@/components/home/Testimonials"
import Newsletter from "@/components/home/Newsletter"
import Footer from "@/components/home/Footer"
import travelGuideServices from "@/services/travelGuide/travelGuide.service"

// export const revalidate = 30

export default async function Home() {
  // Fetch top voted guides on server side
  const response = await travelGuideServices.getTopVotedGuides()
  const guides =
    response.success && response.data ? response.data.slice(0, 3) : []

  return (
    <div className="bg-background">
      <Hero />
      <SearchSection />
      <FeaturedGuides guides={guides} />
      {/* <Testimonials /> */}
      <Newsletter />
      <Footer />
    </div>
  )
}
