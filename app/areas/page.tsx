import Footer from "@/components/footer"
import Header from "@/components/header"
import ServerPageHero from "@/components/server-page-hero"
import AreasClient from "./areas-client"

const areas = [
  {
    name: "Dubai Marina",
    description: "Waterfront living with stunning views and world-class amenities",
    properties: "150+ Properties",
    avgPrice: "$1.2M - $3.5M",
    growth: "+12% YoY",
    image: "/placeholder.svg?height=256&width=400&text=Dubai+Marina",
  },
  {
    name: "Downtown Dubai",
    description: "The heart of the city with iconic landmarks and luxury shopping",
    properties: "200+ Properties",
    avgPrice: "$800K - $5M",
    growth: "+15% YoY",
    image: "/placeholder.svg?height=256&width=400&text=Downtown+Dubai",
  },
  {
    name: "Palm Jumeirah",
    description: "Exclusive island living with private beaches and luxury resorts",
    properties: "80+ Properties",
    avgPrice: "$2M - $15M",
    growth: "+18% YoY",
    image: "/placeholder.svg?height=256&width=400&text=Palm+Jumeirah",
  },
  {
    name: "Business Bay",
    description: "Modern business district with high-rise living and canal views",
    properties: "120+ Properties",
    avgPrice: "$600K - $2.5M",
    growth: "+10% YoY",
    image: "/placeholder.svg?height=256&width=400&text=Business+Bay",
  },
]

export default function AreasPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <Header />
      <ServerPageHero
        title="Explore Dubai's Key Investment Areas"
        subtitle="Handpicked insights to help you choose with confidence."
        backgroundImage="/hero.webp"
      />

      {/* Description Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 mb-6 text-center">
            Dubai's real estate market is diverse, and not every area suits every investor.
          </p>
          <p className="text-lg text-gray-700 mb-6 text-center">
            In this section, Victoria highlights key districts she works in, sharing her honest perspective on:
          </p>
          <ul class="flex flex-col gap-6 md:flex-row md:gap-8">
            <li class="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 class="text-lg font-medium text-gray-800">Strengths & potential</h3>
            </li>

            <li class="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 class="text-lg font-medium text-gray-800">Risks to consider</h3>
            </li>

            <li class="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 class="text-lg font-medium text-gray-800">Who the area fits best</h3>
            </li>
          </ul>
          <p className="text-lg text-gray-700 pt-4 font-medium text-center">
            Whether you're focused on yield, growth, or lifestyle, this will help you make the right move.
          </p>
        </div>
      </section>

      <AreasClient areas={areas} />
      <Footer />
    </main>
  )
}
