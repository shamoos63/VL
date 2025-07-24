import Footer from "@/components/footer"
import Header from "@/components/header"
import ServerPageHero from "@/components/server-page-hero"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <Header />
      <ServerPageHero
        title="Contact Us"
        subtitle="Get in touch for personalized property consultation"
        backgroundImage="/hero.webp"
        className="font-sansumi"
      />

      <div className="pt-8">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 glass">
              <h2 className="text-2xl font-bold text-vl-yellow dark:text-white mb-6">Send me a message</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <Input placeholder="e.g., $1M - $2M" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <Textarea placeholder="Tell us about your property requirements..." rows={4} />
                </div>

                <Button className="w-full bg-transparent text-white border-2 border-vl-yellow hover:border-black font-semibold py-3">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 ">
              <Card className="p-6 glass">
                <h3 className="text-xl font-bold text-vl-yellow dark:text-white mb-4">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-vl-yellow mr-3" />
                    <div>
                      <p className="font-medium text-vl-yellow dark:text-white">Phone</p>
                      <p className="text-gray-600 dark:text-gray-300">+971 XX XXX XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-vl-yellow mr-3" />
                    <div>
                      <p className="font-medium text-vl-yellow dark:text-white">Email</p>
                      <p className="text-gray-600 dark:text-gray-300">victoria@vlrealestate.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-vl-yellow mr-3" />
                    <div>
                      <p className="font-medium text-vl-yellow dark:text-white">Office</p>
                      <p className="text-gray-600 dark:text-gray-300">Dubai, United Arab Emirates</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-vl-yellow mr-3" />
                    <div>
                      <p className="font-medium text-vl-yellow dark:text-white">Business Hours</p>
                      <p className="text-gray-600 dark:text-gray-300">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map Integration */}
              <Card className="p-6 glass">
                <h3 className="text-xl font-bold text-vl-yellow dark:text-white mb-4">Our Location</h3>
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.6828842949!2d54.89783!3d25.0657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dubai Location"
                  ></iframe>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
