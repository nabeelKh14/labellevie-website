import { useMemo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Aurora from '../components/reactbits/Aurora'
import { categories, products, getFeatured } from '../data/catalog'

function ProductCard({ product }) {
  const href = product.external || `/shop/product/${product.slug}`
  return (
    <Link
      to={href}
      className="shop-card-tile h-full flex flex-col bg-dark text-background rounded-3xl overflow-hidden border border-white/5 hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="aspect-square overflow-hidden bg-black/30 shrink-0">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-background/30 font-drama italic text-3xl">
            {product.brand}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          {product.brand}
        </span>
        <h3 className="font-sans font-semibold text-sm leading-snug text-background mt-1 group-hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-mono text-sm font-semibold text-accent">
            {product.price || 'In-Clinic'}
          </span>
          <span className="font-sans text-xs font-semibold text-background/80 border border-background/25 rounded-full px-3 py-1 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
            {product.external ? 'Details' : 'View'}
          </span>
        </div>
      </div>
    </Link>
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
        y: 30,
        opacity: 0,
        duration: 0.55,
        stagger: 0.035,
        ease: 'power3.out',
      })
    }, root)
    return () => ctx.revert()
  }, [active])

  return (
    <div ref={root} className="w-full min-h-screen bg-background text-dark pt-28 pb-24 px-6 md:px-10 lg:px-16 relative overflow-hidden">
      <Aurora amplitude={1.4} blend={0.35} />
      <div className="relative z-10 max-w-7xl mx-auto">
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

        {/* Featured strip */}
        <section className="mb-12">
          <h2 className="font-sans font-semibold text-2xl mb-5">Featured</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {featured.map((p, i) => (
              <div key={i} className="shop-card">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-7 sticky top-20 z-20">
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
        <div className="shop-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((p, i) => (
            <div key={p.name} className="shop-card">
              <ProductCard product={p} />
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
