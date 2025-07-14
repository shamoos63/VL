"use client"
import dynamic from "next/dynamic"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

const ContactForm = dynamic(() => import("@/components/contact-form"), { ssr: false })

export default function ContactClient() {
  const { t, isRTL } = useI18n()

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Contact Information Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-vl-blue mb-6">{t("contact.form.title")}</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.first.name")}
                      </label>
                      <Input
                        type="text"
                        id="firstName"
                        placeholder={t("contact.first.name.placeholder")}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.last.name")}
                      </label>
                      <Input
                        type="text"
                        id="lastName"
                        placeholder={t("contact.last.name.placeholder")}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.email")}
                    </label>
                    <Input type="email" id="email" placeholder={t("contact.email.placeholder")} className="w-full" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.phone")}
                    </label>
                    <Input type="tel" id="phone" placeholder={t("contact.phone.placeholder")} className="w-full" />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.budget")}
                    </label>
                    <Input type="text" id="budget" placeholder={t("contact.budget.placeholder")} className="w-full" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.message")}
                    </label>
                    <Textarea id="message" rows={5} placeholder={t("contact.message.placeholder")} className="w-full" />
                  </div>

                  <Button type="submit" className="w-full bg-vl-blue hover:bg-vl-blue/90 text-white font-semibold py-3">
                    {t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="glass">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-vl-blue mb-6">{t("contact.info.title")}</h2>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-vl-yellow mr-4" />
                      <div>
                        <p className="font-semibold text-gray-900">{t("contact.info.phone")}</p>
                        <p className="text-gray-600">+971-XX-XXX-XXXX</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-vl-yellow mr-4" />
                      <div>
                        <p className="font-semibold text-gray-900">{t("contact.info.email")}</p>
                        <p className="text-gray-600">info@vlrealestate.com</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 text-vl-yellow mr-4" />
                      <div>
                        <p className="font-semibold text-gray-900">{t("contact.info.office")}</p>
                        <p className="text-gray-600">Dubai, UAE</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-6 w-6 text-vl-yellow mr-4" />
                      <div>
                        <p className="font-semibold text-gray-900">{t("contact.info.hours")}</p>
                        <p className="text-gray-600">{t("contact.info.hours.time")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card className="glass">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-vl-blue mb-4">{t("contact.location.title")}</h3>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Interactive Map Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
