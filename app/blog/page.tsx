import Footer from "@/components/footer"
import Header from "@/components/header"
import ServerPageHero from "@/components/server-page-hero"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"

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

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <Header />
      <ServerPageHero
        title="Insights from the Market"
        subtitle="Stay informed. Stay ahead."
        backgroundImage="/hero-images/blog-hero.png"
        className="font-sansumi"

      />

      {/* Description Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 mb-6">
            Victoria shares expert commentary, investor trends, and strategic perspectives on the Dubai and UK real
            estate markets.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're exploring your first investment or managing a growing portfolio, these articles are designed
            to help you think clearly, act decisively, and stay ahead of the curve.
          </p>
          <p className="text-lg text-gray-700 mb-6">You'll find:</p>
          <ul class="flex flex-col gap-6 md:flex-row md:gap-8">

    <li class="flex flex-1 items-center justify-center rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 class="text-lg font-medium text-gray-800">
        Market updates & forecasts
      </h3>
    </li>

    <li class="flex flex-1 items-center justify-center rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 class="text-lg font-medium text-gray-800">
        Investor tips & property strategies
      </h3>
    </li>

    <li class="flex flex-1 items-center justify-center rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 class="text-lg font-medium text-gray-800">
        Area deep-dives & opportunity spotlights
      </h3>
    </li>

  </ul>
          <p className="text-lg text-gray-700 font-medium">Read the latest posts, and move forward with confidence.</p>
        </div>
      </section>

      <div className="pt-8 bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-vl-yellow text-vl-blue">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-vl-blue dark:text-white mb-3 line-clamp-2">{post.title}</h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-vl-blue hover:bg-vl-blue-dark text-white">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
