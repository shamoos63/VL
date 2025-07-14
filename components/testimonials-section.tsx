import { useI18n } from "@/lib/i18n"

export default function TestimonialsSection() {
  const { t, isRTL } = useI18n()

  return (
    <section dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <h2>{t("testimonials.title")}</h2>
        <p>{t("testimonials.subtitle")}</p>
      </div>

      <div>
        <p>{t("testimonials.join")}</p>
        <p>{t("testimonials.ready")}</p>
      </div>

      <div>
        <p>{t("testimonials.total.value")}</p>
        <p>{t("testimonials.years.experience")}</p>
      </div>
    </section>
  )
}
