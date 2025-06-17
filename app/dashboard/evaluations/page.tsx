"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Trash2, Calendar, Mail, Phone, Home, MapPin, User } from "lucide-react"

// Property evaluation interface
interface PropertyEvaluation {
  id: number
  name: string
  email: string
  phone?: string
  propertyType: string
  location: string
  bedrooms: string
  bathrooms: string
  area: string
  condition: string
  yearBuilt?: string
  amenities?: string
  description?: string
  date: string
  status: "new" | "reviewed" | "completed"
}

// Mock property evaluations
const mockEvaluations: PropertyEvaluation[] = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    email: "ahmed@example.com",
    phone: "+971 50 123 4567",
    propertyType: "villa",
    location: "Dubai Marina",
    bedrooms: "4",
    bathrooms: "3",
    area: "2500",
    condition: "excellent",
    yearBuilt: "2020",
    amenities: "Pool, Gym, Parking, Garden",
    description: "Beautiful villa with sea view and modern amenities",
    date: "2024-12-15T10:30:00Z",
    status: "new",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+44 20 7946 0958",
    propertyType: "apartment",
    location: "Downtown Dubai",
    bedrooms: "2",
    bathrooms: "2",
    area: "1200",
    condition: "good",
    yearBuilt: "2018",
    amenities: "Gym, Pool, Concierge",
    description: "Modern apartment with Burj Khalifa view",
    date: "2024-12-14T15:45:00Z",
    status: "reviewed",
  },
  {
    id: 3,
    name: "Dmitri Volkov",
    email: "dmitri.volkov@example.com",
    phone: "+7 495 123 4567",
    propertyType: "penthouse",
    location: "Business Bay",
    bedrooms: "3",
    bathrooms: "3",
    area: "1800",
    condition: "excellent",
    yearBuilt: "2021",
    amenities: "Private terrace, Gym, Valet parking",
    description: "Luxury penthouse with panoramic city views",
    date: "2024-12-13T09:15:00Z",
    status: "completed",
  },
  {
    id: 4,
    name: "Fatima Al-Zahra",
    email: "fatima@example.com",
    propertyType: "townhouse",
    location: "Jumeirah Village Circle",
    bedrooms: "3",
    bathrooms: "2",
    area: "1500",
    condition: "fair",
    yearBuilt: "2016",
    amenities: "Community pool, Playground",
    description: "Family-friendly townhouse in quiet community",
    date: "2024-12-12T14:20:00Z",
    status: "new",
  },
]

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState<PropertyEvaluation[]>([])
  const [selectedEvaluation, setSelectedEvaluation] = useState<PropertyEvaluation | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  // Load evaluations from localStorage or use mock data
  useEffect(() => {
    setIsLoading(true)
    try {
      const storedEvaluations = localStorage.getItem("vl-property-evaluations")
      if (storedEvaluations) {
        setEvaluations(JSON.parse(storedEvaluations))
      } else {
        setEvaluations(mockEvaluations)
        localStorage.setItem("vl-property-evaluations", JSON.stringify(mockEvaluations))
      }
    } catch (error) {
      console.error("Error loading property evaluations:", error)
      setEvaluations(mockEvaluations)
    }
    setIsLoading(false)
  }, [])

  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.propertyType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || evaluation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewEvaluation = (evaluation: PropertyEvaluation) => {
    setSelectedEvaluation(evaluation)
    setIsViewDialogOpen(true)

    // Mark as reviewed if it's new
    if (evaluation.status === "new") {
      updateEvaluationStatus(evaluation.id, "reviewed")
    }
  }

  const handleDeleteEvaluation = (evaluation: PropertyEvaluation) => {
    setSelectedEvaluation(evaluation)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteEvaluation = () => {
    if (selectedEvaluation) {
      const updatedEvaluations = evaluations.filter((e) => e.id !== selectedEvaluation.id)
      setEvaluations(updatedEvaluations)
      localStorage.setItem("vl-property-evaluations", JSON.stringify(updatedEvaluations))
      setIsDeleteDialogOpen(false)
      setSelectedEvaluation(null)
    }
  }

  const updateEvaluationStatus = (id: number, status: "new" | "reviewed" | "completed") => {
    const updatedEvaluations = evaluations.map((evaluation) =>
      evaluation.id === id ? { ...evaluation, status } : evaluation,
    )
    setEvaluations(updatedEvaluations)
    localStorage.setItem("vl-property-evaluations", JSON.stringify(updatedEvaluations))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-red-100 text-red-800">New</Badge>
      case "reviewed":
        return <Badge className="bg-yellow-100 text-yellow-800">Reviewed</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getPropertyTypeBadge = (type: string) => {
    const typeMap: { [key: string]: string } = {
      apartment: "Apartment",
      villa: "Villa",
      townhouse: "Townhouse",
      penthouse: "Penthouse",
    }
    return (
      <Badge variant="outline" className="text-blue-600 border-blue-200">
        {typeMap[type] || type}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const newEvaluationsCount = evaluations.filter((e) => e.status === "new").length

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Property Evaluations</h1>
          <p className="text-gray-600">
            Manage property evaluation requests
            {newEvaluationsCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                {newEvaluationsCount} new
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search evaluations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border rounded-md text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Property Details</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vl-blue"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredEvaluations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No property evaluations found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id} className={evaluation.status === "new" ? "bg-blue-50" : ""}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          {evaluation.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Mail className="h-3 w-3 mr-1" />
                          {evaluation.email}
                        </div>
                        {evaluation.phone && (
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {evaluation.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getPropertyTypeBadge(evaluation.propertyType)}
                        <div className="text-sm text-gray-500 flex items-center">
                          <Home className="h-3 w-3 mr-1" />
                          {evaluation.bedrooms} bed • {evaluation.bathrooms} bath • {evaluation.area} sq ft
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                        {evaluation.location}
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(evaluation.date)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(evaluation.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewEvaluation(evaluation)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteEvaluation(evaluation)}
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

      {/* View Evaluation Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle>Property Evaluation Details</DialogTitle>
            <DialogDescription>View and manage this property evaluation request</DialogDescription>
          </DialogHeader>

          {selectedEvaluation && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">{selectedEvaluation.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`mailto:${selectedEvaluation.email}`} className="text-blue-600 hover:underline">
                        {selectedEvaluation.email}
                      </a>
                    </div>
                    {selectedEvaluation.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={`tel:${selectedEvaluation.phone}`} className="text-blue-600 hover:underline">
                          {selectedEvaluation.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <h3 className="font-medium text-gray-900 mb-3 mt-6">Request Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">Status:</span>
                      {getStatusBadge(selectedEvaluation.status)}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{formatDate(selectedEvaluation.date)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Property Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <div className="mt-1">{getPropertyTypeBadge(selectedEvaluation.propertyType)}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Condition:</span>
                        <div className="mt-1 capitalize">{selectedEvaluation.condition}</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-500">Location:</span>
                      <div className="mt-1 flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                        {selectedEvaluation.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-gray-500">Bedrooms:</span>
                        <div className="mt-1 font-medium">{selectedEvaluation.bedrooms}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Bathrooms:</span>
                        <div className="mt-1 font-medium">{selectedEvaluation.bathrooms}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Area:</span>
                        <div className="mt-1 font-medium">{selectedEvaluation.area} sq ft</div>
                      </div>
                    </div>

                    {selectedEvaluation.yearBuilt && (
                      <div>
                        <span className="text-gray-500">Year Built:</span>
                        <div className="mt-1">{selectedEvaluation.yearBuilt}</div>
                      </div>
                    )}

                    {selectedEvaluation.amenities && (
                      <div>
                        <span className="text-gray-500">Amenities:</span>
                        <div className="mt-1">{selectedEvaluation.amenities}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedEvaluation.description && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Additional Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{selectedEvaluation.description}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateEvaluationStatus(selectedEvaluation.id, "reviewed")}
                    disabled={selectedEvaluation.status === "reviewed" || selectedEvaluation.status === "completed"}
                  >
                    Mark as Reviewed
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateEvaluationStatus(selectedEvaluation.id, "completed")}
                    disabled={selectedEvaluation.status === "completed"}
                  >
                    Mark as Completed
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button
                    className="bg-vl-blue hover:bg-vl-blue-dark"
                    onClick={() => window.open(`mailto:${selectedEvaluation.email}`, "_blank")}
                  >
                    Send Evaluation
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property evaluation request from "{selectedEvaluation?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteEvaluation}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
