"use client"



import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Umbrella, Shield, ArrowRight, Menu, X, ChevronDown, ChevronUp } from "lucide-react"



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <header className="px-4 lg:px-6 py-4 flex items-center bg-[#e3f25d] rounded-lg sticky top-0 z-50">
      <a href="/" className="flex items-center justify-center">
        <MapPin className="h-8 w-8 mr-2" />
        <span className="font-bold text-2xl">TripPlanner</span>
      </a>
      <button className="ml-auto lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav
        className={`${isMenuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 right-0 bg-[#030603] lg:bg-transparent lg:ml-auto gap-4 p-4 lg:p-0 text-white`}
      >
        <a
          href="#features"
          className="text-lg font-medium hover:underline underline-offset-4 transition-all duration-200"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-lg font-medium hover:underline underline-offset-4 transition-all duration-200"
        >
          How It Works
        </a>
        <a href="#faq" className="text-lg font-medium hover:underline underline-offset-4 transition-all duration-200">
          FAQ
        </a>
        <a href="#" className="text-lg font-medium hover:underline underline-offset-4 transition-all duration-200">
          Login/SignUp
        </a>
      </nav>
    </header>
  )
}

const Hero = () => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80')",
          transform: `translateY(${offset * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70" />
      <div className="relative container h-full px-4 md:px-6 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white mb-6">
          Plan Your Trip with Confidence
        </h1>
        <p className="mx-auto max-w-[800px] text-xl md:text-2xl text-white mb-8">
          Budget planning, weather forecasts, and safety information - all in one place.
        </p>
        <Button className="text-xl py-6 px-8 bg-primary hover:bg-primary/90 text-white">Start Planning Now</Button>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center space-y-4 border p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 bg-black">
    {icon}
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-white text-center text-lg">{description}</p>
  </div>
)

const Features = () => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const features = [
    {
      icon: <DollarSign className="h-16 w-16 text-primary" />,
      title: "Budget Planning",
      description: "Create a detailed budget for your trip, including accommodations, transportation, and activities.",
    },
    {
      icon: <Umbrella className="h-16 w-16 text-primary" />,
      title: "Weather Forecasts",
      description: "Get accurate weather predictions for your destination to pack and plan accordingly.",
    },
    {
      icon: <Shield className="h-16 w-16 text-primary" />,
      title: "Safety Information",
      description: "Access up-to-date crime rates and safety tips for your chosen location.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="features" className="w-full py-20 md:py-32 bg-gray-100 text-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-black">Our Features</h2>
        <div className="flex justify-center">
          <FeatureCard {...features[currentFeature]} />
        </div>
        <div className="flex justify-center mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full mx-2 ${index === currentFeature ? "bg-pink-500" : "bg-black"}`}
              onClick={() => setCurrentFeature(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null)

  const steps = [
    {
      title: "Enter Your Destination",
      description: "Provide details about where and when you're planning to travel.",
    },
    {
      title: "Get Insights",
      description: "Receive comprehensive information about your destination, including costs, weather, and safety.",
    },
    {
      title: "Plan and Save",
      description: "Use our tools to create a budget and itinerary for a worry-free trip.",
    },
  ]

  return (
    <section id="how-it-works" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 cursor-pointer"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div
                className={`bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl transition-all duration-300 ${activeStep === index ? "scale-110" : ""}`}
              >
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold text-center">{step.title}</h3>
              <p
                className={`text-gray-500 text-center text-lg transition-all duration-300 ${activeStep === index ? "opacity-100" : "opacity-0 h-0"}`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null)

  const faqs = [
    {
      question: "How accurate are the weather forecasts?",
      answer:
        "Our weather forecasts are sourced from reliable meteorological services and are typically accurate up to 14 days in advance. However, please note that weather can be unpredictable, and we recommend checking for updates closer to your travel date.",
    },
    {
      question: "Can I save multiple trip plans?",
      answer:
        "Yes, you can save multiple trip plans in your account. This allows you to compare different options or plan several trips at once.",
    },
    {
      question: "How often is the safety information updated?",
      answer:
        "We update our safety information regularly, typically on a weekly basis. For critical updates, we strive to provide real-time information as soon as it becomes available.",
    },
  ]

  return (
    <section id="faq" className="w-full py-20 md:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <span className="text-xl font-semibold">{faq.question}</span>
                {openQuestion === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              {openQuestion === index && <p className="mt-4 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CallToAction = () => {
  const navigate = useNavigate();

  return (
  <section className="w-full py-20 md:py-32 bg-primary text-primary-foreground">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Ready to Plan Your Next Adventure?
        </h2>
        <p className="mx-auto max-w-[800px] text-primary-foreground/90 text-xl md:text-2xl">
          Start your journey with TripPlanner today and travel with confidence.
        </p>
        <button onClick={() => navigate("/GetStarted")}>Go to About</button>
      </div>
    </div>
  </section>
)}

const Footer = () => (
  <footer className="w-full py-8 bg-gray-100">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-8 w-8" />
          <span className="font-bold text-2xl">TripPlanner</span>
        </div>
        <p className="text-gray-500">© 2024 TripPlanner. All rights reserved.</p>
        <nav className="flex gap-4">
          <a href="#" className="text-lg hover:underline underline-offset-4 transition-all duration-200">
            Terms
          </a>
          <a href="#" className="text-lg hover:underline underline-offset-4 transition-all duration-200">
            Privacy
          </a>
          <a href="#" className="text-lg hover:underline underline-offset-4 transition-all duration-200">
            Contact
          </a>
        </nav>
      </div>
    </div>
  </footer>
)

const LandingPage = () => {
  useEffect(() => {
    const smoothScroll = (e) => {
      e.preventDefault()
      const targetId = e.target.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => link.addEventListener("click", smoothScroll))

    return () => links.forEach((link) => link.removeEventListener("click", smoothScroll))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage

