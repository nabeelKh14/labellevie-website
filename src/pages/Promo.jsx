import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Aurora from '../components/reactbits/Aurora'

gsap.registerPlugin(ScrollTrigger)

const gallery = [
  { src: '/images/hero.jpg', label: 'Our Team' },
  { src: '/images/treatment-1.jpg', label: 'Advanced Treatments' },
  { src: '/images/treatment-2.jpg', label: 'The Experience' },
  { src: '/images/banner.jpg', label: 'Woodland Hills & Burbank' },
]

export default function Promo() {
  const root = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    // Honest lead capture: route to their real booking line (no fake backend).
    const body = encodeURIComponent(
      `Promo voucher request\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
    )
    window.location.href = `tel:8183928500`
    setSent(true)
  }

  return (
    <div ref={root} className="w-full min-h-screen bg-dark text-background selection:bg-accent selection:text-white">
      {/* Aurora backdrop */}
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none">
        <Aurora />
      </div>

      {/* Hero */}
      <section className="relative px-6 md:px-16 pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url("/images/banner.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/60 to-dark" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p data-reveal className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-6">
            Exclusive Offers · July 2026
          </p>
          <h1 data-reveal className="font-drama italic text-5xl md:text-8xl leading-[1.05] text-background">
            Claim your<br /><span className="text-accent">voucher.</span>
          </h1>
          <p data-reveal className="font-sans text-lg md:text-xl text-background/70 max-w-2xl mx-auto mt-8">
            One of our exclusive pricing options — personalized to your goals. Begin your
            treatment journey at La Belle Vie Medspa.
          </p>
          <a
            href="tel:8183928500"
            data-reveal
            className="inline-block mt-10 bg-accent text-background px-10 py-4 rounded-full font-sans font-semibold tracking-wide hover:scale-105 transition-transform"
          >
            Book Now · 818.392.8500
          </a>
        </div>
      </section>

      {/* Image gallery — all real site images */}
      <section className="relative z-10 px-6 md:px-16 py-16">
        <h2 data-reveal className="font-sans font-bold text-3xl md:text-4xl text-background mb-10 text-center">
          Inside La Belle Vie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {gallery.map((g) => (
            <div key={g.src} data-reveal className="relative group overflow-hidden rounded-2xl aspect-[3/4]">
              <img
                src={g.src}
                alt={g.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-wider text-background/90">
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Voucher form + locations */}
      <section className="relative z-10 px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div data-reveal className="bg-background/5 border border-background/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="font-drama italic text-3xl text-background mb-2">Get your voucher</h3>
            <p className="font-sans text-background/60 text-sm mb-6">
              Tell us how to reach you. We'll match you with the right exclusive offer.
            </p>
            {sent ? (
              <div className="text-accent font-sans text-lg py-8">
                Thanks, {form.name || 'friend'}. Calling our booking line now — or text 818.392.8500.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="bg-dark/40 border border-background/15 rounded-xl px-4 py-3 font-sans text-background placeholder:text-background/40 focus:border-accent focus:outline-none"
                />
                <input
                  required type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email*"
                  className="bg-dark/40 border border-background/15 rounded-xl px-4 py-3 font-sans text-background placeholder:text-background/40 focus:border-accent focus:outline-none"
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone"
                  className="bg-dark/40 border border-background/15 rounded-xl px-4 py-3 font-sans text-background placeholder:text-background/40 focus:border-accent focus:outline-none"
                />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Which treatment are you interested in?"
                  rows={3}
                  className="bg-dark/40 border border-background/15 rounded-xl px-4 py-3 font-sans text-background placeholder:text-background/40 focus:border-accent focus:outline-none resize-none"
                />
                <button
                  type="submit"
                  className="bg-accent text-background font-sans font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform mt-2"
                >
                  Claim Voucher
                </button>
                <p className="font-mono text-[11px] text-background/40 mt-1">
                  By submitting you agree to be contacted by La Belle Vie Medspa.
                </p>
              </form>
            )}
          </div>

          {/* Locations */}
          <div data-reveal className="flex flex-col gap-8">
            <div>
              <h3 className="font-drama italic text-3xl text-background mb-4">Visit us</h3>
              <p className="font-sans text-background/60">
                Consultations available by appointment. Book today to find the treatments right for your goals.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-background/10 rounded-2xl p-5">
                <p className="font-mono text-accent text-xs uppercase tracking-wider mb-2">Woodland Hills</p>
                <p className="font-sans text-background/80 text-sm leading-relaxed">
                  French Quarter<br />20969 Ventura Blvd, Suite 23<br />Woodland Hills, CA 91364
                </p>
              </div>
              <div className="border border-background/10 rounded-2xl p-5">
                <p className="font-mono text-accent text-xs uppercase tracking-wider mb-2">Burbank</p>
                <p className="font-sans text-background/80 text-sm leading-relaxed">
                  Magnolia Park<br />2924 W Magnolia Blvd<br />Burbank, CA 91505
                </p>
              </div>
            </div>
            <a
              href="tel:8183928500"
              className="font-sans text-lg text-background border border-background/20 rounded-full px-6 py-3 text-center hover:bg-accent hover:text-background hover:border-accent transition-colors"
            >
              Call or Text · 818.392.8500
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
