"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  Award,
  Users,
  TrendingUp,
  Globe,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  GraduationCap,
  Check,
} from "lucide-react"
import Image from "next/image"

const achievements = [
  {
    icon: <Award className="h-8 w-8 text-vl-yellow" />,
    number: "585+",
    title: "Properties Sold",
    description: "Successfully closed transactions worth over AED 1.7 billion",
  },
  {
    icon: <Users className="h-8 w-8 text-vl-yellow" />,
    number: "30+",
    title: "Countries Served",
    description: "Global clientele from diverse international markets",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-vl-yellow" />,
    number: "15+",
    title: "Years Experience",
    description: "Proven track record in UAE and UK real estate markets",
  },
  {
    icon: <Globe className="h-8 w-8 text-vl-yellow" />,
    number: "3",
    title: "Languages",
    description: "Fluent in English, Arabic, and Russian",
  },
]

const expertise = [
  "Off-plan Investments (Dubai & UK)",
  "Selected Residential Properties",
  "Buy-to-Let Strategy",
  "Portfolio Diversification",
  "Investor Onboarding & Consultation",
  "Market Forecasting & Analytics",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-vl-blue via-vl-blue-dark to-vl-blue opacity-95"></div>
        <div className="absolute inset-0">
          <Image src="/hero-images/about-hero.png" alt="Victoria Lancaster" fill className="object-cover" priority />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-sansumi">
              About Victoria
            </h1>
            <p className="text-l md:text-2xl font-light leading-relaxed">
              Where trust, insight, and performance come together.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Image src="/quotation_marks.svg" alt="Quote" width={60} height={60} className="mx-auto" />
            </div>
            <p className="text-2xl md:text-3xl text-vl-blue font-light italic mb-6 leading-relaxed">
              To me, real estate is about building futures, not just deals. I treat every home or investment with the
              same care I'd give my own.
            </p>
            <div className="mb-6">
              <Image src="/quotation_marks.svg" alt="Quote" width={60} height={60} className="mx-auto" />
            </div>
            <p className="text-xl font-semibold text-vl-blue">Victoria Lancaster</p>
            <p className="text-gray-600 mt-2">Director of Investment | Real Estate Strategist | Licensed Advisor</p>
          </div>
        </div>
      </section>

      {/* About Content Section with Alternating Photos */}
      <section>
        <div className="container mx-auto px-4">
          {/* First Section - Photo Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Photo Left */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/victoria-photo-1.jpg"
                  alt="Victoria Lancaster - Professional Portrait"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content Right */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-vl-blue mb-6 font-sansumi leading-tight">
                  15+ Years of Market Excellence
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  With over 15 years of experience across the UAE and UK markets, Victoria Lancaster is a name
                  synonymous with trust, results, and long-term vision.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  As Investment Director at Select Property, she has successfully closed over 585 real estate
                  transactions, exceeding AED 1.7 billion in value.
                </p>
                <p className="text-sm text-gray-500 italic">Last updated: June 2025</p>
              </div>

       
            </div>
          </div>

          {/* Second Section - Text Left, Photo Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Content Left */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-vl-blue mb-6 font-sansumi leading-tight">
                  A Portfolio Built on Insight
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Victoria's portfolio spans luxury residential, off-plan, and buy-to-let investments, all carefully
                  curated to build secure, high-yielding portfolios for global clients.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  She is known for her sharp market insight and ability to spot opportunities before they hit the
                  mainstream.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Clients choose her for her clarity, precision, and data-driven mindset, knowing that real estate, in
                  her world, is not just a transaction, but a foundation for wealth, lifestyle, and legacy.
                </p>
              </div>
            </div>

            {/* Photo Right */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/victoria-photo-2.jpg"
                  alt="Victoria Lancaster - Client Meeting"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Third Section - Photo Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo Left */}
            <div className="relative">
              <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/victoria-photo-3.jpg"
                  alt="Victoria Lancaster - Property Showcase"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content Right */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-vl-blue mb-6 font-sansumi leading-tight">
                  Her Clients, Her Values
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Victoria works exclusively with selected developers and serious clients. Every portfolio she builds is
                  backed by due diligence, long-term strategy, and a clear investment framework.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Whether you're investing or searching for a home, she brings the same meticulous care, honesty, and
                  commitment to results.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Outside of work, Victoria is a proud wife, mother, and animal lover. Her grounded home life brings
                  balance and clarity, the same values she brings to every client relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic & Professional Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-vl-blue mb-8 font-sansumi text-center">
              Academic & Professional Credibility
            </h2>

            <div className="bg-white p-8 rounded-2xl mb-8 shadow-lg">
              <div className="flex items-start mb-6">
                <GraduationCap className="h-8 w-8 text-vl-yellow mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-vl-blue mb-2">Dual Bachelor of Science degrees from:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Herzen State Pedagogical University</li>
                    <li>Baltic University of Foreign Languages</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase className="h-8 w-8 text-vl-yellow mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-vl-blue mb-2">Professional Credentials:</h3>
                  <p className="text-gray-600 mb-2">Licensed by the Dubai Land Department (BRN 27147)</p>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              She combines a global academic foundation with an analytical, results-driven approach, treating each
              investment with the same care and discernment as if it were her own.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              She is known for her direct, no-fluff communication style, a quality her clients value for its
              transparency and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Clients & Values Section */}
      <section className="py-20 bg-gradient-to-br from-vl-blue to-vl-blue-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 font-sansumi">Professional Excellence</h2>
            <p className="text-xl leading-relaxed mb-8">
              Great investments aren't rushed, they're chosen with purpose, timing, and clarity. Victoria brings
              meticulous attention to detail and unwavering commitment to every client relationship.
            </p>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
              <div className="mb-4">
                <Image src="/quotation_marks.svg" alt="Quote" width={40} height={40} className="mx-auto" />
              </div>
              <p className="text-xl italic mb-4">
                Great investments aren't rushed, they're chosen with purpose, timing, and clarity.
              </p>
              <p className="font-semibold">— Victoria Lancaster</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-vl-blue mb-4 font-sansumi text-center">Areas of Expertise</h2>
            <p className="text-xl text-center text-vl-blue italic mb-8">
              "I don't just sell property. I strategize wealth."
            </p>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Here's how I support investors in building real estate portfolios with purpose and clarity:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {expertise.map((item, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <Check className="h-5 w-5 text-vl-yellow mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Offices */}
            <h3 className="text-2xl font-bold text-vl-blue mb-6 font-sansumi text-center">Offices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-center bg-gray-50 p-6 rounded-lg">
                <MapPin className="h-6 w-6 text-vl-yellow mr-3" />
                <span className="text-gray-700">Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 p-6 rounded-lg">
                <MapPin className="h-6 w-6 text-vl-yellow mr-3" />
                <span className="text-gray-700">Manchester, United Kingdom</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-vl-blue mb-6 font-sansumi">Ready to take the next step?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Let's start a conversation built on trust, guided by insight, and tailored to your goals. Share your
              details below — Victoria will personally review how she can support your next move.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-vl-blue text-white hover:bg-vl-blue-dark font-semibold px-8 py-4">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-vl-blue text-vl-blue hover:bg-vl-blue hover:text-white px-8 py-4"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
