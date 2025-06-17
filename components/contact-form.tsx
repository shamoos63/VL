"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-vl-blue dark:text-white mb-6">Send us a message</h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
            <Input placeholder="Enter your first name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
            <Input placeholder="Enter your last name" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <Input type="email" placeholder="Enter your email address" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
          <Input placeholder="Enter your phone number" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Range</label>
          <Input placeholder="e.g., $1M - $2M" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
          <Textarea placeholder="Tell us about your property requirements..." rows={4} />
        </div>

        <Button className="w-full bg-vl-yellow hover:bg-vl-yellow-dark text-vl-blue font-semibold py-3">
          Send Message
        </Button>
      </form>
    </Card>
  )
}
