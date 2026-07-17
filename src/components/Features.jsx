import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Real treatment/service photos pulled from their live price-list page
// (scripts/fetch_service_images.py). Verified-real La Belle Vie imagery.
const treatments = [
  { img: '/images/services/service-1.jpg', label: 'Advanced Facials' },
  { img: '/images/services/service-2.jpg', label: 'Laser Treatments' },
  { img: '/images/services/service-3.jpg', label: 'Injectables & Tox' },
  { img: '/images/services/service-4.jpg', label: 'Skin Rejuvenation' },
  { img: '/images/services/service-5.jpg', label: 'Body Contouring' },
  { img: '/images/services/service-6.jpg', label: 'Microneedling' },
  { img: '/images/services/service-7.jpg', label: 'Chemical Peels' },
  { img: '/images/services/service-8.jpg', label: 'Wellness Therapies' },
]

export default function Features() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.treatment-card', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={containerRef} className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Treatments</p>
          <h2 className="font-drama italic text-4xl md:text-6xl text-primary leading-tight">
            Evidence-based aesthetic &amp; wellness
          </h2>
          <p className="font-sans text-dark/70 mt-4 max-w-2xl mx-auto">
            From advanced facials to body contouring — delivered with medical expertise across
            our Woodland Hills and Burbank clinics. Call or text 818.392.8500 to book.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {treatments.map((t) => (
            <div key={t.label} className="treatment-card group relative rounded-2xl overflow-hidden aspect-[4/5] bg-dark/5">
              <img
                src={t.img}
                alt={t.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 font-sans font-semibold text-background text-sm md:text-base">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="tel:8183928500"
            className="inline-block bg-accent text-background px-10 py-4 rounded-full font-sans font-semibold tracking-wide hover:scale-105 transition-transform"
          >
            Book a Consultation · 818.392.8500
          </a>
        </div>
      </div>
    </section>
  )
}
