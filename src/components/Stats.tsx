import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const stats = [
  { end: 12, suffix: '+', label: 'Projects Delivered' },
  { end: 8, suffix: '', label: 'Happy Clients', pad: true },
  { end: 3, suffix: '+', label: 'Years Experience', pad: true },
  { end: 100, suffix: '%', label: 'Client Retention' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Stat items fade + slide in
      itemRefs.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        )
      })

      // Count-up animation
      numberRefs.current.forEach((el, i) => {
        if (!el) return
        const stat = stats[i]
        const obj = { val: 0 }

        gsap.to(obj, {
          val: stat.end,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
          onUpdate: () => {
            const num = Math.round(obj.val)
            const display = stat.pad
              ? String(num).padStart(2, '0')
              : String(num)
            el.textContent = display + stat.suffix
          },
        })
      })

      // Subtle parallax on numbers
      numberRefs.current.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="stats" ref={sectionRef}>
      {stats.map((stat, i) => (
        <div
          className="stat-item"
          key={stat.label}
          ref={(el) => { itemRefs.current[i] = el }}
          style={{ opacity: 0 }}
        >
          <span
            className="stat-number clash"
            ref={(el) => { numberRefs.current[i] = el }}
          >
            0
          </span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </section>
  )
}
