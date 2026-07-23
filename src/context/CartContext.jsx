import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'lhv_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  const updateQty = (slug, qty) => {
    if (qty <= 0) {
      removeItem(slug);
      return;
    }
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty } : i)));
  };

  const clear = () => setItems([]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => {
    const price = parseFloat(String(i.price).replace(/[^0-9.]/g, '')) || 0;
    return sum + price * i.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clear, isOpen, setIsOpen, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
