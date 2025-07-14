"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useI18n } from "@/lib/i18n"

export default function ContactForm() {
  const { t, isRTL } = useI18n()

  return (
    <Card className="p-8" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="text-2xl font-bold text-vl-blue dark:text-white mb-6">{t("contact.form.title")}</h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("contact.first.name")}
            </label>
            <Input placeholder={t("contact.first.name.placeholder")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("contact.last.name")}
            </label>
            <Input placeholder={t("contact.last.name.placeholder")} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("contact.email")}
          </label>
          <Input type="email" placeholder={t("contact.email.placeholder")} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("contact.phone")}
          </label>
          <Input placeholder={t("contact.phone.placeholder")} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("contact.budget")}
          </label>
          <Input placeholder={t("contact.budget.placeholder")} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("contact.message")}
          </label>
          <Textarea placeholder={t("contact.message.placeholder")} rows={4} />
        </div>

        <Button className="w-full bg-vl-yellow hover:bg-vl-yellow-dark text-vl-blue font-semibold py-3">
          {t("contact.send")}
        </Button>
      </form>
    </Card>
  )
}
