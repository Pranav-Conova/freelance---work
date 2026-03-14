import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  {
    number: '01',
    name: 'OldReport.in',
    meta: 'E-Commerce Platform / Web Application / 2024',
    link: 'https://oldreport.in/',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tags: ['React', 'Go', 'AWS'],
  },
  {
    number: '02',
    name: 'SBM Cargo',
    meta: 'Dubai-Based Logistics / Corporate Site / 2024',
    link: 'https://sbmcargoservices.com/',
    image:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
    tags: ['React'],
  },
  {
    number: '03',
    name: 'TechNova Platform',
    meta: 'SaaS Dashboard / Web Application / 2024',
    link: '#',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['TypeScript', 'GraphQL', 'AWS'],
  },
  {
    number: '04',
    name: 'Meridian Hotels',
    meta: 'Luxury Hospitality / Brand Website / 2023',
    link: '#',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    tags: ['Gatsby', 'Contentful', 'Netlify'],
  },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const imageWrapperRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
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

      // Each portfolio item
      itemRefs.current.forEach((item, i) => {
        if (!item) return

        // Info slides in from the side
        const info = item.querySelector('.portfolio-info')
        const fromX = i % 2 === 0 ? 60 : -60

        gsap.fromTo(
          info,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
            },
          }
        )

        // Image clip-path reveal
        const img = imageRefs.current[i]
        if (img) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 70%',
            onEnter: () => {
              img.classList.add('revealed')
              gsap.fromTo(
                img,
                { scale: 1.2 },
                {
                  scale: 1,
                  duration: 1.4,
                  ease: 'power3.out',
                }
              )
            },
            once: true,
          })
        }

        // Image parallax — image moves slower than wrapper (Ken Burns feel)
        const wrapper = imageWrapperRefs.current[i]
        if (wrapper && img) {
          gsap.to(img, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        // Number parallax on scroll
        const number = item.querySelector('.portfolio-number')
        if (number) {
          gsap.to(number, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        // Tags stagger in
        const tags = item.querySelectorAll('.portfolio-tag')
        if (tags.length) {
          gsap.fromTo(
            tags,
            { y: 10, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: item,
                start: 'top 65%',
              },
            }
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="portfolio" id="work" ref={sectionRef}>
      <div className="portfolio-header" ref={headerRef} style={{ opacity: 0 }}>
        <h2 className="portfolio-title clash">Selected</h2>
        <span className="portfolio-subtitle">Case Studies 2023 — 2024</span>
      </div>

      {projects.map((project, i) => (
        <div
          className={`portfolio-item ${i % 2 !== 0 ? 'reversed' : ''}`}
          key={project.number}
          ref={(el) => { itemRefs.current[i] = el }}
        >
          <div
            className="portfolio-image-wrapper"
            ref={(el) => { imageWrapperRefs.current[i] = el }}
          >
            <img
              className="portfolio-image"
              src={project.image}
              alt={project.name}
              ref={(el) => { imageRefs.current[i] = el }}
              loading="lazy"
            />
          </div>
          <div className="portfolio-info" style={{ opacity: 0 }}>
            <div className="portfolio-number clash">{project.number}</div>
            <h3 className="portfolio-name clash">{project.name}</h3>
            <p className="portfolio-meta">{project.meta}</p>
            <div className="portfolio-tags">
              {project.tags.map((tag) => (
                <span className="portfolio-tag" key={tag}>{tag}</span>
              ))}
            </div>
            <a
              href={project.link}
              className="portfolio-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Case
            </a>
          </div>
        </div>
      ))}
    </section>
  )
}
