"use client"

import { useI18n } from "@/lib/i18n"

const ContactClient = () => {
  const { t, isRTL } = useI18n()

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">{t("contact.hero.title")}</h1>
          <p className="text-gray-600">{t("contact.hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">{t("contact.form.title")}</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  {t("contact.first.name")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  {t("contact.last.name")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-gray-700 text-sm font-bold mb-2">
                  {t("contact.budget")}
                </label>
                <input
                  type="number"
                  id="budget"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {t("contact.send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("contact.info.title")}</h2>
            <p className="mb-4">
              <strong>{t("contact.info.phone")}:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </p>
            <p className="mb-4">
              <strong>{t("contact.info.email")}:</strong> <a href="mailto:info@example.com">info@example.com</a>
            </p>
            <p className="mb-4">
              <strong>{t("contact.info.office")}:</strong> 123 Main Street, Anytown, CA 12345
            </p>
            <p className="mb-4">
              <strong>{t("contact.info.hours")}:</strong> {t("contact.info.hours.time")}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("contact.location.title")}</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.450224597579!2d-122.4194154846523!3d37.77492957976435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808580858085%3A0x8085808580858085!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactClient
