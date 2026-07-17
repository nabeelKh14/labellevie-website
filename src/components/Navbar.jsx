import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

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
                <div className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="La Belle Vie Medspa" className="h-7 w-auto object-contain" />
                    <span className="font-sans font-bold text-lg tracking-tight uppercase hidden sm:block">La belle vie medspa</span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-mono text-sm">
                    <a href="#treatments" className="magnetic-link hover:text-accent transition-colors">Treatments</a>
                    <a href="/shop" className="magnetic-link hover:text-accent transition-colors">Shop</a>
                    <a href="/guide" className="magnetic-link hover:text-accent transition-colors">Guide</a>
                    <a href="/about" className="magnetic-link hover:text-accent transition-colors">About</a>
                </div>

                <a
                    href="tel:8183928500"
                    className="magnetic-btn bg-accent text-background px-6 py-2.5 rounded-full font-sans font-semibold text-sm tracking-wide"
                >
                    <span className="magnetic-btn-bg"></span>
                    <span className="relative z-10">Book Appointment</span>
                </a>
            </nav>
        </div>
    );
}
