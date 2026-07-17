import { useMemo, useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Aurora from '../components/reactbits/Aurora'
import { categories, products, getFeatured } from '../data/catalog'
import LiquidGlass from 'liquid-glass-react'

gsap.registerPlugin(ScrollTrigger)

function ProductCard({ product, index }) {
  return (
    <LiquidGlass
      style={{ width: '100%', height: '100%' }}
      overflow="hidden"
      blur={2}
      saturate={1.1}
    >
      <div className="h-full flex flex-col justify-between p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/50">
            {product.brand}
          </span>
          <h3 className="font-sans font-semibold text-lg leading-snug text-dark mt-2">
            {product.name}
          </h3>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-sm font-semibold text-accent">
            {product.price || 'In-Clinic'}
          </span>
          <a
            href="tel:8183928500"
            className="font-sans text-sm font-semibold text-dark border border-dark/20 rounded-full px-4 py-2 hover:bg-accent hover:text-white hover:border-accent transition-colors"
          >
            Inquire
          </a>
        </div>
      </div>
    </LiquidGlass>
  )
}

export default function Shop() {
  const [active, setActive] = useState('all')
  const root = useRef(null)
  const featured = useMemo(() => getFeatured(), [])

  const filtered = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [active]
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.shop-card', {
        scrollTrigger: { trigger: '.shop-grid', start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      })
    }, root)
    return () => ctx.revert()
  }, [filtered.length])

  return (
    <div ref={root} className="w-full min-h-screen bg-background text-dark pt-32 pb-24 px-6 md:px-16 relative overflow-hidden">
      <Aurora amplitude={1.4} blend={0.35} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <a href="/" className="font-mono text-xs uppercase tracking-widest text-primary/60 hover:text-accent transition-colors">
          &larr; Back to home
        </a>
        <header className="mt-6 mb-10">
          <h1 className="font-sans font-bold text-4xl md:text-6xl">The Shop</h1>
          <p className="font-serif italic text-lg text-primary/70 mt-3 max-w-2xl">
            Medical-grade skincare from Alastin, Epicutis, and SkinBetter — the same lines
            we use in-clinic. Curated retail, available at both our Woodland Hills and
            Burbank locations. Call or text 818.392.8500 to reserve or inquire.
          </p>
        </header>

        {/* Featured strip — mirrors their "Featured Products" landing section */}
        <section className="mb-16">
          <h2 className="font-sans font-semibold text-2xl mb-6">Featured</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <div key={i} className="shop-card aspect-[4/5]">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 sticky top-20 z-20">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
                active === c.slug
                  ? 'bg-dark text-background border-dark'
                  : 'bg-white/40 text-dark border-dark/15 hover:border-accent'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="shop-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <div key={p.name} className="shop-card aspect-[4/5]">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="font-serif italic text-primary/60 mt-10">No products in this category yet.</p>
        )}
      </div>
    </div>
  )
}
