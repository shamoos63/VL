import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n"
import { AuthProvider } from "@/lib/auth-context"
import { FilterProvider } from "@/contexts/filter-context"
import WelcomePopupWrapper from "@/components/welcome-popup-wrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const cairo = localFont({
  src: [
    {
      path: "../public/fonts/Cairo.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
})

const sansumiUltraLight = localFont({
  src: "../public/fonts/Sansumi-UltraLight.ttf",
  variable: "--font-sansumi-ultralight",
  weight: "200",
  display: "swap",
})

const sansumiRegular = localFont({
  src: "../public/fonts/Sansumi-Regular.ttf",
  variable: "--font-sansumi-regular",
  weight: "400",
  display: "swap",
})

const sansumiDemiBold = localFont({
  src: "../public/fonts/Sansumi-DemiBold.ttf",
  variable: "--font-sansumi-demibold",
  weight: "600",
  display: "swap",
})

const sansumiBold = localFont({
  src: "../public/fonts/Sansumi-Bold.ttf",
  variable: "--font-sansumi-bold",
  weight: "700",
  display: "swap",
})

const notoSansMonoRegular = localFont({
  src: "../public/fonts/NotoSansMono-Regular.ttf",
  variable: "--font-noto-sans-mono-regular",
  weight: "400",
  display: "swap",
})

const notoSansMonoBold = localFont({
  src: "../public/fonts/NotoSansMono-Bold.ttf",
  variable: "--font-noto-sans-mono-bold",
  weight: "700",
  display: "swap",
})

const notoSansMonoSemiBold = localFont({
  src: "../public/fonts/NotoSansMono-SemiBold.ttf",
  variable: "--font-noto-sans-mono-semibold",
  weight: "600",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Victoria Lancaster - Real Estate",
  description: "Premium real estate services with Victoria Lancaster",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable} 
        ${poppins.variable} 
        ${cairo.variable} 
        ${sansumiUltraLight.variable} 
        ${sansumiRegular.variable} 
        ${sansumiDemiBold.variable} 
        ${sansumiBold.variable}
        ${notoSansMonoRegular.variable}
        ${notoSansMonoBold.variable}
        ${notoSansMonoSemiBold.variable}
      `}
    >
      <body className={inter.className}>
        <AuthProvider>
          <I18nProvider>
            <FilterProvider>
              <WelcomePopupWrapper />
              {children}
            </FilterProvider>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
