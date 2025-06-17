"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import {
  LayoutDashboard,
  Home,
  Building,
  FileText,
  MessageSquare,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    if (!isLoading && !user) {
      console.log("No user found, redirecting to login...")
      router.push("/dashboard/login")
    }

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [user, isLoading, router])

  const handleLogout = () => {
    console.log("Logging out user...")
    logout()
    router.push("/dashboard/login")
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vl-blue mx-auto mb-4"></div>
          <p className="text-vl-blue font-medium">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show loading if no user (will redirect)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vl-blue mx-auto mb-4"></div>
          <p className="text-vl-blue font-medium">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/dashboard/properties", icon: Building },
    { name: "Blog", href: "/dashboard/blog", icon: FileText },
    { name: "Contact Requests", href: "/dashboard/contacts", icon: MessageSquare },
    { name: "Evaluations", href: "/dashboard/evaluations", icon: ClipboardList },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    return pathname?.startsWith(path) && path !== "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-6 w-6 text-vl-blue" /> : <Menu className="h-6 w-6 text-vl-blue" />}
          </Button>
          <Image src="/VL_logo.svg" alt="Victoria Lancaster Real Estate" width={120} height={40} className="ml-2" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-vl-blue text-white">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-vl-blue">{user.username}</span>
              <ChevronDown className="ml-2 h-4 w-4 text-vl-blue" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4 text-vl-blue" />
              <span className="text-vl-blue">View Website</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 text-vl-blue" />
              <span className="text-vl-blue">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <Image src="/VL_logo.svg" alt="Victoria Lancaster Real Estate" width={150} height={50} />
            <div className="mt-2 text-sm text-vl-blue font-medium">Admin Dashboard</div>
            <div className="mt-1 text-xs text-accessible-secondary">Logged in as: {user.username}</div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors focus-visible:focus ${
                    isActive(item.href)
                      ? "bg-vl-blue text-white"
                      : "text-vl-blue hover:bg-blue-50 hover:text-vl-blue-dark"
                  }`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? "text-white" : "text-vl-blue"}`} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-vl-blue text-white">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-vl-blue">{user.username}</div>
                <div className="text-xs text-accessible-secondary">Administrator</div>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-vl-blue text-vl-blue hover:bg-vl-blue hover:text-white"
                onClick={() => {
                  router.push("/")
                  isMobile && setIsSidebarOpen(false)
                }}
              >
                <Home className="mr-1 h-4 w-4" />
                Website
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-vl-blue text-vl-blue hover:bg-vl-blue hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""}`}
        style={{ marginLeft: isMobile ? 0 : isSidebarOpen ? "16rem" : 0 }}
      >
        <main className="p-4 md:p-8 min-h-screen">{children}</main>
      </div>

      {/* Mobile sidebar backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
