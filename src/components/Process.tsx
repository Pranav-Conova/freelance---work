import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const steps = [
  {
    number: '01',
    name: 'Discovery',
    description:
      'Deep dive into your brand, goals, and audience to define the project scope.',
  },
  {
    number: '02',
    name: 'Design',
    description:
      'Crafting pixel-perfect interfaces with Swiss precision and typographic hierarchy.',
  },
  {
    number: '03',
    name: 'Develop',
    description:
      'Building performant, scalable applications with modern frameworks and clean code.',
  },
  {
    number: '04',
    name: 'Deploy',
    description:
      'Launch, optimize, and provide ongoing support to ensure lasting impact.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

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

      // Connecting line draws across
      gsap.fromTo(
        '.process-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
          },
        }
      )

      // Steps stagger in
      const stepEls = stepsRef.current?.querySelectorAll('.process-step')
      if (stepEls) {
        gsap.fromTo(
          stepEls,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Parallax: numbers drift up
      const numbers = section.querySelectorAll('.process-number')
      numbers.forEach((num) => {
        gsap.to(num, {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: num,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Parallax: title drifts
      gsap.to(titleRef.current, {
        y: -25,
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
    <section className="process" ref={sectionRef}>
      <h2 className="process-title clash" ref={titleRef} style={{ opacity: 0 }}>
        Our Process
      </h2>
      <div className="process-steps" ref={stepsRef}>
        <div className="process-line" />
        {steps.map((step) => (
          <div className="process-step" key={step.number} style={{ opacity: 0 }}>
            <span className="process-number clash">{step.number}</span>
            <h3 className="process-name clash">{step.name}</h3>
            <p className="process-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
