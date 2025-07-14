"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import ServerPageHero from "@/components/server-page-hero"
import HomePropertyListings from "@/components/home-property-listings"
import { useI18n } from "@/lib/i18n"

export default function PropertiesPage() {
  const { t, isRTL } = useI18n()

  return (
    <main className="min-h-screen pt-24 bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      <ServerPageHero
        title={t("properties.hero.title")}
        subtitle={t("properties.hero.subtitle")}
        backgroundImage="/hero.webp"
        className="font-sansumi"
      />
      <HomePropertyListings />
      <Footer />
    </main>
  )
}
