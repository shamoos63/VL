"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Check } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useI18n()
  const { isAuthenticated } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    { code: "ru", name: "Russian", nativeName: "Русский" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as "en" | "ar" | "ru")
    setIsLanguageDropdownOpen(false)
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/properties", label: t("nav.properties") },
    { href: "/areas", label: t("nav.areas") },
    { href: "/evaluation", label: t("nav.evaluation") },
    { href: "/about", label: t("nav.about") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/VL1_w.svg" alt="VL Real Estate" width={120} height={40} className="h-10 w-auto" priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  isActive(item.href) ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Language Dropdown & Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Enhanced Language Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleLanguageDropdown}
                className="language-trigger flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 backdrop-blur-sm"
                aria-expanded={isLanguageDropdownOpen}
                aria-haspopup="true"
              >
                <span className="font-semibold">{currentLanguage.nativeName}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isLanguageDropdownOpen && (
                <div className="language-dropdown absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-2xl z-50">
                  <div className="py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`language-item w-full px-4 py-3 text-left flex items-center justify-between transition-all duration-200 ${
                          language === lang.code
                            ? "language-item-active bg-blue-50/80 text-blue-700 border-l-4 border-blue-500"
                            : "language-item-inactive text-gray-700 hover:bg-gray-50/80"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{lang.nativeName}</span>
                          <span className="text-xs text-gray-500">{lang.name}</span>
                        </div>
                        {language === lang.code && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth Button */}
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                {t("nav.dashboard")}
              </Link>
            ) : (
              <Link
                href="/dashboard/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleLanguageDropdown}
                className="mobile-language-trigger flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-xs">{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="mobile-language-dropdown absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors duration-200 ${
                          language === lang.code
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {lang.nativeName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    {t("nav.dashboard")}
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/login"
                    className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    {t("nav.login")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
