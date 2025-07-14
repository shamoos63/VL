"use client"

import { FilterProvider } from "@/contexts/filter-context"
import PropertyListings from "@/components/property-listings"
import { properties } from "@/lib/properties-data"
import { useI18n } from "@/lib/i18n"

export default function HomePropertyListings() {
  const { t, isRTL } = useI18n()

  // Filter only favorite properties for homepage display
  const favoriteProperties = properties.filter((property) => property.featured === true)

  return (
    <FilterProvider initialProperties={favoriteProperties}>
      <div className="text-center pt-8 bg-transparent" dir={isRTL ? "rtl" : "ltr"}>
        <div className="text-center mb-6 bg-transparent">
          <h2 className="text-3xl font-bold text-vl-blue mb-2">
            <br />
            {t("home.featured.title")}
          </h2>
          <p className="text-gray-600">{t("home.featured.subtitle")}</p>
        </div>
        <PropertyListings showFilters={false} />
      </div>
    </FilterProvider>
  )
}
