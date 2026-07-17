import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import About from './components/About';
import Pricing from './components/Pricing';
import Guide from './pages/Guide'
import Shop from './pages/Shop'
import FeaturedHome from './components/FeaturedHome';

function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-dark selection:bg-accent selection:text-white">
      <Hero />
      <Features />
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
    <div className="w-full min-h-screen bg-background text-dark selection:bg-accent selection:text-white">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export default App;
