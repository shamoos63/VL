"use client"
import { createContext, useContext, useState, useMemo, type ReactNode } from "react"
import { properties } from "@/lib/properties-data"

// Define types
export type PropertyType = "apartment" | "house" | "villa" | "penthouse" | "land"
export type PropertyStatus = "for-sale" | "for-rent"

export interface Property {
  id: number
  title: string
  type: PropertyType
  status: PropertyStatus
  price: string | number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  description: string
  features: string[]
  images: string[]
  latitude: number
  longitude: number
  propertyType: string
  priceValue: number
  city: string
  country: string
}

// Mock property types based on property titles
const getPropertyType = (title: string): string => {
  const titleLower = title.toLowerCase()
  if (titleLower.includes("villa")) return "villa"
  if (titleLower.includes("apartment")) return "apartment"
  if (titleLower.includes("penthouse")) return "penthouse"
  if (titleLower.includes("mansion")) return "mansion"
  if (titleLower.includes("house")) return "house"
  if (titleLower.includes("cottage")) return "cottage"
  if (titleLower.includes("cabin")) return "cabin"
  if (titleLower.includes("chalet")) return "chalet"
  return "other"
}

// Get all unique locations from properties
const getAllLocations = (): string[] => {
  const locations = properties.map((p) => {
    const parts = p.location.split(", ")
    return parts[parts.length - 1] // Get the country part
  })
  return [...new Set(locations)]
}

// Convert price string to number
const priceToNumber = (price: string | number): number => {
  if (typeof price === "number") return price
  return Number.parseInt(price.replace(/[^0-9]/g, "")) * 1000 // Convert to actual value
}

// Add property type and price value to properties
const propertiesWithExtras = properties.map((property) => ({
  ...property,
  propertyType: getPropertyType(property.title),
  priceValue: priceToNumber(property.price),
  location: property.location,
  city: property.location.split(", ")[0],
  country: property.location.split(", ")[property.location.split(", ").length - 1],
}))

// Calculate min and max values
const prices = propertiesWithExtras.map((p) => p.priceValue)
export const MIN_PRICE = Math.min(...prices)
export const MAX_PRICE = Math.max(...prices)

const bedrooms = propertiesWithExtras.map((p) => p.bedrooms)
export const MIN_BEDROOMS = Math.min(...bedrooms)
export const MAX_BEDROOMS = Math.max(...bedrooms)

const bathrooms = propertiesWithExtras.map((p) => p.bathrooms)
export const MIN_BATHROOMS = Math.min(...bathrooms)
export const MAX_BATHROOMS = Math.max(...bathrooms)

// Get all unique property types
export const PROPERTY_TYPES = [...new Set(propertiesWithExtras.map((p) => p.propertyType))]

// Get all unique countries
export const COUNTRIES = getAllLocations()

export interface PropertyFilters {
  propertyTypes: string[]
  priceRange: [number, number]
  bedroomRange: [number, number]
  bathroomRange: [number, number]
  status: string[]
  locations: string[]
  amenities: string[]
  searchQuery: string
  sortBy: string
}

interface FilterContextType {
  filters: PropertyFilters
  setFilters: (filters: PropertyFilters) => void
  resetFilters: () => void
  filteredProperties: typeof propertiesWithExtras
  activeFiltersCount: number
  viewMode: "grid" | "map"
  setViewMode: (mode: "grid" | "map") => void
  selectedProperty: number | null
  setSelectedProperty: (id: number | null) => void
  updateFilter: (key: keyof PropertyFilters, value: any) => void
  clearFilter: (key: keyof PropertyFilters) => void
}

const defaultFilters: PropertyFilters = {
  propertyTypes: [],
  priceRange: [MIN_PRICE, MAX_PRICE],
  bedroomRange: [MIN_BEDROOMS, MAX_BEDROOMS],
  bathroomRange: [MIN_BATHROOMS, MAX_BATHROOMS],
  status: [],
  locations: [],
  amenities: [],
  searchQuery: "",
  sortBy: "default",
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters)
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

  // Update individual filter
  const updateFilter = (key: keyof PropertyFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Clear individual filter
  const clearFilter = (key: keyof PropertyFilters) => {
    const defaultValue = defaultFilters[key]
    setFilters((prev) => ({ ...prev, [key]: defaultValue }))
  }

  // Count active filters
  const countActiveFilters = (): number => {
    let count = 0
    if (filters.propertyTypes.length > 0) count += 1
    if (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE) count += 1
    if (filters.bedroomRange[0] > MIN_BEDROOMS || filters.bedroomRange[1] < MAX_BEDROOMS) count += 1
    if (filters.bathroomRange[0] > MIN_BATHROOMS || filters.bathroomRange[1] < MAX_BATHROOMS) count += 1
    if (filters.status.length > 0) count += 1
    if (filters.locations.length > 0) count += 1
    if (filters.amenities.length > 0) count += 1
    if (filters.searchQuery.trim() !== "") count += 1
    if (filters.sortBy !== "default") count += 1
    return count
  }

  const activeFiltersCount = countActiveFilters()

  // Reset filters
  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  // Apply filters to properties
  const filteredProperties = useMemo(() => {
    return propertiesWithExtras
      .filter((property) => {
        // Filter by property type
        if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.propertyType)) {
          return false
        }

        // Filter by price range
        if (property.priceValue < filters.priceRange[0] || property.priceValue > filters.priceRange[1]) {
          return false
        }

        // Filter by bedroom range
        if (property.bedrooms < filters.bedroomRange[0] || property.bedrooms > filters.bedroomRange[1]) {
          return false
        }

        // Filter by bathroom range
        if (property.bathrooms < filters.bathroomRange[0] || property.bathrooms > filters.bathroomRange[1]) {
          return false
        }

        // Filter by status
        if (filters.status.length > 0) {
          const statusValue = property.status?.toLowerCase() || ""
          const matchesStatus = filters.status.some((s) => statusValue.includes(s.toLowerCase()))
          if (!matchesStatus) return false
        }

        // Filter by location
        if (filters.locations.length > 0) {
          const country = property.country
          if (!filters.locations.includes(country)) return false
        }

        // Filter by search query
        if (filters.searchQuery.trim() !== "") {
          const query = filters.searchQuery.toLowerCase()
          const matchesTitle = property.title.toLowerCase().includes(query)
          const matchesLocation = property.location.toLowerCase().includes(query)
          if (!matchesTitle && !matchesLocation) return false
        }

        return true
      })
      .sort((a, b) => {
        // Sort properties based on sortBy value
        switch (filters.sortBy) {
          case "price-asc":
            return a.priceValue - b.priceValue
          case "price-desc":
            return b.priceValue - a.priceValue
          case "newest":
            return b.id - a.id
          case "oldest":
            return a.id - b.id
          case "bedrooms-asc":
            return a.bedrooms - b.bedrooms
          case "bedrooms-desc":
            return b.bedrooms - a.bedrooms
          default:
            return 0
        }
      })
  }, [filters])

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        filteredProperties,
        activeFiltersCount,
        viewMode,
        setViewMode,
        selectedProperty,
        setSelectedProperty,
        updateFilter,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
