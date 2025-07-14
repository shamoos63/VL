"use client"

import { useI18n } from "@/lib/i18n"

export default function EvaluationClient() {
  const { t, isRTL } = useI18n()

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <section className="hero">
        <h1>{t("evaluation.hero.title")}</h1>
        <p>{t("evaluation.hero.subtitle")}</p>
      </section>

      <section className="description">
        <p>{t("evaluation.description.text1")}</p>
        <p>{t("evaluation.description.text2")}</p>
        <ul>
          <li>{t("evaluation.feature1")}</li>
          <li>{t("evaluation.feature2")}</li>
          <li>{t("evaluation.feature3")}</li>
        </ul>
        <p>{t("evaluation.description.conclusion")}</p>
      </section>

      <section className="stats">
        <div>
          <p>{t("evaluation.stats.evaluated")}</p>
        </div>
        <div>
          <p>{t("evaluation.stats.value")}</p>
        </div>
        <div>
          <p>{t("evaluation.stats.experience")}</p>
        </div>
      </section>

      <section className="form">
        <h2>{t("evaluation.form.title")}</h2>
        <p>{t("evaluation.contact.info")}</p>

        <form>
          <label htmlFor="name">{t("evaluation.name")}</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">{t("evaluation.email")}</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="phone">{t("evaluation.phone")}</label>
          <input type="tel" id="phone" name="phone" />

          <label htmlFor="propertyType">{t("evaluation.property.type")}</label>
          <input type="text" id="propertyType" name="propertyType" />

          <label htmlFor="location">{t("evaluation.location")}</label>
          <input type="text" id="location" name="location" />

          <label htmlFor="bedrooms">{t("evaluation.bedrooms")}</label>
          <input type="number" id="bedrooms" name="bedrooms" />

          <label htmlFor="bathrooms">{t("evaluation.bathrooms")}</label>
          <input type="number" id="bathrooms" name="bathrooms" />

          <label htmlFor="area">{t("evaluation.area")}</label>
          <input type="number" id="area" name="area" />

          <label htmlFor="condition">{t("evaluation.condition")}</label>
          <input type="text" id="condition" name="condition" />

          <label htmlFor="yearBuilt">{t("evaluation.year.built")}</label>
          <input type="number" id="yearBuilt" name="yearBuilt" />

          <label htmlFor="amenities">{t("evaluation.amenities")}</label>
          <textarea id="amenities" name="amenities"></textarea>

          <label htmlFor="description">{t("evaluation.description")}</label>
          <textarea id="description" name="description"></textarea>

          <button type="submit">{t("evaluation.button")}</button>
        </form>
      </section>
    </div>
  )
}
