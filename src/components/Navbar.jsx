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
                <div className="font-sans font-bold text-lg tracking-tight uppercase">
                    La belle vie medspa
                </div>

                <div className="hidden md:flex items-center gap-8 font-mono text-sm">
                    <a href="#features" className="magnetic-link hover:text-accent transition-colors">Treatments</a>
                    <a href="#philosophy" className="magnetic-link hover:text-accent transition-colors">Philosophy</a>
                    <a href="/about" className="magnetic-link hover:text-accent transition-colors">About</a>
                    <a href="/pricing" className="magnetic-link hover:text-accent transition-colors">Pricing</a>
                    <a href="#protocol" className="magnetic-link hover:text-accent transition-colors">Protocol</a>
                    <a href="/guide" className="magnetic-link hover:text-accent transition-colors">Guide</a>
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
