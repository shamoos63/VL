"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"

interface BlogPost {
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  image: string
  readTime: string
}

interface BlogClientProps {
  blogPosts: BlogPost[]
}

export default function BlogClient({ blogPosts }: BlogClientProps) {
  const { t, isRTL } = useI18n()

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Description Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-white mb-6 text-center">{t("blog.description.text1")}</p>
          <p className="text-lg text-white mb-6 text-center">{t("blog.description.text2")}</p>
          <p className="text-lg text-white mb-6 text-center">{t("blog.description.text3")}</p>
          <ul className="flex flex-col gap-6 md:flex-row md:gap-8">
            <li className="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-medium text-gray-800">{t("blog.feature1")}</h3>
            </li>
            <li className="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-medium text-gray-800">{t("blog.feature2")}</h3>
            </li>
            <li className="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-medium text-gray-800">{t("blog.feature3")}</h3>
            </li>
          </ul>
          <p className="text-lg text-white text-center font-medium pt-5">{t("blog.description.conclusion")}</p>
        </div>
      </section>

      <div className="pt-4">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass"
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

                  <Button className="w-full bg-transparent border-2 border-vl-yellow hover:border-black text-white">
                    {t("blog.read.more")}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
