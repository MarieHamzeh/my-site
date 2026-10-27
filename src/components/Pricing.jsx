import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Title in three tones: light grey, dark grey, blue
const title = [
  { tone: 'light', text: 'Clear prices' },
  { tone: 'dark', text: 'for every project.' },
  { tone: 'blue', text: 'No surprises.' },
]

// Edit or add plans here
const plans = [
  {
    name: 'E-commerce website',
    price: 599,
    text: 'A complete online store to sell your products and manage every order.',
    features: [
      'Custom design',
      'Product management',
      'Full product catalog',
      'Shopping cart & checkout',
      'Admin panel',
    ],
  },
  {
    name: 'Booking system',
    price: 699,
    text: 'Let your customers book online while you manage your schedule from one place.',
    features: [
      'Online booking calendar',
      'Appointment management',
      'Admin dashboard',
      'Responsive design',
    ],
  },
  {
    name: 'Personal portfolio',
    price: 199,
    text: 'A clean, fast site that shows who you are and the work you have done.',
    features: [
      'Modern custom design',
      'Projects showcase',
      'About & contact',
      'Responsive design',
    ],
  },
  {
    name: 'Business website',
    price: 350,
    text: 'A professional website that presents your company and brings in new customers.',
    features: [
      'Multiple pages',
      'About & services',
      'Contact form',
      'Responsive design',
      'Clean & modern look',
    ],
  },
]

const goToContact = (e) => {
  // smooth scroll when Lenis is running, otherwise the normal link jump works
  if (window.lenis) {
    e.preventDefault()
    window.lenis.scrollTo('#contact')
  }
}

export default function Pricing() {
  const root = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

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

      // Cards rise in one after another
      gsap.from('.plan', {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      })
    },
    { scope: root }
  )

  return (
    <section className="pricing-section" id="pricing" ref={root}>
      <div className="pricing-inner">
        <p className="services-eyebrow">Pricing</p>

        <h2 className="services-title" ref={titleRef}>
          {title.map((seg) =>
            seg.text.split(' ').map((word, i) => (
              <span key={seg.tone + i} className={`t-word t-${seg.tone}`}>
                {word}{' '}
              </span>
            ))
          )}
        </h2>

        <div className="pricing-grid" ref={gridRef}>
          {plans.map((p) => (
            <article className="plan" key={p.name}>
              <h3>{p.name}</h3>
              <p className="plan-text">{p.text}</p>

              <p className="plan-price">
                <span>$</span>
                {p.price}
              </p>

              <ul className="plan-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a className="plan-btn" href="#contact" onClick={goToContact}>
                Get started
              </a>
            </article>
          ))}
        </div>

        <p className="pricing-note">
          Need something custom?{' '}
          <a href="#contact" onClick={goToContact}>
            Contact me for a quote
          </a>
        </p>
      </div>
    </section>
  )
}