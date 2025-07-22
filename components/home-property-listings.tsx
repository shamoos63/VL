"use client"

import { FilterProvider } from "@/contexts/filter-context"
import PropertyListings from "@/components/property-listings"
import { properties } from "@/lib/properties-data"

export default function HomePropertyListings() {
  // Filter only favorite properties for homepage display
  const favoriteProperties = properties.filter((property) => property.featured === true)

  return (
    <FilterProvider initialProperties={favoriteProperties}>
      <div className="text-center pt-5 bg-transparent">
        <div className="text-center mb-6 bg-transparent">
          <h2 className="text-3xl font-bold text-vl-yellow mb-2"><br/>Explore Prime Opportunities</h2>
          <p className="text-gray-600">Discover our handpicked selection of premium properties</p>
        </div>
        <PropertyListings showFilters={false} />
      </div>
    </FilterProvider>
  )
}
