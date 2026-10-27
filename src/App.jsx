import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import Laptop from './components/Laptop'
import Skills from './components/Skills'

import Services from './components/Services'
import Pricing from  './components/Pricing'
import Process from './components/Process'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // Smooth scrolling (Lenis) kept in sync with GSAP ScrollTrigger
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis()
    window.lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.lenis = undefined
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <div className="blue-zone">
          <Laptop />
          <Services />
          <Skills />
          <Pricing/>
          <Process/>
          <Contact/>
        </div>

      

        {/* Temporary placeholders so the menu links work. We'll build these next. */}
       

      </main>
    </>
  )
}