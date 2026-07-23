import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import FeaturedHome from './components/FeaturedHome';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import About from './components/About';
import PriceList from './pages/PriceList';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import Promo from './pages/Promo';
import Checkout from './pages/Checkout';
import Guide from './pages/Guide';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-dark selection:bg-accent selection:text-white">
      <Hero />
      <Mission />
      <Services />
      <Reviews />
      <Philosophy />
      <Protocol />
      <FeaturedHome />
      <div className="px-2 md:px-4 bg-background pb-2 md:pb-4">
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <div className="w-full min-h-screen bg-background text-dark selection:bg-accent selection:text-white">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/price-list" element={<PriceList />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/category/:slug" element={<CategoryPage />} />
          <Route path="/shop/product/:slug" element={<ProductPage />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);
}

export default App;
