import { useParams, Link } from 'react-router-dom'
import { products, categories } from '../data/catalog'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = categories.find((c) => c.slug === slug)
  const items = products.filter((p) => p.category === slug)

  if (!category) {
    return (
      <div className="min-h-screen bg-background text-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-drama italic text-4xl mb-4">Category not found</h1>
          <Link to="/shop" className="text-accent font-mono underline">Back to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background text-dark">
      <section className="px-6 md:px-16 pt-36 pb-12 md:pt-44 md:pb-16 bg-dark text-background">
        <div className="max-w-6xl mx-auto">
          <nav className="font-mono text-sm text-background/60 mb-6">
            <Link to="/shop" className="hover:text-accent">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-background">{category.label}</span>
          </nav>
          <h1 className="font-drama italic text-5xl md:text-7xl">{category.label}</h1>
          <p className="font-sans text-background/70 mt-4">{items.length} products</p>
        </div>
      </section>

      <section className="px-6 md:px-16 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((p) => (
            <Link key={p.slug} to={`/shop/product/${p.slug}`} className="group">
              <div className="rounded-2xl overflow-hidden bg-dark/5 aspect-square mb-3">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/30 font-drama italic text-2xl">{p.brand}</div>
                )}
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent mb-1">{p.brand}</p>
              <p className="font-sans font-semibold text-sm leading-snug">{p.name}</p>
              <p className="font-mono text-accent text-sm mt-1">{p.price || 'In-Clinic'}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
