import { Suspense } from "react"
import type { Metadata } from "next"
import PropertyDetailsClient from "./property-details-client"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Property Details - ${params.id} | VL Real Estate`,
    description: "Detailed information about this luxury property in Dubai",
  }
}

export default function PropertyDetailsPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-vl-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
      }
    >
      <PropertyDetailsClient propertyId={params.id} />
    </Suspense>
  )
}
