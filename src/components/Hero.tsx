import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const echoRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const locationRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Echo layers cascade in from above
      echoRefs.current.forEach((layer, i) => {
        if (!layer) return
        gsap.fromTo(
          layer,
          { y: -80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.4 + i * 0.1,
          }
        )
      })

      // Main title slides up
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.3 }
      )

      // Other hero elements stagger in
      gsap.fromTo(
        '.hero-issue, .hero-subtitle, .hero-location, .hero-cta',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          delay: 1,
        }
      )

      // Scroll indicator fades in
      gsap.fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1.8 }
      )

      // Horizontal line draws itself across the bottom
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power2.inOut',
          delay: 1.2,
        }
      )

      // ── Scroll-driven parallax ──

      // Title scales up slightly + fades only in last 40% of hero scroll
      gsap.fromTo(
        titleRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 1.1,
          opacity: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: '40% top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // Echo layers fade + shift at different speeds (depth illusion)
      echoRefs.current.forEach((layer, i) => {
        if (!layer) return
        gsap.fromTo(
          layer,
          { y: 0, opacity: 1 },
          {
            y: -(30 + i * 20),
            opacity: 0,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: '30% top',
              end: '90% top',
              scrub: true,
            },
          }
        )
      })

      // Subtitle + location move slower than scroll (parallax lag)
      gsap.to(subtitleRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(locationRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Scroll indicator fades out as you start scrolling
      gsap.to('.scroll-indicator', {
        opacity: 0,
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '5% top',
          end: '15% top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-issue" style={{ opacity: 0 }}>
        Issue 01 / Vol 24
      </div>

      <div className="echo-container">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`echo-layer echo-layer-${i} clash`}
            ref={(el) => { echoRefs.current[i - 1] = el }}
            style={{ opacity: 0 }}
          >
            STUDIO KLAR
          </div>
        ))}
        <h1 className="hero-title" ref={titleRef} style={{ opacity: 0 }}>
          STUDIO KLAR
        </h1>
      </div>

      <p className="hero-subtitle" ref={subtitleRef} style={{ opacity: 0 }}>
        Precision-crafted digital experiences for the modern era.
      </p>
      <p className="hero-location" ref={locationRef} style={{ opacity: 0 }}>
        Based in India. Working Globally.
        <br />
        Specializing in high-end web development.
      </p>
      <a href="#work" className="hero-cta" style={{ opacity: 0 }}>
        Explore Archive
      </a>

      <div className="scroll-indicator" style={{ opacity: 0 }}>
        <div className="scroll-indicator-line" />
      </div>

      <div className="hero-bottom-line" ref={lineRef} />
    </section>
  )
}
