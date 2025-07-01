"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useI18n, type Language } from "@/lib/i18n"

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "ar" as Language, name: "العربية", flag: "🇦🇪" },
  { code: "ru" as Language, name: "Русский", flag: "🇷🇺" },
]

// Navigation items in the specified order
const navItems = [
  { key: "home", path: "/" },
  { key: "properties", path: "/properties" },
  { key: "areas", path: "/areas" },
  { key: "evaluation", path: "/evaluation" },
  { key: "about", path: "/about" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t, isRTL } = useI18n()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to check if a navigation item is active
  const isActiveNavItem = (path: string) => {
    if (path === "/" && pathname === "/") {
      return true
    }
    if (path !== "/" && pathname?.startsWith(path)) {
      return true
    }
    return false
  }

  // Don't render full content until client-side hydration is complete
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/VL_logo.svg"
                alt="Victoria Lancaster Real Estate"
                width={240}
                height={90}
                className="h-20 w-auto brightness-0 invert"
                priority
              />
            </Link>
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-vl-blue !important hover:text-vl-blue transition-colors font-medium">
                Home
              </Link>
              <Link href="/properties" className="text-vl-blue !important hover:text-vl-blue transition-colors font-medium">
                Properties
              </Link>
              <Link href="/areas" className="text-vl-blue !important hover:text-vl-blue transition-colors font-medium">
                Areas
              </Link>
              <Link href="/evaluation" className="text-vl-blue !important hover:text-vl-blue transition-colors font-medium">
                Property Evaluation
              </Link>
              <Link href="/about" className="text-vl-blue !important hover:text-vl-blue transition-colors font-medium">
                About
              </Link>
              <Link href="/blog" className="text-vl-blue !important hover:text-vl-blue transition-colors font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-vl-blue !important hover:text-vl-blue transition-colors font-medium">
                Contact
              </Link>
            </div>
            <div></div>
          </div>
        </div>
      </header>
    )
  }

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "mt-2 mx-4 bg-transparent backdrop-blur-md shadow-xl rounded-2xl"
            : "bg-white/60 backdrop-blur-md shadow-lg"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Updated Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0 text-white">
              <Image
                src="/VL_logo.svg"
                alt="Victoria Lancaster Real Estate"
                width={240}
                height={90}
                className="h-20 w-auto transition-all duration-300 hover:scale-105"
                priority
              />
            </Link>

            {/* Mobile: Simplified branding */}
            <div className="lg:hidden flex items-center">
              <span className="text-sm font-bold text-vl-blue">VL Real Estate</span>
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center ${isRTL ? "space-x-reverse space-x-6" : "space-x-8"}`}>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.path}
                  className={`nav-item text-sm xl:text-base font-medium transition-colors text-vl-blue ${
                    isActiveNavItem(item.path) ? "nav-active" : "text-vl-blue hover:text-vl-yellow"
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              {/* Expandable Search */}
              <div className="relative">
                {isSearchOpen ? (
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <Input
                      type="text"
                      placeholder={t("nav.search.placeholder") || "Search properties..."}
                      className="border-0 bg-transparent focus:ring-0 w-48"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-vl-blue ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)} className="text-vl-blue">
                    <Search className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-vl-blue">
                    <Globe className="h-4 w-4 mr-1" />
                    {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-[150]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? "bg-vl-yellow/20" : ""}
                    >
                      {lang.flag} {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-vl-blue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
         {isMenuOpen && (
  <div className="lg:hidden absolute top-full left-0 right-0 mobile-menu-container shadow-lg border-t rounded-b-2xl z-[110]"> {/* Added mobile-menu-container */}
    <nav className="flex flex-col p-4 space-y-4">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={item.path}
          className={`font-medium py-2 transition-colors ${
            isActiveNavItem(item.path) ? "nav-mobile-active" : "text-vl-blue hover:text-vl-yellow"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {t(`nav.${item.key}`)}
        </Link>
      ))}

      <div className="flex items-center justify-center pt-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-vl-blue">
              <Globe className="h-4 w-4 mr-1" />
              {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mobile-dropdown-content z-999"> {/* Added mobile-dropdown-content */}
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={language === lang.code ? "bg-vl-yellow/20" : ""}
              >
                {lang.flag} {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  </div>
)}
        </div>
      </header>
    </>
  )
}
