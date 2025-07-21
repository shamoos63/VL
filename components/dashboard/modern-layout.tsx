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
  FileText,
} from "lucide-react"
import "../../app/dashboard/modern-dashboard.css"

interface ModernDashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/dashboard/properties", icon: Building2 },
  { name: "Contacts", href: "/dashboard/contacts", icon: MessageSquare },
  { name: "Evaluations", href: "/dashboard/evaluations", icon: Calculator },
  { name: "Blog", href: "/dashboard/blog", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function ModernDashboardLayout({ children }: ModernDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("vl-auth-state")
    window.location.href = "/dashboard/login"
  }

  return (
    <div className="modern-dashboard">
      <div className="dashboard-container">
        {/* Mobile backdrop */}
        {sidebarOpen && <div className="dashboard-backdrop show" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <Link href="/dashboard" className="sidebar-logo">
              <div className="sidebar-logo-icon">VL</div>
              <div>
                <div className="sidebar-logo-text">VL Dashboard</div>
                <div className="sidebar-logo-subtitle">Real Estate Management</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <div className="nav-section">
              <h3 className="nav-section-title">Main Navigation</h3>
              <ul className="nav-list">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name} className="nav-item">
                      <Link
                        href={item.href}
                        className={`nav-link ${isActive ? "active" : ""}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="nav-icon" />
                        <span className="nav-text">{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* User Profile */}
          <div className="sidebar-user">
            <div className="user-profile">
              <div className="user-avatar">VL</div>
              <div className="user-info">
                <h4>Victoria Lancaster</h4>
                <p>Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`dashboard-main ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
          {/* Header */}
          <header className="dashboard-header">
            <div className="header-left">
              <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="header-title">Dashboard</h1>
            </div>
            <div className="header-right">
              <Link href="/" className="header-btn">
                <Home size={16} />
                <span>Back to Website</span>
              </Link>
              <button className="header-btn">
                <User size={16} />
                <span>Profile</span>
              </button>
              <button className="header-btn" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
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
