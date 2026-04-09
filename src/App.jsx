import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Addons from './components/Addons'
import WhySetupDesk from './components/WhySetupDesk'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState('')

  function selectPackage(value) {
    setSelectedPackage(value)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Pricing onSelect={selectPackage} />
      <Addons onSelect={selectPackage} />
      <WhySetupDesk />
      <Contact selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />
      <Footer />
    </>
  )
}
