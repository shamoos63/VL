"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { Award, Briefcase, GraduationCap, TrendingUp, Users, Globe, Building, Star } from "lucide-react"
import Image from "next/image"

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: React.ReactNode
  highlight?: boolean
}

const timelineData: TimelineItem[] = [
  {
    year: "2008",
    title: "Academic Foundation",
    description:
      "Graduated with dual Bachelor of Science degrees from Herzen State Pedagogical University and Baltic University of Foreign Languages, establishing a strong analytical foundation.",
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    year: "2010",
    title: "Real Estate Entry",
    description:
      "Entered the real estate industry in the UK market, focusing on residential properties and developing market expertise.",
    icon: <Building className="h-6 w-6" />,
  },
  {
    year: "2012",
    title: "Dubai Market Expansion",
    description:
      "Expanded operations to Dubai, UAE, recognizing the emerging opportunities in the Middle East real estate market.",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    year: "2015",
    title: "Investment Specialization",
    description:
      "Specialized in off-plan investments and buy-to-let strategies, establishing expertise in high-yield property portfolios.",
    icon: <TrendingUp className="h-6 w-6" />,
    highlight: true,
  },
  {
    year: "2018",
    title: "Global Client Base",
    description:
      "Built an international clientele spanning 30+ countries, providing multilingual services in English, Arabic, and Russian.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    year: "2020",
    title: "Select Property Leadership",
    description:
      "Appointed as Investment Director at Select Property, leading strategic investment initiatives and client portfolio management.",
    icon: <Briefcase className="h-6 w-6" />,
    highlight: true,
  },
  {
    year: "2023",
    title: "Market Excellence",
    description:
      "Achieved 500+ successful property transactions, establishing reputation for precision, transparency, and exceptional results.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    year: "2025",
    title: "Industry Leadership",
    description:
      "Reached 585+ properties sold with AED 1.7+ billion in transaction value, recognized as a leading investment strategist in UAE and UK markets.",
    icon: <Star className="h-6 w-6" />,
    highlight: true,
  },
]

export default function TimelineSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up")
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-50px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")

        if (entry.isIntersecting && scrollDirection === "down") {
          setVisibleItems((prev) => new Set([...prev, index]))
        } else if (!entry.isIntersecting && scrollDirection === "up") {
          setVisibleItems((prev) => {
            const newSet = new Set(prev)
            newSet.delete(index)
            return newSet
          })
        }
      })
    }, observerOptions)

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [scrollDirection])

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-vl-yellow mb-4 font-sansumi text-center">Professional Journey</h2>
          <p className="text-xl text-center text-white mb-12 leading-relaxed">
            A timeline of dedication, growth, and excellence in real estate investment
          </p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-vl-yellow via-vl-yellow to-transparent opacity-30 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  data-index={index}
                  className={`timeline-item relative transition-all duration-700 ease-out ${
                    visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {/* Content */}
                    <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                      <div
                        className={`bg-transparent backdrop-blur-sm border ${
                          item.highlight ? "border-vl-yellow" : "border-vl-yellow border-opacity-30"
                        } rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-opacity-60`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`p-2 rounded-full ${
                              item.highlight
                                ? "bg-vl-yellow text-vl-blue"
                                : "bg-vl-blue border border-vl-yellow text-white"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <h3 className="text-xl font-bold text-vl-yellow">{item.title}</h3>
                        </div>
                        <p className="text-white leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"} flex justify-center`}>
                      <div className="relative">
                        {/* Timeline Dot */}
                        <div
                          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${
                            item.highlight ? "bg-vl-yellow" : "bg-vl-blue border-2 border-vl-yellow"
                          } hidden md:block`}
                        ></div>

                        {/* Year Circle */}
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                            item.highlight
                              ? "bg-vl-yellow text-white shadow-lg scale-110"
                              : visibleItems.has(index)
                                ? "bg-vl-blue border-2 border-vl-yellow text-white shadow-md scale-105"
                                : "bg-vl-blue border border-vl-yellow border-opacity-30 text-vl-yellow opacity-70"
                          }`}
                        >
                          {item.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-16 text-center">
            <div className="bg-transparent backdrop-blur-sm border border-vl-yellow rounded-2xl p-8">
              <div className="mb-4">
                <Image src="/quotation_marks.svg" alt="Quote" width={40} height={40} className="mx-auto" />
              </div>
              <p className="text-xl italic mb-4 text-white leading-relaxed">
                Every milestone represents not just professional growth, but a commitment to excellence and client
                success that defines my approach to real estate investment.
              </p>
              <p className="font-semibold text-vl-yellow">Victoria Lancaster</p>
              <p className="text-white text-sm mt-2">Investment Director | Licensed Real Estate Advisor</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
