import { useI18n } from "@/lib/i18n"

export default function HeroSection() {
  const { t, isRTL } = useI18n()

  return (
    <section dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <h1>
          {t("hero.title")} <span style={{ color: "blue" }}>{t("hero.title.highlight")}</span>
        </h1>
        <p>{t("hero.subtitle")}</p>
        <button>{t("hero.search.button")}</button>

        <div>
          <p>{t("hero.stats.properties")}</p>
          <p>{t("hero.stats.value")}</p>
          <p>{t("hero.stats.experience")}</p>
        </div>
      </div>
    </section>
  )
}
