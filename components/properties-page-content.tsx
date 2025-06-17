"use client"

import PropertyListings from "@/components/property-listings"
import PropertyMap from "@/components/property-map"
import { Button } from "@/components/ui/button"
import { Map, Grid } from "lucide-react"
import { FilterProvider, useFilters } from "@/contexts/filter-context"

function PropertiesContent() {
  const { viewMode, setViewMode, selectedProperty, setSelectedProperty } = useFilters()

  return (
    <>
      {/* View Toggle */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4" bg-white>
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid"
                  ? "bg-vl-blue text-white hover:bg-vl-blue-dark"
                  : "border-vl-blue text-vl-blue hover:bg-vl-blue-light"
              }
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid View
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              className={
                viewMode === "map"
                  ? "bg-vl-blue text-white hover:bg-vl-blue-dark"
                  : "border-vl-blue text-vl-blue hover:bg-vl-blue-light"
              }
            >
              <Map className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>

          {viewMode === "map" ? (
            <div className="max-w-7xl mx-auto">
              <PropertyMap selectedProperty={selectedProperty} onPropertySelect={setSelectedProperty} />
            </div>
          ) : (
            <PropertyListings />
          )}
        </div>
      </section>
    </>
  )
}

export default function PropertiesPageContent() {
  return (
    <FilterProvider>
      <PropertiesContent />
    </FilterProvider>
  )
}
