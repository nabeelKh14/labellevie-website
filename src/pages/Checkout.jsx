import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [placed, setPlaced] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No live payment processor wired — this is a demo checkout confirmation.
    setPlaced(true);
    clear();
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-background text-dark flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="font-drama italic text-4xl mb-4 text-primary">Order Received</h1>
          <p className="font-sans text-dark/70 mb-8">
            Thank you, {form.name || 'friend'}. Our team will contact you shortly to confirm your
            La Belle Vie order and arrange pickup or delivery from our Woodland Hills or Burbank clinic.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-accent text-background px-8 py-3 rounded-full font-sans font-semibold hover:scale-105 transition-transform"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-dark flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-drama italic text-4xl mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-accent font-sans font-semibold underline">
            Browse the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-dark pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-drama italic text-4xl md:text-5xl mb-10 text-primary">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-sans font-bold text-xl mb-2">Your Details</h2>
            <input required placeholder="Full Name" value={form.name} onChange={update('name')} className="w-full px-4 py-3 rounded-xl border border-dark/15 bg-white font-sans" />
            <input required type="email" placeholder="Email" value={form.email} onChange={update('email')} className="w-full px-4 py-3 rounded-xl border border-dark/15 bg-white font-sans" />
            <input required type="tel" placeholder="Phone" value={form.phone} onChange={update('phone')} className="w-full px-4 py-3 rounded-xl border border-dark/15 bg-white font-sans" />
            <input placeholder="Address" value={form.address} onChange={update('address')} className="w-full px-4 py-3 rounded-xl border border-dark/15 bg-white font-sans" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="City" value={form.city} onChange={update('city')} className="w-full px-4 py-3 rounded-xl border border-dark/15 bg-white font-sans" />
              <input placeholder="ZIP" value={form.zip} onChange={update('zip')} className="w-full px-4 py-3 rounded-xl border border-dark/15 bg-white font-sans" />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-sans font-semibold py-4 rounded-full hover:bg-accent transition-colors mt-4"
            >
              Place Order
            </button>
            <p className="font-sans text-dark/50 text-xs text-center">
              Demo checkout — no live payment processed. Our team confirms orders by phone/email.
            </p>
          </form>

          {/* Summary */}
          <div>
            <h2 className="font-sans font-bold text-xl mb-4">Order Summary</h2>
            <ul className="space-y-3 mb-6">
              {items.map((i) => (
                <li key={i.slug} className="flex justify-between items-center pb-3 border-b border-dark/10">
                  <div>
                    <p className="font-sans font-semibold text-sm">{i.name}</p>
                    <p className="font-mono text-dark/50 text-xs">Qty {i.qty}</p>
                  </div>
                  <span className="font-mono text-accent text-sm">{i.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center text-lg">
              <span className="font-sans font-semibold">Total</span>
              <span className="font-mono font-bold text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
