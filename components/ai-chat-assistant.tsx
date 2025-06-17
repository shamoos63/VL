"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { properties } from "@/lib/properties-data"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { t, language, isRTL } = useI18n()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatCardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: getWelcomeMessage(),
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, language])

  // Handle click outside to close chat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && chatCardRef.current && !chatCardRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Handle escape key to close chat
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen])

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      en: "Hello there! 👋 I'm Victoria's AI assistant, and I'm absolutely thrilled to help you find your dream property in Dubai! ✨\n\nWhether you're looking for a luxury villa, a smart investment opportunity, or your perfect family home, I'm here to guide you every step of the way. I know all about our amazing properties, the best areas in Dubai, and can give you insider tips on the market! 🏠💎\n\nWhat kind of property adventure are we embarking on today? 😊",
      ar: "أهلاً وسهلاً! 👋 أنا مساعد فيكتوريا الذكي، وأنا متحمس جداً لمساعدتك في العثور على عقار أحلامك في دبي! ✨\n\nسواء كنت تبحث عن فيلا فاخرة، أو فرصة استثمارية ذكية، أو منزل عائلتك المثالي، أنا هنا لإرشادك في كل خطوة. أعرف كل شيء عن عقاراتنا الرائعة، وأفضل المناطق في دبي، ويمكنني إعطاؤك نصائح من الداخل عن السوق! 🏠💎\n\nما نوع مغامرة العقارات التي نبدأها اليوم؟ 😊",
      ru: "Привет! 👋 Я ИИ-помощник Виктории, и я очень рад помочь вам найти недвижимость вашей мечты в Дубае! ✨\n\nИщете ли вы роскошную виллу, умную инвестиционную возможность или идеальный семейный дом - я здесь, чтобы направлять вас на каждом шагу. Я знаю все о наших удивительных объектах, лучших районах Дубая и могу дать вам инсайдерские советы о рынке! 🏠💎\n\nКакое приключение с недвижимостью мы начинаем сегодня? 😊",
    }
    return welcomeMessages[language] || welcomeMessages.en
  }

  const getSystemPrompt = () => {
    const websiteData = {
      properties: properties,
      areas: [
        "Dubai Marina - Waterfront living with stunning views and world-class amenities",
        "Downtown Dubai - Heart of the city with iconic landmarks and luxury shopping",
        "Palm Jumeirah - Exclusive island living with private beaches and luxury resorts",
        "Business Bay - Modern business district with canal views and high-rise living",
        "Jumeirah Village Circle - Family-friendly community with great amenities",
        "Dubai Maritime City - Emerging waterfront development with great investment potential",
      ],
      services: [
        "Property buying and selling with expert guidance",
        "Investment consultation and portfolio building",
        "Professional property evaluation and market analysis",
        "Comprehensive market research and insights",
        "Portfolio management and optimization",
        "Rental property management and tenant services",
      ],
      agent: {
        name: "Victoria Lancaster",
        experience: "15+ years in UAE and UK markets",
        specialties: [
          "Off-plan investments",
          "Luxury residential properties",
          "Buy-to-let strategies",
          "Portfolio diversification",
        ],
        achievements: "585+ properties sold, AED 1.7B+ in successful transactions",
        languages: "English, Arabic, Russian",
        approach: "Strategic wealth building through smart property investments",
      },
      marketInsights: {
        rentalYields: "5% to 8.4% typically, up to 15% in some areas",
        growthAreas: "Dubai Maritime City, JVC, Business Bay showing strong growth",
        investmentMinimum: "AED 750,000+ for residency visa eligibility",
        taxes: "No property income tax or capital gains tax in Dubai",
        ownership: "100% freehold ownership available for foreigners",
      },
    }

    return `You are Victoria Lancaster's enthusiastic and knowledgeable AI assistant for VL Real Estate in Dubai. You help visitors discover amazing property opportunities and provide expert real estate guidance.

WEBSITE DATA & KNOWLEDGE:
${JSON.stringify(websiteData, null, 2)}

YOUR MISSION:
- Help users find properties that perfectly match their dreams and budget
- Share exciting insights about Dubai's incredible real estate market  
- Explain investment opportunities with enthusiasm and clarity
- Guide users through our website features and services
- Connect users with Victoria for personalized consultations
- Make property searching fun and informative!

PROPERTY EVALUATION TOOL:
- When users ask about property valuation, property evaluation, property assessment, property appraisal, or estimating their property's value, ALWAYS recommend our Property Evaluation Tool
- Include the special tag [PROPERTY_EVALUATION_TOOL] in your response so our system can direct them to the tool
- Explain the benefits of our professional evaluation service
- Mention that the tool is free to use and provides expert insights

PERSONALITY TRAITS:
- Warm, friendly, and genuinely excited about Dubai real estate
- Knowledgeable but approachable - like a trusted friend with expertise
- Encouraging and supportive of users' property dreams
- Uses appropriate emojis to add warmth and personality
- Asks engaging questions to understand user needs better
- Celebrates user goals and milestones in their property journey

CONVERSATION STYLE:
- Start with warm acknowledgments of user questions
- Use encouraging phrases like "That's fantastic!" or "I love that you're considering..."
- Share interesting facts and insights about properties and areas
- Ask follow-up questions to better understand their needs
- End with helpful next steps or engaging questions
- Make complex information easy and exciting to understand

Remember: You're not just providing information - you're building excitement and confidence in their Dubai property journey! Every interaction should leave them feeling more informed and enthusiastic about their real estate goals.`
  }

  // Check if message is about property evaluation
  const isPropertyEvaluationRequest = (message: string) => {
    const lowerMessage = message.toLowerCase()

    // English patterns
    const englishPatterns = [
      "property value",
      "property evaluation",
      "evaluate",
      "valuation",
      "appraisal",
      "estimate",
      "worth",
      "how much is",
      "property price",
      "assess",
      "assessment",
    ]

    // Arabic patterns
    const arabicPatterns = ["تقييم", "قيمة", "تقدير", "تثمين", "سعر", "يستحق", "كم يساوي", "كم سعر"]

    // Russian patterns
    const russianPatterns = ["оценка", "стоимость", "оценить", "цена", "стоит", "сколько стоит", "оценивание"]

    // Check all patterns
    return [...englishPatterns, ...arabicPatterns, ...russianPatterns].some((pattern) => lowerMessage.includes(pattern))
  }

  const handlePropertyEvaluationRedirect = () => {
    // Close the chat
    setIsOpen(false)

    // Navigate to the property evaluation page
    router.push("/evaluation")
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    // Detect language from user input
    let detectedLanguage = language
    const content = input.toLowerCase()

    // Arabic detection - check for Arabic characters
    if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(content)) {
      detectedLanguage = "ar"
    }
    // Russian detection - check for Cyrillic characters
    else if (/[\u0400-\u04FF\u0500-\u052F\u2DE0-\u2DFF\uA640-\uA69F]/.test(content)) {
      detectedLanguage = "ru"
    }
    // English detection - if no Arabic or Russian characters found
    else {
      detectedLanguage = "en"
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Check if this is a property evaluation request
    const isPropEvalRequest = isPropertyEvaluationRequest(userMessage.content)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          systemPrompt: getSystemPrompt(),
          language: detectedLanguage, // Use detected language
          isPropEvalRequest: isPropEvalRequest, // Pass flag to API
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Check if response contains the property evaluation tool tag
      if (data.message.includes("[PROPERTY_EVALUATION_TOOL]")) {
        // Wait a moment for the user to read the message before redirecting
        setTimeout(() => {
          handlePropertyEvaluationRedirect()
        }, 3000)
      }
    } catch (error) {
      console.error("Error sending message:", error)

      // Use detected language for error messages
      const errorMessages = {
        ar: "عذراً، حدث خطأ بسيط! 😅 لكن لا تقلق، أنا ما زلت هنا لمساعدتك. يرجى المحاولة مرة أخرى!",
        ru: "Извините, произошла небольшая ошибка! 😅 Но не волнуйтесь, я все еще здесь, чтобы помочь. Пожалуйста, попробуйте еще раз!",
        en: "Oops, a little hiccup happened! 😅 But don't worry, I'm still here to help you. Please try again!",
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorMessages[detectedLanguage] || errorMessages.en,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 h-14 w-14 rounded-full bg-gradient-to-r from-vl-yellow to-vl-yellow-light hover:from-vl-yellow-dark hover:to-vl-yellow text-vl-blue shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
        size="icon"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-vl-blue animate-bounce" />
        </div>
      </Button>
    )
  }

  return (
    <Card
      ref={chatCardRef}
      className="fixed bottom-4 right-4 z-40 w-80 h-[420px] shadow-2xl border-2 border-vl-yellow/30 bg-white backdrop-blur-sm"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <CardHeader className="bg-gradient-to-r from-vl-blue to-vl-blue-light text-white p-3 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-vl-yellow rounded-full flex items-center justify-center animate-pulse">
              <Bot className="h-5 w-5 text-vl-blue" />
            </div>
            <div>
              <CardTitle className="text-xs font-semibold flex items-center">
                {language === "ar"
                  ? "مساعد فيكتوريا الذكي"
                  : language === "ru"
                    ? "ИИ-помощник Виктории"
                    : "Victoria's AI Assistant"}
                <Sparkles className="h-2 w-2 ml-1 text-vl-yellow" />
              </CardTitle>
              <p className="text-xs text-white/90">
                {language === "ar"
                  ? "متصل ومتحمس للمساعدة! 😊"
                  : language === "ru"
                    ? "Онлайн и готов помочь! 😊"
                    : "Online & excited to help! 😊"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(420px-60px)] bg-white">
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl p-2 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-vl-yellow to-vl-yellow-light text-vl-blue shadow-md"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 shadow-md border border-gray-200"
                  }`}
                >
                  <div className="flex items-start space-x-1">
                    {message.role === "assistant" && <Bot className="h-3 w-3 mt-0.5 text-vl-blue flex-shrink-0" />}
                    {message.role === "user" && <User className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">
                        {message.content.replace("[PROPERTY_EVALUATION_TOOL]", "")}
                      </p>
                      <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2 shadow-md">
                  <div className="flex items-center space-x-1">
                    <Bot className="h-3 w-3 text-vl-blue" />
                    <Loader2 className="h-3 w-3 animate-spin text-vl-blue" />
                    <span className="text-xs text-gray-600">
                      {language === "ar"
                        ? "يكتب بحماس..."
                        : language === "ru"
                          ? "Печатает с энтузиазмом..."
                          : "Typing enthusiastically..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="border-t bg-gray-50/50 p-3">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === "ar"
                  ? "اكتب رسالتك هنا... 😊"
                  : language === "ru"
                    ? "Введите ваше сообщение... 😊"
                    : "Type your message here... 😊"
              }
              disabled={isLoading}
              className="flex-1 border-2 border-vl-yellow/20 focus:border-vl-yellow rounded-lg text-xs bg-white text-gray-900 placeholder-gray-500"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-vl-yellow to-vl-yellow-light hover:from-vl-yellow-dark hover:to-vl-yellow text-vl-blue rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              size="sm"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
