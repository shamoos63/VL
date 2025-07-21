"use client"

import { useState, useEffect } from "react"
import ModernDashboardLayout from "@/components/dashboard/modern-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Trash2, Calendar, Mail, Phone, MessageSquare, User } from "lucide-react"

// Contact request interface
interface ContactRequest {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  type: "general" | "property" | "evaluation"
  propertyId?: number
  propertyTitle?: string
  date: string
  status: "new" | "read" | "replied"
}

// Mock contact requests
const mockContactRequests: ContactRequest[] = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    email: "ahmed@example.com",
    phone: "+971 50 123 4567",
    message:
      "I'm interested in investing in Dubai real estate. Could you please provide more information about off-plan properties in Dubai Marina?",
    type: "general",
    date: "2024-12-15T10:30:00Z",
    status: "new",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+44 20 7946 0958",
    message: "I would like to schedule a viewing for this property. I'm available next week.",
    type: "property",
    propertyId: 1,
    propertyTitle: "Modern Villa",
    date: "2024-12-14T15:45:00Z",
    status: "read",
  },
  {
    id: 3,
    name: "Dmitri Volkov",
    email: "dmitri.volkov@example.com",
    phone: "+7 495 123 4567",
    message:
      "Hello, I'm looking for investment opportunities in Dubai. What are the current market trends and best areas for ROI?",
    type: "general",
    date: "2024-12-13T09:15:00Z",
    status: "replied",
  },
  {
    id: 4,
    name: "Fatima Al-Zahra",
    email: "fatima@example.com",
    message: "I submitted a property evaluation request. When can I expect to hear back from you?",
    type: "evaluation",
    date: "2024-12-12T14:20:00Z",
    status: "new",
  },
  {
    id: 5,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+65 9123 4567",
    message:
      "I'm interested in this penthouse. Can you provide more details about the payment plan and financing options?",
    type: "property",
    propertyId: 4,
    propertyTitle: "Penthouse Suite",
    date: "2024-12-11T11:30:00Z",
    status: "read",
  },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([])
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  // Load contacts from localStorage or use mock data
  useEffect(() => {
    setIsLoading(true)
    try {
      const storedContacts = localStorage.getItem("vl-contact-requests")
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts))
      } else {
        setContacts(mockContactRequests)
        localStorage.setItem("vl-contact-requests", JSON.stringify(mockContactRequests))
      }
    } catch (error) {
      console.error("Error loading contact requests:", error)
      setContacts(mockContactRequests)
    }
    setIsLoading(false)
  }, [])

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || contact.status === statusFilter
    const matchesType = typeFilter === "all" || contact.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewContact = (contact: ContactRequest) => {
    setSelectedContact(contact)
    setIsViewDialogOpen(true)

    // Mark as read if it's new
    if (contact.status === "new") {
      updateContactStatus(contact.id, "read")
    }
  }

  const handleDeleteContact = (contact: ContactRequest) => {
    setSelectedContact(contact)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteContact = () => {
    if (selectedContact) {
      const updatedContacts = contacts.filter((c) => c.id !== selectedContact.id)
      setContacts(updatedContacts)
      localStorage.setItem("vl-contact-requests", JSON.stringify(updatedContacts))
      setIsDeleteDialogOpen(false)
      setSelectedContact(null)
    }
  }

  const updateContactStatus = (id: number, status: "new" | "read" | "replied") => {
    const updatedContacts = contacts.map((contact) => (contact.id === id ? { ...contact, status } : contact))
    setContacts(updatedContacts)
    localStorage.setItem("vl-contact-requests", JSON.stringify(updatedContacts))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-red-100 text-red-800">New</Badge>
      case "read":
        return <Badge className="bg-yellow-100 text-yellow-800">Read</Badge>
      case "replied":
        return <Badge className="bg-green-100 text-green-800">Replied</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "general":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            General
          </Badge>
        )
      case "property":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Property
          </Badge>
        )
      case "evaluation":
        return (
          <Badge variant="outline" className="text-purple-600 border-purple-200">
            Evaluation
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
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

  const newContactsCount = contacts.filter((c) => c.status === "new").length

  return (
    <ModernDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contact Requests</h1>
          <p className="text-gray-600">
            Manage customer inquiries and messages
            {newContactsCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                {newContactsCount} new
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
                placeholder="Search contacts..."
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
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
              <select
                className="px-3 py-2 border rounded-md text-sm"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="general">General</option>
                <option value="property">Property</option>
                <option value="evaluation">Evaluation</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message Preview</TableHead>
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
              ) : filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No contact requests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className={contact.status === "new" ? "bg-blue-50" : ""}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          {contact.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Mail className="h-3 w-3 mr-1" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getTypeBadge(contact.type)}
                        {contact.propertyTitle && (
                          <div className="text-xs text-gray-500">Re: {contact.propertyTitle}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate text-sm">
                        <MessageSquare className="h-3 w-3 inline mr-1 text-gray-500" />
                        {contact.message}
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(contact.date)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(contact.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewContact(contact)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteContact(contact)}
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

      {/* View Contact Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl bg-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle>Contact Request Details</DialogTitle>
            <DialogDescription>View and manage this contact request</DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">{selectedContact.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                        {selectedContact.email}
                      </a>
                    </div>
                    {selectedContact.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                          {selectedContact.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Request Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">Type:</span>
                      {getTypeBadge(selectedContact.type)}
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">Status:</span>
                      {getStatusBadge(selectedContact.status)}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{formatDate(selectedContact.date)}</span>
                    </div>
                    {selectedContact.propertyTitle && (
                      <div>
                        <span className="text-gray-500 mr-2">Property:</span>
                        <span className="font-medium">{selectedContact.propertyTitle}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateContactStatus(selectedContact.id, "read")}
                    disabled={selectedContact.status === "read"}
                  >
                    Mark as Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateContactStatus(selectedContact.id, "replied")}
                    disabled={selectedContact.status === "replied"}
                  >
                    Mark as Replied
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button
                    className="bg-vl-blue hover:bg-vl-blue-dark"
                    onClick={() => window.open(`mailto:${selectedContact.email}`, "_blank")}
                  >
                    Reply via Email
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
              Are you sure you want to delete this contact request from "{selectedContact?.name}"? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteContact}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ModernDashboardLayout>
  )
}
