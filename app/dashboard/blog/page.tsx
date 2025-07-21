"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ModernDashboardLayout from "@/components/dashboard/modern-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Search, Calendar, Eye } from "lucide-react"
import Image from "next/image"

// Blog post interface
interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  author: string
  image: string
  readTime: string
  published: boolean
}

// Mock initial blog posts
const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Dubai Real Estate Market Outlook 2025",
    excerpt:
      "Comprehensive analysis of market trends, investment opportunities, and growth projections for the coming year.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "Market Analysis",
    date: "2024-12-15",
    author: "Victoria Lancaster",
    image: "/blog/market-outlook.png",
    readTime: "5 min read",
    published: true,
  },
  {
    id: 2,
    title: "Guide to Buying Property in Dubai as a Foreigner",
    excerpt:
      "Everything you need to know about the process, requirements, and benefits of property ownership in Dubai.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "Investment Guide",
    date: "2024-12-10",
    author: "Victoria Lancaster",
    image: "/blog/buying-guide.png",
    readTime: "8 min read",
    published: true,
  },
  {
    id: 3,
    title: "Top 5 Emerging Areas for Property Investment",
    excerpt:
      "Discover the next hotspots in Dubai's real estate market with high growth potential and attractive returns.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "Investment Tips",
    date: "2024-12-05",
    author: "Victoria Lancaster",
    image: "/blog/emerging-areas.png",
    readTime: "6 min read",
    published: true,
  },
]

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Load blog posts from localStorage or use initial data
  useEffect(() => {
    setIsLoading(true)
    try {
      const storedPosts = localStorage.getItem("vl-blog-posts")
      if (storedPosts) {
        setBlogPosts(JSON.parse(storedPosts))
      } else {
        setBlogPosts(initialBlogPosts)
        localStorage.setItem("vl-blog-posts", JSON.stringify(initialBlogPosts))
      }
    } catch (error) {
      console.error("Error loading blog posts:", error)
      setBlogPosts(initialBlogPosts)
    }
    setIsLoading(false)

    // Check if we should open the add dialog
    const action = searchParams.get("action")
    if (action === "new") {
      handleAddPost()
      // Clear the URL parameter
      router.replace("/dashboard/blog")
    }
  }, [searchParams, router])

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPost = () => {
    const today = new Date().toISOString().split("T")[0]
    setCurrentPost({
      id: Date.now(),
      title: "",
      excerpt: "",
      content: "",
      category: "Market Analysis",
      date: today,
      author: "Victoria Lancaster",
      image: "/placeholder.svg?height=300&width=400&text=Blog%20Image",
      readTime: "5 min read",
      published: false,
    })
    setIsDialogOpen(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({ ...post })
    setIsDialogOpen(true)
  }

  const handleDeletePost = (post: BlogPost) => {
    setCurrentPost(post)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeletePost = () => {
    if (currentPost) {
      const updatedPosts = blogPosts.filter((p) => p.id !== currentPost.id)
      setBlogPosts(updatedPosts)
      localStorage.setItem("vl-blog-posts", JSON.stringify(updatedPosts))
      setIsDeleteDialogOpen(false)
      setCurrentPost(null)
    }
  }

  const togglePublished = (id: number) => {
    const updatedPosts = blogPosts.map((post) => (post.id === id ? { ...post, published: !post.published } : post))
    setBlogPosts(updatedPosts)
    localStorage.setItem("vl-blog-posts", JSON.stringify(updatedPosts))
  }

  const handleSavePost = (formData: FormData) => {
    const post: BlogPost = {
      id: currentPost?.id || Date.now(),
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      date: formData.get("date") as string,
      author: formData.get("author") as string,
      image: (formData.get("image") as string) || "/placeholder.svg?height=300&width=400&text=Blog%20Image",
      readTime: (formData.get("readTime") as string) || "5 min read",
      published: formData.get("published") === "on",
    }

    let updatedPosts: BlogPost[]
    if (currentPost && blogPosts.some((p) => p.id === currentPost.id)) {
      // Edit existing post
      updatedPosts = blogPosts.map((p) => (p.id === post.id ? post : p))
    } else {
      // Add new post
      updatedPosts = [...blogPosts, post]
    }

    setBlogPosts(updatedPosts)
    localStorage.setItem("vl-blog-posts", JSON.stringify(updatedPosts))
    setIsDialogOpen(false)
    setCurrentPost(null)
  }

  return (
    <ModernDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <Button onClick={handleAddPost} className="bg-vl-blue hover:bg-vl-blue-dark">
          <Plus className="mr-2 h-4 w-4" /> Add Blog Post
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search blog posts..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vl-blue"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No blog posts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="relative h-12 w-16 rounded overflow-hidden">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">{post.category}</span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          post.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublished(post.id)}
                          className={post.published ? "text-green-500" : "text-gray-400"}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditPost(post)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePost(post)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Blog Post Dialog - Fixed Styling */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white border-0 shadow-2xl">
          <div className="bg-white p-6 rounded-lg">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold text-gray-900">
                {currentPost?.id ? "Edit Blog Post" : "Add New Blog Post"}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {currentPost?.id
                  ? "Update the details of this blog post"
                  : "Fill in the details to add a new blog post"}
              </DialogDescription>
            </DialogHeader>

            <form
              action={(formData) => {
                handleSavePost(formData)
              }}
              className="space-y-6"
            >
              {/* Hidden ID field */}
              {currentPost?.id && <input type="hidden" name="id" value={currentPost.id} />}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Post Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={currentPost?.title}
                      required
                      placeholder="e.g. Dubai Real Estate Market Trends"
                      className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700">
                      Excerpt *
                    </Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      defaultValue={currentPost?.excerpt}
                      required
                      placeholder="A brief summary of the post..."
                      rows={2}
                      className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category *
                    </Label>
                    <Select name="category" defaultValue={currentPost?.category || "Market Analysis"}>
                      <SelectTrigger className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg">
                        <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                        <SelectItem value="Investment Guide">Investment Guide</SelectItem>
                        <SelectItem value="Investment Tips">Investment Tips</SelectItem>
                        <SelectItem value="Property News">Property News</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                        Publication Date *
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={currentPost?.date}
                        required
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                    </div>
                    <div>
                      <Label htmlFor="readTime" className="text-sm font-medium text-gray-700">
                        Read Time
                      </Label>
                      <Input
                        id="readTime"
                        name="readTime"
                        defaultValue={currentPost?.readTime}
                        placeholder="e.g. 5 min read"
                        className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="author" className="text-sm font-medium text-gray-700">
                      Author *
                    </Label>
                    <Input
                      id="author"
                      name="author"
                      defaultValue={currentPost?.author}
                      required
                      placeholder="e.g. Victoria Lancaster"
                      className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="published" name="published" defaultChecked={currentPost?.published} />
                    <Label htmlFor="published" className="text-sm font-medium text-gray-700">
                      Publish Post
                    </Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      defaultValue={currentPost?.image}
                      placeholder="Enter image URL or leave blank for placeholder"
                      className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter a URL or leave blank to use a placeholder image</p>
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                      Content *
                    </Label>
                    <Textarea
                      id="content"
                      name="content"
                      defaultValue={currentPost?.content}
                      required
                      placeholder="Write your blog post content..."
                      rows={10}
                      className="mt-1 bg-white border-gray-300 focus:border-vl-blue focus:ring-vl-blue"
                    />
                  </div>

                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-700">Preview</Label>
                    <div className="mt-2 border rounded-md p-4 bg-gray-50">
                      <div className="relative h-40 w-full rounded-md overflow-hidden mb-2">
                        <Image
                          src={currentPost?.image || "/placeholder.svg"}
                          alt="Blog Post Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900">{currentPost?.title || "Blog Post Title"}</h3>
                      <p className="text-sm text-gray-500">
                        {currentPost?.category || "Category"} • {currentPost?.readTime || "5 min read"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-white">
                  Cancel
                </Button>
                <Button type="submit" className="bg-vl-blue hover:bg-vl-blue-dark text-white">
                  Save Blog Post
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog - Fixed Styling */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white border-0 shadow-2xl">
          <div className="bg-white p-6 rounded-lg">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-lg font-bold text-gray-900">Confirm Deletion</DialogTitle>
              <DialogDescription className="text-gray-600">
                Are you sure you want to delete "{currentPost?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="bg-white">
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDeletePost}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ModernDashboardLayout>
  )
}
