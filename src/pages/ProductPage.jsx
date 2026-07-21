import { useParams, Link } from 'react-router-dom'
import { products, categories } from '../data/catalog'

export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-drama italic text-4xl mb-4">Product not found</h1>
          <Link to="/shop" className="text-accent font-mono underline">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const category = categories.find((c) => c.slug === product.category)
  const related = products.filter((p) => p.category === product.category && p.slug !== slug).slice(0, 4)

  return (
    <div className="w-full min-h-screen bg-background text-dark">
      <div className="px-6 md:px-16 pt-32 pb-20 max-w-6xl mx-auto">
        <nav className="font-mono text-sm text-primary/60 mb-8">
          <Link to="/shop" className="hover:text-accent">Shop</Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link to={`/shop/category/${category.slug}`} className="hover:text-accent">{category.label}</Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-dark">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden bg-dark/5 aspect-square">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary/30 font-drama italic text-6xl">
                {product.brand}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">{product.brand}</p>
            <h1 className="font-drama italic text-4xl md:text-5xl leading-tight mb-4">{product.name}</h1>
            <p className="font-mono text-2xl font-semibold text-accent mb-6">{product.price || 'In-Clinic / Inquire'}</p>
            <p className="font-sans text-dark/70 leading-relaxed mb-8">
              Medical-grade {product.brand} product available at La Belle Vie Medspa, Woodland Hills & Burbank, CA.
              Recommended during consultation to pair with your in-clinic treatments.
            </p>
            <div className="flex gap-4">
              <a
                href="tel:8183928500"
                className="bg-accent text-background px-8 py-3 rounded-full font-sans font-semibold hover:scale-105 transition-transform"
              >
                Inquire / Reserve
              </a>
              <Link
                href="/shop"
                className="border border-dark/20 px-8 py-3 rounded-full font-sans font-semibold hover:border-accent hover:text-accent transition-colors"
              >
                Back to Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-sans font-bold text-2xl mb-6">More from {category?.label}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link key={r.slug} to={`/shop/product/${r.slug}`} className="group">
                  <div className="rounded-2xl overflow-hidden bg-dark/5 aspect-square mb-3">
                    {r.image ? (
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/30 font-drama italic">{r.brand}</div>
                    )}
                  </div>
                  <p className="font-sans font-semibold text-sm">{r.name}</p>
                  <p className="font-mono text-accent text-sm">{r.price || 'In-Clinic'}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
