"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Search, Eye, Star, StarOff } from "lucide-react"
import { properties as initialProperties } from "@/lib/properties-data"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Extended property type with image file handling
interface Property {
  id: number
  title: string
  location: string
  price: string
  bedrooms: number
  bathrooms: number
  area: string
  image: string
  status: string
  featured: boolean
  description: string
  videoId?: string
  images?: string[]
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Load properties from localStorage or use initial data
  useEffect(() => {
    setIsLoading(true)
    try {
      const storedProperties = localStorage.getItem("vl-properties")
      if (storedProperties) {
        setProperties(JSON.parse(storedProperties))
      } else {
        setProperties(initialProperties)
        localStorage.setItem("vl-properties", JSON.stringify(initialProperties))
      }
    } catch (error) {
      console.error("Error loading properties:", error)
      setProperties(initialProperties)
    }
    setIsLoading(false)

    // Check if we should open the add dialog
    const action = searchParams.get("action")
    if (action === "new") {
      handleAddProperty()
      // Clear the URL parameter
      router.replace("/dashboard/properties")
    }
  }, [searchParams, router])

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProperty = () => {
    setCurrentProperty({
      id: Date.now(),
      title: "",
      location: "",
      price: "",
      bedrooms: 1,
      bathrooms: 1,
      area: "",
      image: "/placeholder.svg?height=300&width=400&text=Property%20Image",
      status: "Ready",
      featured: false,
      description: "",
      videoId: "",
      images: [],
    })
    setIsDialogOpen(true)
  }

  const handleEditProperty = (property: Property) => {
    setCurrentProperty({ ...property })
    setIsDialogOpen(true)
  }

