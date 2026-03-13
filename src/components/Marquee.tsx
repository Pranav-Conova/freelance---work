import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  const text =
    'WEB DEVELOPMENT — UI/UX DESIGN — BRAND IDENTITY — DIGITAL STRATEGY — REACT — NEXT.JS — TYPESCRIPT — GSAP — '

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const ctx = gsap.context(() => {
      // Speed up / slow down marquee based on scroll velocity
      gsap.to(track, {
        timeScale: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: track,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity())
            const speed = gsap.utils.clamp(1, 4, 1 + velocity / 1000)
            gsap.to(track, {
              '--marquee-speed': `${30 / speed}s`,
              duration: 0.5,
              overwrite: true,
            })
          },
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="marquee">
      <div className="marquee-track" ref={trackRef}>
        <span className="marquee-content">{text}</span>
        <span className="marquee-content">{text}</span>
      </div>
    </div>
  )
}
