"use client"

import { useState, useEffect } from "react"
import ModernDashboardLayout from "@/components/dashboard/modern-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Save, AlertCircle } from "lucide-react"

// Contact settings interface
interface ContactSettings {
  phone: string
  email: string
  address: string
  facebook: string
  instagram: string
  twitter: string
  linkedin: string
}

// Default contact settings
const defaultSettings: ContactSettings = {
  phone: "+971-XX-XXX-XXXX",
  email: "victoria@vlrealestate.com",
  address: "Dubai, United Arab Emirates",
  facebook: "https://facebook.com/vlrealestate",
  instagram: "https://instagram.com/vlrealestate",
  twitter: "https://twitter.com/vlrealestate",
  linkedin: "https://linkedin.com/company/vlrealestate",
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<ContactSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Load settings from localStorage
  useEffect(() => {
    setIsLoading(true)
    try {
      const storedSettings = localStorage.getItem("vl-contact-settings")
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings))
      }
    } catch (error) {
      console.error("Error loading contact settings:", error)
    }
    setIsLoading(false)
  }, [])

  const handleInputChange = (field: keyof ContactSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")

    try {
      // Save to localStorage
      localStorage.setItem("vl-contact-settings", JSON.stringify(settings))

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSaveMessage("Settings saved successfully!")

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      setSaveMessage("Error saving settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    setSaveMessage("")
  }

  if (isLoading) {
    return (
      <ModernDashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vl-blue"></div>
        </div>
      </ModernDashboardLayout>
    )
  }

  return (
    <ModernDashboardLayout>
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage your contact information and social media links</p>
        </div>

        {saveMessage && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              saveMessage.includes("Error")
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-green-50 text-green-800 border border-green-200"
            }`}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            {saveMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-vl-blue" />
                Contact Information
              </CardTitle>
              <CardDescription>Update your primary contact details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div>
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+971-XX-XXX-XXXX"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="victoria@vlrealestate.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  Office Address
                </Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Dubai, United Arab Emirates"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Instagram className="h-5 w-5 mr-2 text-vl-blue" />
                Social Media Links
              </CardTitle>
              <CardDescription>Update your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div>
                <Label htmlFor="facebook" className="flex items-center">
                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  value={settings.facebook}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/vlrealestate"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="instagram" className="flex items-center">
                  <Instagram className="h-4 w-4 mr-2 text-pink-600" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  value={settings.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/vlrealestate"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="twitter" className="flex items-center">
                  <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={settings.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/vlrealestate"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="linkedin" className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={settings.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/vlrealestate"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="mt-6 bg-white border-0 shadow-lg">
          <CardHeader className="bg-white">
            <CardTitle>Preview</CardTitle>
            <CardDescription>This is how your contact information will appear on the website</CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-vl-yellow" />
                    <span>{settings.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-vl-yellow" />
                    <span>{settings.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-vl-yellow" />
                    <span>{settings.address}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Social Media</h4>
                  <div className="flex space-x-3">
                    {settings.facebook && (
                      <a
                        href={settings.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {settings.instagram && (
                      <a
                        href={settings.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {settings.twitter && (
                      <a
                        href={settings.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {settings.linkedin && (
                      <a
                        href={settings.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Button variant="outline" onClick={handleReset} disabled={isSaving}>
            Reset to Default
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-vl-blue hover:bg-vl-blue-dark">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </ModernDashboardLayout>
  )
}
