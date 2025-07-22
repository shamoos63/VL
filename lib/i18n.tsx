"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "ar" | "ru"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

// Create a default context value to prevent the "must be used within Provider" error
const defaultContextValue: I18nContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  isRTL: false,
}

const I18nContext = createContext<I18nContextType>(defaultContextValue)

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    // Return default values if context is not available (during SSR)
    return defaultContextValue
  }
  return context
}

interface I18nProviderProps {
  children: React.ReactNode
}

// Import translations directly
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.areas": "Areas",
    "nav.evaluation": "Property Evaluation",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.search.placeholder": "Search properties...",
    "nav.language": "Language",

    // Hero Section
    "hero.title": " Dubai Isn’t an Option, It’s the",
    "hero.title.highlight": "Strategy.",
    "hero.subtitle": "Access Dubai’s most coveted real estate opportunities, crafted for wealth growth, legacy, and global prestige.",
    "hero.search.button": "Search Properties",
    "hero.stats.properties": "Properties Sold",
    "hero.stats.value": "Total Value",
    "hero.stats.experience": "Years Experience",
    "hero.stats.satisfaction": "Client Satisfaction",

    // Search Form
    "search.property.type": "Property Type",
    "search.location": "Location",
    "search.price.range": "Price Range",
    "search.bedrooms": "Bedrooms",
    "search.apartment": "Apartment",
    "search.villa": "Villa",
    "search.townhouse": "Townhouse",
    "search.penthouse": "Penthouse",
    "search.1.bedroom": "1 Bedroom",
    "search.2.bedrooms": "2 Bedrooms",
    "search.3.bedrooms": "3 Bedrooms",
    "search.4plus.bedrooms": "4+ Bedrooms",

    // Locations
    "location.dubai.marina": "Dubai Marina",
    "location.downtown": "Downtown Dubai",
    "location.palm.jumeirah": "Palm Jumeirah",
    "location.jvc": "Jumeirah Village Circle",
    "location.business.bay": "Business Bay",
    "location.dubai.maritime": "Dubai Maritime City",

    // Property Evaluation - Complete Set
    "evaluation.title": "Property Evaluation Tool",
    "evaluation.subtitle": "Get a professional property assessment from Victoria's expert team",
    "evaluation.hero.title": "Property Evaluation Tool",
    "evaluation.hero.subtitle":
      "Get an instant estimate of your property's value with Victoria's expert evaluation system",
    "evaluation.hero.properties.evaluated": "Properties Evaluated",
    "evaluation.hero.total.value": "Total Value Assessed",
    "evaluation.hero.years.experience": "Years Experience",
    "evaluation.form.title": "Property Evaluation Tool",
    "evaluation.contact.info": "Contact Information",
    "evaluation.name": "Full Name",
    "evaluation.name.placeholder": "Your full name",
    "evaluation.email": "Email Address",
    "evaluation.email.placeholder": "your.email@example.com",
    "evaluation.phone": "Phone Number",
    "evaluation.phone.placeholder": "+971 XX XXX XXXX",
    "evaluation.property.type": "Property Type",
    "evaluation.select.type": "Select property type",
    "evaluation.location": "Location",
    "evaluation.select.location": "Select location",
    "evaluation.bedrooms": "Bedrooms",
    "evaluation.select.beds": "Select bedrooms",
    "evaluation.bathrooms": "Bathrooms",
    "evaluation.select.baths": "Select bathrooms",
    "evaluation.area": "Area (sq ft)",
    "evaluation.area.placeholder": "e.g., 1200",
    "evaluation.condition": "Property Condition",
    "evaluation.select.condition": "Select condition",
    "evaluation.condition.excellent": "Excellent",
    "evaluation.condition.good": "Good",
    "evaluation.condition.fair": "Fair",
    "evaluation.condition.renovation": "Needs Renovation",
    "evaluation.year.built": "Year Built",
    "evaluation.year.placeholder": "e.g., 2020",
    "evaluation.amenities": "Amenities",
    "evaluation.amenities.placeholder": "e.g., Pool, Gym, Parking, Balcony",
    "evaluation.description": "Additional Details",
    "evaluation.description.placeholder": "Any additional information about the property...",
    "evaluation.button": "Get Property Evaluation",
    "evaluation.success.title": "Thank You for Your Submission!",
    "evaluation.success.message":
      "We have received your property details and will get in touch with you as soon as possible with a comprehensive evaluation and market analysis.",
    "evaluation.success.contact.title": "We'll contact you via:",
    "evaluation.success.new.evaluation": "Submit New Evaluation",

    // Filter Panel Translations - Complete Set
    "filters.title": "Filters",
    "filters.show": "Show Filters",
    "filters.hide": "Hide Filters",
    "filters.clear": "Clear All",
    "filters.apply": "Apply",
    "filters.reset": "Reset",
    "filters.search": "Search",
    "filters.search.placeholder": "Search properties...",
    "filters.property.type": "Property Type",
    "filters.price.range": "Price Range",
    "filters.bedrooms": "Bedrooms",
    "filters.bedrooms.range": "Bedrooms",
    "filters.bathrooms": "Bathrooms",
    "filters.bathrooms.range": "Bathrooms",
    "filters.area": "Area (sq ft)",
    "filters.location": "Location",
    "filters.status": "Status",
    "filters.amenities": "Amenities",
    "filters.features": "Features",
    "filters.tabs.basic": "Basic",
    "filters.tabs.advanced": "Advanced",

    // Sort Options
    "filters.sort.label": "Sort By",
    "filters.sort.default": "Default",
    "filters.sort.price-asc": "Price: Low to High",
    "filters.sort.price-desc": "Price: High to Low",
    "filters.sort.newest": "Newest First",
    "filters.sort.oldest": "Oldest First",
    "filters.sort.area.large": "Area: Large to Small",
    "filters.sort.area.small": "Area: Small to Large",

    // Filter Values
    "filters.any": "Any",
    "filters.studio": "Studio",
    "filters.1.bed": "1 Bedroom",
    "filters.2.bed": "2 Bedrooms",
    "filters.3.bed": "3 Bedrooms",
    "filters.4.bed": "4 Bedrooms",
    "filters.5plus.bed": "5+ Bedrooms",
    "filters.1.bath": "1 Bathroom",
    "filters.2.bath": "2 Bathrooms",
    "filters.3.bath": "3 Bathrooms",
    "filters.4plus.bath": "4+ Bathrooms",

    // Status Options
    "filters.status.for-sale": "For Sale",
    "filters.status.for-rent": "For Rent",
    "filters.status.offplan": "Off Plan",
    "filters.ready": "Ready",
    "filters.offplan": "Off Plan",
    "filters.featured": "Featured",
    "filters.luxury": "Luxury",

    // Property Types
    "filters.property.types.villa": "Villa",
    "filters.property.types.apartment": "Apartment",
    "filters.property.types.penthouse": "Penthouse",
    "filters.property.types.mansion": "Mansion",
    "filters.property.types.townhouse": "Townhouse",

    // Amenities
    "filters.amenities.pool": "Swimming Pool",
    "filters.amenities.garden": "Garden",
    "filters.amenities.garage": "Garage",
    "filters.amenities.balcony": "Balcony",
    "filters.amenities.gym": "Gym",
    "filters.amenities.security": "Security",

    // Property Listings
    "properties.title": "Featured Properties",
    "properties.subtitle":
      "Discover exceptional properties handpicked by Victoria Lancaster for their investment potential and luxury appeal",
    "properties.filter.all": "All Properties",
    "properties.filter.featured": "Featured",
    "properties.filter.ready": "Ready",
    "properties.filter.offplan": "Off-plan",
    "properties.view.details": "View Details",
    "properties.schedule.tour": "Schedule Tour",
    "properties.view.all": "View All Properties",
    "properties.status.ready": "Ready",
    "properties.status.offplan": "Off-plan",
    "properties.status.featured": "Featured",
    "properties.found": "properties found",
    "properties.no.results": "No Properties Found",
    "properties.try.different.filters": "Try adjusting your search filters to see more results.",
    "properties.suggestions": "Suggestions: Try expanding your price range, location, or property type filters.",
    "properties.showing": "Showing",
    "properties.of": "of",
    "properties.results": "results",
    "properties.end.of.results": "You've seen all available properties matching your criteria.",

    // Properties Page Specific
    "properties.page.title": "Our Properties",
    "properties.page.subtitle": "Discover exceptional properties in Dubai's most prestigious locations",
    "properties.listings.title": "Property Listings",
    "properties.listings.subtitle": "Browse our curated selection of premium properties",
    "properties.results.title": "Search Results",
    "properties.our.listings": "Our Property Listings",

    // Properties View
    "properties.view.grid": "Grid View",
    "properties.view.map": "Map View",

    // Properties Detail Page
    "properties.back.to.listings": "Back to Properties",
    "properties.watch.video": "Watch Video",
    "properties.tab.overview": "Overview",
    "properties.tab.features": "Features",
    "properties.tab.amenities": "Amenities",
    "properties.overview": "Property Overview",
    "properties.bedrooms": "Bedrooms",
    "properties.bathrooms": "Bathrooms",
    "properties.area": "Area",
    "properties.location": "Location",
    "properties.features": "Property Features",
    "properties.amenities": "Building Amenities",
    "properties.contact.agent": "Contact Agent",
    "properties.contact.now": "Contact Now",
    "properties.schedule.viewing": "Schedule Viewing",
    "properties.available.for.viewing": "Available for viewing",
    "properties.similar": "Similar Properties",

    // Property Card Translations
    "property.tour": "Tour",
    "property.featured": "Featured",
    "property.new": "New",
    "property.share": "Share Property",
    "property.share.success": "Shared successfully",
    "property.share.success.desc": "Property link has been shared",
    "property.link.copied": "Link copied",
    "property.link.copied.desc": "Property link has been copied to clipboard",
    "property.share.error": "Share failed",
    "property.share.error.desc": "Unable to share property. Please try again.",
    "property.remove.favorite": "Remove from Favorites",
    "property.add.favorite": "Add to Favorites",
    "property.removed.favorites": "Removed from favorites",
    "property.removed.favorites.desc": "Property removed from your favorites",
    "property.added.favorites": "Added to favorites",
    "property.added.favorites.desc": "Property added to your favorites",
    "property.favorite.error": "Error",
    "property.favorite.error.desc": "Unable to update favorites. Please try again.",
    "property.calling.agent": "Calling agent",
    "property.calling": "Calling",
    "property.email.opened": "Email opened",
    "property.email.opened.desc": "Email client opened with property details",
    "property.contact.form": "Contact form",
    "property.contact.form.desc": "Contact form will be available soon",
    "property.video.tour": "Video tour",
    "property.video.tour.desc": "Opening video tour in new tab",
    "property.gallery": "Photo Gallery",
    "property.bedrooms": "Bedrooms",
    "property.bathrooms": "Bathrooms",
    "property.sqft": "Sq Ft",
    "property.parking": "Parking Spaces",
    "property.furnished": "Furnished",
    "property.pet.friendly": "Pet Friendly",
    "property.security": "24/7 Security",
    "property.agent": "Property Agent",
    "property.call.agent": "Call Agent",
    "property.email.agent": "Email Agent",
    "property.updated": "Updated",
    "property.view.details": "View Details",
    "property.contact": "Contact",

    // Map related translations
    "properties.map.available": "Available Properties",
    "properties.map.selected": "Selected Property",
    "properties.map.properties": "Properties",

    // About Section
    "about.title": "About Victoria Lancaster",
    "about.subtitle": "Your trusted partner in Dubai real estate since 2020",
    "about.quote": '"I don\'t just sell property, I strategize wealth."',

    // FAQ Section
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "with Victoria Lancaster",
    "faq.quote":
      '"I chose these questions because they reflect what people really ask me — not just about buying in Dubai, but about how I think, how I work, and what I value. I believe clarity builds trust. When you know what to expect, you can make better decisions."',
    "faq.quote.author": "— Victoria Lancaster",

    // Testimonials Section
    "testimonials.title": "Client Success Stories",
    "testimonials.subtitle": "Hear from investors who trusted Victoria Lancaster with their Dubai property journey",
    "testimonials.join.title": "Join 585+ Satisfied Investors",
    "testimonials.join.subtitle":
      "Ready to start your Dubai property investment journey? Let Victoria help you achieve your goals.",
    "testimonials.total.value": "Total Transaction Value",
    "testimonials.years.experience": "Years Experience",
    "testimonials.client.satisfaction": "Client Satisfaction",

    // Contact Page
    "contact.title": "Get in Touch",
    "contact.subtitle": "Ready to start your Dubai real estate journey? Let's discuss your investment goals.",

    // Areas Page
    "areas.title": "Prime Areas in Dubai",
    "areas.subtitle": "Explore Dubai's most sought-after neighborhoods and investment opportunities",

    // Blog Page
    "blog.title": "Real Estate Insights",
    "blog.subtitle": "Expert insights, market analysis, and investment guidance from Victoria Lancaster",

    // Footer
    "footer.description":
      "Your trusted Dubai real estate partner. Building futures through strategic property investments and personalized service.",
    "footer.quick.links": "Quick Links",
    "footer.contact.info": "Contact Info",
    "footer.newsletter": "Stay Updated",
    "footer.newsletter.description": "Get the latest property insights and market updates directly to your inbox.",
    "footer.email.placeholder": "Your email address",
    "footer.subscribe": "Subscribe",
    "footer.copyright": "© 2025 VL Real Estate. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.sitemap": "Sitemap",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.close": "Close",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.submit": "Submit",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.view.more": "View More",
    "common.read.more": "Read More",
    "common.learn.more": "Learn More",
  },
  ar: {
    // Navigation Arabic
    "nav.home": "الرئيسية",
    "nav.properties": "العقارات",
    "nav.areas": "المناطق",
    "nav.evaluation": "تقييم العقار",
    "nav.blog": "المدونة",
    "nav.about": "حول",
    "nav.contact": "اتصل بنا",

    // Hero Section Arabic
    "hero.title": "اعثر على عقار أحلامك في",
    "hero.title.highlight": "دبي",
    "hero.search.button": "البحث عن العقارات",

    // Locations Arabic
    "location.dubai.marina": "دبي مارينا",
    "location.downtown": "وسط مدينة دبي",
    "location.palm.jumeirah": "نخلة جميرا",
    "location.jvc": "قرية جميرا الدائرية",
    "location.business.bay": "الخليج التجاري",
    "location.dubai.maritime": "مدينة دبي البحرية",

    // Properties Page Arabic
    "properties.page.title": "عقاراتنا",
    "properties.page.subtitle": "اكتشف العقارات الاستثنائية في أكثر المواقع المرموقة في دبي",
    "properties.listings.title": "قوائم العقارات",
    "properties.listings.subtitle": "تصفح مجموعتنا المختارة من العقارات المميزة",
    "properties.results.title": "نتائج البحث",
    "properties.our.listings": "قوائم عقاراتنا",

    // Properties View Arabic
    "properties.view.grid": "عرض الشبكة",
    "properties.view.map": "عرض الخريطة",

    // Properties Arabic
    "properties.title": "العقارات المميزة",
    "properties.filter.all": "جميع العقارات",
    "properties.filter.featured": "مميز",
    "properties.filter.ready": "جاهز",
    "properties.filter.offplan": "على الخريطة",
    "properties.found": "عقار موجود",
    "properties.no.results": "لم يتم العثور على عقارات",
    "properties.try.different.filters": "جرب تعديل مرشحات البحث لرؤية المزيد من النتائج.",
    "properties.suggestions": "اقتراحات: جرب توسيع نطاق السعر أو الموقع أو نوع العقار.",
    "properties.showing": "عرض",
    "properties.of": "من",
    "properties.results": "النتائج",
    "properties.end.of.results": "لقد رأيت جميع العقارات المتاحة التي تطابق معاييرك.",

    // Property Card Arabic
    "property.tour": "جولة",
    "property.featured": "مميز",
    "property.new": "جديد",
    "property.share": "مشاركة العقار",
    "property.remove.favorite": "إزالة من المفضلة",
    "property.add.favorite": "إضافة للمفضلة",
    "property.bedrooms": "غرف النوم",
    "property.bathrooms": "الحمامات",
    "property.sqft": "قدم مربع",
    "property.view.details": "عرض التفاصيل",
    "property.contact": "اتصل",

    // Map Arabic
    "properties.map.available": "العقارات المتاحة",
    "properties.map.selected": "العقار المحدد",
    "properties.map.properties": "العقارات",

    // Search Form Arabic
    "search.property.type": "نوع العقار",
    "search.location": "الموقع",
    "search.price.range": "نطاق السعر",
    "search.bedrooms": "غرف النوم",
    "search.apartment": "شقة",
    "search.villa": "فيلا",
    "search.townhouse": "تاون هاوس",
    "search.penthouse": "بنتهاوس",
    "search.1.bedroom": "غرفة نوم واحدة",
    "search.2.bedrooms": "غرفتان نوم",
    "search.3.bedrooms": "ثلاث غرف نوم",
    "search.4plus.bedrooms": "4+ غرف نوم",

    // Filter Panel Arabic
    "filters.title": "المرشحات",
    "filters.show": "إظهار المرشحات",
    "filters.hide": "إخفاء المرشحات",
    "filters.clear": "مسح الكل",
    "filters.apply": "تطبيق",
    "filters.reset": "إعادة تعيين",
    "filters.search": "بحث",
    "filters.search.placeholder": "البحث في العقارات...",
    "filters.property.type": "نوع العقار",
    "filters.price.range": "نطاق السعر",
    "filters.bedrooms": "غرف النوم",
    "filters.bedrooms.range": "غرف النوم",
    "filters.bathrooms": "الحمامات",
    "filters.bathrooms.range": "الحمامات",
    "filters.location": "الموقع",
    "filters.status": "الحالة",
    "filters.amenities": "المرافق",
    "filters.tabs.basic": "أساسي",
    "filters.tabs.advanced": "متقدم",

    // Property Types Arabic
    "filters.property.types.villa": "فيلا",
    "filters.property.types.apartment": "شقة",
    "filters.property.types.penthouse": "بنتهاوس",
    "filters.property.types.mansion": "قصر",
    "filters.property.types.townhouse": "تاون هاوس",

    // Sort Options Arabic
    "filters.sort.label": "ترتيب حسب",
    "filters.sort.default": "افتراضي",
    "filters.sort.price-asc": "ا��سعر: من الأقل إلى الأعلى",
    "filters.sort.price-desc": "السعر: من الأعلى إلى الأقل",
    "filters.sort.newest": "الأحدث أولاً",
    "filters.sort.oldest": "الأقدم أولاً",

    // Status Options Arabic
    "filters.status.for-sale": "للبيع",
    "filters.status.for-rent": "للإيجار",
    "filters.status.offplan": "على الخريطة",
    "filters.ready": "جاهز",
    "filters.offplan": "على الخريطة",
    "filters.featured": "مميز",

    // Amenities Arabic
    "filters.amenities.pool": "مسبح",
    "filters.amenities.garden": "حديقة",
    "filters.amenities.garage": "مرآب",
    "filters.amenities.balcony": "شرفة",
    "filters.amenities.gym": "صالة رياضية",
    "filters.amenities.security": "أمن",

    // FAQ Section
    "faq.title": "الأسئلة الشائعة",
    "faq.subtitle": "مع فيكتوريا لانكستر",
    "faq.quote":
      '"اخترت هذه الأسئلة لأنها تعكس ما يسألني الناس حقًا - ليس فقط عن الشراء في دبي، ولكن عن كيف أفكر وكيف أعمل وما أقدره. أؤمن أن الوضوح يبني الثقة. عندما تعرف ما تتوقعه، يمكنك اتخاذ قرارات أفضل."',
    "faq.quote.author": "— فيكتوريا لانكستر",

    // Testimonials Section
    "testimonials.title": "قصص نجاح العملاء",
    "testimonials.subtitle": "استمع إلى المستثمرين الذين وثقوا بفيكتوريا لانكستر في رحلة عقارات دبي",
    "testimonials.join.title": "انضم إلى 585+ مستثمر راضٍ",
    "testimonials.join.subtitle": "مستعد لبدء رحلة الاستثمار العقاري في دبي؟ دع فيكتوريا تساعدك في تحقيق أهدافك.",
    "testimonials.total.value": "إجمالي قيمة المعاملات",
    "testimonials.years.experience": "سنوات الخبرة",
    "testimonials.client.satisfaction": "رضا العملاء",

    "about.title": "حول فيكتوريا لانكستر",
    "contact.title": "تواصل معنا",
    "areas.title": "المناطق الرئيسية في دبي",
    "blog.title": "رؤى العقارات",

    // Common Arabic
    "common.loading": "جاري التحميل...",
  },
  ru: {
    // Navigation Russian
    "nav.home": "Главная",
    "nav.properties": "Недвижимость",
    "nav.areas": "Районы",
    "nav.evaluation": "Оценка недвижимости",
    "nav.blog": "Блог",
    "nav.about": "О нас",
    "nav.contact": "Контакты",

    // Hero Section Russian
    "hero.title": "Найдите недвижимость своей мечты в",
    "hero.title.highlight": "Дубае",
    "hero.subtitle":"Получите доступ к самым престижным объектам недвижимости Дубая, созданным для увеличения капитала, сохранения наследия и достижения глобального статуса.",
    "hero.search.button": "Поиск недвижимости",

    // Locations Russian
    "location.dubai.marina": "Дубай Марина",
    "location.downtown": "Центр Дубая",
    "location.palm.jumeirah": "Палм Джумейра",
    "location.jvc": "Джумейра Виллидж Серкл",
    "location.business.bay": "Бизнес Бей",
    "location.dubai.maritime": "Дубай Маритайм Сити",

    // Properties Page Russian
    "properties.page.title": "Наша недвижимость",
    "properties.page.subtitle": "Откройте для себя исключительную недвижимость в самых престижных районах Дубая",
    "properties.listings.title": "Списки недвижимости",
    "properties.listings.subtitle": "Просмотрите нашу отобранную коллекцию премиальной недвижимости",
    "properties.results.title": "Результаты поиска",
    "properties.our.listings": "Наши списки недвижимости",

    // Properties View Russian
    "properties.view.grid": "Сетка",
    "properties.view.map": "Карта",

    // Properties Russian
    "properties.title": "Рекомендуемая недвижимость",
    "properties.filter.all": "Вся недвижимость",
    "properties.filter.featured": "Рекомендуемое",
    "properties.filter.ready": "Готово",
    "properties.filter.offplan": "В планах",
    "properties.found": "недвижимость найдена",
    "properties.no.results": "Недвижимость не найдена",
    "properties.try.different.filters": "Попробуйте изменить фильтры поиска, чтобы увидеть больше результатов.",
    "properties.suggestions":
      "Предложения: Попробуйте расширить ценовой диапазон, местоположение или тип недвижимости.",
    "properties.showing": "Показано",
    "properties.of": "из",
    "properties.results": "результатов",
    "properties.end.of.results": "Вы просмотрели всю доступную недвижимость, соответствующую вашим критериям.",

    // Property Card Russian
    "property.tour": "Тур",
    "property.featured": "Рекомендуемое",
    "property.new": "Новое",
    "property.share": "Поделиться недвижимостью",
    "property.remove.favorite": "Удалить из избранного",
    "property.add.favorite": "Добавить в избранное",
    "property.bedrooms": "Спальни",
    "property.bathrooms": "Ванные комнаты",
    "property.sqft": "Кв. футы",
    "property.view.details": "Подробности",
    "property.contact": "Контакт",

    // Map Russian
    "properties.map.available": "Доступная недвижимость",
    "properties.map.selected": "Выбранная недвижимость",
    "properties.map.properties": "Недвижимость",

    // Search Form Russian
    "search.property.type": "Тип недвижимости",
    "search.location": "Местоположение",
    "search.price.range": "Ценовой диапазон",
    "search.bedrooms": "Спальни",
    "search.apartment": "Квартира",
    "search.villa": "Вилла",
    "search.townhouse": "Таунхаус",
    "search.penthouse": "Пентхаус",
    "search.1.bedroom": "1 спальня",
    "search.2.bedrooms": "2 спальни",
    "search.3.bedrooms": "3 спальни",
    "search.4plus.bedrooms": "4+ спальни",

    // Filter Panel Russian
    "filters.title": "Фильтры",
    "filters.show": "Показать фильтры",
    "filters.hide": "Скрыть фильтры",
    "filters.clear": "Очистить все",
    "filters.apply": "Применить",
    "filters.reset": "Сбросить",
    "filters.search": "Поиск",
    "filters.search.placeholder": "Поиск недвижимости...",
    "filters.property.type": "Тип недвижимости",
    "filters.price.range": "Ценовой диапазон",
    "filters.bedrooms": "Спальни",
    "filters.bedrooms.range": "Спальни",
    "filters.bathrooms": "Ванные комнаты",
    "filters.bathrooms.range": "Ванные комнаты",
    "filters.location": "Местопол��жение",
    "filters.status": "Статус",
    "filters.amenities": "Удобства",
    "filters.tabs.basic": "Основные",
    "filters.tabs.advanced": "Расширенные",

    // Property Types Russian
    "filters.property.types.villa": "Вилла",
    "filters.property.types.apartment": "Квартира",
    "filters.property.types.penthouse": "Пентхаус",
    "filters.property.types.mansion": "Особняк",
    "filters.property.types.townhouse": "Таунхаус",

    // Sort Options Russian
    "filters.sort.label": "Сортировать по",
    "filters.sort.default": "По умолчанию",
    "filters.sort.price-asc": "Цена: по возрастанию",
    "filters.sort.price-desc": "Цена: по убыванию",
    "filters.sort.newest": "Сначала новые",
    "filters.sort.oldest": "Сначала старые",

    // Status Options Russian
    "filters.status.for-sale": "Продажа",
    "filters.status.for-rent": "Аренда",
    "filters.status.offplan": "В планах",
    "filters.ready": "Готово",
    "filters.offplan": "В планах",
    "filters.featured": "Рекомендуемое",

    // Amenities Russian
    "filters.amenities.pool": "Бассейн",
    "filters.amenities.garden": "Сад",
    "filters.amenities.garage": "Гараж",
    "filters.amenities.balcony": "Балкон",
    "filters.amenities.gym": "Спортзал",
    "filters.amenities.security": "Охрана",

    // FAQ Section
    "faq.title": "Часто задаваемые вопросы",
    "faq.subtitle": "с Викторией Ланкастер",
    "faq.quote":
      '"Я выбрала эти вопросы, потому что они отражают то, что люди действительно спрашивают меня - не только о покупке в Дубае, но о том, как я думаю, как работаю и что ценю. Я верю, что ясность строит доверие. Когда вы знаете, чего ожидать, вы можете принимать лучшие решения."',
    "faq.quote.author": "— Виктория Ланкастер",

    // Testimonials Section
    "testimonials.title": "Истории успеха клиентов",
    "testimonials.subtitle":
      "Послушайте инвесторов, которые доверили Виктории Ланкастер свое путешествие в недвижимость Дубая",
    "testimonials.join.title": "Присоединяйтесь к 585+ довольным инвесторам",
    "testimonials.join.subtitle":
      "��о��овы начать свое инвестиционное путешествие в недвижимость Дубая? Позвольте Виктории помочь вам достичь ваших целей.",
    "testimonials.total.value": "Общая стоимость сделок",
    "testimonials.years.experience": "Лет опыта",
    "testimonials.client.satisfaction": "Удовлетворенность клиентов",

    "about.title": "О Виктории Ланкастер",
    "contact.title": "Связаться с нами",
    "areas.title": "Престижные районы Дубая",
    "blog.title": "Аналитика недвижимости",

    // Common Russian
    "common.loading": "Загрузка...",
  },
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  const isRTL = language === "ar"

  useEffect(() => {
    setMounted(true)
    // Load saved language from localStorage
    try {
      const savedLanguage = localStorage.getItem("vl-language") as Language
      if (savedLanguage && ["en", "ar", "ru"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Save language to localStorage
      try {
        localStorage.setItem("vl-language", language)
      } catch (error) {
        console.error("Failed to write to localStorage:", error)
      }

      // Update document direction for RTL
      if (typeof document !== "undefined") {
        document.documentElement.dir = isRTL ? "rtl" : "ltr"
        document.documentElement.lang = language
      }
    }
  }, [language, isRTL, mounted])

  const t = (key: string): string => {
    const currentTranslations = translations[language] || translations.en
    const translation = currentTranslations[key as keyof typeof currentTranslations]

    // Return the translation if found, otherwise return a fallback
    if (translation) {
      return translation
    }

    // Try to get from English as fallback
    const englishTranslation = translations.en[key as keyof typeof translations.en]
    if (englishTranslation) {
      return englishTranslation
    }

    // If no translation found, return a user-friendly version of the key
    return (
      key
        .split(".")
        .pop()
        ?.replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()) || key
    )
  }

  const contextValue = {
    language,
    setLanguage,
    t,
    isRTL,
  }

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}
