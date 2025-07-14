"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, TrendingUp, Home } from "lucide-react"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"

interface Area {
  name: string
  description: string
  properties: string
  avgPrice: string
  growth: string
  image: string
}

interface AreasClientProps {
  areas: Area[]
}

export default function AreasClient({ areas }: AreasClientProps) {
  const { t, isRTL } = useI18n()

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Description Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 mb-6 text-center">{t("areas.description.text1")}</p>
          <p className="text-lg text-gray-700 mb-6 text-center">{t("areas.description.text2")}</p>
          <ul className="flex flex-col gap-6 md:flex-row md:gap-8">
            <li className="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-medium text-gray-800">{t("areas.feature1")}</h3>
            </li>
            <li className="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-medium text-gray-800">{t("areas.feature2")}</h3>
            </li>
            <li className="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-medium text-gray-800">{t("areas.feature3")}</h3>
            </li>
          </ul>
          <p className="text-lg text-gray-700 pt-4 font-medium text-center">{t("areas.description.conclusion")}</p>
        </div>
      </section>

      <div className="p-6 bg-transparent">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {areas.map((area, index) => (
              <Card
                key={index}
                className="glass bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image src={area.image || "/placeholder.svg"} alt={area.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-vl-blue dark:text-white mb-3">{area.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{area.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-100">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-vl-yellow" />
                      <span>{area.properties}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                      <span>{area.growth}</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <MapPin className="h-4 w-4 mr-2 text-vl-blue" />
                      <span className="font-semibold">{area.avgPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
