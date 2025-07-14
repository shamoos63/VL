"use client"

import { FilterProvider } from "@/contexts/filter-context"
import PropertyListings from "@/components/property-listings"
import { properties } from "@/lib/properties-data"

/**
 * Shows a “Featured Properties” block on the home page.
 * It wraps <PropertyListings> in <FilterProvider> so every child
 * can safely call the `useFilters()` hook.
 */
export default function HomePropertyListings() {
  // Only properties explicitly marked as featured/favourite
  const favoriteProperties = properties.filter((p) => p.featured === true)

  return (
    <FilterProvider>
      <section className="mb-8 bg-white">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-vl-blue mb-2">Featured Properties</h2>
          <p className="text-gray-600">Discover our hand-picked selection of premium properties</p>
        </div>

        {/* Pass the favourite list down; PropertyListings will fall back to the
            global filtered list when this prop is not provided */}
        <PropertyListings showFilters={false} initialProperties={favoriteProperties} />
      </section>
    </FilterProvider>
  )
}
