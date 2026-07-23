import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, subtotal, count } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-dark/50 z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-[70] shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-dark/10">
            <h2 className="font-drama italic text-2xl text-primary">
              Your Cart {count > 0 && <span className="text-accent">({count})</span>}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-dark/50 hover:text-dark text-2xl leading-none"
              aria-label="Close cart"
            >
              ×
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="text-center text-dark/50 mt-20">
                <p className="font-sans mb-4">Your cart is empty.</p>
                <Link
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className="text-accent font-sans font-semibold underline"
                >
                  Browse the shop
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-4 pb-4 border-b border-dark/5">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-dark/5 flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/30 font-drama italic text-xs">
                          {item.brand}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-semibold text-sm text-dark truncate">{item.name}</p>
                      <p className="font-mono text-accent text-sm">{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.slug, item.qty - 1)}
                          className="w-6 h-6 rounded-full border border-dark/20 text-dark/60 hover:border-accent hover:text-accent flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-mono text-sm w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.slug, item.qty + 1)}
                          className="w-6 h-6 rounded-full border border-dark/20 text-dark/60 hover:border-accent hover:text-accent flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.slug)}
                          className="ml-auto text-dark/40 hover:text-red-500 text-xs font-sans"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-dark/10 px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-dark/60">Subtotal</span>
                <span className="font-mono text-xl font-semibold text-primary">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary text-white font-sans font-semibold py-3.5 rounded-full hover:bg-accent transition-colors"
              >
                Checkout
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-2 text-dark/50 font-sans text-sm hover:text-dark"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
