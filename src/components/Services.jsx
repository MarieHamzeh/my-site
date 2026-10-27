import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Title in three tones: light grey, dark grey, blue
const title = [
  { tone: 'light', text: 'From first idea' },
  { tone: 'dark', text: 'to a live product.' },
  { tone: 'blue', text: 'Here’s what I build.' },
]

const icons = {
  bag: (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  calendar: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </>
  ),
  cap: (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  briefcase: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
}

// Edit or add cards here
const services = [
  {
    icon: 'bag',
    featured: true,
    title: 'E-commerce websites',
    text: 'Online stores with product pages, a cart, secure checkout and an admin panel to manage your orders.',
    tags: ['Products', 'Checkout', 'Admin panel'],
  },
  {
    icon: 'calendar',
    title: 'Booking systems & business software',
    text: 'Appointment booking, dashboards and custom tools that take care of your daily work.',
    tags: ['Bookings', 'Dashboards', 'Custom tools'],
  },
  {
    icon: 'cap',
    title: 'Senior projects for students',
    text: 'Graduation projects built with you, from the first idea to a working demo, with clean code and guidance so you can present it with confidence.',
    tags: ['Full-stack', 'Database', 'Guidance'],
  },
  {
    icon: 'briefcase',
    title: 'Personal portfolios',
    text: 'A fast, modern site that shows who you are and what you have done, easy to share with anyone.',
    tags: ['Responsive', 'Animations', 'Your own domain'],
  },
]

export default function Services() {
  const root = useRef(null)

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
            trigger: '.services-title',
            start: 'top 85%',
            end: 'bottom 55%',
            scrub: true,
          },
        }
      )

      // Cards rise in one after another
      gsap.from('.service-card', {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
      })
    },
    { scope: root }
  )

  return (
    <section className="services-section" id="services" ref={root}>
      <div className="services-inner">
        <p className="services-eyebrow">What I do</p>

        <h2 className="services-title">
          {title.map((seg) =>
            seg.text.split(' ').map((word, i) => (
              <span key={seg.tone + i} className={`t-word t-${seg.tone}`}>
                {word}{' '}
              </span>
            ))
          )}
        </h2>

        <div className="services-grid">
          {services.map((s) => (
            <article
              key={s.title}
              className={`service-card${s.featured ? ' featured' : ''}`}
            >
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icons[s.icon]}
                </svg>
              </div>

              <h3>{s.title}</h3>
              <p>{s.text}</p>

              <ul className="service-tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}