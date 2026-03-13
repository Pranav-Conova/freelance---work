import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
          },
        }
      )
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer className="footer" ref={footerRef}>
      <span className="footer-logo">Studio Klar</span>
      <ul className="footer-links">
        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
      </ul>
      <span className="footer-copy">&copy; 2024 Studio Klar. All Rights Reserved.</span>
    </footer>
  )
}
