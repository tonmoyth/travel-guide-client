import Hero from "@/components/modules/home/hero"
import SearchSection from "@/components/home/SearchSection"
import FeaturedGuides from "@/components/home/FeaturedGuides"
import Testimonials from "@/components/home/Testimonials"
import Newsletter from "@/components/home/Newsletter"
import Footer from "@/components/home/Footer"

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <SearchSection />
      <FeaturedGuides />
      {/* <Testimonials /> */}
      <Newsletter />
      <Footer />
    </div>
  )
}