  const handleDeleteProperty = (property: Property) => {
    setCurrentProperty(property)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteProperty = () => {
    if (currentProperty) {
      const updatedProperties = properties.filter((p) => p.id !== currentProperty.id)
      setProperties(updatedProperties)
      localStorage.setItem("vl-properties", JSON.stringify(updatedProperties))
      setIsDeleteDialogOpen(false)
      setCurrentProperty(null)
    }
  }

  const toggleFeatured = (id: number) => {
    const updatedProperties = properties.map((property) =>
      property.id === id ? { ...property, featured: !property.featured } : property,
    )
    setProperties(updatedProperties)
    localStorage.setItem("vl-properties", JSON.stringify(updatedProperties))

    // Find the property to show appropriate message
    const property = properties.find((p) => p.id === id)
    const newStatus = !property?.featured

    // Show toast notification
    toast({
      title: newStatus ? "Added to Favorites" : "Removed from Favorites",
      description: newStatus
        ? `${property?.title} will now appear on the homepage`
        : `${property?.title} has been removed from homepage display`,
    })
  }

  const handleSaveProperty = (formData: FormData) => {
    const property: Property = {
      id: currentProperty?.id || Date.now(),
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      price: formData.get("price") as string,
      bedrooms: Number.parseInt(formData.get("bedrooms") as string),
      bathrooms: Number.parseInt(formData.get("bathrooms") as string),
      area: formData.get("area") as string,
      image: (formData.get("image") as string) || "/placeholder.svg?height=300&width=400&text=Property%20Image",
      status: formData.get("status") as string,
      featured: formData.get("featured") === "on",
      description: formData.get("description") as string,
      videoId: formData.get("videoId") as string,
      images: currentProperty?.images || [],
    }

    let updatedProperties: Property[]
    if (currentProperty && properties.some((p) => p.id === currentProperty.id)) {
      // Edit existing property
      updatedProperties = properties.map((p) => (p.id === property.id ? property : p))
    } else {
      // Add new property
      updatedProperties = [...properties, property]
    }

    setProperties(updatedProperties)
    localStorage.setItem("vl-properties", JSON.stringify(updatedProperties))
    setIsDialogOpen(false)
    setCurrentProperty(null)
  }

  return (
    <TooltipProvider>
      <DashboardLayout>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Properties Management</h1>
            <p className="text-gray-600">Manage your property listings</p>
          </div>
          <Button onClick={handleAddProperty} className="bg-vl-blue hover:bg-vl-blue-dark">
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search properties..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Homepage Display</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vl-blue"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No properties found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="relative h-12 w-16 rounded overflow-hidden">
                          <Image
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell>{property.price}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            property.status === "Ready" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {property.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleFeatured(property.id)}
                                className={property.featured ? "text-yellow-500" : "text-gray-400"}
                              >
                                {property.featured ? (
                                  <Star className="h-5 w-5 fill-yellow-500" />
                                ) : (
                                  <StarOff className="h-5 w-5" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {property.featured ? "Remove from Homepage" : "Add to Homepage"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/properties/${property.id}`)}
                            className="text-gray-500 hover:text-vl-blue"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProperty(property)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProperty(property)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Add/Edit Property Dialog - Fixed Styling */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white border-0 shadow-2xl">
            <div className="bg-white p-6 rounded-lg">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {currentProperty?.id ? "Edit Property" : "Add New Property"}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {currentProperty?.id
                    ? "Update the details of this property"
                    : "Fill in the details to add a new property"}
                </DialogDescription>
              </DialogHeader>

              <form
                action={(formData) => {
                  handleSaveProperty(formData)
                }}
                className="space-y-6"
              >
                {/* Hidden ID field */}
                {currentProperty?.id && <input type="hidden" name="id" value={currentProperty.id} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                        Property Title *
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={currentProperty?.title}
                        required
                        placeholder="e.g. Luxury Villa in Dubai Marina"
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                        Location *
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        defaultValue={currentProperty?.location}
                        required
                        placeholder="e.g. Dubai Marina"
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                        Price *
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        defaultValue={currentProperty?.price}
                        required
                        placeholder="e.g. $1,500,000"
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bedrooms" className="text-sm font-medium text-gray-700">
                          Bedrooms *
                        </Label>
                        <Input
                          id="bedrooms"
                          name="bedrooms"
                          type="number"
                          defaultValue={currentProperty?.bedrooms}
                          required
                          min="0"
                          className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bathrooms" className="text-sm font-medium text-gray-700">
                          Bathrooms *
                        </Label>
                        <Input
                          id="bathrooms"
                          name="bathrooms"
                          type="number"
                          defaultValue={currentProperty?.bathrooms}
                          required
                          min="0"
                          className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="area" className="text-sm font-medium text-gray-700">
                        Area *
                      </Label>
                      <Input
                        id="area"
                        name="area"
                        defaultValue={currentProperty?.area}
                        required
                        placeholder="e.g. 1,200 sq ft"
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                    </div>

                    <div>
                      <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                        Status *
                      </Label>
                      <Select name="status" defaultValue={currentProperty?.status || "Ready"}>
                        <SelectTrigger className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg">
                          <SelectItem value="Ready">Ready</SelectItem>
                          <SelectItem value="Off-plan">Off-plan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" name="featured" defaultChecked={currentProperty?.featured} />
                      <Label htmlFor="featured" className="text-sm font-medium text-gray-700">
                        Featured Property
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                        Image URL
                      </Label>
                      <Input
                        id="image"
                        name="image"
                        defaultValue={currentProperty?.image}
                        placeholder="Enter image URL or leave blank for placeholder"
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter a URL or leave blank to use a placeholder image
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="videoId" className="text-sm font-medium text-gray-700">
                        YouTube Video ID
                      </Label>
                      <Input
                        id="videoId"
                        name="videoId"
                        defaultValue={currentProperty?.videoId}
                        placeholder="e.g. dQw4w9WgXcQ"
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the YouTube video ID (e.g. dQw4w9WgXcQ from youtube.com/watch?v=dQw4w9WgXcQ)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={currentProperty?.description}
                        required
                        placeholder="Describe the property..."
                        rows={5}
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                    </div>

                    <div className="mt-4">
                      <Label className="text-sm font-medium text-gray-700">Preview</Label>
                      <div className="mt-2 border rounded-md p-4 bg-gray-50">
                        <div className="relative h-40 w-full rounded-md overflow-hidden mb-2">
                          <Image
                            src={currentProperty?.image || "/placeholder.svg"}
                            alt="Property Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-medium text-gray-900">{currentProperty?.title || "Property Title"}</h3>
                        <p className="text-sm text-gray-500">
                          {currentProperty?.location || "Location"} • {currentProperty?.price || "Price"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-white">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-vl-blue hover:bg-vl-blue-dark text-white">
                    Save Property
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog - Fixed Styling */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl">
            <div className="bg-white p-6 rounded-lg">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-lg font-bold text-gray-900">Confirm Deletion</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Are you sure you want to delete "{currentProperty?.title}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="bg-white">
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDeleteProperty}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </TooltipProvider>
  )
}
