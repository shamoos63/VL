import PropertyCard from "./enhanced-property-card"
import { useFilters, type filteredProperties } from "@/contexts/filter-context"

interface PropertyListingsProps {
  showFilters?: boolean
  /** Optional list to render instead of the global filteredProperties */
  initialProperties?: typeof filteredProperties
}

export default function PropertyListings({ showFilters = true, initialProperties }: PropertyListingsProps) {
  const { filteredProperties: globalFilteredProperties = [] } = useFilters()

  // Decide which list to show: the one provided by Home page or the filtered list
  const propertiesToRender = initialProperties ?? globalFilteredProperties

  if (!propertiesToRender || propertiesToRender.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-500">No properties found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {propertiesToRender.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
