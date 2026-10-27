import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 1) Paste your Formspree link here (looks like https://formspree.io/f/abcdwxyz)
//    While it still says YOUR_FORM_ID, the form opens the visitor's email app instead.
const FORM_ENDPOINT = 'https://formspree.io/f/mjyywovw'
// 2) Your real email
const EMAIL = 'thecodesofficiall@gmail.com'

const title = [
  { tone: 'light', text: 'Got an idea?' },
  { tone: 'dark', text: 'Tell me about it' },
  { tone: 'blue', text: 'and let’s build it.' },
]

const projects = [
  'E-commerce website',
  'Booking system',
  'Personal portfolio',
  'Business website',
  'Senior project',
  'Something else',
]

export default function Contact() {
  const root = useRef(null)
  const titleRef = useRef(null)
  const cardRef = useRef(null)
  // idle | sending | success | error | mailto
  const [status, setStatus] = useState('idle')

  useGSAP(
    () => {
      if (reduceMotion()) return

      // Title words light up as you scroll
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

      // The card rises, then its content follows one by one
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
        })
        .from('.contact-card', { y: 70, autoAlpha: 0, duration: 1 })
        .from(
          '.contact-left > *',
          { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
          0.3
        )
        .from(
          '.contact-form > *',
          { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08 },
          0.4
        )
    },
    { scope: root }
  )

  // Success screen: the check mark draws itself
  useGSAP(
    () => {
      if (status !== 'success' || reduceMotion()) return

      gsap.from('.success-circle', { scale: 0, duration: 0.6, ease: 'back.out(2)' })
      gsap.fromTo(
        '.success-check',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      )
      gsap.from('.success h3, .success p, .success button', {
        y: 16,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out',
      })
    },
    { scope: root, dependencies: [status] }
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // hidden field that only spam bots fill in
    if (data.get('_gotcha')) return

    // Not connected to a form service yet: open the visitor's email app
    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      const subject = encodeURIComponent(
        `New project: ${data.get('project') || 'Website'}`
      )
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject: ${
          data.get('project') || '-'
        }\n\n${data.get('message')}`
      )
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (res.ok) {
        form.reset()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact-section" id="contact" ref={root}>
      <div className="contact-inner">
        <p className="services-eyebrow">Contact</p>

        <h2 className="services-title" ref={titleRef}>
          {title.map((seg) =>
            seg.text.split(' ').map((word, i) => (
              <span key={seg.tone + i} className={`t-word t-${seg.tone}`}>
                {word}{' '}
              </span>
            ))
          )}
        </h2>

        <div className="contact-card" ref={cardRef}>
          {/* Left: blue panel */}
          <div className="contact-left">
            <span className="blob blob-1" />
            <span className="blob blob-2" />

            <p className="status-pill">
              <i /> Open for new projects
            </p>
            <h3>Let’s talk about your project.</h3>
            <p className="contact-lead">
              Fill in the form and I’ll get back to you with the next steps. No
              pressure, no commitment.
            </p>

            <a className="contact-mail" href={`mailto:${EMAIL}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
              {EMAIL}
            </a>
          </div>

          {/* Right: form or success screen */}
          <div className="contact-right">
            {status === 'success' ? (
              <div className="success">
                <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <circle className="success-circle" cx="40" cy="40" r="36" fill="#0a4fe0" />
                  <path
                    className="success-check"
                    d="M25 41l10 10 21-22"
                    pathLength="1"
                    stroke="#fff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>Message sent</h3>
                <p>Thank you! I’ll get back to you very soon.</p>
                <button type="button" onClick={() => setStatus('idle')}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <input type="hidden" name="_subject" value="New message from the website" />
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="honeypot"
                  aria-hidden="true"
                />

                <div className="field">
                  <input id="c-name" name="name" type="text" placeholder=" " required />
                  <label htmlFor="c-name">Your name</label>
                </div>

                <div className="field">
                  <input id="c-email" name="email" type="email" placeholder=" " required />
                  <label htmlFor="c-email">Email address</label>
                </div>

                <fieldset className="chips">
                  <legend>What do you need?</legend>
                  <div className="chips-row">
                    {projects.map((p) => (
                      <label className="chip" key={p}>
                        <input type="radio" name="project" value={p} />
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="field">
                  <textarea
                    id="c-message"
                    name="message"
                    rows="4"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="c-message">Tell me about your project</label>
                </div>

                <button className="send-btn" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <span className="dots" aria-label="Sending">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <>
                      Send message
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
                    </>
                  )}
                </button>

                <p className="form-note" aria-live="polite">
                  {status === 'error' &&
                    `Something went wrong. Please try again or email me at ${EMAIL}.`}
                  {status === 'mailto' &&
                    `Your email app should open with your message ready. If it doesn’t, write to ${EMAIL}.`}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}