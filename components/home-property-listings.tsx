"use client"

import { FilterProvider } from "@/contexts/filter-context"
import PropertyListings from "@/components/property-listings"
import { properties } from "@/lib/properties-data"

export default function HomePropertyListings() {
  // Filter only favorite properties for homepage display
  const favoriteProperties = properties.filter((property) => property.featured === true)

  return (
    <FilterProvider initialProperties={favoriteProperties}>
      <div className="mb-8 bg-white">
        <div className="text-center mb-6 bg-white">
          <h2 className="text-3xl font-bold text-vl-blue mb-2"><br/>Featured Properties</h2>
          <p className="text-gray-600">Discover our handpicked selection of premium properties</p>
        </div>
        <PropertyListings showFilters={false} />
      </div>
    </FilterProvider>
  )
}
