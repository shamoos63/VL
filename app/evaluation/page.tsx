import Footer from "@/components/footer"
import Header from "@/components/header"
import ServerPageHero from "@/components/server-page-hero"
import EvaluationClient from "./evaluation-client"

export default function EvaluationPage() {
  return (
    <main className="min-h-screen pt-24 bg-transparent">
      <Header />
      <ServerPageHero
        title="Property Evaluation & Selling Support"
        subtitle="Considering your next move? Start with knowing exactly what your property is worth, and what it could do for you."
        backgroundImage="/hero-images/evaluation-hero.png"
        className="font-sansumi"

      />

      {/* Description Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-white text-center mb-6">
            Victoria offers a confidential, data-driven evaluation for property owners in Dubai and the UK. Whether
            you're planning to sell, rent, or simply want clarity, you'll receive strategic insight, not just a number.
          </p>
          <p className="text-lg text-white text-center mb-6">Backed by 15+ years of experience, your evaluation will include:</p>
         <div class="w-full">
  <ul class="flex flex-col gap-6 md:flex-row md:gap-8">

    <li class="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 class="text-lg font-medium text-gray-800">
        Accurate market value
      </h3>
    </li>

    <li class="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 class="text-lg font-medium text-gray-800">
        Investment and income potential
      </h3>
    </li>

    <li class="flex flex-1 items-center justify-center rounded-xl glass p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 class="text-lg font-medium text-gray-800">
        Selling strategy (if applicable)
      </h3>
    </li>

  </ul>
</div>
          <p className="text-lg text-white text-center pt-6 font-medium">
            Submit your details below, Victoria will personally evaluate your property and advise on your best next
            move.
          </p>
        </div>
      </section>
   <EvaluationClient />
      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="glass rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-vl-blue">585+</div>
              <div className="text-sm text-gray-600">Properties Evaluated</div>
            </div>
            <div className="glass rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-vl-blue">AED 1.7B+</div>
              <div className="text-sm text-gray-600">Total Value Assessed</div>
            </div>
            <div className="glass rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-vl-blue">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

   
        <Footer />
    </main>
  )
}
