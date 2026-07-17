import { useMemo } from 'react'
import { products, categories } from '../data/catalog'

export default function PriceList() {
  const groups = useMemo(() => {
    return categories
      .filter((c) => c.slug !== 'all')
      .map((c) => ({
        ...c,
        items: products.filter((p) => p.category === c.slug),
      }))
      .filter((g) => g.items.length > 0)
  }, [])

  return (
    <div className="w-full min-h-screen bg-background text-dark">
      {/* Hero band */}
      <section className="relative px-6 md:px-16 pt-36 pb-16 md:pt-44 md:pb-20 bg-dark text-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark/90" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">Investment & Pricing</p>
          <h1 className="font-drama italic text-5xl md:text-8xl leading-[1.05]">Price List</h1>
          <p className="font-sans text-lg text-background/70 max-w-2xl mt-6">
            Transparent, medical-grade pricing for skincare and in-clinic treatments at La Belle Vie
            Medspa. Every price below is confirmed from our live store. Call or text 818.392.8500 to book.
          </p>
        </div>
      </section>

      {/* Grouped price list */}
      <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
        {groups.map((g) => (
          <div key={g.slug} className="mb-14">
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-primary border-b border-primary/15 pb-3 mb-6">
              {g.label}
            </h2>
            <ul className="divide-y divide-primary/10">
              {g.items.map((p) => (
                <li key={p.slug} className="flex items-center justify-between py-4 gap-4">
                  <div className="flex flex-col">
                    <a
                      href={`/shop/product/${p.slug}`}
                      className="font-sans font-semibold text-lg text-dark hover:text-accent transition-colors"
                    >
                      {p.name}
                    </a>
                    <span className="font-mono text-xs uppercase tracking-wider text-primary/60">{p.brand}</span>
                  </div>
                  <span className="font-mono text-base font-semibold text-accent whitespace-nowrap">
                    {p.price || 'In-Clinic'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-10 p-8 rounded-3xl bg-primary/5 border border-primary/10 text-center">
          <p className="font-sans text-dark/80">
            Prices reflect standard retail; treatment pricing is confirmed at consultation.
          </p>
          <a
            href="tel:8183928500"
            className="inline-block mt-4 bg-accent text-background px-8 py-3 rounded-full font-sans font-semibold hover:scale-105 transition-transform"
          >
            Book a Consultation · 818.392.8500
          </a>
        </div>
      </section>
    </div>
  )
}
