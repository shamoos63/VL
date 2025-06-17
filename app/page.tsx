import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import HomePropertyListings from "@/components/home-property-listings"
import TestimonialsSection from "@/components/testimonials-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"


export default function HomePage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <Header />
      <HeroSection />
      <HomePropertyListings />
      <FaqSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
