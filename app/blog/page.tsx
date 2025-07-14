import Footer from "@/components/footer"
import Header from "@/components/header"
import ServerPageHero from "@/components/server-page-hero"

const blogPosts = [
  {
    title: "Dubai Real Estate Market Outlook 2024",
    excerpt:
      "Comprehensive analysis of market trends, investment opportunities, and growth projections for the coming year.",
    category: "Market Analysis",
    date: "December 15, 2024",
    author: "Victoria Lancaster",
    image: "/placeholder.svg?height=200&width=400&text=Market+Outlook",
    readTime: "5 min read",
  },
  {
    title: "Guide to Buying Property in Dubai as a Foreigner",
    excerpt:
      "Everything you need to know about the process, requirements, and benefits of property ownership in Dubai.",
    category: "Investment Guide",
    date: "December 10, 2024",
    author: "Victoria Lancaster",
    image: "/placeholder.svg?height=200&width=400&text=Buying+Guide",
    readTime: "8 min read",
  },
  {
    title: "Top 5 Emerging Areas for Property Investment",
    excerpt:
      "Discover the next hotspots in Dubai's real estate market with high growth potential and attractive returns.",
    category: "Investment Tips",
    date: "December 5, 2024",
    author: "Victoria Lancaster",
    image: "/placeholder.svg?height=200&width=400&text=Emerging+Areas",
    readTime: "6 min read",
  },
]

// This is a server component, so we'll use a client component for the translated content
import BlogClient from "./blog-client"

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <Header />
      <ServerPageHero
        title="Insights from the Market"
        subtitle="Stay informed. Stay ahead."
        backgroundImage="/hero.webp"
        className="font-sansumi"
      />

      <BlogClient blogPosts={blogPosts} />
      <Footer />
    </main>
  )
}
