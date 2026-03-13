import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const toggleMenu = useCallback(() => {
    const menu = menuRef.current
    if (!menu) return

    if (!menuOpen) {
      setMenuOpen(true)
      gsap.fromTo(
        menu,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' }
      )
      gsap.fromTo(
        menu.querySelectorAll('.mobile-menu-link'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.08, delay: 0.3 }
      )
    } else {
      gsap.to(menu, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => setMenuOpen(false),
      })
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    const menu = menuRef.current
    if (!menu || !menuOpen) return

    gsap.to(menu, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => setMenuOpen(false),
    })
  }, [menuOpen])

  return (
    <>
      <nav className="navbar" ref={navRef} style={{ opacity: 0 }}>
        <a href="#" className="navbar-logo">Studio Klar</a>
        <ul className="navbar-links">
          <li><a href="#studio">Services</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button
          className={`hamburger ${menuOpen ? 'hamburger-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          type="button"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div
        className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}
        ref={menuRef}
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <div className="mobile-menu-links">
          <a href="#studio" className="mobile-menu-link clash" onClick={closeMenu}>Services</a>
          <a href="#work" className="mobile-menu-link clash" onClick={closeMenu}>Work</a>
          <a href="#contact" className="mobile-menu-link clash" onClick={closeMenu}>Contact</a>
        </div>
      </div>
    </>
  )
}
