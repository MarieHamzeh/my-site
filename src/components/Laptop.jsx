import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Change these three to whatever you want to say
const points = [
  {
    title: 'Designed to stand out.',
    text: 'Clean, modern websites that make your business look as good as it is.',
  },
  {
    title: 'Built to be fast.',
    text: 'Quick to load and smooth on every phone, tablet and laptop.',
  },
  {
    title: 'Made for your business.',
    text: 'Every site is made from scratch around your brand and your customers.',
  },
]

export default function Laptop() {
  const root = useRef(null)
  const screen = useRef(null)
  const img = useRef(null)
  const [ready, setReady] = useState(false)

  // If the image was already cached, mark it ready right away
  useEffect(() => {
    if (img.current?.complete && img.current.naturalHeight > 0) setReady(true)
  }, [])

  // 1) Laptop slides in from the left, then the three blocks follow
  useGSAP(
    () => {
      if (reduceMotion()) return

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.laptop', { x: -240, autoAlpha: 0, duration: 1.5, delay: 0.2 })
        .from(
          '.point',
          { y: 40, autoAlpha: 0, duration: 1, stagger: 0.15 },
          '-=0.9'
        )
         .from('.start-btn', { y: 20, autoAlpha: 0, duration: 0.8 }, '-=0.6')
    },
    { scope: root }
  )

  // 2) The website inside the screen scrolls slowly up and down
  useGSAP(
    () => {
      if (!ready || reduceMotion()) return

      gsap.to(img.current, {
        y: () =>
          Math.min(0, -(img.current.offsetHeight - screen.current.offsetHeight)),
        duration: 22,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
        invalidateOnRefresh: true,
      })
    },
    { scope: root, dependencies: [ready] }
  )

  return (
    <section className="laptop-section" id="top" ref={root}>
      <div className="laptop-col">
        <div className="laptop">
          <div className="laptop-lid">
            <span className="laptop-cam" />
            <div className="laptop-screen" ref={screen}>
              <img
                ref={img}
                src="/jewelryexample.jpeg"
                alt="Concept website for an online jewelry store"
                onLoad={() => setReady(true)}
              />
            </div>
          </div>
          <div className="laptop-base" />
        </div>

        <a
  className="start-btn"
  href="#contact"
  onClick={(e) => {
    // smooth scroll when Lenis is running, otherwise the normal link jump works
    if (window.lenis) {
      e.preventDefault()
      window.lenis.scrollTo('#contact')
    }
  }}
>
  Start now
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
</a>
      </div>

      <div className="points">
        {points.map((p) => (
          <div className="point" key={p.title}>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}