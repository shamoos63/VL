"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, FileText, MessageSquare, ClipboardList, TrendingUp, Users, Eye, Calendar } from "lucide-react"
import { properties } from "@/lib/properties-data"
import { useRouter } from "next/navigation"

// Mock data for dashboard
const mockData = {
  totalProperties: properties.length,
  featuredProperties: properties.filter((p) => p.featured).length,
  totalBlogPosts: 12,
  totalContacts: 28,
  totalEvaluations: 15,
  recentActivity: [
    { type: "property", action: "added", name: "Luxury Penthouse", date: "2 hours ago" },
    { type: "contact", action: "received", name: "John Smith", date: "5 hours ago" },
    { type: "blog", action: "published", name: "Dubai Market Trends 2025", date: "1 day ago" },
    { type: "evaluation", action: "submitted", name: "Villa in Palm Jumeirah", date: "2 days ago" },
  ],
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const stats = [
    {
      title: "Total Properties",
      value: mockData.totalProperties,
      icon: Building,
      color: "bg-blue-100 text-blue-600",
      link: "/dashboard/properties",
    },
    {
      title: "Featured Properties",
      value: mockData.featuredProperties,
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
      link: "/dashboard/properties",
    },
    {
      title: "Blog Posts",
      value: mockData.totalBlogPosts,
      icon: FileText,
      color: "bg-green-100 text-green-600",
      link: "/dashboard/blog",
    },
    {
      title: "Contact Requests",
      value: mockData.totalContacts,
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600",
      link: "/dashboard/contacts",
    },
    {
      title: "Property Evaluations",
      value: mockData.totalEvaluations,
      icon: ClipboardList,
      color: "bg-pink-100 text-pink-600",
      link: "/dashboard/evaluations",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "property":
        return <Building className="h-4 w-4" />
      case "blog":
        return <FileText className="h-4 w-4" />
      case "contact":
        return <Users className="h-4 w-4" />
      case "evaluation":
        return <ClipboardList className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your VL Real Estate admin dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(stat.link)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${getActivityTypeColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.name}{" "}
                      <span className="font-normal text-gray-500">
                        was {activity.action} {activity.date}
                      </span>
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {activity.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionButton
                icon={Building}
                title="Add Property"
                description="Create a new property listing"
                onClick={() => router.push("/dashboard/properties?action=new")}
                color="bg-blue-100 text-blue-600 hover:bg-blue-200"
              />
              <QuickActionButton
                icon={FileText}
                title="New Blog Post"
                description="Write a new article"
                onClick={() => router.push("/dashboard/blog?action=new")}
                color="bg-green-100 text-green-600 hover:bg-green-200"
              />
              <QuickActionButton
                icon={MessageSquare}
                title="View Messages"
                description="Check recent inquiries"
                onClick={() => router.push("/dashboard/contacts")}
                color="bg-purple-100 text-purple-600 hover:bg-purple-200"
              />
              <QuickActionButton
                icon={ClipboardList}
                title="Property Evaluations"
                description="Review submitted evaluations"
                onClick={() => router.push("/dashboard/evaluations")}
                color="bg-pink-100 text-pink-600 hover:bg-pink-200"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function getActivityTypeColor(type: string) {
  switch (type) {
    case "property":
      return "bg-blue-100 text-blue-600"
    case "blog":
      return "bg-green-100 text-green-600"
    case "contact":
      return "bg-purple-100 text-purple-600"
    case "evaluation":
      return "bg-pink-100 text-pink-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

interface QuickActionButtonProps {
  icon: React.ElementType
  title: string
  description: string
  onClick: () => void
  color: string
}

function QuickActionButton({ icon: Icon, title, description, onClick, color }: QuickActionButtonProps) {
  return (
    <button className={`p-4 rounded-lg text-left transition-colors ${color}`} onClick={onClick}>
      <Icon className="h-6 w-6 mb-2" />
      <h3 className="font-medium">{title}</h3>
      <p className="text-xs opacity-80">{description}</p>
    </button>
  )
}
