import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Long-form guide page. This is the lever that moves on-page citability past
// the homepage ceiling (~55-60): question-form <h2> + 134-167w self-contained
// answer blocks with real, verifiable stats (prices, hours, locations).
export default function Guide() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.guide-block', {
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="w-full min-h-screen bg-background text-dark pt-32 pb-24 px-6 md:px-16">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="font-mono text-xs uppercase tracking-widest text-primary/60 hover:text-accent transition-colors">
          &larr; Back to home
        </a>
        <h1 className="font-sans font-bold text-4xl md:text-5xl mt-6 mb-4">
          La Belle Vie Medspa — Patient Guide
        </h1>
        <p className="font-serif italic text-lg text-primary/70 mb-16">
          Evidence-based answers on treatments, pricing, locations, and booking at our
          Woodland Hills and Burbank, CA clinics. Call or text 818.392.8500.
        </p>

        <article className="space-y-14">
          <section className="guide-block">
            <h2 className="font-sans font-bold text-2xl mb-4">
              How much do La Belle Vie Medspa treatments cost?
            </h2>
            <p className="font-sans text-base leading-relaxed text-primary/80">
              La Belle Vie Medspa publishes transparent pricing across four categories.
              Facial treatments range from $150 for LED light therapy to $450 for
              microneedling, with the Signature Facial at $185 and the Hydrafacial Elite
              at $295. Injectables start at $18 per unit for Botox, $650 for dermal
              fillers, $850 for a PRP facial, and $900 for Sculptra. Body treatments span
              $195 body wraps to $750 CoolSculpting sessions, with laser hair removal at
              $150 per area. Wellness services include IV therapy at $250, hormone therapy
              at $200, and a consultation at $125. All prices are per session; packages
              are available at both the Woodland Hills and Burbank locations.
            </p>
          </section>

          <section className="guide-block">
            <h2 className="font-sans font-bold text-2xl mb-4">
              What should I expect at my first medspa appointment?
            </h2>
            <p className="font-sans text-base leading-relaxed text-primary/80">
              Your first visit begins with a consultation, not a treatment. A licensed
              medical professional reviews your skin history, goals, and any contraindications,
              then builds a conservative, personalized plan. Most consultations run 60
              minutes and cost $125, credited toward your first treatment. Facials and
              injectables typically take 45 to 90 minutes; microneedling is a 90-minute
              session. You should arrive with clean skin and avoid sun exposure for 24
              hours beforehand. Results from injectables appear within 3 to 7 days, while
              regenerative treatments like PRP and Sculptra build over 4 to 6 weeks.
            </p>
          </section>

          <section className="guide-block">
            <h2 className="font-sans font-bold text-2xl mb-4">
              Are La Belle Vie treatments safe and medically supervised?
            </h2>
            <p className="font-sans text-base leading-relaxed text-primary/80">
              Safety is the practice's clinical standard. Every injectable, regenerative,
              and device-based treatment is performed or directly supervised by licensed
              medical staff — not a traditional day spa model. The two clinics stock
              medical-grade lines including Alastin, Epicutis, and SkinBetter, and follow
              posted-procedure protocols with dedicated recovery kits. CoolSculpting,
              laser hair removal, and microneedling carry standard contraindication
              screenings. Clients receive written aftercare and a direct line to the
              concierge at 818.392.8500 for any post-treatment questions, seven days a week
              during business hours.
            </p>
          </section>

          <section className="guide-block">
            <h2 className="font-sans font-bold text-2xl mb-4">
              Which Los Angeles neighborhoods does La Belle Vie serve?
            </h2>
            <p className="font-sans text-base leading-relaxed text-primary/80">
              La Belle Vie Medspa's two clinics serve the broader San Fernando Valley and
              central Los Angeles. The Woodland Hills location at 20969 Ventura Blvd serves
              Encino, Sherman Oaks, Studio City, Calabasas, and Tarzana, open Monday
              through Saturday 9am to 6pm. The Burbank location at 2924 W. Magnolia Blvd
              serves Magnolia Park, Toluca Lake, North Hollywood, and Glendale, open
              Monday, Tuesday, Friday, and Saturday 10am to 5pm. Both offer on-site parking.
              Out-of-area clients regularly travel from West Hollywood and the Westside for
              the practice's medical-grade care and personalized consultation model.
            </p>
          </section>

          <section className="guide-block">
            <h2 className="font-sans font-bold text-2xl mb-4">
              How do I prepare for a Hydrafacial or microneedling session?
            </h2>
            <p className="font-sans text-base leading-relaxed text-primary/80">
              Preparation is simple but matters for results. For a Hydrafacial Elite ($295,
              60 min), arrive with clean skin and skip retinoids for 2 days prior. For
              microneedling ($450, 90 min), avoid sun exposure, active acne flares, and
              exfoliants for 3 days before, and pause blood-thinning supplements if your
              provider advises. Both treatments need no downtime, though mild redness lasts
              1 to 2 hours. You can wear makeup the next morning. Book either session by
              calling 818.392.8500; the concierge coordinates pre-care notes specific to
              your skin type during confirmation.
            </p>
          </section>
        </article>

        <div className="mt-16 p-8 bg-primary/5 rounded-3xl border border-primary/10 text-center">
          <p className="font-serif italic text-lg text-primary mb-4">
            Ready to book? Call or text 818.392.8500.
          </p>
          <a
            href="tel:8183928500"
            className="inline-block bg-accent text-background px-8 py-4 rounded-full font-sans font-bold text-lg"
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </div>
  )
}
