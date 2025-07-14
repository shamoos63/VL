"use client"
import DashboardLayout from "@/components/dashboard/layout"
import { Building2, Users, Calculator, TrendingUp, Calendar, FileText } from "lucide-react"

const stats = [
  {
    title: "Total Properties",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Building2,
    color: "blue" as const,
  },
  {
    title: "Active Clients",
    value: "89",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
    color: "green" as const,
  },
  {
    title: "Evaluations",
    value: "156",
    change: "+23%",
    changeType: "positive" as const,
    icon: Calculator,
    color: "yellow" as const,
  },
  {
    title: "Revenue",
    value: "AED 2.4M",
    change: "+15%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "purple" as const,
  },
]

const recentActivities = [
  {
    id: 1,
    title: "New property listing added",
    description: "Luxury Villa in Palm Jumeirah",
    time: "2 hours ago",
    type: "property",
  },
  {
    id: 2,
    title: "Client consultation scheduled",
    description: "Meeting with Ahmed Al-Rashid",
    time: "4 hours ago",
    type: "meeting",
  },
  {
    id: 3,
    title: "Property evaluation completed",
    description: "Downtown apartment valuation",
    time: "6 hours ago",
    type: "evaluation",
  },
  {
    id: 4,
    title: "New blog post published",
    description: "Dubai Real Estate Market Trends 2024",
    time: "1 day ago",
    type: "blog",
  },
]

const quickActions = [
  {
    title: "Add Property",
    description: "List a new property",
    icon: Building2,
    href: "/dashboard/properties/new",
  },
  {
    title: "Schedule Meeting",
    description: "Book client consultation",
    icon: Calendar,
    href: "/dashboard/calendar",
  },
  {
    title: "Create Evaluation",
    description: "Start property valuation",
    icon: Calculator,
    href: "/dashboard/evaluations/new",
  },
  {
    title: "Write Blog Post",
    description: "Publish new article",
    icon: FileText,
    href: "/dashboard/blog/new",
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-page-header">
          <h1 className="dashboard-page-title">Welcome back, Victoria</h1>
          <p className="dashboard-page-subtitle">Here's what's happening with your real estate business today.</p>
        </div>

        {/* Statistics Cards */}
        <div className="dashboard-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`dashboard-stat-card ${stat.color}`}>
              <div className="dashboard-stat-header">
                <h3 className="dashboard-stat-title">{stat.title}</h3>
                <stat.icon className={`dashboard-stat-icon ${stat.color}`} />
              </div>
              <div className="dashboard-stat-value">{stat.value}</div>
              <div className={`dashboard-stat-change ${stat.changeType}`}>
                <TrendingUp size={16} />
                <span>{stat.change} from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Quick Actions</h2>
          </div>
          <div className="dashboard-card-content">
            <div className="dashboard-quick-actions">
              {quickActions.map((action, index) => (
                <a key={index} href={action.href} className="dashboard-quick-action">
                  <div className="dashboard-quick-action-icon">
                    <action.icon size={20} />
                  </div>
                  <div className="dashboard-quick-action-content">
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Recent Activity</h2>
          </div>
          <div className="dashboard-card-content">
            <div className="dashboard-activity-timeline">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="dashboard-activity-item">
                  <div className="dashboard-activity-header">
                    <h4 className="dashboard-activity-title">{activity.title}</h4>
                    <span className="dashboard-activity-time">{activity.time}</span>
                  </div>
                  <p className="dashboard-activity-description">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
