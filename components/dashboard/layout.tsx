"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Home,
  Building2,
  MessageSquare,
  Calculator,
  Settings,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react"
import "../../app/dashboard/dashboard.css"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/dashboard/properties", icon: Building2 },
  { name: "Contacts", href: "/dashboard/contacts", icon: MessageSquare },
  { name: "Evaluations", href: "/dashboard/evaluations", icon: Calculator },
  { name: "Blog", href: "/dashboard/blog", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="dashboard-root">
      <div className="dashboard-container">
        {/* Mobile backdrop */}
        {sidebarOpen && <div className="dashboard-backdrop show" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
          {/* Sidebar Header */}
          <div className="dashboard-sidebar-header">
            <Link href="/dashboard" className="dashboard-logo">
              <div className="w-8 h-8 bg-[#061B34] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VL</span>
              </div>
              <span>VL Dashboard</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="dashboard-nav">
            <div className="dashboard-nav-section">
              <h3 className="dashboard-nav-title">Main</h3>
              <ul className="dashboard-nav-list">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name} className="dashboard-nav-item">
                      <Link
                        href={item.href}
                        className={`dashboard-nav-link ${isActive ? "active" : ""}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="dashboard-nav-icon" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* User Menu */}
          <div className="dashboard-user-menu">
            <div className="dashboard-user-avatar">VL</div>
            <div className="dashboard-user-info">
              <h4>Victoria Lancaster</h4>
              <p>Administrator</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`dashboard-main ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
          {/* Header */}
          <header className="dashboard-header">
            <div className="dashboard-header-left">
              <button className="dashboard-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="dashboard-header-title">Dashboard</h1>
            </div>
            <div className="dashboard-header-right">
              <Link href="/" className="dashboard-btn dashboard-btn-ghost">
                <Home size={16} />
                <span>Back to Website</span>
              </Link>
              <button className="dashboard-btn dashboard-btn-ghost">
                <User size={16} />
              </button>
              <button className="dashboard-btn dashboard-btn-ghost">
                <LogOut size={16} />
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="dashboard-content">{children}</div>
        </main>
      </div>
    </div>
  )
}
