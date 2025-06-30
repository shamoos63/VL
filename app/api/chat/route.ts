import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

function getLanguageSpecificInstructions(language: string) {
  const instructions = {
    en: {
      personality:
        "You are Victoria's warm, friendly, and enthusiastic AI assistant! 😊 You love helping people find their dream properties in Dubai. Use a conversational, welcoming tone with occasional emojis. Be like a knowledgeable friend who's excited to help.",
      greeting: "Hello there! 👋 I'm absolutely delighted to help you find the perfect property in Dubai!",
      style:
        "Be warm, enthusiastic, use friendly language, and include helpful emojis. Make the conversation feel personal and engaging.",
      propertyEvaluation: {
        intro:
          "I'd be thrilled to help you evaluate your property! 🏠✨ Our Property Evaluation Tool is perfect for this! [PROPERTY_EVALUATION_TOOL]",
        benefits:
          "It provides professional assessment from our expert team, detailed market analysis, and personalized recommendations.",
        action:
          "I'll take you to our evaluation tool right away where you can enter your property details. It's free, quick, and gives you valuable insights about your property's worth!",
      },
    },
    ar: {
      personality:
        "أنت مساعد فيكتوريا الذكي الودود والحماسي! 😊 تحب مساعدة الناس في العثور على عقاراتهم المثالية في دبي. استخدم نبرة محادثة ترحيبية مع رموز تعبيرية أحياناً. كن مثل صديق مطلع ومتحمس للمساعدة.",
      greeting: "أهلاً وسهلاً! 👋 أنا سعيد جداً لمساعدتك في العثور على العقار المثالي في دبي!",
      style: "كن ودوداً ومتحمساً، استخدم لغة صديقة، وأضف رموز تعبيرية مفيدة. اجعل المحادثة تبدو شخصية وجذابة.",
      propertyEvaluation: {
        intro:
          "يسعدني مساعدتك في تقييم عقارك! 🏠✨ أداة تقييم العقارات لدينا مثالية لهذا الغرض! [PROPERTY_EVALUATION_TOOL]",
        benefits: "توفر تقييماً احترافياً من فريق الخبراء لدينا، وتحليلاً مفصلاً للسوق، وتوصيات مخصصة.",
        action:
          "سأنقلك إلى أداة التقييم لدينا على الفور حيث يمكنك إدخال تفاصيل عقارك. إنها مجانية وسريعة وتمنحك رؤى قيمة حول قيمة عقارك!",
      },
    },
    ru: {
      personality:
        "Вы дружелюбный и энтузиастичный ИИ-помощник Виктории! 😊 Вы любите помогать людям находить недвижимость их мечты в Дубае. Используйте разговорный, приветливый тон с периодическими эмодзи. Будьте как знающий друг, который рад помочь.",
      greeting: "Привет! 👋 Я очень рад помочь вам найти ид��альную недвижимость в Дубае!",
      style:
        "Будьте теплыми, энтузиастичными, используйте дружелюбный язык и полезные эмодзи. Сделайте разговор личным и увлекательным.",
      propertyEvaluation: {
        intro:
          "Я буду рад помочь вам оценить вашу недвижимость! 🏠✨ Наш Инструмент Оценки Недвижимости идеально подходит для этого! [PROPERTY_EVALUATION_TOOL]",
        benefits:
          "Он предоставляет профессиональную оценку от нашей команды экспертов, детальный анализ рынка и персонализированные рекомендации.",
        action:
          "Я сейчас же перенаправлю вас к нашему инструменту оценки, где вы сможете ввести данные о вашей нед��ижимости. Это бесплатно, быстро и даёт ценную информацию о стоимости вашей недвижимости!",
      },
    },
  }

  return instructions[language as keyof typeof instructions] || instructions.en
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set")
      return NextResponse.json(
        { message: "I'm having some technical difficulties right now. Please try again in a moment! 😊" },
        { status: 500 },
      )
    }

    const { messages, systemPrompt, language = "en", isPropEvalRequest = false } = await request.json()

    // Detect language from the last user message
    const lastUserMessage = messages.filter((msg: any) => msg.role === "user").pop()
    let detectedLanguage = language

    if (lastUserMessage) {
      const content = lastUserMessage.content.toLowerCase()

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
    }

    // If this is a property evaluation request, return a direct response
    if (isPropEvalRequest) {
      const instructions = getLanguageSpecificInstructions(detectedLanguage)
      const evalResponse = `${instructions.propertyEvaluation.intro}\n\n${instructions.propertyEvaluation.benefits}\n\n${instructions.propertyEvaluation.action}`

      return NextResponse.json({ message: evalResponse })
    }

    // Create language-specific instructions
    const instructions = getLanguageSpecificInstructions(detectedLanguage)

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000,
      },
    })

    // Enhanced system prompt with strict language requirements
    const enhancedSystemPrompt = `${systemPrompt}

CRITICAL LANGUAGE REQUIREMENT:
- The user is communicating in: ${detectedLanguage === "ar" ? "Arabic (العربية)" : detectedLanguage === "ru" ? "Russian (Русский)" : "English"}
- YOU MUST respond ONLY in ${detectedLanguage === "ar" ? "Arabic (العربية)" : detectedLanguage === "ru" ? "Russian (Русский)" : "English"}
- DO NOT mix languages in your response
- DO NOT respond in English if the user wrote in Arabic or Russian
- ALWAYS match the user's language choice

PERSONALITY & TONE:
${instructions.personality}

LANGUAGE INSTRUCTIONS:
- Always respond in ${detectedLanguage === "ar" ? "Arabic (العربية)" : detectedLanguage === "ru" ? "Russian (Русский)" : "English"}
- ${instructions.style}
- Use natural, native-level fluency in the target language
- Adapt cultural expressions and communication style to the language

CONVERSATION GUIDELINES:
- Be genuinely excited about helping with property searches
- Use warm, welcoming language that makes users feel comfortable
- Ask engaging follow-up questions to understand their needs better
- Share interesting facts about Dubai properties and areas
- Celebrate their property goals and dreams
- Use appropriate emojis to make conversations more lively (but don't overdo it)
- Be encouraging and supportive throughout their property journey
- Make complex real estate information easy to understand
- Show enthusiasm for Dubai's amazing property market

RESPONSE STYLE:
- Start responses with friendly acknowledgments in the user's language
- Use conversational connectors appropriate to the language
- End with encouraging questions or next steps in the same language
- Make users feel like they're talking to a knowledgeable, caring friend

IMPORTANT: If the user writes in Arabic, respond ONLY in Arabic. If they write in Russian, respond ONLY in Russian. If they write in English, respond ONLY in English. Never mix languages!`

    // Format the conversation for Gemini with better context
    const conversationHistory = messages
      .slice(-10) // Keep last 10 messages for context
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n")

    const prompt = `${enhancedSystemPrompt}

Recent conversation:
${conversationHistory}

REMEMBER: Respond ONLY in ${detectedLanguage === "ar" ? "Arabic (العربية)" : detectedLanguage === "ru" ? "Russian (Русский)" : "English"}. Do not use any other language in your response.

Please provide a helpful, friendly, and engaging response as Victoria Lancaster's AI assistant in the user's language.`

    console.log("Sending request to Gemini API...")
    const result = await model.generateContent(prompt)
    const response = await result.response
    const responseText = response.text()

    console.log("Successfully received response from Gemini API")
    return NextResponse.json({ message: responseText })
  } catch (error) {
    console.error("Error in chat API:", error)

    // Detect language for error message
    let errorLanguage = "en"
    try {
      const { messages } = await request.json()
      const lastUserMessage = messages.filter((msg: any) => msg.role === "user").pop()

      if (lastUserMessage) {
        const content = lastUserMessage.content.toLowerCase()
        if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(content)) {
          errorLanguage = "ar"
        } else if (/[\u0400-\u04FF\u0500-\u052F\u2DE0-\u2DFF\uA640-\uA69F]/.test(content)) {
          errorLanguage = "ru"
        }
      }
    } catch (e) {
      // Use default language if parsing fails
    }

    const errorMessages = {
      en: "I'm having a little trouble connecting right now, but I'm still here to help! 😊 Could you please try asking your question again? I'm excited to assist you with finding the perfect Dubai property!",
      ar: "أواجه صعوبة بسيطة في الاتصال الآن، لكنني ما زلت هنا للمساعدة! 😊 هل يمكنك من فضلك إعادة طرح سؤالك؟ أنا متحمس لمساعدتك في العثور على العقار المثالي في دبي!",
      ru: "У меня небольшие проблемы с подключением, но я все еще здесь, чтобы помочь! 😊 Не могли бы вы повторить свой вопрос? Я с нетерпением жду возможн����с����������и помочь вам найти идеальную недвижимость в Дубае!",
    }

    const errorMessage = errorMessages[errorLanguage as keyof typeof errorMessages] || errorMessages.en

    return NextResponse.json(
      {
        message: errorMessage,
        error: "Failed to generate response",
      },
      { status: 500 },
    )
  }
}
