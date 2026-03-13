import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const testimonials = [
  {
    quote:
      'Studio Klar transformed our digital presence. The attention to detail and performance optimization exceeded our expectations.',
    name: 'Rajesh Kumar',
    role: 'CEO at OldReport.in',
  },
  {
    quote:
      'Working with Studio Klar was seamless. They delivered a website that perfectly captures our brand essence.',
    name: 'Suresh Menon',
    role: 'Director at SBM Cargo Services',
  },
  {
    quote:
      'Their Swiss minimalist approach brought clarity and elegance to our complex platform. Truly world-class work.',
    name: 'Anita Sharma',
    role: 'Founder at TechNova',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, rotateX: 5 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        )

        // Subtle parallax shift per card (different speeds create depth)
        Array.from(cards).forEach((card, i) => {
          gsap.to(card, {
            y: -(10 + i * 8),
            ease: 'none',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }

      // Title parallax
      gsap.to(titleRef.current, {
        y: -20,
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
    <section className="testimonials" ref={sectionRef}>
      <h2 className="testimonials-title clash" ref={titleRef} style={{ opacity: 0 }}>
        What They Say
      </h2>
      <div className="testimonials-grid" ref={cardsRef}>
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.name} style={{ opacity: 0 }}>
            <span className="testimonial-quote-mark clash">&ldquo;</span>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-role">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
