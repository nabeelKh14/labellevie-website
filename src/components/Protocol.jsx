import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Real La Belle Vie treatment/service photos (scripts/fetch_service_images.py).
// Tile formation mirroring their homepage services list.
const services = [
  { img: '/images/services/service-1.jpg', label: 'Advanced Facials' },
  { img: '/images/services/service-2.jpg', label: 'Laser Treatments' },
  { img: '/images/services/service-3.jpg', label: 'Injectables & Tox' },
  { img: '/images/services/service-4.jpg', label: 'Skin Rejuvenation' },
  { img: '/images/services/service-5.jpg', label: 'Body Contouring' },
  { img: '/images/services/service-6.jpg', label: 'Microneedling' },
  { img: '/images/services/service-7.jpg', label: 'Chemical Peels' },
  { img: '/images/services/service-8.jpg', label: 'Wellness Therapies' },
]

export default function Protocol() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-tile',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out', clearProps: 'opacity,transform' }
      );
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="protocol" ref={ref} className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Services</p>
          <h2 className="font-drama italic text-4xl md:text-6xl text-primary leading-tight">
            Treatments tailored to you
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((s) => (
            <Link
              to="/price-list"
              className="svc-tile group relative rounded-2xl overflow-hidden aspect-[4/5] bg-dark/5"
            >
              <img
                src={s.img}
                alt={s.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 font-sans font-semibold text-background text-sm md:text-base">
                {s.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="tel:8183928500"
            className="inline-block bg-accent text-background px-10 py-4 rounded-full font-sans font-semibold tracking-wide hover:scale-105 transition-transform"
          >
            Book Your Appointment · 818.392.8500
          </a>
        </div>
      </div>
    </section>
  )
}
