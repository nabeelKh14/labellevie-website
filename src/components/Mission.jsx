import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Mission() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mission-reveal', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="mission-reveal relative rounded-3xl overflow-hidden bg-dark/5">
          <img
            src="/images/mission-image.png"
            alt="La Belle Vie MedSpa entrance"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Copy — verbatim from their live site mission */}
        <div className="mission-reveal">
          <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Mission</p>
          <h2 className="font-drama italic text-4xl md:text-5xl text-primary leading-tight mb-6">
            Confidence, well-being, and care.
          </h2>
          <p className="font-sans text-dark/80 leading-relaxed mb-4">
            At La Belle Vie MedSpa, our mission is to empower confidence and well-being through
            advanced aesthetic and wellness treatments delivered with integrity, artistry, and care.
          </p>
          <p className="font-sans text-dark/80 leading-relaxed">
            We blend medical expertise with a luxury spa experience — offering evidence-based
            treatments, regenerative therapies, and medical-grade skincare in a calming, supportive
            environment. Our team is dedicated to personalized care, ensuring every patient feels
            seen, heard, and cared for.
          </p>
        </div>
      </div>
    </section>
  )
}
