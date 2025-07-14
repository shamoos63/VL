import { useI18n } from "@/lib/i18n"

const HomePropertyListings = () => {
  const { t, isRTL } = useI18n()

  return (
    <section dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <h2>{t("home.featured.title")}</h2>
        <p>{t("home.featured.subtitle")}</p>
      </div>
      {/* Property listings will go here */}
    </section>
  )
}

export default HomePropertyListings
