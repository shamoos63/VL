"use client"

import { useState, useEffect, useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useI18n } from "@/lib/i18n"

const faqs = [
  {
    question: "What makes Dubai real estate a good investment?",
    answer:
      "Dubai offers tax-free rental income, high ROI potential (6-8% annually), world-class infrastructure, strategic location connecting East and West, and strong government support for foreign investment. The city's continuous growth, upcoming Expo legacy projects, and diverse economy make it an attractive long-term investment destination.",
  },
  {
    question: "Can foreigners buy property in Dubai?",
    answer:
      "Yes, foreigners can buy freehold properties in designated areas of Dubai. These include popular locations like Downtown Dubai, Dubai Marina, Palm Jumeirah, and many other prime areas. Foreign buyers get the same ownership rights as UAE nationals in these freehold areas.",
  },
  {
    question: "What are the costs involved in buying property in Dubai?",
    answer:
      "Additional costs include: 4% Dubai Land Department (DLD) transfer fee, real estate agent commission (typically 2%), mortgage registration fee (if applicable), property valuation fee, and legal fees. Budget approximately 6-8% of the property value for total transaction costs.",
  },
  {
    question: "How does the buying process work?",
    answer:
      "The process involves: property selection and reservation, due diligence and legal checks, signing the Sale and Purchase Agreement (SPA), transferring ownership at DLD, and property handover. The entire process typically takes 2-4 weeks for ready properties and follows completion schedules for off-plan properties.",
  },
  {
    question: "What financing options are available?",
    answer:
      "UAE banks offer mortgages to both residents and non-residents. Residents can get up to 80% financing, while non-residents typically get 50-60%. Interest rates are competitive, and various banks offer different packages. Pre-approval helps streamline the buying process.",
  },
  {
    question: "Should I buy off-plan or ready properties?",
    answer:
      "Off-plan properties offer lower entry prices, flexible payment plans, and higher appreciation potential but carry construction risks. Ready properties provide immediate rental income and no construction delays but require full payment upfront. Your choice depends on your investment strategy and risk tolerance.",
  },
]

export default function FAQSection() {
  const { t, isRTL, language } = useI18n()
  const [headerVisible, setHeaderVisible] = useState(false)
  const [accordionVisible, setAccordionVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement

          if (element === headerRef.current) {
            setHeaderVisible(true)
          } else if (element === accordionRef.current) {
            setAccordionVisible(true)
          }
        }
      })
    }, observerOptions)

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    if (accordionRef.current) {
      observer.observe(accordionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="py-20 bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-vl-blue mb-6 font-heading">
            {language === "en"
              ? "Frequently Asked Questions"
              : language === "ar"
                ? "الأسئلة الشائعة"
                : "Часто задаваемые вопросы"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === "en"
              ? "Get answers to common questions about Dubai real estate investment"
              : language === "ar"
                ? "احصل على إجابات للأسئلة الشائعة حول الاستثمار العقاري في دبي"
                : "Получите ответы на часто задаваемые вопросы об инвестициях в недвижимость Дубая"}
          </p>
        </div>

        <div
          ref={accordionRef}
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            accordionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`bg-white rounded-lg border border-gray-200 hover:border-vl-yellow/30 transition-all duration-300 hover:shadow-lg ${
                  accordionVisible ? "animate-fade-in-up" : ""
                }`}
                style={{
                  animationDelay: accordionVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:text-vl-blue transition-colors duration-300 text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${
            accordionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-vl-blue rounded-2xl p-8 max-w-2xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === "en"
                ? "Still Have Questions?"
                : language === "ar"
                  ? "لا تزال لديك أسئلة؟"
                  : "Остались вопросы?"}
            </h3>
            <p className="text-white/90 mb-6">
              {language === "en"
                ? "Get personalized answers from Victoria Lancaster, your Dubai real estate expert"
                : language === "ar"
                  ? "احصل على إجابات شخصية من فيكتوريا لانكستر، خبيرة العقارات في دبي"
                  : "Получите персональные ответы от Виктории Ланкастер, вашего эксперта по недвижимости в Дубае"}
            </p>
            <button className="bg-vl-yellow text-vl-blue px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {language === "en" ? "Contact Victoria" : language === "ar" ? "اتصل بفيكتوريا" : "Связаться с Викторией"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
