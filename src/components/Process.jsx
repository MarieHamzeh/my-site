import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Title in three tones: light grey, dark grey, blue
const title = [
  { tone: 'light', text: 'How it works.' },
  { tone: 'dark', text: 'Every project grows' },
  { tone: 'blue', text: 'step by step.' },
]

// Edit, add or remove steps here
const steps = [
  {
    title: 'Let’s talk',
    text: 'You tell me your idea, your goals and what you need. I listen first.',
  },
  {
    title: 'Plan',
    text: 'We agree on the pages, features, timeline and price, so everything is clear from day one.',
  },
  {
    title: 'Design',
    text: 'I design the look of your site: colors, fonts and layout. You give feedback.',
  },
  {
    title: 'Build',
    text: 'I turn the design into a fast, responsive website with the features you chose.',
  },
  {
    title: 'Test & refine',
    text: 'Everything is tested on phones and laptops, and we polish the details together.',
  },
  {
    title: 'Launch & support',
    text: 'Your site goes live on your own domain, and I am around if you need changes.',
  },
]

export default function Process() {
  const root = useRef(null)
  const titleRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(
    () => {
      if (reduceMotion()) return

      // Title words light up one by one as you scroll
      gsap.fromTo(
        '.t-word',
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'bottom 55%',
            scrub: true,
          },
        }
      )

      // The stem grows as you scroll (the glowing orb rides on its tip)
      gsap.fromTo(
        '.stem-fill',
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 55%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
        }
      )

      // Each step grows out of the stem when the tip reaches it
      gsap.utils.toArray('.step').forEach((el) => {
        const dir = el.classList.contains('left') ? -1 : 1
        const q = gsap.utils.selector(el)

        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top+=28px 55%',
              toggleActions: 'play none none reverse',
            },
          })
          // node pops on the stem
          .fromTo(
            q('.node'),
            { scale: 0 },
            { scale: 1, duration: 0.5, ease: 'back.out(3)' },
            0
          )
          // pulse ring
          .fromTo(
            q('.ring'),
            { scale: 1, autoAlpha: 0 },
            { scale: 1.4, autoAlpha: 0.7, duration: 0.01 },
            0
          )
          .to(q('.ring'), { scale: 3.2, autoAlpha: 0, duration: 0.9, ease: 'power2.out' }, 0.02)
          // branch draws out from the stem
          .fromTo(
            q('.branch'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.4, ease: 'power2.out' },
            0.1
          )
          // the leaf unfurls
          .fromTo(
            q('.leaf'),
            { autoAlpha: 0, scale: 0.55, rotate: dir * -8, x: -dir * 40 },
            {
              autoAlpha: 1,
              scale: 1,
              rotate: 0,
              x: 0,
              duration: 0.9,
              ease: 'back.out(1.6)',
            },
            0.3
          )
          // number, title and text fade in one by one
          .from(
            q('.leaf-num, .leaf h3, .leaf p'),
            { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
            0.6
          )
      })
    },
    { scope: root }
  )

  return (
    <section className="process-section" id="process" ref={root}>
      <div className="process-inner">
        <p className="services-eyebrow">The process</p>

        <h2 className="services-title" ref={titleRef}>
          {title.map((seg) =>
            seg.text.split(' ').map((word, i) => (
              <span key={seg.tone + i} className={`t-word t-${seg.tone}`}>
                {word}{' '}
              </span>
            ))
          )}
        </h2>

        <div className="process-track" ref={trackRef}>
          <div className="stem">
            <div className="stem-fill">
              <span className="orb" />
            </div>
          </div>

          {steps.map((s, i) => (
            <div
              className={`step ${i % 2 === 0 ? 'left' : 'right'}`}
              key={s.title}
            >
              <div className="node">
                <span className="ring" />
              </div>
              <span className="branch" />

              <article className="leaf">
                <span className="leaf-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}