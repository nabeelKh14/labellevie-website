import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const { count, setIsOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            if (scrollPos > 50 && !isScrolled) {
                setIsScrolled(true);
            } else if (scrollPos <= 50 && isScrolled) {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav
                ref={navRef}
                className={`pointer-events-auto flex items-center justify-between px-6 py-3 transition-all duration-500 rounded-full w-full max-w-5xl ${isScrolled
                    ? 'bg-background/80 text-primary shadow-lg border border-primary/10 backdrop-blur-xl'
                    : 'bg-transparent text-background border border-transparent'
                    }`}
            >
                <Link to="/" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="La Belle Vie Medspa" className="h-7 w-auto object-contain" />
                    <span className="font-sans font-bold text-lg tracking-tight uppercase hidden sm:block">La belle vie medspa</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-mono text-sm">
                    <Link to="/" className="magnetic-link hover:text-accent transition-colors">Home</Link>
                    <Link to="/about" className="magnetic-link hover:text-accent transition-colors">About</Link>
                    <Link to="/price-list" className="magnetic-link hover:text-accent transition-colors">Price List</Link>
                    <Link to="/shop" className="magnetic-link hover:text-accent transition-colors">Shop</Link>
                    <Link to="/promo" className="magnetic-link hover:text-accent transition-colors">Promo</Link>
                </div>

                <div className="flex items-center gap-3">
                    {/* Cart icon */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative magnetic-btn bg-accent text-background px-4 py-2.5 rounded-full font-sans font-semibold text-sm tracking-wide flex items-center gap-2"
                        aria-label="Open cart"
                    >
                        <span className="relative z-10">Cart</span>
                        {count > 0 && (
                            <span className="relative z-10 bg-white text-accent rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
                                {count}
                            </span>
                        )}
                    </button>

                    <a
                        href="tel:8183928500"
                        className="magnetic-btn bg-primary text-background px-6 py-2.5 rounded-full font-sans font-semibold text-sm tracking-wide hidden sm:block"
                    >
                        <span className="magnetic-btn-bg"></span>
                        <span className="relative z-10">Book Appointment</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}
