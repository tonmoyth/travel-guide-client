import Hero from "@/components/modules/home/hero"
import FeaturedGuides from "@/components/home/FeaturedGuides"
import TopRatedExplorations from "@/components/home/TopRatedExplorations"
import Newsletter from "@/components/home/Newsletter"
import travelGuideServices from "@/services/travelGuide/travelGuide.service"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import PopularDestinations from "@/components/home/PopularDestinations"
import TravelCategories from "@/components/home/TravelCategories"
import HowItWorks from "@/components/home/HowItWorks"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Travel Guide",
  description: "Explore curated travel guides, hidden gems, and community-verified itineraries from around the world.",
}

export default async function Home() {
  // Fetch top voted guides on server side
  const response = await travelGuideServices.getTopVotedGuides()
  const guides =
    response.success && response.data ? response.data.slice(0, 3) : [];
  const FeaturedGuidesData =
    response.success && response.data ? response.data.slice(3, 7) : [];



  return (
    <div className="bg-background">
      <Hero />
      <PopularDestinations />
      <TravelCategories />
      <FeaturedGuides guides={FeaturedGuidesData} />
      {/* <TravelGallery /> */}
      <TopRatedExplorations guides={guides} />
      {/* <Testimonials /> */}
      <HowItWorks />
      <WhyChooseUs />
      <Newsletter />
    </div>
  )
}
