import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Aurora from '../components/reactbits/Aurora'

export default function Promo() {
  const root = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'opacity,transform',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    window.location.href = `tel:8183928500`
    setSent(true)
  }

  // Real promo offers mirrored from labelleviemedspa.com/promo, with verified treatment images.
  const offers = [
    { title: 'Underarm Hyperpigmentation', desc: 'Picoway laser treatment to address underarm discoloration.', price: '$149', img: '/images/services/IMG_5509.jpeg' },
    { title: 'vTONE Pelvic Floor Therapy', desc: 'Package of 3 sessions for pelvic floor strengthening and wellness.', price: '$895', img: '/images/services/IMG_1153.jpeg' },
    { title: 'Smooth + Soften', desc: 'Dermaplaning and smoothing treatment for radiant, soft skin.', price: '$12 / unit', img: '/images/services/IMG_8129.jpeg' },
  ]

  return (
    <div ref={root} className="w-full min-h-screen bg-dark text-background selection:bg-accent selection:text-white">
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none">
        <Aurora />
      </div>

      {/* Hero */}
      <section className="relative px-6 md:px-16 pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url("/images/homepage-hero.jpg")' }} />
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
        </div>
      </section>

      {/* Pay Now / Offers — 3 real promo cards with treatment images */}
      <section className="relative z-10 px-6 md:px-16 py-10">
        <h2 data-reveal className="font-sans font-bold text-2xl md:text-3xl text-background mb-8 text-center">
          Choose Your Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {offers.map((o) => (
            <div key={o.title} data-reveal className="group relative rounded-3xl overflow-hidden border border-background/10 hover:border-accent/50 transition-all">
              <div className="aspect-[4/5] overflow-hidden bg-black/30">
                <img
                  src={o.img}
                  alt={o.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-sans font-semibold text-lg text-background mb-1">{o.title}</h3>
                <p className="font-serif text-background/60 italic text-sm mb-3">{o.desc}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-accent text-lg font-bold">{o.price}</span>
                  <a
                    href="tel:8183928500"
                    className="inline-block px-5 py-2.5 rounded-xl bg-accent text-white font-sans font-semibold text-sm hover:scale-[1.02] transition-transform"
                  >
                    Pay Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Voucher form — matching the real promo page layout */}
      <section className="relative z-10 px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div data-reveal className="bg-background/5 border border-background/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="font-drama italic text-3xl text-background mb-2">Claim your voucher</h3>
            <p className="font-sans text-background/60 text-sm mb-6">
              Take advantage of our exclusive monthly offers. Fill in your details and we'll
              match you with the right pricing option.
            </p>
            {sent ? (
              <div className="text-accent font-sans text-lg py-8">
                Thanks, {form.name || 'friend'}! Calling our booking line now — or text 818.392.8500.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                  required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="bg-dark/40 border border-background/15 rounded-xl px-4 py-3 font-sans text-background placeholder:text-background/40 focus:border-accent focus:outline-none"
                />
                <input
                  required type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email*"
                  className="bg-dark/40 border border-background/15 rounded-xl px-4 py-3 font-sans text-background placeholder:text-background/40 focus:border-accent focus:outline-none"
                />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Message"
                  rows={3}
                  className="bg-dark/40 border border-background/15 rounded-xl px-4 py-3 font-sans text-background placeholder:text-background/40 focus:border-accent focus:outline-none resize-none"
                />
                <button type="submit" className="bg-accent text-background font-sans font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform mt-2">
                  Send
                </button>
                <p className="font-mono text-[11px] text-background/40 mt-1">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
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
            <a href="tel:8183928500" className="font-sans text-lg text-background border border-background/20 rounded-full px-6 py-3 text-center hover:bg-accent hover:text-background hover:border-accent transition-colors">
              Call or Text · 818.392.8500
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
