import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const services = [
  {
    number: '01',
    name: 'Development',
    description:
      'Custom architecture, headless solutions, and performant web apps that scale.',
  },
  {
    number: '02',
    name: 'Interface',
    description:
      'Swiss minimalist UI design focusing on hierarchy, grids, and pure function.',
  },
  {
    number: '03',
    name: 'Identity',
    description:
      'Digital-first brand systems rooted in monochromatic elegance.',
  },
  {
    number: '04',
    name: 'Consulting',
    description:
      'Strategic direction for tech startups and luxury digital brands.',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Title slides in from left
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      // Quote and description fade in from right
      gsap.fromTo(
        [quoteRef.current, descRef.current],
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      )

      // Service cards stagger from bottom
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Parallax: service numbers float up on scroll
      const numbers = section.querySelectorAll('.service-number')
      numbers.forEach((num) => {
        gsap.to(num, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: num,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Parallax: title drifts slightly on scroll
      gsap.to(titleRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="studio" id="studio" ref={sectionRef}>
      <div className="studio-header">
        <h2 className="studio-title clash" ref={titleRef} style={{ opacity: 0 }}>
          The
          <br />
          Studio
        </h2>
        <div>
          <blockquote className="studio-quote" ref={quoteRef} style={{ opacity: 0 }}>
            "Efficiency is the highest form of beauty."
          </blockquote>
          <p className="studio-description" ref={descRef} style={{ opacity: 0 }}>
            Studio Klar represents an independent creative practice
            emphasizing typographic precision and performance optimization
            across all deliverables. We build digital products that respect
            both the user and the craft.
          </p>
        </div>
      </div>

      <div className="services-grid" ref={cardsRef}>
        {services.map((s) => (
          <div className="service-card" key={s.number} style={{ opacity: 0 }}>
            <div className="service-number clash">{s.number}</div>
            <h3 className="service-name clash">{s.name}</h3>
            <p className="service-description">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
