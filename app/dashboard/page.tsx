"use client"

import { useState, useEffect } from "react"
import ModernDashboardLayout from "../../components/dashboard/modern-layout"
import {
  Building2,
  Users,
  Calculator,
  TrendingUp,
  Plus,
  MessageSquare,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Activity,
  FileText,
} from "lucide-react"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <ModernDashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="loading-spinner"></div>
        </div>
      </ModernDashboardLayout>
    )
  }

  return (
    <ModernDashboardLayout>
      <div className="fade-in">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">
            Welcome back, Victoria! Here's what's happening with your real estate business.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-header">
              <h3 className="stat-title">Total Properties</h3>
              <div className="stat-icon">
                <Building2 size={24} />
              </div>
            </div>
            <div className="stat-value">247</div>
            <div className="stat-change positive">
              <ArrowUpRight size={16} />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-header">
              <h3 className="stat-title">Active Clients</h3>
              <div className="stat-icon green">
                <Users size={24} />
              </div>
            </div>
            <div className="stat-value">1,429</div>
            <div className="stat-change positive">
              <ArrowUpRight size={16} />
              <span>+8% from last month</span>
            </div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-header">
              <h3 className="stat-title">Evaluations</h3>
              <div className="stat-icon yellow">
                <Calculator size={24} />
              </div>
            </div>
            <div className="stat-value">89</div>
            <div className="stat-change positive">
              <ArrowUpRight size={16} />
              <span>+23% from last month</span>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-header">
              <h3 className="stat-title">Revenue</h3>
              <div className="stat-icon purple">
                <DollarSign size={24} />
              </div>
            </div>
            <div className="stat-value">$2.4M</div>
            <div className="stat-change positive">
              <ArrowUpRight size={16} />
              <span>+15% from last month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <Activity size={20} />
              Quick Actions
            </h2>
            <p className="card-subtitle">Frequently used actions for efficient workflow management</p>
          </div>
          <div className="card-content">
            <div className="quick-actions-grid">
              <a href="/dashboard/properties" className="quick-action">
                <div className="quick-action-icon">
                  <Plus size={24} />
                </div>
                <div className="quick-action-content">
                  <h3>Add New Property</h3>
                  <p>List a new property for sale or rent</p>
                </div>
              </a>

              <a href="/dashboard/contacts" className="quick-action">
                <div className="quick-action-icon">
                  <Users size={24} />
                </div>
                <div className="quick-action-content">
                  <h3>Manage Contacts</h3>
                  <p>View and organize client information</p>
                </div>
              </a>

              <a href="/dashboard/evaluations" className="quick-action">
                <div className="quick-action-icon">
                  <Calculator size={24} />
                </div>
                <div className="quick-action-content">
                  <h3>Property Evaluations</h3>
                  <p>Review submitted property evaluations</p>
                </div>
              </a>

              <a href="/dashboard/blog" className="quick-action">
                <div className="quick-action-icon">
                  <FileText size={24} />
                </div>
                <div className="quick-action-content">
                  <h3>Manage Blog</h3>
                  <p>Create and edit blog posts</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <TrendingUp size={20} />
              Recent Activity
            </h2>
            <p className="card-subtitle">Latest updates and activities in your dashboard</p>
          </div>
          <div className="card-content">
            <div className="activity-timeline">
              <div className="activity-item">
                <div className="activity-header">
                  <h4 className="activity-title">New property evaluation submitted</h4>
                  <span className="activity-time">2 hours ago</span>
                </div>
                <p className="activity-description">
                  A new property evaluation request was submitted for a 3-bedroom villa in Downtown area.
                </p>
              </div>

              <div className="activity-item">
                <div className="activity-header">
                  <h4 className="activity-title">Client meeting scheduled</h4>
                  <span className="activity-time">4 hours ago</span>
                </div>
                <p className="activity-description">
                  Meeting with Sarah Johnson scheduled for tomorrow at 2:00 PM to discuss property investment options.
                </p>
              </div>

              <div className="activity-item">
                <div className="activity-header">
                  <h4 className="activity-title">Property listing updated</h4>
                  <span className="activity-time">6 hours ago</span>
                </div>
                <p className="activity-description">
                  Updated pricing and description for the luxury penthouse in Marina District.
                </p>
              </div>

              <div className="activity-item">
                <div className="activity-header">
                  <h4 className="activity-title">New blog post published</h4>
                  <span className="activity-time">1 day ago</span>
                </div>
                <p className="activity-description">
                  Published "Top 10 Investment Opportunities in 2024" - already receiving positive engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">
              <TrendingUp size={20} />
              Performance Overview
            </h2>
            <p className="card-subtitle">Key metrics and performance indicators</p>
          </div>
          <div className="card-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <h3 className="stat-title">Properties Sold</h3>
                  <div className="stat-icon">
                    <Building2 size={20} />
                  </div>
                </div>
                <div className="stat-value">34</div>
                <div className="stat-change positive">
                  <ArrowUpRight size={14} />
                  <span>This month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <h3 className="stat-title">New Inquiries</h3>
                  <div className="stat-icon green">
                    <MessageSquare size={20} />
                  </div>
                </div>
                <div className="stat-value">156</div>
                <div className="stat-change positive">
                  <ArrowUpRight size={14} />
                  <span>This week</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <h3 className="stat-title">Scheduled Viewings</h3>
                  <div className="stat-icon yellow">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="stat-value">23</div>
                <div className="stat-change positive">
                  <ArrowUpRight size={14} />
                  <span>Next 7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernDashboardLayout>
  )
}
