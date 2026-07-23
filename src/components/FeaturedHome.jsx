import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getFeatured } from '../data/catalog'

// Mirrors the live site's "Featured Products" strip on the landing page,
// rendered in our premium style with a link into the full Shop.
export default function FeaturedHome() {
  const featured = useMemo(() => getFeatured(), [])

  return (
    <section className="w-full bg-background py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Featured</span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl mt-2">Medical-Grade Retail</h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-block font-mono text-sm uppercase tracking-wider border-b border-dark pb-1 hover:text-accent hover:border-accent transition-colors"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <Link
              key={p.name}
              to={p.external || `/shop/product/${p.slug}`}
              className="group block p-0 bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl hover:border-accent transition-colors overflow-hidden"
            >
              <div className="aspect-square overflow-hidden bg-black/5">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/30 font-drama italic text-2xl">
                    {p.brand}
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/50">
                  {p.brand}
                </span>
                <h3 className="font-sans font-semibold text-lg leading-snug text-dark mt-2 group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                <span className="font-mono text-sm font-semibold text-accent mt-3 inline-block">
                  {p.price || 'In-Clinic'}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/shop"
          className="md:hidden mt-8 inline-block font-mono text-sm uppercase tracking-wider border-b border-dark pb-1"
        >
          View all &rarr;
        </Link>
      </div>
    </section>
  )
}
