import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n"
import WelcomePopupWrapper from "@/components/welcome-popup-wrapper"
import ChatWrapper from "@/components/chat-wrapper"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const cairo = localFont({
  src: "../public/fonts/Cairo.ttf",
  variable: "--font-cairo",
  display: "swap",
})

// Sansumi font variants (available but not used yet)
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

export const metadata: Metadata = {
  title: "VL Real Estate Agency - Dubai Property Investment",
  description:
    "Find your dream property in Dubai with Victoria Lancaster. Luxury homes, investment opportunities, and personalized service you can trust.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${cairo.variable} 
                   ${sansumiUltraLight.variable} ${sansumiRegular.variable} 
                   ${sansumiDemiBold.variable} ${sansumiBold.variable} 
                   font-sans antialiased`}
      >
        <I18nProvider>
          <AuthProvider>
            {children}
            <WelcomePopupWrapper />
            <ChatWrapper />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
