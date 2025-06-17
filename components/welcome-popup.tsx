"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { X, CheckCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import Image from "next/image"
import AnimatedCounter from "@/components/animated-counter"

interface WelcomePopupProps {
  onClose: () => void
}

export default function WelcomePopup({ onClose }: WelcomePopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t, isRTL } = useI18n()
  const popupRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleSkip()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the data to your backend/database
    console.log("Welcome form submitted:", formData)

    // Store in localStorage to prevent showing again
    localStorage.setItem("vl-welcome-shown", "true")

    setIsSubmitted(true)

    // Close popup after 3 seconds
    setTimeout(() => {
      onClose()
    }, 3000)
  }

  const handleSkip = () => {
    localStorage.setItem("vl-welcome-shown", "true")
    onClose()
  }

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl border-0" ref={popupRef}>
          <CardContent className="p-8 text-center bg-white">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-vl-blue mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              I've received your details and will be in touch soon with personalized recommendations.
            </p>
            <p className="text-sm text-gray-500">Expect to hear from me within 24 hours.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Card
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-0 relative"
        ref={popupRef}
      >
        {/* Modern Blue Header with Responsive Layout */}
        <CardHeader className="relative bg-gradient-to-br from-vl-blue via-vl-blue-light to-vl-blue-dark text-white rounded-t-2xl rounded-b-2xl shadow-lg mb-4 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>



          <div className="relative z-10">
            {/* Responsive Layout: Stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
              {/* Photo - Responsive sizing and positioning */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src="/victoria-photo-1.jpg"
                  alt="Victoria Lancaster"
                  width={120}
                  height={200}
                  className="rounded-xl md:rounded-l-xl md:rounded-r-none object-cover border-4 border-white/20 shadow-lg w-32 h-40 md:w-[120px] md:h-[200px]"
                />
              </div>

              {/* Text Content - Responsive layout */}
              <div className="flex-1 text-center md:text-left md:pt-2">
                <CardTitle className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 leading-tight">
                  Hi, I&apos;m Victoria.
                </CardTitle>
                <p className="text-white/95 text-base md:text-lg leading-relaxed mb-4 md:mb-6 font-medium">
                  I help investors find the right property, aligned with their goals and truly worth pursuing.
                </p>

                {/* Two Column Stats - Responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {/* Experience Column */}
                  <div className="text-center">
                    <div className="text-white font-semibold text-base md:text-lg mb-1">
                      With over{" "}
                      <AnimatedCounter end={15} duration={2000} className="inline-block font-bold text-vl-yellow" />{" "}
                      years of experience
                    </div>
                    <p className="text-white/80 text-sm">Across Dubai and the UK</p>
                  </div>

                  {/* Strategic Column */}
                  <div className="text-center">
                    <div className="text-white font-semibold text-base md:text-lg mb-1">Strategically</div>
                    <p className="text-white/80 text-sm">recommend the best property for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Form Content - Tucked under header */}
        <CardContent className="bg-white p-4 md:p-6 -mt-4 relative z-10 rounded-t-xl">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-semibold text-vl-blue mb-2">Get in touch</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-vl-blue font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 bg-white border-gray-200 focus:border-vl-blue text-black"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-vl-blue font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="+971 XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 bg-white border-gray-200 focus:border-vl-blue text-black"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-vl-blue font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1 bg-white border-gray-200 focus:border-vl-blue text-black"
              />
            </div>

            <div>
              <Label htmlFor="details" className="text-vl-blue font-medium">
                Details
              </Label>
              <Textarea
                id="details"
                placeholder="Tell me about your investment goals, preferred areas, budget range, or any specific requirements..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="mt-1 bg-white border-gray-200 focus:border-vl-blue min-h-[80px] md:min-h-[100px] resize-none text-black"
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
              <Button type="button" variant="ghost" onClick={handleSkip} className="text-gray-500 order-2 sm:order-1">
                Skip for now
              </Button>

              <Button
                type="submit"
                disabled={!formData.name || !formData.email}
                className="bg-vl-yellow hover:bg-vl-yellow-dark text-vl-blue font-semibold px-6 md:px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 order-1 sm:order-2"
              >
                Send to Victoria
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
