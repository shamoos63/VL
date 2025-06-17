import Footer from "@/components/footer"
import Header from "@/components/header"
import ServerPageHero from "@/components/server-page-hero"

import HomePropertyListings from "@/components/home-property-listings"

export default function PropertiesPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <Header />
      <ServerPageHero
        title="Personally Selected. Strategically Positioned."
        subtitle="No noise. No mass listings. Just curated opportunities, reviewed, refined, and investment-ready."
        backgroundImage="/hero-images/properties-hero.png"
        className="font-sansumi"
      />
      <HomePropertyListings />
      
      <Footer />
    </main>
  )
}
