import { useEffect } from 'react'
import { gsap } from 'gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Stats from './components/Stats'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    // Wait for fonts to load, then reveal the body
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        document.body.classList.add('loaded')
        gsap.fromTo(
          document.body,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' }
        )
      })
    } else {
      // Fallback for browsers without Font Loading API
      document.body.classList.add('loaded')
      gsap.fromTo(
        document.body,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <div className="section-divider" />
      <Services />
      <Stats />
      <div className="section-divider" />
      <Process />
      <div className="section-divider" />
      <Portfolio />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </>
  )
}
