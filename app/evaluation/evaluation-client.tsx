"use client"
import dynamic from "next/dynamic"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, TrendingUp, Award } from "lucide-react"
import AnimatedCounter from "@/components/animated-counter"

const PropertyEvaluationTool = dynamic(() => import("@/components/property-evaluation-tool"), { ssr: false })

export default function EvaluationClient() {
  const { t, isRTL } = useI18n()

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Description Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xl text-white mb-8 leading-relaxed">{t("evaluation.description.text1")}</p>
          <p className="text-lg text-white mb-6">{t("evaluation.description.text2")}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass p-6 rounded-xl">
              <CheckCircle className="h-8 w-8 text-vl-yellow mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t("evaluation.feature1")}</h3>
            </div>
            <div className="glass p-6 rounded-xl">
              <TrendingUp className="h-8 w-8 text-vl-yellow mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t("evaluation.feature2")}</h3>
            </div>
            <div className="glass p-6 rounded-xl">
              <Award className="h-8 w-8 text-vl-yellow mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t("evaluation.feature3")}</h3>
            </div>
          </div>

          <p className="text-lg text-white font-medium">{t("evaluation.description.conclusion")}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center glass p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-vl-yellow mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-white font-medium">{t("evaluation.stats.evaluated")}</div>
            </div>
            <div className="text-center glass p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-vl-yellow mb-2">
                <AnimatedCounter prefix="AED " end={2.5} suffix="B" />
              </div>
              <div className="text-white font-medium">{t("evaluation.stats.value")}</div>
            </div>
            <div className="text-center glass p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-vl-yellow mb-2">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <div className="text-white font-medium">{t("evaluation.stats.experience")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Form */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="glass">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-vl-blue mb-2 text-center">{t("evaluation.form.title")}</h2>
              <p className="text-gray-600 mb-8 text-center">{t("evaluation.contact.info")}</p>

              <form className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.name")}
                    </label>
                    <Input type="text" id="name" placeholder={t("evaluation.name.placeholder")} className="w-full" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.email")}
                    </label>
                    <Input type="email" id="email" placeholder={t("evaluation.email.placeholder")} className="w-full" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("evaluation.phone")}
                  </label>
                  <Input type="tel" id="phone" placeholder={t("evaluation.phone.placeholder")} className="w-full" />
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.property.type")}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("evaluation.select.type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">{t("search.apartment")}</SelectItem>
                        <SelectItem value="villa">{t("search.villa")}</SelectItem>
                        <SelectItem value="townhouse">{t("search.townhouse")}</SelectItem>
                        <SelectItem value="penthouse">{t("search.penthouse")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.location")}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("evaluation.select.location")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai-marina">{t("location.dubai.marina")}</SelectItem>
                        <SelectItem value="downtown">{t("location.downtown")}</SelectItem>
                        <SelectItem value="palm-jumeirah">{t("location.palm.jumeirah")}</SelectItem>
                        <SelectItem value="business-bay">{t("location.business.bay")}</SelectItem>
                        <SelectItem value="jvc">{t("location.jvc")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.bedrooms")}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("evaluation.select.beds")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.bathrooms")}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("evaluation.select.baths")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.area")}
                    </label>
                    <Input type="number" id="area" placeholder={t("evaluation.area.placeholder")} className="w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.condition")}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("evaluation.select.condition")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">{t("evaluation.condition.excellent")}</SelectItem>
                        <SelectItem value="good">{t("evaluation.condition.good")}</SelectItem>
                        <SelectItem value="fair">{t("evaluation.condition.fair")}</SelectItem>
                        <SelectItem value="renovation">{t("evaluation.condition.renovation")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("evaluation.year.built")}
                    </label>
                    <Input
                      type="number"
                      id="yearBuilt"
                      placeholder={t("evaluation.year.placeholder")}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("evaluation.amenities")}
                  </label>
                  <Input
                    type="text"
                    id="amenities"
                    placeholder={t("evaluation.amenities.placeholder")}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("evaluation.description")}
                  </label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder={t("evaluation.description.placeholder")}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-vl-blue hover:bg-vl-blue/90 text-white font-semibold py-4 text-lg"
                >
                  {t("evaluation.button")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
