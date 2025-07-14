import { useI18n } from "@/lib/i18n"

const FAQSection = () => {
  const { t, isRTL } = useI18n()

  return (
    <section dir={isRTL ? "rtl" : "ltr"}>
      <h2>{t("faq.title")}</h2>
      <p>{t("faq.subtitle")}</p>
      <blockquote>{t("faq.quote")}</blockquote>
    </section>
  )
}

export default FAQSection
