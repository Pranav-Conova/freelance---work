import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Title animates in
      gsap.fromTo(
        '.contact-title',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      // Left side elements stagger in
      gsap.fromTo(
        '.contact-email, .contact-cta',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      )

      // Right side details stagger in
      gsap.fromTo(
        '.contact-detail',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-grid">
        <div className="contact-left">
          <h2 className="contact-title clash" style={{ opacity: 0 }}>
            Start the
            <br />
            Dialogue.
          </h2>
          <a
            href="mailto:hello@studioklar.com"
            className="contact-email"
            style={{ opacity: 0 }}
          >
            hello@studioklar.com
          </a>
          <div>
            <a href="mailto:hello@studioklar.com" className="contact-cta" style={{ opacity: 0 }}>
              Let's Talk
            </a>
          </div>
        </div>
        <div className="contact-details">
          <div className="contact-detail" style={{ opacity: 0 }}>
            <span className="contact-detail-label">Email</span>
            <a href="mailto:hello@studioklar.com" className="contact-detail-value">
              hello@studioklar.com
            </a>
          </div>
          <div className="contact-detail" style={{ opacity: 0 }}>
            <span className="contact-detail-label">Location</span>
            <span className="contact-detail-value">India</span>
          </div>
          <div className="contact-detail" style={{ opacity: 0 }}>
            <span className="contact-detail-label">Availability</span>
            <span className="contact-detail-value">Q2 2026</span>
          </div>
          <div className="contact-detail" style={{ opacity: 0 }}>
            <span className="contact-detail-label">Social</span>
            <div className="contact-social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
