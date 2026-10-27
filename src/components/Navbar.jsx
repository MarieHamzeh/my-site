import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const root = useRef(null)
  const tl = useRef(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      gsap.set('.sidebar', { xPercent: 100 })

      tl.current = gsap
        .timeline({ paused: true })
        .set('.menu-layer', { visibility: 'visible' })
        .fromTo('.overlay', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
        .to('.sidebar', { xPercent: 0, duration: 0.7, ease: 'power4.out' }, 0)
        .fromTo(
          '.side-link',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.07, ease: 'power4.out' },
          0.25
        )
        .fromTo('.side-foot', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.6)
    },
    { scope: root }
  )

  const openMenu = () => {
    setOpen(true)
    tl.current.timeScale(1).play()
  }

  const closeMenu = () => {
    setOpen(false)
    tl.current.timeScale(1.4).reverse()
  }

  // Close with the Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeMenu()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const goTo = (e, href) => {
    e.preventDefault()
    closeMenu()
    // wait for the sidebar to slide away, then scroll smoothly with Lenis
    setTimeout(() => window.lenis?.scrollTo(href), 350)
  }

  return (
    <div ref={root}>
      <header className="header">
        <a
          href="#top"
          className="logo"
          onClick={(e) => {
            e.preventDefault()
            window.lenis?.scrollTo(0)
          }}
        >
          the codes
        </a>

        <button
          className="menu-btn"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={openMenu}
        >
          <span />
          <span />
        </button>
      </header>

      <div className="menu-layer" aria-hidden={!open}>
        <div className="overlay" onClick={closeMenu} />

        <aside className="sidebar" aria-label="Menu">
          <div className="sidebar-top">
            <span>Menu</span>
            <button className="close-btn" aria-label="Close menu" onClick={closeMenu}>
              ×
            </button>
          </div>

          <nav className="side-nav">
            {links.map((l) => (
              <div className="side-item" key={l.href}>
                <a
                  className="side-link"
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => goTo(e, l.href)}
                >
                  {l.label}
                </a>
              </div>
            ))}
          </nav>

          <p className="side-foot">thecodesofficiall@gmail.com</p>
        </aside>
      </div>
    </div>
  )
}