import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// t = word, s = size, x / y = resting position inside the cloud (in %)
const words = [
  { t: 'Node.js', s: 4.5, x: 22, y: 8 },
  { t: 'Express', s: 5.5, x: 58, y: 8 },
  { t: 'API', s: 3, x: 86, y: 8 },

  { t: 'React', s: 6.5, x: 17, y: 21 },
  { t: 'Next.js', s: 4.5, x: 47, y: 21 },
  { t: 'Laravel', s: 4, x: 78, y: 21 },

  { t: 'HTML', s: 3.5, x: 10, y: 34 },
  { t: 'CSS', s: 4.5, x: 28, y: 34 },
  { t: 'PHP', s: 4.5, x: 46, y: 34 },
  { t: 'Git', s: 3, x: 64, y: 34 },
  { t: 'REST', s: 3.5, x: 84, y: 34 },

  { t: 'Python', s: 4.5, x: 16, y: 47 },
  { t: 'JavaScript', s: 9.5, x: 63, y: 47 },

  { t: 'MySQL', s: 5, x: 15, y: 60 },
  { t: 'phpMyAdmin', s: 3.5, x: 42, y: 60 },
  { t: 'Java', s: 4.5, x: 66, y: 60 },
  { t: 'Vite', s: 3, x: 86, y: 60 },

  { t: 'Tailwind', s: 4, x: 17, y: 72 },
  { t: 'GitHub', s: 4.5, x: 46, y: 72 },
  { t: 'Figma', s: 4, x: 70, y: 72 },
  { t: 'GSAP', s: 3.5, x: 89, y: 72 },

  { t: 'TypeScript', s: 5, x: 24, y: 85 },
  { t: 'SQL', s: 3.5, x: 50, y: 85 },
  { t: 'MongoDB', s: 4.5, x: 72, y: 85 },
  { t: 'Linux', s: 3.5, x: 90, y: 85 },
]

const colorFor = (s) =>
  s >= 6 ? '#0b1f4d' : s >= 4.5 ? '#0a4fe0' : s >= 4 ? '#2f80ff' : '#6e6e73'

const CYCLE = 14 // seconds for one word to go from tiny to gone
const K_MIN = 0.25 // how small a word starts
const K_MAX = 1.9 // how big a word gets before it vanishes

export default function Skills() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (reduceMotion()) return

      // Text on the left fades in once
      gsap.from('.skills-copy', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })

      const els = gsap.utils.toArray('.word')
      const n = els.length
      const loops = []

      els.forEach((el, i) => {
        const tl = gsap.timeline({ repeat: -1 })

        // Move toward you: the word grows and drifts outward from the center
        tl.fromTo(
          el,
          { '--k': K_MIN },
          { '--k': K_MAX, duration: CYCLE, ease: 'power2.in' },
          0
        )
          // Fade in at the start
          .fromTo(
            el,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: CYCLE * 0.2, ease: 'power1.out' },
            0
          )
          // Fade out when it gets close
          .fromTo(
            el,
            { autoAlpha: 1 },
            {
              autoAlpha: 0,
              duration: CYCLE * 0.3,
              ease: 'power1.in',
              immediateRender: false,
            },
            CYCLE * 0.7
          )

        // Every word starts at a different point of its cycle
        tl.progress(((i * 7) % n) / n)
        loops.push(tl)
      })

      // Only animate while the section is on screen
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) =>
          loops.forEach((tl) => (self.isActive ? tl.resume() : tl.pause())),
      })
    },
    { scope: root }
  )

  return (
    <section className="skills-section" id="skills" ref={root}>
      <div className="skills-copy">
        <h2>
          <span className="accent">Skills</span> and tools
        </h2>
        <p>
          I build with a modern full-stack toolkit. For a more{' '}
          <span className="accent">detailed</span> overview, check the tools that
          were used on each project.
        </p>
      </div>

      <div className="cloud" role="list" aria-label="Skills and tools">
        {words.map((w) => (
          <span
            key={w.t}
            role="listitem"
            className="word"
            style={{
              left: `${w.x}%`,
              top: `${w.y}%`,
              '--s': w.s,
              '--dx': w.x - 50,
              '--dy': (w.y - 50) * 0.95,
              '--k': 1,
              color: colorFor(w.s),
            }}
          >
            {w.t}
          </span>
        ))}
      </div>
    </section>
  )
}