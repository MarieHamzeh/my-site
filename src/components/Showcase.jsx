import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Showcase() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // The frame starts small and rounded, then grows as you scroll
      gsap.fromTo(
        '.frame',
        { scale: 0.6, borderRadius: 40 },
        {
          scale: 1,
          borderRadius: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: true,
          },
        }
      )
    },
    { scope: root }
  )

  return (
    <section className="showcase" id="projects" ref={root}>
      <div className="frame">
        <div className="frame-bar">
          <i />
          <i />
          <i />
          <span className="frame-url">cedarairlines.com</span>
        </div>

        <div className="frame-screen">
          {/* Replace this block with a screenshot of your project:
              <img src="/cedar-airlines.png" alt="Cedar Airlines website" />
              (put the image file inside the public folder) */}
          <div>
            <h2>Cedar Airlines</h2>
            <p>Your project screenshot goes here</p>
          </div>
        </div>
      </div>
    </section>
  )
}